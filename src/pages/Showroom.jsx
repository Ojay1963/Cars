import { useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import vehicleCatalog from "../data/vehicleCatalog.js";

export default function Showroom() {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [minPrice, setMinPrice] = useState(Number(searchParams.get("min")) || 0);
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("max")) || maxCatalogPrice
  );
  const [selectedBrands, setSelectedBrands] = useState(
    searchParams.get("brand") ? [searchParams.get("brand")] : []
  );
  const [selectedTypes, setSelectedTypes] = useState(
    searchParams.get("type") ? [searchParams.get("type")] : []
  );

  const syncParams = (nextState) => {
    const params = new URLSearchParams();
    if (nextState.query.trim()) params.set("q", nextState.query.trim());
    if (nextState.minPrice > 0) params.set("min", String(nextState.minPrice));
    if (nextState.maxPrice < maxCatalogPrice) params.set("max", String(nextState.maxPrice));
    if (nextState.selectedBrands.length === 1) params.set("brand", nextState.selectedBrands[0]);
    if (nextState.selectedTypes.length === 1) params.set("type", nextState.selectedTypes[0]);
    setSearchParams(params, { replace: true });
  };

  const toggleSelected = (value, list, setList) => {
    const updated = list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];

    setList(updated);
    syncParams({
      query,
      minPrice,
      maxPrice,
      selectedBrands: setList === setSelectedBrands ? updated : selectedBrands,
      selectedTypes: setList === setSelectedTypes ? updated : selectedTypes
    });
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

  const activeFilters = [
    query ? `Search: ${query}` : null,
    minPrice > 0 ? `Min: NGN ${minPrice.toLocaleString("en-NG")}` : null,
    maxPrice < maxCatalogPrice ? `Max: NGN ${maxPrice.toLocaleString("en-NG")}` : null,
    ...selectedBrands.map((brand) => `Make: ${brand}`),
    ...selectedTypes.map((type) => `Type: ${type}`)
  ].filter(Boolean);

  const resetFilters = () => {
    setQuery("");
    setMinPrice(0);
    setMaxPrice(maxCatalogPrice);
    setSelectedBrands([]);
    setSelectedTypes([]);
    setSearchParams({}, { replace: true });
  };

  return (
    <section className="section showroom-page">
      <div className="container">
        <div className="showroom-hero">
          <SectionHeading
            eyebrow="Inventory marketplace"
            title="Explore verified vehicles with cleaner filters and clearer pricing"
            description="Browse by make, body type, and budget with a layout designed for quick comparison on every screen size."
          />
          <div className="showroom-summary-card">
            <strong>{filtered.length}</strong>
            <span>vehicles available right now</span>
          </div>
        </div>

        <div className="inventory-layout">
          <aside className="filter-card">
            <div className="filter-card-header">
              <h3>Search & filters</h3>
              <button type="button" className="section-link" onClick={resetFilters}>
                Reset all
              </button>
            </div>

            <div className="filter-group">
              <label htmlFor="inventory-query">Search</label>
              <input
                id="inventory-query"
                value={query}
                onChange={(event) => {
                  const next = event.target.value;
                  setQuery(next);
                  syncParams({
                    query: next,
                    minPrice,
                    maxPrice,
                    selectedBrands,
                    selectedTypes
                  });
                }}
                placeholder="Search make, model, location..."
              />
            </div>

            <div className="filter-group">
              <label>Price range</label>
              <div className="filter-row">
                <input
                  type="number"
                  value={minPrice}
                  min="0"
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setMinPrice(next);
                    syncParams({
                      query,
                      minPrice: next,
                      maxPrice,
                      selectedBrands,
                      selectedTypes
                    });
                  }}
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={maxPrice}
                  min="0"
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setMaxPrice(next);
                    syncParams({
                      query,
                      minPrice,
                      maxPrice: next,
                      selectedBrands,
                      selectedTypes
                    });
                  }}
                  placeholder="Max"
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Make</label>
              <div className="checkbox-list">
                {brands.map((brand) => (
                  <label key={brand} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleSelected(brand, selectedBrands, setSelectedBrands)}
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Body type</label>
              <div className="checkbox-list">
                {types.map((type) => (
                  <label key={type} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleSelected(type, selectedTypes, setSelectedTypes)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="inventory-main">
            <div className="inventory-toolbar">
              <p>Showing vehicles matched to your current search.</p>
              <NavLink className="button button-secondary inventory-toolbar-cta" to="/contact">
                Need help sourcing a car?
              </NavLink>
            </div>

            {activeFilters.length > 0 ? (
              <div className="active-filter-bar">
                {activeFilters.map((item) => (
                  <span key={item} className="active-filter-chip">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="inventory-cta-card">
              <div>
                <span className="section-eyebrow">Conversion-focused support</span>
                <h3>Talk to a specialist if you want faster shortlist guidance</h3>
                <p>
                  Buyers looking for premium inventory usually convert better with a quick
                  consultation. We can help narrow by budget, body type, and location.
                </p>
              </div>
              <div className="inventory-cta-actions">
                <NavLink className="button button-primary" to="/contact">
                  Contact Dealer
                </NavLink>
                <NavLink className="button button-secondary" to="/factory">
                  Ownership Services
                </NavLink>
              </div>
            </div>

            <div className="vehicle-grid">
              {filtered.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} variant="inventory" />
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <h3>No vehicles match your filters</h3>
                <p>Try widening the price range or clearing one of the selected categories.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
