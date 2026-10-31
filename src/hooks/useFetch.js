import { useEffect, useState } from 'react';
import { readCache, writeCache } from '../utils/cache.js';

// Hook personalizado reutilizable: carga datos de una API con caché opcional en localStorage.
export function useFetch(fetcher, { cacheKey, ttl } = {}) {
    // El estado inicial se calcula en el primer render
    const [state, setState] = useState(() => {
        const cached = cacheKey ? readCache(cacheKey, ttl) : null;
        return { data: cached, error: null, loading: !cached };
    });
    const [attempt, setAttempt] = useState(0);   // sube al reintentar y relanza el efecto
    const hasData = state.data !== null;

    useEffect(() => {
        if (hasData) return;   // ya hay datos (de la caché o de una respuesta anterior)

        const controller = new AbortController();

        fetcher(controller.signal)
            .then((result) => {
                if (cacheKey) writeCache(cacheKey, result);
                setState({ data: result, error: null, loading: false });
            })
            .catch((err) => {
                if (err.name === 'AbortError') return;   // petición cancelada: no es un error real
                setState({ data: null, error: err.message, loading: false });
            });

        // Cleanup: cancela la petición si el componente se desmonta o el efecto se relanza
        return () => controller.abort();
    }, [fetcher, cacheKey, hasData, attempt]);

    // Reintentar responde a un clic, así que el estado se cambia aquí y no dentro de un efecto
    const retry = () => {
        setState((current) => ({ ...current, error: null, loading: true }));
        setAttempt((n) => n + 1);
    };

    return { ...state, retry };
}