'use client'
import Image from "next/image";
import TaskList from "./tasks/page";

export default function Home() {
  return (<div>
    <h1 className="font-bold text-4xl text-center">Taskify</h1>
    <h2 className="font-semibold text-3xl text-center"> La clé d’une gestion efficace</h2>
    <TaskList />
  </div>
  );
}
