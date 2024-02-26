import crypto from "node:crypto";

import { Database } from "./database/index.js";
import { dateFormatter } from "./utils/date-formatter.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: "/tasks",
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
  }
]