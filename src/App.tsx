import { useState } from "react";
import "./App.css";
import ProductCard from "./Component/ProductCard";
import Button from "./Component/Ui/Button";
import Modal from "./Component/Ui/Model";
import { productList } from "./data";




function App() {
  const renderProductCard = productList.map((product)=>( <ProductCard product={product} key={product.id}/>))
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  
  return (
    <>
      <main className="container ">
      <Button  width="w-fit" className=" bg-indigo-700 " onClick={openModal}>ADD Product</Button>

        <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
         {renderProductCard}
        </div>
      </main>
      <Modal isOpen={isOpen} title="ADD Product" closeModal={closeModal}>
        <div className="flex content-between space-x-2">
        <Button width="w-full" className=" bg-indigo-700  hover:bg-indigo-500">SUBMIT</Button>
        <Button width="w-full" className=" bg-gray-400 hover:bg-gray-500" onClick={closeModal}>CANCLE</Button>
        </div>
      

      </Modal>
    </>
  );
}

export default App;
