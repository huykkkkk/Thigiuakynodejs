import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

interface Task {
  id: string;
  title: string;
  description: string;
}

const readAllTasksSync = (): Task[] => {
  const tasksString = fs.readFileSync("tasks.json", 'utf-8');
  return JSON.parse(tasksString);
};

const writeTasksSync = (tasks: Task[]): void => {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks));
};

const createTask = (title: string, description: string): Task => {
  const newTask: Task = { id: Math.random().toString(), title, description };
  const tasks = [...readAllTasksSync(), newTask];
  writeTasksSync(tasks);
  return newTask;
};

const readDetailTask = (taskId: string): Task | undefined => {
  return readAllTasksSync().find(task => taskId === task.id);
};

const updateTask = (taskId: string, newTitle: string, newDescription: string): Task | false => {
  const tasks = readAllTasksSync();
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], title: newTitle, description: newDescription };
    writeTasksSync(tasks);
    return tasks[index];
  }
  return false;
};

const deleteTask = (taskId: string): Task | false => {
  const tasks = readAllTasksSync();
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1)[0];
    writeTasksSync(tasks);
    return deletedTask;
  }
  return false;
};

const readAllTasksAsync = async (): Promise<Task[]> => {
  try {
    const tasksString = await readFileAsync('tasks.json', 'utf-8');
    return JSON.parse(tasksString);
  } catch (error) {
    console.error('Error reading tasks:', error);
    return [];
  }
};

const listTasksWithTitle = (taskTitle: string): Task[] => {
  return readAllTasksSync().filter(task => task.title.includes(taskTitle));
};

export {
  readAllTasksSync as readAllTasks,
  createTask,
  readDetailTask,
  updateTask,
  deleteTask,
  readAllTasksAsync,
  listTasksWithTitle,
};