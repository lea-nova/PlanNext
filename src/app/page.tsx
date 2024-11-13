'use client'

import Button from "../components/button/Button";

// import Task from "./task/Task";

const Home: React.FC = () => {

  return (<div className="flex-1">

    <h1
      className="font-bold text-4xl text-center">Plan Next
    </h1>

    <section
      className="flex flex-col items-center justify-center">
      <span
        className=" md:w-[35%] flex justify-between  ">
        {/* <Button route="/create" title="Nouvelle" className="bg-slate-500" variant="purple" >Nouvelle liste</Button> */}
        <Button
          title="Toutes les listes"
          route="/tasks"
          variant="white">
          Voir toutes les listes
        </Button>

      </span>
    </section>

  </div >
  );
}
export default Home;

