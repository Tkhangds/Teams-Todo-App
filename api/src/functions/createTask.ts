import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { createUserCredential } from "../lib/auth";
import { taskRepository } from "../repositories/taskRepository";
import { randomUUID } from "crypto";

export async function createTask(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("createTask");

  const userId = await createUserCredential(req, context);
  const body: Object = await req.json();

  const created = await taskRepository.create({
    ...body,
    userId,
    status: "pending",
    id: randomUUID()
  });

  return { status: 200, body: JSON.stringify(created) };
}

app.http("createTask", {
  route: "tasks",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: createTask,
});
