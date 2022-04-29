import { createTask } from "./tasks";

export const getOperations = () => {
  return {
    tasks: {
      createTask,
    },
  };
};
