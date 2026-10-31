import { useEffect, useState } from 'react';
import { readCache, writeCache } from '../utils/cache.js';

/**
 * Hook personalizado reutilizable: carga datos asíncronos con caché opcional en localStorage.
 *
 * @param {(signal: AbortSignal) => Promise<any>} fetcher  Función que devuelve los datos.
 *        Tiene que ser estable (definida fuera del componente) porque es dependencia del efecto.
 * @param {{ cacheKey?: string, ttl?: number }} [options]  Si hay cacheKey, se usa/guarda caché durante ttl ms.
 * @returns {{ data: any, error: string|null, loading: boolean, retry: () => void }}
 */
export function useFetch(fetcher, { cacheKey, ttl } = {}) {
    // Estado inicial calculado en el primer render: si hay caché, no hace falta ni cargar
    const [state, setState] = useState(() => {
        const cached = cacheKey ? readCache(cacheKey, ttl) : null;
        return { data: cached, error: null, loading: !cached };
    });
    const [attempt, setAttempt] = useState(0);   // sube al reintentar y vuelve a lanzar el efecto
    const hasData = state.data !== null;

    // Efecto: sincroniza el componente con un sistema externo (la API).
    // Los setState van dentro de la promesa, no directamente en el cuerpo del efecto.
    useEffect(() => {
        if (hasData) return;   // ya hay datos (de la caché o de una respuesta anterior)

        const controller = new AbortController();

        fetcher(controller.signal)
            .then((result) => {
                if (cacheKey) writeCache(cacheKey, result);
                setState({ data: result, error: null, loading: false });
            })
            .catch((err) => {
                if (err.name === 'AbortError') return;   // cancelada: el cleanup ya se ha ejecutado
                setState({ data: null, error: err.message, loading: false });
            });

        // Cleanup: si el componente se desmonta (o el efecto se relanza), se cancela la petición.
        // Con <StrictMode> en desarrollo se ejecuta monta → limpia → remonta.
        return () => controller.abort();
    }, [fetcher, cacheKey, hasData, attempt]);

    // Reintentar es una respuesta a un evento (clic), así que se hace aquí y no en un efecto
    const retry = () => {
        setState((current) => ({ ...current, error: null, loading: true }));
        setAttempt((n) => n + 1);
    };

    return { ...state, retry };
}
