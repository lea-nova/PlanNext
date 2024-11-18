// 'use client'
// import {useRouter} from "next/router";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";


interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    variant?: 'white' | 'purple' | '';
    route?: string;

}
// ... destructuration d'un object, spread/rest
const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
    variant,
    route,
    onClick,
    children = "Cliquez ici",
    className = "",
    ...buttonProps
}) => {
    const router = useRouter();
    // useCallback permet d'éviter de recréer une fonction à chaque render.
    const redirectToPage = useCallback<React.MouseEventHandler<HTMLButtonElement>>((e) => {
        // appelle fonction que si existe
        onClick?.(e)
        if (route) {
            router.push(route);
        }
    }, [router, route, onClick])
    // useMemo ne change qu'une fois on change variant. 
    const buttonClass = useMemo(() => {
        const klass: string[] = [];
        switch (variant) {
            case "white":
                klass.push("bg-gray-800 text-black hover:bg-gray-900");
                break;
            case "purple":
            default:
                klass.push("bg-purple-600 hover:bg-slate-600 text-black");
                break;
        }
        klass.push(" rounded-md  text-lg font-medium");
        klass.push(className);
        return klass.join(' ');
    }, [variant, className])

    return (
        <button
            // a mettre en haut, à juger selon le contexte tout ce qui est écrasé en dessus tout le reste en dessous. 
            {...buttonProps}
            className={buttonClass}
            type='button'
            onClick={redirectToPage}
        >
            {children}
        </button>
    );
}

export default Button;