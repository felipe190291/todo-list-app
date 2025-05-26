import type { NextApiRequest, NextApiResponse } from "next";
import { redis } from "@/lib/redis";
import { Task } from "@/types/themeTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const keys = await redis.keys("task:*");
    const tasks = await Promise.all(
      keys.map(async (key) => {
        const task = await redis.get<Task>(key);
        return task;
      })
    );
    return res.status(200).json(tasks.filter(Boolean));
  }

  if (req.method === "POST") {
    const task: Task = req.body;
    await redis.set(`task:${task.id}`, task);
    return res.status(201).json({ success: true });
  }

  if (req.method === "PATCH") {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const key = `task:${id}`;
    const existingTask = await redis.get<Task>(key);

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    const { status } = req.body;

    const updatedTask = {
      ...existingTask,
      status,
    };

    await redis.set(key, updatedTask);
    return res.status(200).json({ success: true, task: updatedTask });
  }
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const key = `task:${id}`;
    const existingTask = await redis.get<Task>(key);

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    await redis.del(key);
    return res.status(200).json({ success: true, deletedTask: existingTask });
  }

  res.status(405).end();

  res.status(405).end();
}
