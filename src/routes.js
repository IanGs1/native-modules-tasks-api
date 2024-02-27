import crypto from "node:crypto";

import { Database } from "./database/index.js";
import { dateFormatter } from "./utils/date-formatter.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const { title, description } = request.body;

      const task = {
        id: crypto.randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: dateFormatter(new Date()),
        updated_at: dateFormatter(new Date()),
      }

      const data = database.insert("tasks", task);

      return response
        .writeHead(201)
        .end(JSON.stringify(data));
    }
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const tasks = database.index("tasks");

      return response
        .writeHead(200)
        .end(JSON.stringify(tasks));
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:taskId"),
    handler: (request, response) => {
      const { taskId } = request.params;
      const { title, description } = request.body;

      database.update("tasks", taskId, {
        title,
        description,
        completed_at: null,
        updated_at: dateFormatter(new Date()),
      });

      return response
        .writeHead(204)
        .end();
    }
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:taskId/complete-task"),
    handler: (request, response) => {
      const { taskId } = request.params;

      const { title, description, created_at } = database.select("tasks", taskId);

      database.update("tasks", taskId, {
        taskId,
        title,
        description,
        completed_at: dateFormatter(new Date()),
        created_at,
        updated_at: dateFormatter(new Date()),
      })

      return response
      .writeHead(204)
      .end();
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:taskId"),
    handler: (request, response) => {
      const { taskId } = request.params;

      database.delete("tasks", taskId);

      return response
        .writeHead(204)
        .end();
    }
  }
]