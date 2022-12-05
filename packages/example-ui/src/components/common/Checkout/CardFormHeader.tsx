function CardFormHeader(props: { amount: number; description: string }) {
  function formatCentsToDollars(amount: number | undefined) {
    if (!amount) amount = 0;
    const dollars = amount / 100;
    return `$${dollars.toFixed(2)}`;
  }

  return (
    <header className="payment-form-header">
      <div className="payment-form-header__amount-label">Amount Due</div>
      <div className="payment-form-header__amount">
        {formatCentsToDollars(props.amount)}
      </div>
      <div className="payment-form-header__description">
        {props.description}
      </div>
    </header>
  );
}

export default CardFormHeader;
