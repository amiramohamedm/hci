import { TASK_STATUS } from "../utils/task_status";

export const createTask = ({ title, projectId }) => {
  if (!title || !projectId) {
    throw new Error("title and projectId are required");
  }

  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    projectId,
    status: TASK_STATUS.TODO,
    createdAt: new Date().toISOString(),
  };
};
