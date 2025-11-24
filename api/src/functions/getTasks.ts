import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { createUserCredential } from "../lib/auth";
import { taskRepository } from "../repositories/taskRepository";

export async function getTasks(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("getTasks");

  const userId = await createUserCredential(req, context);
  const items = await taskRepository.getAll(userId);

  return { status: 200, body: JSON.stringify(items) };
}

app.http("getTasks", {
  route: "tasks",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getTasks,
});
