export function geckoFetch(
  input: string,
  init?: RequestInit
): Promise<Response> {
  return fetch(`https://pro-api.coingecko.com/api/v3/${input}`, {
    ...init,
    headers: {
      ...init?.headers,
      "x-cg-pro-api-key": process.env.EXPO_PUBLIC_COINGECKO_API_KEY as string
    }
  });
}
