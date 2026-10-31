import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';

// Hook personalizado: envuelve useContext y avisa si se usa fuera del proveedor.
export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites debe usarse dentro de <FavoritesProvider>.');
    }
    return context;
}
