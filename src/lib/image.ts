/**
 * Reliably loads and compresses an image file into a base64 Data URL.
 * Includes multiple fallback strategies for maximum mobile (iOS / Android) compatibility.
 */
export async function compressImage(file: File, maxDimension = 1200, quality = 0.75): Promise<string> {
  // Strategy 1: URL.createObjectURL + HTMLCanvas (fastest, lowest memory overhead on mobile)
  try {
    return await compressUsingObjectUrl(file, maxDimension, quality);
  } catch (err1) {
    console.warn("Object URL compression failed, trying FileReader fallback:", err1);
  }

  // Strategy 2: FileReader DataURL + Canvas
  try {
    return await compressUsingFileReader(file, maxDimension, quality);
  } catch (err2) {
    console.warn("FileReader canvas compression failed, falling back to raw data URL:", err2);
  }

  // Strategy 3: Raw FileReader without canvas (safe fallback for exotic formats)
  try {
    return await readAsRawDataUrl(file);
  } catch (err3) {
    console.error("All image read strategies failed:", err3);
    throw new Error("Unable to read this photo. Please try a different photo or format.");
  }
}

function compressUsingObjectUrl(file: File, maxDimension: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    let objectUrl = "";
    try {
      objectUrl = URL.createObjectURL(file);
    } catch (e) {
      return reject(e);
    }

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        let { width, height } = img;
        if (width === 0 || height === 0) {
          URL.revokeObjectURL(objectUrl);
          return reject(new Error("Image has 0 dimensions"));
        }

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", { willReadFrequently: false });

        if (!ctx) {
          URL.revokeObjectURL(objectUrl);
          return reject(new Error("Could not create canvas 2d context"));
        }

        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(objectUrl);

        // Try JPEG first, fallback to standard PNG if browser refuses JPEG conversion
        try {
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          if (dataUrl && dataUrl.startsWith("data:image")) {
            return resolve(dataUrl);
          }
        } catch {
          // Canvas toDataURL might throw on tainted canvas
        }

        const fallbackUrl = canvas.toDataURL();
        resolve(fallbackUrl);
      } catch (err) {
        URL.revokeObjectURL(objectUrl);
        reject(err);
      }
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(err);
    };

    img.src = objectUrl;
  });
}

function compressUsingFileReader(file: File, maxDimension: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) return reject(new Error("FileReader result empty"));

      const img = new Image();
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(src);

          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } catch {
          resolve(src);
        }
      };

      img.onerror = () => resolve(src); // if canvas can't decode, return data url directly
      img.src = src;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function readAsRawDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read raw file data"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
