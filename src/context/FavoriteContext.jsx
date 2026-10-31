import { createContext, useEffect, useReducer } from 'react';
import { favoritesReducer } from './favoritesReducer.js';
import { loadJSON, saveJSON } from '../utils/storage.js';

const STORAGE_KEY = 'hp-favorites';

export const FavoritesContext = createContext(null);

// Los favoritos los necesitan las tarjetas, los filtros, el modal y App: en vez de
// pasarlos por props nivel a nivel (prop drilling) se comparten con un contexto.
export function FavoritesProvider({ children }) {
    // Inicialización perezosa: se lee localStorage solo en el primer render
    const [favorites, dispatch] = useReducer(favoritesReducer, null, () => {
        const stored = loadJSON(STORAGE_KEY, []);
        return Array.isArray(stored) ? stored : [];
    });

    // Efecto: sincroniza con un sistema externo (localStorage) cada vez que cambian los favoritos
    useEffect(() => {
        saveJSON(STORAGE_KEY, favorites);
    }, [favorites]);

    const value = {
        favorites,
        isFavorite: (id) => favorites.includes(id),
        toggleFavorite: (id) => dispatch({ type: 'toggle', id }),
        clearFavorites: () => dispatch({ type: 'clear' }),
    };

    // React 19: el contexto se usa directamente como proveedor (sin .Provider)
    return <FavoritesContext value={value}>{children}</FavoritesContext>;
}
