import { useState, ChangeEvent, FormEvent } from "react";
import "./App.css";
import ProductCard from "./Component/ProductCard";
import Button from "./Component/Ui/Button";
import Modal from "./Component/Ui/Model";
import { categories, colors, formInputsList, productList } from "./data";
import Inputs from "./Component/Ui/Inputs";
import { IProduct } from "./interfaces";
import { productvalidation } from "./Component/Validation/Validation";
import Errormsg from "./Component/Ui/Errormsg";
import Circlecolor from "./Component/CircleColor/Circlecolor";
import { v4 as uuid } from "uuid";
import Example from "./Component/Ui/SeletCatagort";
import { TproductNames } from "./Types";
import toast, { Toaster } from "react-hot-toast";

function App() {
  //   state

  const productDefult = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [products, setproducts] = useState<IProduct[]>(productList);
  const [product, setproduct] = useState<IProduct>(productDefult);

  const [errorsmsg, seterrorsmsg] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [tempColor, settempColor] = useState<string[]>([]);
  const [SelectedCatagories, setSelectedCatagories] = useState(categories[0]);
  const [Producttoedit, setProducttoedit] = useState<IProduct>(productDefult);
  const [Producttoeditindex, setProducttoeditindex] = useState<number>(0);
  const [isOpenModeledit, setisOpenModeledit] = useState(false);
  const [isOpenconfig, setIsOpenconfig] = useState(false);
  
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const openEditModal = () => {
    setisOpenModeledit(true);
  };
  const isOpenconfigModel = () => {
    setIsOpenconfig(true);
  };

  const iscloseconfigModel = () => {
    setIsOpenconfig(false);
  };
  const CancleModel = () => {
    setproduct(productDefult);
    closeModal();
    settempColor([]);
  };

  const CancleEditModel = () => {
    setisOpenModeledit(false);
    setproduct(productDefult);
    settempColor([]);
    seterrorsmsg({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: "",
    });
  };


  // handler
  const renderProductCard = products.map((product, index) => (
    <ProductCard
      product={product}
      key={product.id}
      seteditproduct={setProducttoedit}
      openEditModal={openEditModal}
      index={index}
      setProducttoeditindex={setProducttoeditindex}
      isOpenconfigModel={isOpenconfigModel}
    />
  ));

  const onChangeHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setproduct({
      ...product,
      [name]: value,
    });
    seterrorsmsg({
      ...errorsmsg,
      [name]: "",
    });
  };
  const onChangeHandeleredit = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProducttoedit({
      ...Producttoedit,
      [name]: value,
    });
    seterrorsmsg({
      ...errorsmsg,
      [name]: "",
    });
  };

  const handleforminptu = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label className="text-sm font-medium text-gray-700" htmlFor={input.id}>
        {input.label}
      </label>
      <Inputs
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandeler}
      />
      <Errormsg msg={errorsmsg[input.name]} />
    </div>
  ));

  const hnamleforminput = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors = productvalidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
      color: tempColor,
    });
    const haserrormesage =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value == "");
    if (!haserrormesage) {
      seterrorsmsg(errors);
      return;
    }
    setproducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColor,
        category: SelectedCatagories,
      },
      ...prev,
    ]);
    setproduct(productDefult);
    toast("Product added", { icon: "👏" });

    settempColor([]);
    closeModal();
  };

  const hnamleforminputedit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors = productvalidation({
      title: Producttoedit.title,
      description: Producttoedit.description,
      imageURL: Producttoedit.imageURL,
      price: Producttoedit.price,
      color: Producttoedit.colors.concat(tempColor),
    });
    const haserrormesage =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value == "");

    if (!haserrormesage) {
      seterrorsmsg(errors);
      return;
    }

    const updatedproducts = [...products];
    updatedproducts[Producttoeditindex] = {
      ...Producttoedit,
      colors: tempColor.concat(Producttoedit.colors),
    };
    toast("The product has been modified", { icon: "👏" });

    setproducts(updatedproducts);

    setProducttoedit(productDefult);
    settempColor([]);
    CancleEditModel();
  };

  const Handlecolor = colors.map((color) => (
    <Circlecolor
      key={color}
      color={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          settempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (Producttoedit.colors.includes(color)) {
          settempColor((prev) => prev.filter((item) => item !== color));
          console.log(tempColor);

          return;
        }
        settempColor((prev) => [...prev, color]);
        seterrorsmsg({
          ...errorsmsg,
          colors: "",
        });
      }}
    />
  ));

  const Handleinputeditinmodel = (
    id: string,
    name: TproductNames,
    lable: string
  ) => {
    return (
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700" htmlFor={id}>
          {lable}
        </label>
        <Inputs
          type="text"
          id={id}
          name={name}
          value={Producttoedit[name]}
          onChange={onChangeHandeleredit}
        />
        <Errormsg msg={errorsmsg[name]} />
      </div>
    );
  };
  const removeproductHandeler = () => {
    const filterd = products.filter(
      (product) => product.id !== Producttoedit.id
    );
    setproducts(filterd);
    iscloseconfigModel();
    toast("Product has been deleted", { icon: "👏" });
  };

  return (
    <>
      <main className="container ">
        <Button
          width="w-fit"
          className="block bg-indigo-700  hover:bg-indigo-500  my-5 m-auto md:m-5 "
          onClick={openModal}
        >
          Build a Product
        </Button>
        <div className="  grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {renderProductCard}
        </div>
      </main>
      {/* Add product */}
      <Modal isOpen={isOpen} title="ADD New Product" closeModal={closeModal}>
        <form className="space-y-3 " onSubmit={hnamleforminput}>
          {handleforminptu}
          <Example
            selected={SelectedCatagories}
            setSelected={setSelectedCatagories}
          />
          <div className="flex items-center space-x-1 flex-wrap">
            {Handlecolor}
            <Errormsg msg={errorsmsg.colors} />
          </div>
          <div className="flex items-center flex-wrap">
            {tempColor.map((color) => (
              <span
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex content-between space-x-3">
            <Button
              width="w-full"
              className=" bg-indigo-700  hover:bg-indigo-500"
            >
              SUBMIT
            </Button>
            <Button
              width="w-full"
              className=" bg-gray-400 hover:bg-gray-500"
              onClick={CancleModel}
              type="button"
            >
              CANCLE
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit product */}
      <Modal
        isOpen={isOpenModeledit}
        title="EDIT this Product"
        closeModal={CancleEditModel}
      >
        <form className="space-y-3 " onSubmit={hnamleforminputedit}>
          {Handleinputeditinmodel("title", "title", "Product Title")}
          {Handleinputeditinmodel(
            "description",
            "description",
            "Product Description"
          )}
          {Handleinputeditinmodel("imageURL", "imageURL", "Product Image URL")}
          {Handleinputeditinmodel("price", "price", "Product Price")}

          <Example
            selected={Producttoedit.category}
            setSelected={(value) =>
              setProducttoedit({ ...Producttoedit, category: value })
            }
          />

          <div className="flex items-center space-x-1 flex-wrap">
            {Handlecolor}
            <Errormsg msg={errorsmsg.colors} />
          </div>
          <div className="flex items-center flex-wrap">
            {tempColor.concat(Producttoedit.colors).map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex content-between space-x-3">
            <Button
              width="w-full"
              className=" bg-indigo-700  hover:bg-indigo-500"
            >
              SUBMIT
            </Button>
            <Button
              width="w-full"
              className=" bg-gray-400 hover:bg-gray-500"
              onClick={CancleEditModel}
            >
              CANCLE
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isOpenconfig}
        closeModal={iscloseconfigModel}
        title={
          "Are You sure you want to remove this product from your store ? "
        }
      >
        <div className="flex items-center space-x-3">
          <Button
            width="w-full"
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeproductHandeler}
          >
            Yes , remove
          </Button>
          <Button
            width="w-full"
            className="bg-indigo-700 hover:bg-indigo-800"
            onClick={iscloseconfigModel}
          >
            Cancal
          </Button>
        </div>
      </Modal>
      <Toaster />
    </>
  );
}

export default App;
