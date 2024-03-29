import { format } from "date-fns";
import Dinero from "dinero.js";

export function formatCurrency(amount: number, withSymbol = true): string {
  if (!amount) amount = 0;

  function format(amount: number): string {
    const formattedString = withSymbol ? "$0,0.00" : "0,0.00";
    return Dinero({ amount: amount, currency: "USD" }).toFormat(
      formattedString
    );
  }

  return amount < 0 ? `(${format(-amount)})` : format(amount);
}

export function formatPercentage(amount: number): string {
  if (!amount) amount = 0;

  function format(amount: number) {
    const number = amount / 100;
    return number.toFixed(2).toString() + "%";
  }

  return format(amount);
}

export function formatDate(dateString: string | Date): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return format(date, "MMM d, yyyy");
}

export function formatTime(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return format(date, "h:mmaaa");
}

export function formatTimeSeconds(dateString: string | Date): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return format(date, "h:mm:ssaaa");
}

export function convertTimeStamp(timeStamp: number): Date {
  return new Date(timeStamp * 1000);
}
