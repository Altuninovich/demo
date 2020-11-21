import React from "react";
import cn from "classnames";
import s from "./FormsControls.module.css"

const FormControl = ({input, meta: {touched, error}, child, ...props}) => {
    const hasError = touched && error;
    const btnClass = cn({
        [s.formControl]: hasError,
        [s.error]: hasError,
    })
    return (
        <div className={btnClass}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}