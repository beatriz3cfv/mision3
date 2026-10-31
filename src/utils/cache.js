// Caché en localStorage con caducidad (TTL). Genérica: sirve para cualquier clave.
export function readCache(key, ttl) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;

        const { savedAt, data } = JSON.parse(raw);
        const isFresh = Date.now() - savedAt < ttl;
        return isFresh && data != null ? data : null;
    } catch {
        // JSON corrupto o localStorage bloqueado: como si no hubiera caché
        return null;
    }
}

export function writeCache(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }));
    } catch {
        // Funciona igual, solo sin caché
    }
}
