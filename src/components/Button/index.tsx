import React from 'react'

interface Props extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
    className?: string;
}

const Button = ({ children, className, ...rest }: Props) => {
  return (
    <button className={`flex items-center gap-2 bg-primary p-2 pr-3 text-sm text-white ${className ? className : ""}`} {...rest} >
        {children}
    </button>
  )
}

export default Button