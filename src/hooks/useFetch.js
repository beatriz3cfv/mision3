import { useEffect, useState } from 'react';
import { readCache, writeCache } from '../utils/cache.js';

// Hook personalizado reutilizable: carga datos de una API con caché opcional en localStorage.
// `fetcher` tiene que ser una función definida fuera del componente (es dependencia del efecto).
export function useFetch(fetcher, { cacheKey, ttl } = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [attempt, setAttempt] = useState(0);   // sube al reintentar y relanza el efecto

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        const cached = cacheKey ? readCache(cacheKey, ttl) : null;
        if (cached) {
            setData(cached);
            setLoading(false);
            return;
        }

        fetcher(controller.signal)
            .then((result) => {
                if (cacheKey) writeCache(cacheKey, result);
                setData(result);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name === 'AbortError') return;   // petición cancelada
                setError(err.message);
                setLoading(false);
            });

        // Cancela la petición si el componente se desmonta o el efecto se relanza
        return () => controller.abort();
    }, [fetcher, cacheKey, ttl, attempt]);

    const retry = () => setAttempt((n) => n + 1);

    return { data, error, loading, retry };
}
