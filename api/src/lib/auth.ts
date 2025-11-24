import {
  OnBehalfOfCredentialAuthConfig,
  OnBehalfOfUserCredential,
} from "@microsoft/teamsfx";
import config from "../config";

export async function createUserCredential(req: any, context: any) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "").trim();
  if (!token) throw new Error("missing token");

  const auth: OnBehalfOfCredentialAuthConfig = {
    authorityHost: config.authorityHost,
    clientId: config.clientId,
    tenantId: config.tenantId,
    clientSecret: config.clientSecret,
  };

  const credential = new OnBehalfOfUserCredential(token, auth);
  const user = await credential.getUserInfo();
  return user.objectId;
}
