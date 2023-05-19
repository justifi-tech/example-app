import { useAuth0 } from "@auth0/auth0-react";
import { getConfig } from "../config"

export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Patch = "PATCH",
}

export interface IPagination {
  hasPrevious: boolean;
  hasNext: boolean;
  startCursor: string;
  endCursor: string;
}

export interface IApiResponse<T> {
  data: T;
  error?: IErrorObject | IServerError;
  pageInfo?: IPagination;
  errors?: string[];
  id: number;
  type: string;
}

export type IServerError = string;

export interface IErrorObject {
  message: string;
  code: string;
  param?: string;
}

export const Api = () => {
  const { getAccessTokenSilently } = useAuth0();

  const requestUrl = (path: string): string => {

    const baseUrl = process.env.REACT_APP_API_URL || getConfig().apiUrl;
  
    return baseUrl + path;
  }
  
  const makeRequest = async <T>(
    requestUrl: string,
    method: HttpMethod,
    headers?: { [key: string]: string },
    body?: any
  ): Promise<T> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(requestUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        ...headers
      },
      body: JSON.stringify(body)
    });
  
    if (!res.ok) {
      const err = await res.text();
      return Promise.reject("Failed to request resource: " + err)
    }
  
    return res.json()
  }

  return { requestUrl, makeRequest };
}
