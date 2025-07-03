import { type ReactElement } from 'react';
import "./Button.css"

type Variant = "primary" | "secondary"

export interface ButtonProps{
    variant: Variant;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endIcon?: any;
    onClick: ()=>void
}

const variantStyles = {
    "primary": "bg-purple-500 text-white",
    "secondary": "bg-purple-300 text-purple-400",
}


const defaultStyles = "rounded-md flex px-4 py-2 font-light justify-center items-center"

function Button(props: ButtonProps) {
	return <>
        <button onClick={props.onClick} className={`cursor-pointer ${variantStyles[props.variant]}  ${defaultStyles}`}>{props.startIcon ? <div className='pr-2 pb-1'>{props.startIcon}</div>  : null} {props.text} {props.endIcon}</button>
    </>;
}

export default Button;
