// Lectura/escritura segura de JSON en localStorage (puede estar bloqueado o corrupto).
export function loadJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
    } catch {
        return fallback;
    }
}

export function saveJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Funciona igual, solo sin persistencia
    }
}
