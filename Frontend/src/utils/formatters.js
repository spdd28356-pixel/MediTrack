export const formatAmount = (amount) => {
  if (typeof amount !== "number") {
    return "-";
  }
  return amount.toLocaleString("en-US", { style: "decimal" });
};

export const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
