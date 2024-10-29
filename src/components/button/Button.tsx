// 'use client'
// import {useRouter} from "next/router";
import {useRouter} from "next/navigation";

interface ButtonProps {
    text?: string;
    variant: 'white' | 'purple' | '' ;
    route: string;
}

const Button: React.FC<ButtonProps> = ({text, variant, route}) => {
    const router = useRouter();
    const redirectToPage = () => {
        router.push(route);
    }
    const getButtonClasses = () => {
        switch (variant) {
            case "white":
                return "bg-gray-800 text-black hover:bg-gray-900";
            case "purple":
                default:
                return "bg-purple-600 hover:bg-purple-700 text-black ";
            }
    };  
return (
            <button type="button" title={text} onClick={redirectToPage} className={`${getButtonClasses()} h-[4rem]  w-[9rem] rounded-md text-white text-lg font-medium`}>{text ? text : "Cliquer ici"}</button>
    );
}

export default Button;