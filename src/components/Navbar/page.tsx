import Link from "next/link";
import Logo from "../Logo/Logo";

const Navbar = () => {

    return (
        <div >
            <header className="bg-slate-900 h-[5rem] flex items-center mb-10 ">
                <nav>

                    {/* <a href="/"
                        title="Retour à l'accueil"
                    > */}
                    <Link href="/" title="Retour à l'accueil.">
                        <Logo
                            alt="Logo de l'application Plan Next"
                            src="/images/plan_next.jpeg"
                            className="rounded-full ml-5 "
                            width={50}
                            height={50}
                            style={{ objectFit: "contain" }}
                        />
                    </Link>
                    {/* </a> */}
                </nav>
            </header>
        </div>
    )
}

export default Navbar;