const formatCentsToDollars = (amount: number | undefined) => {
  if (!amount) amount = 0;
  const dollars = amount / 100;
  return `$${dollars.toFixed(2)}`;
};

const buildEntityUrl = (account: string, entityId: string) => 
  `${process.env.REACT_APP_JUSTIFI_DASHBOARD_URL}/account/${account}/payments/${entityId}`

export {
  formatCentsToDollars,
  buildEntityUrl
}