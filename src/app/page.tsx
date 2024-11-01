'use client'

// import { useState } from "react";
// import Image from "next/image";
import Navbar from "../components/Navbar/page";
import Button from "../components/button/Button";

// import Task from "./task/Task";

const Home: React.FC = () => {

  // let value;
  // value = localStorage.getItem("test") || "";
  // const [favoriteNumber, setFavoriteNumber] = useState(value);
  // const saveToLocalStorage = e => {
  //   e.preventDefault()
  //   localStorage.setItem("test", favoriteNumber);
  // }
  // let valueInLocalStorage = localStorage.getItem("test");
  return (<div>
    {/* <Navbar /> */}
    <h1 className="font-bold text-4xl text-center">Plan Next</h1>
    {/* <h2 className="font-semibold text-3xl text-center"> La clé d’une gestion efficace</h2> */}
    {/* <Button /> */}
    <section className="flex flex-col md:h-[40rem] items-center justify-center">
      <span className=" md:w-[35%] flex justify-between  ">
        {/* <Link href="/tasks">
<a>Voir toutes les listes</a>
      </Link> */}

        <Button route="/create" title="Nouvelle" className="bg-slate-500" variant="purple" >Nouvelle liste</Button>

        <Button title="Toutes les listes" route="/tasks" variant="white">Voir toutes les listes</Button>

      </span>
    </section>
    {/* <ToDoList todo="Bonjour" tab="Suivante"/> */}
  </div >
  );
}
export default Home;

