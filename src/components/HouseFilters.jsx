import { houseClass } from '../utils/logic.js';

export default function HouseFilters({ counts, activeHouse, onToggle }) {
    const houses = Object.entries(counts).sort(([, a], [, b]) => b - a);

    return (
        <div id="house-filters" className="filters" aria-label="Filtrar por casa">
            {houses.map(([house, total]) => (
                <button
                    key={house}
                    type="button"
                    className={`chip ${houseClass(house)} ${house === activeHouse ? 'active' : ''}`}
                    aria-pressed={house === activeHouse}
                    onClick={() => onToggle(house)}
                >
                    {house} <span className="chip-count">{total}</span>
                </button>
            ))}
        </div>
    );
}
