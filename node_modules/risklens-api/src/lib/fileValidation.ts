export function validateUploadInput(fileName: string, contentType: string) {
  const allowed = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  if (!allowed.includes(contentType)) {
    throw new Error("Unsupported file type");
  }
  if (fileName.length > 180) throw new Error("File name too long");
}
