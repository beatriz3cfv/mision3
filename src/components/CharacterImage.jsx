import { useState } from 'react';
import { PLACEHOLDER } from '../utils/logic.js';

// Si falla, se muestra el placeholder.
// Guardamos la url que falló, así el estado se reinicia solo si cambia el src.
export default function CharacterImage({ src, alt, lazy = false }) {
    const [failedSrc, setFailedSrc] = useState(null);
    const finalSrc = !src || failedSrc === src ? PLACEHOLDER : src;

    return (
        <img
            src={finalSrc}
            alt={alt}
            loading={lazy ? 'lazy' : undefined}
            onError={() => setFailedSrc(src)}
        />
    );
}
