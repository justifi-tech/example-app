import { HttpMethod, makeRequest, requestUrl } from "./Base";

export interface Event {
  id: string;
  account_id: string;
  event_name: string;
  data: { updated_at: string };
}

export const listRecentEvents = async (): Promise<Event[]> => {
  const url = requestUrl("/v1/webhook/recent");

  return makeRequest<Event[]>(url, HttpMethod.Get);
}
