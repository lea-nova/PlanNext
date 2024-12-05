
import { ListType, Task } from "@/types";


export class TaskList {
    static baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


    static async getLists(): Promise<ListType[]> {
        const response = await fetch(`${TaskList.baseUrl}/api/lists`, { method: 'GET' });
        const lists = await response.json();
        return lists;
    }
    // static getLists(): ListType[] {
    //     const savedLists = localStorage.getItem('lists');
    //     return JSON.parse(savedLists || '[]');
    // }

    // static setLists(lists: ListType[]) {
    //     localStorage.setItem('lists', JSON.stringify(lists))
    //     return lists
    // }

    static async addList(newList: Omit<ListType, 'id'>) {
        const postList = await fetch(`${TaskList.baseUrl}/api/lists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newList),
        });
        if (!postList.ok) {
            console.log("Erreur dans l'ajout de liste");
        }
        const lists = await TaskList.getLists();
        return lists;
    }

    static async removeList(listId: ListType['id']) {

        // Je récupère mes tâches.
        // Je delete les tasks.
        // J'appelle ma méthode pour accéder à l'endpoint en envoyant l'ID de la liste. 
        // Après la réponse de l'API je
        // const newLists = lists.filter(({ id }) => id !== listId);
        const tasksById = await TaskList.getTasksByListId(listId);
        tasksById.map(task => {
            TaskList.removeTask(task.id);

        });
        const listIdToDelete = await fetch(`${TaskList.baseUrl}/api/lists/${listId}`, {
            method: "DELETE"
        });
        if (!listIdToDelete) {
            console.log("Erreur la liste ne s'est pas effacé correctement.");
        }
        return TaskList.getLists();

    }

    static async getTasks(): Promise<Task[]> {
        const response = await fetch(`${TaskList.baseUrl}/api/tasks`, { method: 'GET' });
        const tasks = await response.json();
        return tasks;
    }
    // static getTasks(): Task[] {
    //     const savedTasks = localStorage.getItem('tasks');
    //     return JSON.parse(savedTasks || '[]');
    // }

    // static setTasks(tasks: Task[]) {
    //     localStorage.setItem('tasks', JSON.stringify(tasks))
    //     return tasks
    // }

    static async getTasksByListId(listId: ListType['id']) {

        const allTasks = await TaskList.getTasks();
        const tasksByListId = [];
        for (const task of allTasks) {
            if (task.listId === listId) {
                tasksByListId.push(task)
            }
        }
        return tasksByListId;
    }

    // static async getTasksByListId(listId: ListType['id']) {
    //     const allTasksByListId = await fetch(`${this.baseUrl}/api/tasks`)
    //     const allTasks = await TaskList.getTasks();
    //     return allTasks.map((task) => task.listId === listId);
    // }

    static async addTask(task: Omit<Task, 'id'>) {
        const postTask = await fetch(`${TaskList.baseUrl}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        })

        // const newId = tasks.reduce((curr, { id }) => {
        //     return Math.max(curr, id)
        // }, 0) + 1
        if (!postTask.ok) {
            return console.log("Erreur dans l'ajout de la tâche");
        }
        const tasks = await TaskList.getTasks();

        return tasks;

    }

    // static async addList(newList: Omit<ListType, 'id'>) {
    //     const postList = await fetch(`${TaskList.baseUrl}/api/lists`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(newList),
    //     });
    //     if (!postList.ok) {
    //         console.log("Erreur dans l'ajout de liste");
    //     }
    //     const lists = await TaskList.getLists();
    //     return lists;
    // }


    static async removeTask(taskId: Task['id']) {
        // const tasks = TaskList.getTasks();
        const taskIdToDelete = await fetch(`${this.baseUrl}/api/tasks/${taskId}`, {
            method: 'DELETE'
        });
        if (!taskIdToDelete) {
            console.log("Erreur, la tâche ne s'est pas effacé correctement.");
        }
        return TaskList.getTasks();
    }


    static async toggleTaskCompletion(taskId: number) {
        try {
            // Récupérer la tâche depuis la base de données
            const taskFromDb = await fetch(`${this.baseUrl}/api/tasks/${taskId}`);
            if (!taskFromDb.ok) {
                throw new Error('Tâche non trouvée');
            }

            const task = await taskFromDb.json();
            const updatedTask = { ...task, completed: task.completed };
            // const updatedTask = { ...task, completed: !task.completed };

            // Mise à jour de la tâche dans la base de données
            const response = await fetch(`${this.baseUrl}/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !updatedTask.completed, // Mettre à jour seulement l'état 'completed'
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de la tâche');
            }

            // Récupérer la tâche mise à jour de la base de données
            const taskUpdated = await response.json();

            console.log('Tâche mise à jour :', taskUpdated);
            return taskUpdated; // Retourner la tâche mise à jour
        } catch (error) {
            console.error('Erreur dans toggleTaskCompletion:', error);
            throw error; // Relancer l'erreur pour pouvoir la gérer plus haut
        }
    }

}