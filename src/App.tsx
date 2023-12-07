import { useState, ChangeEvent, FormEvent } from "react";
import "./App.css";
import ProductCard from "./Component/ProductCard";
import Button from "./Component/Ui/Button";
import Modal from "./Component/Ui/Model";
import { colors, formInputsList, productList } from "./data";
import Inputs from "./Component/Ui/Inputs";
import { IProduct } from "./interfaces";
import { productvalidation } from "./Component/Validation/Validation";
import Errormsg from "./Component/Ui/Errormsg";
import Circlecolor from "./Component/CircleColor/Circlecolor";
import { v4 as uuid } from "uuid";


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
  const [products,setproducts] =useState<IProduct[]>(productList)
  const [product, setproduct] = useState<IProduct>(productDefult);
  const [errorsmsg, seterrorsmsg] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColor ,settempColor] =useState<string[]>([])
  console.log(tempColor);

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const CancleModel = () => {
    setproduct(productDefult);
    closeModal();
  };
  
  const renderProductCard = products.map((product) => (
    <ProductCard product={product} key={product.id} />
  ));


  
  // handler

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
    });

    const haserrormesage =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value == "");
    if (!haserrormesage) {
      seterrorsmsg(errors);
      return;
    }
    setproducts(prev=>[{...product , id:uuid(),colors:tempColor}, ...prev ])
    setproduct(productDefult)
    settempColor([])
    closeModal();
  };

  const Handlecolor = colors.map(color=> <Circlecolor  key={color} color={color} 
  onClick={()=> {
    if(tempColor.includes(color)){
      settempColor(prev => prev.filter(item => item !== color));
      return;
    }
    settempColor(prev=> [...prev ,color])



  }}/>)

// review  trim and filter and sum and every


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
        <form className="space-y-3 " onSubmit={hnamleforminput}>
          {handleforminptu}
          <div className="flex items-center space-x-1 flex-wrap">
        {Handlecolor}
          </div>
        {tempColor.map(color=>(
          <span className="p-1 mr-1 mb-1 text-xs rounded-md text-white" style={{backgroundColor:color}}>{color}</span>
        ))}
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
