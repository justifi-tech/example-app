import { HttpMethod, Api } from "./Api";

export interface Event {
  id: string;
  account_id: string;
  event_name: string;
  data: { updated_at: string };
}

export const listRecentEvents = async (): Promise<Event[]> => {
  const api = Api();
  const url = api.requestUrl("/v1/webhook/recent");

  return api.makeRequest<Event[]>(url, HttpMethod.Get);
}
