const formatCentsToDollars = (amount: number | undefined) => {
  if (!amount) amount = 0;
  const dollars = amount / 100;
  return `$${dollars.toFixed(2)}`;
};

export { formatCentsToDollars }