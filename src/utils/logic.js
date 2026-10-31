// Lógica de datos: filtrar, formatear y contar.
export const PLACEHOLDER = '/placeholder.webp';

const normalize = (text) => (text || '').toLowerCase().trim();

// "Gryffindor" -> "house-gryffindor" (los colores viven en el CSS)
export const houseClass = (house) => `house-${String(house).toLowerCase().replace(/[^a-z]/g, '')}`;

// Filtra por texto y por casa seleccionada
export function filterCharacters(characters, { query = '', house = null } = {}) {
    const term = normalize(query);

    return characters.filter(char =>
        (!house || char.house === house) &&
        (!term || normalize(char.name).includes(term) || normalize(char.house).includes(term))
    );
}

function formatWand(wand) {
    if (!wand) return 'Desconocida';

    const material = [wand.wood, wand.core].filter(Boolean).join(', ');
    const length = wand.length ? `(${wand.length} in)` : '';

    return [material, length].filter(Boolean).join(' ') || 'Desconocida';
}

function formatAlive(alive) {
    if (alive === true) return 'Vivo';
    if (alive === false) return 'Fallecido';
    return 'Desconocido';
}

// Formatea los personajes de la API para mostrar.
export function formatCharacter(char) {
    return {
        id: char.id,
        name: char.name,
        house: char.house || 'Desconocida',
        patronus: char.patronus || 'Desconocido',
        image: (char.image || '').trim(),
        actor: char.actor || 'Desconocido',
        dateOfBirth: char.dateOfBirth || 'Desconocido',
        species: char.species || 'Desconocida',
        wand: formatWand(char.wand),
        alive: formatAlive(char.alive),
    };
}

// Cuenta personajes por casa: { Gryffindor: 60}
export function countByHouse(characters) {
    return characters.reduce((counts, char) => {
        if (char.house) {
            counts[char.house] = (counts[char.house] || 0) + 1;
        }
        return counts;
    }, {});
}
