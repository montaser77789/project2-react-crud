import {ButtonHTMLAttributes, ReactNode} from "react"
interface Ipropse extends ButtonHTMLAttributes<HTMLButtonElement>{
    children:ReactNode;
    className?:string;
    width:"w-full"|"w-fit"

}
function Button({children,className,width ,...rest}:Ipropse) {
  return (
    <>
    <button className={`${className} p-2 rounded-lg ${width} text-white`} {...rest}>{children}</button>
    </>
  );
}

export default Button;