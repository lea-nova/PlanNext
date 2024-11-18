import Link from "next/link";
import Logo from "../Logo/Logo";

const Navbar = () => {

    return (
        <div >
            <header className="h-[5rem] flex justify-center  items-center mb-10 ">
                <nav className=" flex flex-row lg:fixed top-0 text-xl  h-20 w-[96%]">

                    {/* <a href="/"
                        title="Retour à l'accueil"
                    > */}<span className="flex flex-row justify-between items-center  w-full">

                        <Link href="/" title="Retour à l'accueil." className="text-zinc-800 hover:font-medium hover:text-zinc-900">

                            <Logo
                                alt="Logo de l'application Plan Next"
                                src="/images/plan_next_logo.png"
                                className="rounded-sm ml-5 "
                                width={50}
                                height={50}
                                style={{ objectFit: "contain" }}
                            />
                        </Link>
                        {/* <Link href="/" className="text-zinc-800 hover:text-black text-lg scale-100 hover:scale-110 transition ease-in-out duration-500 hover:font-medium ">Voir toutes les listes</Link> */}
                    </span>
                    {/* </a> */}
                </nav>
            </header>
        </div>
    )
}

export default Navbar;