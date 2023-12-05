
export const productvalidation =(Product:{ title: string,description:string,imageURL:string,price:string})=>{

    const errors :{title: string,description:string,imageURL:string,price:string} ={
        title:"",
        description:"",
        imageURL:"",
        price:"",
    }
    const vaildurl = /^(ftp|http|https):\/\/[^."]+$/.test(Product.imageURL)

    if(!Product.title.trim() || Product.title.length <10 || Product.title.length>25){
        errors.title ="Product title must be between 10 and 25   char"
    }
    if(!Product.description.trim() || Product.description.length <10 || Product.description.length>80){
        errors.description ="Product title must be between 10 and 80 char"
    }
    if(!Product.imageURL.trim() ||vaildurl){
        errors.imageURL ="valid image url is required"
    }

    if(!Product.price.trim() || isNaN(Number(Product.price))){
        errors.price  ="valid price is required"
    }
    
    return errors;
}