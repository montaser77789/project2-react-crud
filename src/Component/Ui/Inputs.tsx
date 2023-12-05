import {InputHTMLAttributes} from "react"
interface Ipropse extends InputHTMLAttributes<HTMLInputElement>{
   
}
function Inputs({...rest}:Ipropse) {
  return (
   
      <input   className="border-[1px] border-gray-300 shadow-md 
      focus:border-indigo-700 focus:outline-none 
      focus:ring-indigo-500 rounded-md px-3 py-3 text-lg" {...rest}/>

  );
}

export default Inputs;