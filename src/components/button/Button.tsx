// 'use client'
// import {useRouter} from "next/router";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";


interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {
    variant: 'white' | 'purple' | '';
    route: string;

}
// ... destructuration d'un object, spread/rest
const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
    variant,
    route,
    children = "Cliquez ici",
    className = "",
    ...buttonProps
}) => {
    const router = useRouter();
    // useCallback permet d'éviter de recréer une fonction à chaque render.
    const redirectToPage = useCallback(() => {
        router.push(route);
    }, [route])
    // useMemo ne change qu'une fois on change variant. 
    const buttonClass = useMemo(() => {
        const klass: string[] = [];

        switch (variant) {
            case "white":
                klass.push("bg-gray-800 text-black hover:bg-gray-900");
                break;
            case "purple":
            default:
                klass.push("bg-purple-600 hover:bg-purple-700 text-black");
                break;
        }
        klass.push("h-[4rem]  w-[9rem] rounded-md text-white text-lg font-medium");
        klass.push(className);
        return klass.join(' ');
    }, [variant, className])

    return (
        <button
            // a mettre en haut, à juger selon le contexte tout ce qui est écrasé en dessus tout le reste en dessous. 
            {...buttonProps}
            className={buttonClass}
            type="button"
            onClick={redirectToPage}
        >
            {children}
        </button>
    );
}

export default Button;