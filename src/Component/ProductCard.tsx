import { Textslicer, numberWithCommas } from "../Utils/Function";
import { IProduct } from "../interfaces";
import Circlecolor from "./CircleColor/Circlecolor";
import Button from "./Ui/Button";
import Imagec from "./images/Imagec";

interface Ipropse {
  product: IProduct;
  seteditproduct: (product: IProduct) => void;
  openEditModal: () => void;
  index: number;
  setProducttoeditindex: (value: number) => void;
  isOpenconfigModel: () => void;
}

function ProductCard({
  product,
  seteditproduct,
  openEditModal,
  index,
  setProducttoeditindex,
  isOpenconfigModel,
}: Ipropse) {
  const { description, imageURL, title, price, colors } = product;

  const Handlecolor = colors.map((color) => (
    <Circlecolor key={color} color={color} />
  ));

  const onEdit = () => {
    seteditproduct(product);
    openEditModal();
    setProducttoeditindex(index);
  };
  const onRemove = () => {
    isOpenconfigModel();
    seteditproduct(product);
  };
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
        <div className="flex items-center flex-wrap space-x-1">
          {!colors.length ? (
            <p className="min-h-[20px]">Not available colors!</p>
          ) : (
            Handlecolor
          )}
        </div>

        <div className="flex items-center justify-between my-2">
          <span className="text-lg text-indigo-600 font-semibold">
            ${numberWithCommas(price)}
          </span>{" "}
          <Imagec
            srcurl={product.imageURL}
            alt={"Product Name"}
            ClassName={"w-5 h-5 rounded-full object-bottom"}
          />
        </div>
        <div className="flex items-center justify-between space-x-2 my-2">
          <Button
            width="w-full"
            className="bg-indigo-700 hover:bg-indigo-800"
            onClick={onEdit}
          >
            EDIT
          </Button>
          <Button
            width="w-full"
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={onRemove}
          >
            Remove
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
