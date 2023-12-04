interface Ipropse{
    srcurl:string,
    alt:string,
    ClassName:string,
    

}
function Imagec({srcurl,alt,ClassName}:Ipropse) {
  return (
    <>
          <img src={srcurl} alt={alt} className={ClassName} />


    </>
  );
}
export default Imagec;