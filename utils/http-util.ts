import { PagedResponse } from "@/src/Interface/IPagedResponse";
import {
  handleApiError,
  mapErrorToResponseError,
} from "@/src/Helpers/api-response-error";
import { ResponseErrorAPI } from "@/src/Interface/ResponseErrorAPI";
import { EnumErrorCode } from "@/src/Enum/ErrorEnum";

export default class HttpUtils {
  private static token: string = "your_token_here";

  public static setToken(token: string): void {
    HttpUtils.token = token;
  }

  public static async get<T>(apiUrl: string, filterSearch?: any) {
    return HttpUtils.getAll<T>(apiUrl, filterSearch);
  }

  public static async getById<T>(apiUrl: string, id: string) {
    return HttpUtils.fetchApiById<T>(apiUrl, id);
  }

  public static async create<T, D>(apiUrl: string, data: any) {
    return HttpUtils.fetchCreate<T, D>(apiUrl, data, false);
  }

  public static async update<T>(apiUrl: string, data: any) {
    return HttpUtils.fetchUpdate<T>(apiUrl, data, false);
  }

  public static async delete(apiUrl: string, id: string): Promise<void> {
    return HttpUtils.fetchDelete(apiUrl, id);
  }
  //get sử dụng post.
  //sử dụng builder hoặc factory.
  public static async getApi<T>(
    apiUrl: string,
    method: string,
    data: any,
    includeToken: boolean = true,
    filterHeader: any | null,
  ) {
    return HttpUtils.fetchApi<T>(
      apiUrl,
      method,
      data,
      includeToken,
      filterHeader,
    );
  }

  private static async fetchCreate<T, D>(
    apiUrl: string,
    data: D,
    includeToken: boolean = true,
  ): Promise<T> {
    const headers = this.CreateHeaders(includeToken);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return Promise.reject(await handleApiError(response));
      }
      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as T;
      } else {
        const error = new ResponseErrorAPI();

        error.statusCode = EnumErrorCode.AsJsonError;
        error.message = "Phản hồi không phải JSON.";
        error.apiErrorMessage = "Expected JSON, but received something else.";

        return Promise.reject(error);
      }
    } catch (error) {
      return Promise.reject(mapErrorToResponseError(error));
    }
  }

  public static async fetchUpdate<T>(
    apiUrl: string,
    data: any,
    includeToken: boolean = true,
  ): Promise<T | undefined> {
    const headers = this.CreateHeaders(includeToken);

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return Promise.reject(await handleApiError(response));
      }

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as T;
      } else {
        const error = new ResponseErrorAPI();

        error.statusCode = EnumErrorCode.AsJsonError;
        error.message = "Phản hồi không phải JSON.";
        error.apiErrorMessage = "Expected JSON, but received something else.";

        return Promise.reject(error);
      }
    } catch (error) {
      return Promise.reject(mapErrorToResponseError(error));
    }
  }

  public static async fetchDelete(apiUrl: string, id: string): Promise<void> {
    const headers = this.CreateHeaders();
    const apiUrlWithQuery = `${apiUrl.replace(/\/+$/, "")}/${id}`;

    try {
      let response = await fetch(apiUrlWithQuery, {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        return Promise.reject(await handleApiError(response));
      }
    } catch (error) {
      return Promise.reject(mapErrorToResponseError(error));
    }
  }

  private static async fetchApi<T>(
    apiUrl: string,
    method: string,
    data: any,
    includeToken: boolean = true,
    filterHeader: any,
  ): Promise<T> {
    const headers = this.CreateHeaders(includeToken);

    const apiUrlWithQuery = filterHeader
      ? `${apiUrl}?${new URLSearchParams(filterHeader).toString()}`
      : apiUrl;

    try {
      const options: RequestInit = {
        method,
        headers,
      };

      if (["POST", "PUT", "PATCH"].includes(method.toUpperCase()) && data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(apiUrlWithQuery, options);

      if (!response.ok) {
        return Promise.reject(await handleApiError(response));
      }

      const contentType = response.headers.get("Content-Type");

      if (contentType?.includes("application/json")) {
        return (await response.json()) as T;
      } else {
        const error = new ResponseErrorAPI();

        error.statusCode = EnumErrorCode.AsJsonError;
        error.message = "Phản hồi không phải JSON.";
        error.apiErrorMessage = "Expected JSON, but received something else.";

        return Promise.reject(error);
      }
    } catch (error) {
      return Promise.reject(mapErrorToResponseError(error));
    }
  }

  private static async getAll<T>(
    apiUrl: string,
    filterHeader?: any,
  ): Promise<PagedResponse<T>> {
    const headers = HttpUtils.CreateHeaders();
    // const dto = {
    //   pageNumber: 1,
    //   pageSize: 10,
    //   filterName: "",
    // };
    // const query = new URLSearchParams(dto as any).toString();
    // const apiUrlWithQuery = `${apiUrl.replace(/\/+$/, "")}/${id}`;
    const apiUrlWithQuery = filterHeader
      ? `${apiUrl}?${new URLSearchParams(filterHeader).toString()}`
      : apiUrl;

    try {
      let response = await fetch(apiUrlWithQuery, {
        method: "GET",
        headers: headers,
      });

      handleApiError(response);

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as PagedResponse<T>;
      } else {
        const error = new ResponseErrorAPI();

        error.statusCode = EnumErrorCode.AsJsonError;
        error.message = "Phản hồi không phải JSON.";
        error.apiErrorMessage = "Expected JSON, but received something else.";

        return Promise.reject(error);
      }
    } catch (error) {
      return Promise.reject(mapErrorToResponseError(error));
    }
  }

  private static async fetchApiById<T>(apiUrl: string, id: string) {
    const headers = this.CreateHeaders();

    const apiUrlWithQuery = `${apiUrl.replace(/\/+$/, "")}/${id}`;

    try {
      let response = await fetch(apiUrlWithQuery, {
        method: "GET",
        headers: headers,
      });

      handleApiError(response);

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as T;
      } else {
        const error = new ResponseErrorAPI();

        error.statusCode = EnumErrorCode.AsJsonError;
        error.message = "Phản hồi không phải JSON.";
        error.apiErrorMessage = "Expected JSON, but received something else.";

        return Promise.reject(error);
      }
    } catch (error) {
      return Promise.reject(mapErrorToResponseError(error));
    }
  }

  private static CreateHeaders(
    includeToken: boolean = true,
  ): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (includeToken) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }
}
