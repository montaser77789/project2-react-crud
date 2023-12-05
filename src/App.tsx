import { useState, ChangeEvent, FormEvent } from "react";
import "./App.css";
import ProductCard from "./Component/ProductCard";
import Button from "./Component/Ui/Button";
import Modal from "./Component/Ui/Model";
import { formInputsList, productList } from "./data";
import Inputs from "./Component/Ui/Inputs";
import { IProduct } from "./interfaces";
import { productvalidation } from "./Component/Validation/Validation";
import Errormsg from "./Component/Ui/Errormsg";

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
  const [product, setproduct] = useState<IProduct>(productDefult);
  const [errorsmsg, seterrorsmsg] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  const renderProductCard = productList.map((product) => (
    <ProductCard product={product} key={product.id} />
  ));

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

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

  const CancleModel = () => {
    setproduct(productDefult);
    closeModal();
  };
  //handler
  const handleforminptu = formInputsList.map((input) => (
    <div className="flex flex-col">
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
    });
    console.log(errors);

    const haserrormesage =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value == "");
    console.log(haserrormesage);
    if (!haserrormesage) {
      seterrorsmsg(errors);
      return;
    }
    console.log("send Data to Back");
  };
  return (
    <>
      <main className="container ">
        <Button width="w-fit" className=" bg-indigo-700 " onClick={openModal}>
          ADD Product
        </Button>
        <div className="  grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {renderProductCard}
        </div>
      </main>
      <Modal isOpen={isOpen} title="ADD Product" closeModal={closeModal}>
        <form className="space-y-3" onSubmit={hnamleforminput}>
          {handleforminptu}
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
            >
              CANCLE
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default App;
