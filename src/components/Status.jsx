// Mensajes de estado de la pantalla principal.
export function InitialMessage() {
    return <p className="initial-message">Escribe el nombre o la casa de un personaje, o elige una casa, para empezar.</p>;
}

export function Loading() {
    return <p className="loading" role="status">Cargando personajes… la primera vez puede tardar unos segundos.</p>;
}

export function ErrorMessage({ message, onRetry }) {
    return (
        <div className="error" role="alert">
            <p>Hubo un problema: {message}</p>
            <button type="button" className="retry-btn" onClick={onRetry}>Reintentar</button>
        </div>
    );
}
