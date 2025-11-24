import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { createUserCredential } from "../lib/auth";
import { taskRepository } from "../repositories/taskRepository";

export async function updateTask(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("updateTask");

  const userId = await createUserCredential(req, context);
  const body: Object = await req.json();

  const updated = await taskRepository.update({
    ...body,
    userId
  });

  return { status: 200, body: JSON.stringify(updated) };
}

app.http("updateTask", {
  route: "tasks",
  methods: ["PUT"],
  authLevel: "anonymous",
  handler: updateTask,
});
