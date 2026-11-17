/**
 * Roam Authentication & Authorization System
 * -------------------------------------------
 * Client-side auth with SHA-256 password hashing, secure session tokens,
 * role-based access control, and session expiry management.
 *
 * For production: replace localStorage with a backend API.
 */

export type UserRole = "guest" | "explorer" | "pro";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinedDate: string;
}

interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: UserRole;
  avatar?: string;
  joinedDate: string;
}

interface Session {
  token: string;
  userId: string;
  email: string;
  createdAt: number;
  expiresAt: number;
}

const USERS_KEY = "roam-auth-users";
const SESSION_KEY = "roam-auth-session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ─── Crypto Utilities ───────────────────────────────────────────

/** Generate a cryptographically random salt */
function generateSalt(): string {
  const buffer = new Uint8Array(16);
  crypto.getRandomValues(buffer);
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Generate a secure random session token */
function generateToken(): string {
  const buffer = new Uint8Array(32);
  crypto.getRandomValues(buffer);
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Hash a password with SHA-256 + salt */
async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + salt);
  // Double-hash for extra security
  const firstHash = await crypto.subtle.digest("SHA-256", data);
  const secondHash = await crypto.subtle.digest("SHA-256", firstHash);
  return Array.from(new Uint8Array(secondHash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ─── Storage Helpers ────────────────────────────────────────────

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: Session = JSON.parse(raw);
    // Check expiry
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

function saveSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// ─── Validation ─────────────────────────────────────────────────

export interface ValidationError {
  field: string;
  message: string;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email is required";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.trim())) return "Please enter a valid email address";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  if (!/[^A-Za-z0-9]/.test(password)) return "Password must contain a special character";
  return null;
}

export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score: 1, label: "Weak", color: "bg-red-500" };
  if (score <= 3) return { score: 2, label: "Fair", color: "bg-amber-500" };
  if (score <= 4) return { score: 3, label: "Good", color: "bg-yellow-500" };
  if (score <= 5) return { score: 4, label: "Strong", color: "bg-emerald-500" };
  return { score: 5, label: "Excellent", color: "bg-green-500" };
}

export function validateName(name: string): string | null {
  if (!name.trim()) return "Name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  if (name.trim().length > 50) return "Name must be 50 characters or less";
  return null;
}

// ─── Auth Operations ────────────────────────────────────────────

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  token?: string;
  error?: string;
}

/** Register a new user */
export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: UserRole = "explorer",
): Promise<AuthResult> {
  // Validate inputs
  const nameErr = validateName(name);
  if (nameErr) return { success: false, error: nameErr };

  const emailErr = validateEmail(email);
  if (emailErr) return { success: false, error: emailErr };

  const passErr = validatePassword(password);
  if (passErr) return { success: false, error: passErr };

  // Check if email already exists
  const users = getStoredUsers();
  const existing = users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
  );
  if (existing) {
    return { success: false, error: "An account with this email already exists" };
  }

  // Hash the password
  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  // Create user record
  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash,
    salt,
    role,
    joinedDate: new Date().toISOString(),
  };

  users.push(newUser);
  saveStoredUsers(users);

  // Create session
  const token = generateToken();
  const session: Session = {
    token,
    userId: newUser.id,
    email: newUser.email,
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  saveSession(session);

  return {
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      joinedDate: newUser.joinedDate,
    },
    token,
  };
}

/** Log in an existing user */
export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResult> {
  const emailErr = validateEmail(email);
  if (emailErr) return { success: false, error: emailErr };

  if (!password) return { success: false, error: "Password is required" };

  const users = getStoredUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (!user) {
    // Intentionally vague for security
    return { success: false, error: "Invalid email or password" };
  }

  // Verify password
  const hash = await hashPassword(password, user.salt);
  if (hash !== user.passwordHash) {
    return { success: false, error: "Invalid email or password" };
  }

  // Create session
  const token = generateToken();
  const session: Session = {
    token,
    userId: user.id,
    email: user.email,
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  saveSession(session);

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      joinedDate: user.joinedDate,
    },
    token,
  };
}

/** Log out: clear the active session */
export function logoutUser(): void {
  clearSession();
}

/** Restore session on app startup — returns the user if session is still valid */
export function restoreSession(): AuthUser | null {
  const session = getSession();
  if (!session) return null;

  const users = getStoredUsers();
  const user = users.find((u) => u.id === session.userId);
  if (!user) {
    clearSession();
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    joinedDate: user.joinedDate,
  };
}

/** Check if a valid session exists */
export function isAuthenticated(): boolean {
  return getSession() !== null;
}

/** Get the current session token */
export function getSessionToken(): string | null {
  const session = getSession();
  return session?.token ?? null;
}

/** Update user role (e.g. upgrade to pro) */
export function updateUserRole(userId: string, newRole: UserRole): boolean {
  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return false;

  users[idx]!.role = newRole;
  saveStoredUsers(users);
  return true;
}

/** Update user profile (name, avatar) */
export function updateUserProfile(
  userId: string,
  updates: { name?: string; avatar?: string },
): AuthUser | null {
  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;

  if (updates.name) users[idx]!.name = updates.name.trim();
  if (updates.avatar) users[idx]!.avatar = updates.avatar;
  saveStoredUsers(users);

  const u = users[idx]!;
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    avatar: u.avatar,
    joinedDate: u.joinedDate,
  };
}

// ─── Permission Checks ─────────────────────────────────────────

export type Permission =
  | "view_places"
  | "save_places"
  | "collect_stamps"
  | "write_journal"
  | "view_passport"
  | "audio_tours"
  | "quests"
  | "coupons"
  | "photo_memories";

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  guest: ["view_places"],
  explorer: [
    "view_places",
    "save_places",
    "collect_stamps",
    "write_journal",
    "view_passport",
    "quests",
    "photo_memories",
  ],
  pro: [
    "view_places",
    "save_places",
    "collect_stamps",
    "write_journal",
    "view_passport",
    "audio_tours",
    "quests",
    "coupons",
    "photo_memories",
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function getPermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}
