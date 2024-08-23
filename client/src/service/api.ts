import { ACCESS_KEY, BASE_URL } from "../const.ts";
import { getToken } from "./token.ts";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export async function fetchData<TRequest, TResponse>(
  endpoint: string,
  method: HttpMethod,
  body?: TRequest,
): Promise<TResponse> {
  const accessToken = getToken(ACCESS_KEY);

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
      : { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
