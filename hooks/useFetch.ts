import { useCurrentUser } from "./useCurrentUser";

const useFetch = () => {
  const { accessToken } = useCurrentUser();

  const fetchWithAuth = async (path: string, options: any = {}) => {
    const defaultHeaders = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APIBASE_URL}/${path}`,
      {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options?.headers,
        },
        cache: "no-cache",
      }
    );

    return response;
  };

  return fetchWithAuth;
};

export default useFetch;
