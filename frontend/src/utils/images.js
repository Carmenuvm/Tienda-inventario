export const bufferToDataURL = (imageBuffer, contentType = 'image/jpeg') => {
    if (!imageBuffer?.data) return '';
    const bytes = new Uint8Array(imageBuffer.data);
    const base64 = btoa(String.fromCharCode(...bytes));
    return `data:${contentType};base64,${base64}`;
  };