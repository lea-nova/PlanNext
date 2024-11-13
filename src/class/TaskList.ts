
import { ListType, Task } from "@/types";


export abstract class TaskList {

    static getLists(): ListType[] {
        const savedLists = localStorage.getItem('lists');
        return JSON.parse(savedLists || '[]');
    }

    static setLists(lists: ListType[]) {
        localStorage.setItem('lists', JSON.stringify(lists))
        return lists
    }

    static addList(newList: Omit<ListType, 'id'>) {
        const lists = TaskList.getLists();
        const id = lists.reduce((curr, { id }) => {
            return Math.max(curr, id)
        }, 0) + 1

        return TaskList.setLists([...lists, { id, ...newList }])
    }

    static removeList(listId: ListType['id']) {
        const lists = TaskList.getLists();
        const newLists = lists.filter(({ id }) => id !== listId);
        const tasksById = TaskList.getTasksByListId(listId);
        tasksById.forEach(task => {
            TaskList.removeTask(task.id);
        });

        return TaskList.setLists(newLists);

    }

    static getTasks(): Task[] {
        const savedTasks = localStorage.getItem('tasks');
        return JSON.parse(savedTasks || '[]');
    }

    static setTasks(tasks: Task[]) {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        return tasks
    }

    static getTasksByListId(listId: ListType['id']) {
        const allTasks = TaskList.getTasks();
        return allTasks.filter((task) => task.listId === listId);

    }

    static addTask(task: Omit<Task, 'id'>) {
        const tasks = TaskList.getTasks();

        const newId = tasks.reduce((curr, { id }) => {
            return Math.max(curr, id)
        }, 0) + 1
        return TaskList.setTasks([...tasks, { id: newId, ...task }]);

    }

    static removeTask(taskId: Task['id']) {
        const tasks = TaskList.getTasks();
        return TaskList.setTasks(tasks.filter((task) => task.id !== taskId))
    }

    static toggleTaskCompletion(taskId: Task['id']) {
        const tasks = TaskList.getTasks();
        const tasksToggled = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed }
            }
            return task;
        });
        return TaskList.setTasks(tasksToggled)
    }
}