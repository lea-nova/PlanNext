'use client'

// import { useState } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input = (props: InputProps) => {
    // const [valueInput, setValueInput] = useState<string>('');
    return (
        <span>
            <label
                htmlFor={props.name}>
                {props.label}
            </label>
            <input
                type={props.type}
                name={props.name}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                className={props.className}
                placeholder={props.placeholder}
            // onClick={(e) => (setValueInput(e.target.value))}
            />
            {/* <p>{valueInput}</p> */}
        </span>
    )
}

export default Input;