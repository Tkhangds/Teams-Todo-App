import { BearerTokenAuthProvider, createApiClient } from "@microsoft/teamsfx";
import { TeamsUserCredential } from "@microsoft/teamsfx";
import config from "../../components/sample/lib/config";
import type { AxiosInstance } from "@microsoft/teamsfx";

export default class FunctionApiClient {
  private static client?: FunctionApiClient;
  private readonly axiosInstance: AxiosInstance;

  private constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  public static create(cred: TeamsUserCredential): FunctionApiClient {
    const tokenProvider = new BearerTokenAuthProvider(async () => {
      try {
        const token = await cred.getToken("");
        return token?.token ?? "";
      } catch (error) {
        console.error("[Auth] Token acquisition failed:", error);
        throw error;
      }
    });

    const apiBaseUrl = `${config.apiEndpoint}/api/`;

    try {
      const axiosClient = createApiClient(apiBaseUrl, tokenProvider);

      axiosClient.interceptors.request.use(
        async (req) => {
          console.log("[HTTP] Request:", req.method, req.url);
          return req;
        },
        async (err) => {
          console.error("[HTTP] Request error:", err);
          throw err;
        }
      );

      axiosClient.interceptors.response.use(
        async (res) => {
          console.log("[HTTP] Response:", res.status, res.config.url);
          return res;
        },
        async (err) => {
          console.error("[HTTP] Response error:", err);
          throw err;
        }
      );

      return new FunctionApiClient(axiosClient);
    } catch (error: any) {
      console.error("[HTTP] Client creation failed:", error?.message ?? error);
      throw new Error(
        "Unable to initialize FunctionApiClient. See logs for details."
      );
    }
  }

  public static getClient(cred: TeamsUserCredential): FunctionApiClient {
    if (!this.client) {
      this.client = this.create(cred);
    }

    return this.client;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
