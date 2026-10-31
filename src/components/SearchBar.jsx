// Formulario controlado: el texto vive en App, aquí solo se pinta y se avisa.
export default function SearchBar({ value, onChange, onSubmit, disabled }) {
    const handleSubmit = (event) => {
        event.preventDefault();   // Enter y el botón «Buscar» pasan por aquí
        onSubmit();
    };

    return (
        <form className="controls" onSubmit={handleSubmit}>
            <input
                type="text"
                id="search"
                placeholder="Busca por nombre o casa (Harry, Gryffindor...)"
                autoComplete="off"
                aria-label="Buscar personaje"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                disabled={disabled}
            />
            <button type="submit" id="search-btn" disabled={disabled}>Buscar</button>
        </form>
    );
}
