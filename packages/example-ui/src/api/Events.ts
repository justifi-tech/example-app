export interface Event {
  id: string;
  account_id: string;
  event_name: string;
  data: { updated_at: string };
}

export const listRecentEvents = async (): Promise<Event[]> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
  const res = await fetch(`${baseUrl}/v1/webhook/recent`);
  if (!res.ok) {
    Promise.reject("Failed to list recent events")
  }

  return res.json()
}
