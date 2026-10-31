import CharacterCard from './CharacterCard.jsx';

export default function CharacterGrid({ characters, onOpen }) {
    if (characters.length === 0) {
        return <p className="empty">No se encontraron personajes con esos criterios.</p>;
    }

    const total = characters.length;

    return (
        <>
            <p className="results-count">{total} {total === 1 ? 'personaje' : 'personajes'}</p>
            <section className="grid-container">
                {characters.map((character) => (
                    <CharacterCard key={character.id} character={character} onOpen={onOpen} />
                ))}
            </section>
        </>
    );
}
