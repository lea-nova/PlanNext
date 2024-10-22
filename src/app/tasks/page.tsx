import TaskForm from '@/components/forms/TaskTitle';
import React, { useState, useEffect } from 'react';

const TaskList = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const addTask = (newTask: string) => {
        setTasks([...tasks, newTask]);
    }

    return (
        <div className=' flex flex-col items-center justify-around'>
            <div className=' h-[38rem] w-4/6 border-2 rounded-md border-purple-300 '>
                <h3 className='text-2xl text-center mt-5'>Liste des tâches</h3>
                <TaskForm />
            </div>
        </div>
    )
};

export default TaskList;