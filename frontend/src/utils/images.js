// Versión final probada
export const bufferToDataURL = (imagen) => {
  // Validación mejorada
  if (!imagen || !imagen.data || !Array.isArray(imagen.data)) {
    console.error('Estructura inválida:', imagen);
    return '';
  }

  try {
    const uint8 = new Uint8Array(imagen.data);
    const blob = new Blob([uint8], { 
      type: imagen.contentType || 'image/jpeg' // Fallback seguro
    });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error de conversión:', error);
    return '';
  }
};