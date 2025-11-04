import tasksData from "@/services/mockData/tasks.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let tasks = [...tasksData];

const taskService = {
  getAll: async () => {
    await delay(300);
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  },

  getById: async (id) => {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  create: async (taskData) => {
    await delay(300);
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const now = new Date().toISOString();
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      completed: false,
      completedAt: null,
      createdAt: now,
      updatedAt: now
    };
    tasks = [newTask, ...tasks];
    return { ...newTask };
  },

  update: async (id, taskData) => {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    const now = new Date().toISOString();
    tasks[index] = {
      ...tasks[index],
      ...taskData,
      updatedAt: now
    };
    return { ...tasks[index] };
  },

  delete: async (id) => {
    await delay(250);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return false;
    
    tasks = tasks.filter(t => t.Id !== parseInt(id));
    return true;
  },

  toggleComplete: async (id) => {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    const now = new Date().toISOString();
    tasks[index] = {
      ...tasks[index],
      completed: !tasks[index].completed,
      completedAt: !tasks[index].completed ? now : null,
      updatedAt: now
    };
    return { ...tasks[index] };
  }
};

export default taskService;