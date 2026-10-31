import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { houseClass } from '../utils/logic.js';
import CharacterImage from './CharacterImage.jsx';

export default function CharacterModal({ character, onClose }) {
    // Esc cierra la ficha. El listener es global, así que hay que quitarlo al desmontar.
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const details = [
        ['Casa', character.house],
        ['Especie', character.species],
        ['Patronus', character.patronus],
        ['Actor', character.actor],
        ['Nacimiento', character.dateOfBirth],
        ['Varita', character.wand],
        ['Estado', character.alive],
    ];

    return createPortal(
        <div
            className="modal-backdrop"
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();   // click fuera de la tarjeta
            }}
        >
            <div
                className={`modal-card ${houseClass(character.house)}`}
                role="dialog"
                aria-modal="true"
                aria-label={character.name}
            >
                <button type="button" className="close-btn" aria-label="Cerrar" onClick={onClose} autoFocus>
                    &times;
                </button>
                <div className="modal-img-container">
                    <CharacterImage src={character.image} alt={character.name} />
                </div>
                <div className="modal-info">
                    <h2>{character.name}</h2>
                    {details.map(([label, value]) => (
                        <p key={label}><strong>{label}:</strong> {value}</p>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
}
