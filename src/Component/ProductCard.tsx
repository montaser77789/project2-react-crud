import { Textslicer } from "../Utils/Function";
import { IProduct } from "../interfaces";
import Button from "./Ui/Button";
import Imagec from "./images/Imagec";

interface Ipropse {
  product: IProduct;
}

function ProductCard({ product }: Ipropse) {
  const { description, imageURL, title, price } = product;
  return (
    <>
      <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
        <Imagec
          srcurl={imageURL}
          alt={"Product Name"}
          ClassName={"rounded-md  h-52 w-full lg:object-cover"}
        />
        <div className="my-2">
          <h3 className="text-lg font-semibold">{Textslicer(title, 25)} </h3>
          <p className="text-xs text-gray-500 break-words">
            {Textslicer(description)}
          </p>
        </div>
        <div className="flex items-center space-x-2 ">
          <span className="w-5 h-5 rounded-full bg-indigo-500" />
          <span className="w-5 h-5 rounded-full bg-yellow-500" />
          <span className="w-5 h-5 rounded-full bg-red-500" />
        </div>
        <div className="flex items-center justify-between my-2">
          <span>{price}</span>
          <Imagec
            srcurl={product.imageURL}
            alt={"Product Name"}
            ClassName={"w-5 h-5 rounded-full object-bottom"}
          />
        </div>
        <div className="flex items-center justify-between space-x-2 my-2">
          <Button width="w-full" className=" bg-indigo-700 ">
            EDIT
          </Button>
          <Button width="w-full" className=" bg-red-700 ">
            DELETE
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
