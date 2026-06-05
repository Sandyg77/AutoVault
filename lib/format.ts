// Formatting helpers. The app is for a German dealership, so prices and
// numbers use German locale conventions (e.g. 44.999 € with a comma decimal).

// priceCents is stored as an integer (e.g. 4499900). Divide by 100 and
// format as EUR. maximumFractionDigits: 0 hides the ",00" on whole euros.
export function formatPrice(cents: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

// Generic number formatter (e.g. mileage "28.000" with a thousands dot).
export function formatNumber(n: number) {
  return new Intl.NumberFormat("de-DE").format(n);
}
