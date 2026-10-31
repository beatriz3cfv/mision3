const API_URL = 'https://hp-api.onrender.com/api/characters';

// Saca todos los personajes
export async function fetchCharacters(signal) {
    let response;
    try {
        response = await fetch(API_URL, { signal });
    } catch (error) {
        // Una petición cancelada (desmontaje del componente) no es un fallo real
        if (error.name === 'AbortError') throw error;
    }

    if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.status} ${response.statusText}`.trim());
    }

    const data = await response.json().catch(() => null);
    if (!Array.isArray(data)) {
        throw new Error('La API devolvió un formato inesperado.');
    }
    return data;
}
