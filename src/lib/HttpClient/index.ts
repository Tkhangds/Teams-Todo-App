import FunctionApiClient from "./api-client";
import { TeamsUserCredential } from "@microsoft/teamsfx";
import { AxiosInstance } from "@microsoft/teamsfx";

export default function getTodoApi(cred: TeamsUserCredential): AxiosInstance {
  return FunctionApiClient.getClient(cred).getAxiosInstance();
};