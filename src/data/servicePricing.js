export const servicePricingSnapshot = [
  { title: "Inspection & Report", min: 20000, max: 35000, note: "Pre-purchase" },
  { title: "Detailing", min: 40000, max: 90000, note: "Interior + exterior" },
  { title: "Brake Service", min: 35000, max: 70000, note: "Per axle" },
  { title: "AC Service", min: 25000, max: 60000, note: "Recharge + check" }
];

export const formatNaira = (value) => `₦${value.toLocaleString("en-NG")}`;
