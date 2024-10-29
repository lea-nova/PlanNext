'use client'
// import { useState } from "react";
// import Image from "next/image";
import Navbar  from "../components/Navbar/page";
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
      <Navbar />
    <h1 className="font-bold text-4xl text-center">Plan Next</h1>
    {/* <h2 className="font-semibold text-3xl text-center"> La clé d’une gestion efficace</h2> */}
    {/* <Button /> */}
    <section className="flex flex-col md:h-[40rem] items-center justify-center">
    <span className=" md:w-[35%] flex justify-between  ">
      {/* <Link href="/tasks">
<a>Voir toutes les listes</a>
      </Link> */}
    <Button text="Nouvelle liste" route="/tasks/new" variant="purple" />
    
    <Button text="Voir toutes les listes"  route="/tasks" variant="white"/>

    </span>
    </section>
    </div>
  );
}
export default Home;
  
