'use client'

import { useState } from "react";


const Input = (props) => {
    const [valueInput, setValueInput] = useState<string>('');
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                type={props.type}
                name={props.name}
                id={props.id}
                value={props.value}
                className={props.className}
                placeholder={props.placeholder}
                onClick={(e)=>(e.target.value)}
            />
            <p>{valueInput}</p>
        </div>
    )
}

export default Input;