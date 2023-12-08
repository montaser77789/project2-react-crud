import { HTMLAttributes } from "react";
interface Ipropse extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
function Circlecolor({ color, ...rest }: Ipropse) {
  return (
    <>
      <span
        {...rest}
        className=" block w-5 h-5 rounded-full bg-indigo-500 cursor-pointer"
        style={{ backgroundColor: color }}
      />
    </>
  );
}

export default Circlecolor;
