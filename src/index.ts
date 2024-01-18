import yargs from 'yargs';
import clc from 'cli-color';
import {
  readAllTasksAsync as listAllAsync,
  createTask as add,
  readDetailTask as getDetail,
  updateTask as update,
  deleteTask as remove,
  readAllTask as listAll,
  listTasksWithTitle as filterByTitle,
} from './constant/users';

yargs.command({
  command: 'list-async',
  describe: 'List all tasks asynchronously',
  handler: async () => {
    const tasks = await listAllAsync();
    console.log(clc.green('Tasks:'), tasks);
  },
});

yargs.command({
  command: 'filter-title',
  describe: 'List tasks with a specific title',
  builder: {
    title: {
      describe: 'Title to filter by',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (args) => {
    const { title } = args;
    const tasks = filterByTitle(title);
    if (tasks.length > 0) {
      console.log(clc.yellow('Filtered Tasks:'), tasks);
    } else {
      console.log(clc.red('No tasks found with given title'));
    }
  },
});

yargs.command({
  command: "test",
  handler: () => console.log("test"),
});

yargs.command({
  command: "create",
  builder: {
    title: { type: "string" },
    description: { type: "string" },
  },
  handler: (args) => {
    const { title, description } = args;
    const newTask = add(title, description);
    console.log("Created successful: ", newTask);
  },
});

yargs.command({
  command: "read-all",
  handler: () => console.log(clc.blue("taskJson : "), listAll()),
});

yargs.command({
  command: "read-detail",
  builder: { id: { type: "string" } },
  handler: (args) => {
    const { id } = args;
    const task = getDetail(id);
    console.log(task ? `task : ${task}` : "Not Found!");
  },
});

yargs.command({
  command: "update",
  builder: { id: { type: "string" }, title: { type: "string" }, description: { type: "string" } },
  handler: (args) => {
    const { id, title, description } = args;
    const task = update(id, title, description);
    console.log(task ? `task updated : ${task}` : clc.red("Not Found!"));
  },
});

yargs.command({
  command: "delete",
  builder: { id: { type: "string" } },
  handler: (args) => {
    const { id } = args;
    const task = remove(id);
    console.log(task ? `delete task : ${task}` : "Not Found");
  },
});

yargs.parse();