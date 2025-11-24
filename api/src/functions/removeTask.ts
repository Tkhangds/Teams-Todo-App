import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { createUserCredential } from "../lib/auth";
import { taskRepository } from "../repositories/taskRepository";

export async function deleteTask(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("deleteTask");

  const userId = await createUserCredential(req, context);
  const id = req.params.id;

  await taskRepository.remove(id, userId);

  return { status: 200, body: JSON.stringify({ ok: true }) };
}

app.http("deleteTask", {
  route: "tasks/{id}",
  methods: ["DELETE"],
  authLevel: "anonymous",
  handler: deleteTask,
});
