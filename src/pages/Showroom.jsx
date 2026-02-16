import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import vehicleCatalog from "../data/vehicleCatalog.js";

export default function Showroom() {
  const navigate = useNavigate();
  const maxCatalogPrice = useMemo(
    () => Math.max(...vehicleCatalog.map((car) => car.priceValue)),
    []
  );

  const brands = useMemo(
    () => [...new Set(vehicleCatalog.map((car) => car.model.split(" ")[0]))],
    []
  );
  const types = useMemo(
    () => [...new Set(vehicleCatalog.map((car) => car.type))],
    []
  );

  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxCatalogPrice);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const toggleSelected = (value, listSetter, list) => {
    if (list.includes(value)) {
      listSetter(list.filter((item) => item !== value));
    } else {
      listSetter([...list, value]);
    }
  };

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return vehicleCatalog.filter((car) => {
      const matchesQuery =
        !normalized ||
        [car.name, car.model, car.location, car.badge]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(car.model.split(" ")[0]);
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(car.type);
      const matchesPrice = car.priceValue >= minPrice && car.priceValue <= maxPrice;
      return matchesQuery && matchesBrand && matchesType && matchesPrice;
    });
  }, [maxPrice, minPrice, query, selectedBrands, selectedTypes]);

  const resetFilters = () => {
    setQuery("");
    setMinPrice(0);
    setMaxPrice(maxCatalogPrice);
    setSelectedBrands([]);
    setSelectedTypes([]);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <h1>Inventory</h1>
            <p>{filtered.length} vehicles available</p>
          </div>
        </div>
        <div className="inventory-layout">
          <aside className="filter-card">
            <h3>Filter Vehicles</h3>
            <div className="filter-group">
              <label>Search</label>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by keywords..."
              />
            </div>
            <div className="filter-group">
              <label>Price Range</label>
              <div className="filter-row">
                <input
                  type="number"
                  value={minPrice}
                  min="0"
                  onChange={(event) => setMinPrice(Number(event.target.value))}
                  placeholder="$ Min"
                />
                <input
                  type="number"
                  value={maxPrice}
                  min="0"
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  placeholder="$ Max"
                />
              </div>
            </div>
            <div className="filter-group">
              <label>Make</label>
              <div className="checkbox-list">
                {brands.map((brand) => (
                  <label key={brand}>
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleSelected(brand, setSelectedBrands, selectedBrands)}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label>Body Type</label>
              <div className="checkbox-list">
                {types.map((type) => (
                  <label key={type}>
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleSelected(type, setSelectedTypes, selectedTypes)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <button type="button" className="text-link" onClick={resetFilters}>
              Reset Filters
            </button>
          </aside>

          <div className="inventory-grid">
            {filtered.map((car) => (
              <article
                key={car.id}
                className="inventory-card"
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/showroom/${car.id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/showroom/${car.id}`);
                  }
                }}
              >
                <div
                  className="inventory-media"
                  style={{ backgroundImage: `url(${car.image})` }}
                >
                  <span className="tag">{car.type}</span>
                </div>
                <div className="inventory-body">
                  <h3>{car.name}</h3>
                  <span className="inventory-meta">
                    {car.type} • Stock #{car.id.split("-").pop()}
                  </span>
                  <div className="inventory-specs">
                    <span>{car.distance}</span>
                    <span>{car.transmission}</span>
                    <span>{car.fuel}</span>
                  </div>
                  <div className="inventory-footer">
                    <div>
                      <span className="price-label">Price</span>
                      <strong>{car.price}</strong>
                    </div>
                    <NavLink
                      className="text-link"
                      to={`/showroom/${car.id}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      View Specs
                    </NavLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
