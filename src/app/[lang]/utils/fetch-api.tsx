import qs from "qs";
import { getStrapiURL } from "./api-helpers";

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: data?.error || {
          status: response.status,
          message: response.statusText,
        },
      };
    }

    return data;
    
  } catch (error) {
    return {
      data: null,
      error: {
        status: 500,
        message: "Please check if your server is running and you set all the required tokens.",
      },
    };
  }
}
