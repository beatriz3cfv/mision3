// Reducer puro: recibe el estado anterior y una acción, y devuelve un array NUEVO (nunca muta).
export function favoritesReducer(favorites, action) {
    switch (action.type) {
        case 'toggle':
            return favorites.includes(action.id)
                ? favorites.filter((id) => id !== action.id)
                : [...favorites, action.id];
        case 'clear':
            return [];
        default:
            return favorites;
    }
}
