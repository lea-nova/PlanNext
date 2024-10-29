import Image from 'next/image'

const Navbar = () => {

    return (
        <div >
            <header className="bg-slate-900 h-[5rem] flex items-center mb-10 ">
                <a href="/">
                    <Image
                        width={50}
                        height={50}
                        className="rounded-full ml-5 "
                        title="Retour à l'accueil"
                        src={`/images/plan_next.jpeg`}
                        alt="logo de Plan Next"
                    />
                </a>
            </header>
        </div>
    )
}

export default Navbar;