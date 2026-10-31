import { houseClass } from '../utils/logic.js';
import CharacterImage from './CharacterImage.jsx';

export default function CharacterCard({ character, onOpen }) {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpen(character.id);
        }
    };

    return (
        <article
            className={`card ${houseClass(character.house)}`}
            role="button"
            tabIndex={0}
            onClick={() => onOpen(character.id)}
            onKeyDown={handleKeyDown}
        >
            <div className="card-img-container">
                <CharacterImage src={character.image} alt={character.name} lazy />
            </div>
            <div className="card-content">
                <h2>{character.name}</h2>
                <p className="house-badge">{character.house}</p>
                <p><strong>Actor:</strong> {character.actor}</p>
            </div>
        </article>
    );
}
