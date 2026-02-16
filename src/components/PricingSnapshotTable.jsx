import { formatNaira } from "../data/servicePricing.js";

export default function PricingSnapshotTable({ items, footnote }) {
  const maxPricingValue = Math.max(...items.map((item) => item.max));

  return (
    <div className="pricing-table-wrap">
      <table className="pricing-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Scope</th>
            <th>Estimated Range</th>
            <th>Relative Cost</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const width = Math.round((item.max / maxPricingValue) * 100);
            return (
              <tr key={item.title}>
                <td className="pricing-service">{item.title}</td>
                <td>{item.note}</td>
                <td className="pricing-range">
                  {formatNaira(item.min)} - {formatNaira(item.max)}
                </td>
                <td>
                  <div className="pricing-bar-track" aria-hidden="true">
                    <span
                      className="pricing-bar-fill"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="pricing-footnote">
        {footnote ||
          "Final quote may vary by vehicle condition, parts, and labor requirements."}
      </p>
    </div>
  );
}
