import { useCallback, useState } from 'react';
import { fetchCharacters } from './services/api.js';
import { useFetch } from './hooks/useFetch.js';
import { countByHouse, filterCharacters, formatCharacter } from './utils/logic.js';
import SearchBar from './components/SearchBar.jsx';
import HouseFilters from './components/HouseFilters.jsx';
import CharacterGrid from './components/CharacterGrid.jsx';
import CharacterModal from './components/CharacterModal.jsx';
import { ErrorMessage, InitialMessage, Loading } from './components/Status.jsx';

const FETCH_OPTIONS = { cacheKey: 'hp-characters', ttl: 60 * 60 * 1000 };   // caché de 1 hora

export default function App() {
    const { data: characters, error, loading, retry } = useFetch(fetchCharacters, FETCH_OPTIONS);

    // Estado mínimo: solo lo que el usuario puede cambiar
    const [draft, setDraft] = useState('');           // lo que hay escrito en el input
    const [query, setQuery] = useState('');           // búsqueda aplicada (al pulsar Buscar / Enter)
    const [house, setHouse] = useState(null);         // casa seleccionada en los filtros
    const [selectedId, setSelectedId] = useState(null);

    // Todo lo demás se deriva durante el render, no se guarda en estado (cálculos baratos: no hace falta useMemo)
    const counts = countByHouse(characters ?? []);
    const hasFilters = query !== '' || house !== null;

    const visible = (hasFilters && characters)
        ? filterCharacters(characters, { query, house }).map(formatCharacter)
        : [];

    // Se busca entre todos (no solo en `visible`) para que la ficha no desaparezca si cambian los filtros
    const selectedRaw = characters?.find((char) => char.id === selectedId);
    const selected = selectedRaw ? formatCharacter(selectedRaw) : null;

    const handleSearch = () => setQuery(draft.trim());
    const handleToggleHouse = (name) => setHouse((current) => (current === name ? null : name));
    const closeModal = useCallback(() => setSelectedId(null), []);

    // Renderizado condicional: una sola pantalla según el estado
    let content;
    if (loading) {
        content = <Loading />;
    } else if (error) {
        content = <ErrorMessage message={error} onRetry={retry} />;
    } else if (!hasFilters) {
        content = <InitialMessage />;
    } else {
        content = <CharacterGrid characters={visible} onOpen={setSelectedId} />;
    }

    return (
        <>
            <header>
                <h1>Personajes de Harry Potter</h1>
                {/* No se puede buscar sin datos */}
                <SearchBar value={draft} onChange={setDraft} onSubmit={handleSearch} disabled={!characters} />
                {characters && <HouseFilters counts={counts} activeHouse={house} onToggle={handleToggleHouse} />}
            </header>

            <main id="app">{content}</main>

            {selected && <CharacterModal character={selected} onClose={closeModal} />}
        </>
    );
}
