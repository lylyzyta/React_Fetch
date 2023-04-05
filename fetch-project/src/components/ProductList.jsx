import React from "react";
import { useEffect, useState } from "react";
import getProducts from "../helpers/api";
import styles from "./ProductList.module.css";
import Popup from "./Popup";
import { TinyButton as ScrollUpButton} from "react-scroll-up-button";




function ProductList() {

  
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts("https://gnk.onm.mybluehost.me/products_api/").then((json) =>
      setProducts(json)
    );
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [isOpen, setIsOpen] = useState(false);
const [uniqueProduct, setUniqueProduct] =useState();
 const [ search, setSearch ] = useState("");

  const togglePopup = (productId) => {
    setIsOpen(!isOpen);
    const producto = products.filter((producto) => producto.id === productId)[0];
    setUniqueProduct(producto.description);
  };
 
  const searcher = (e) => { 
    setSearch(e.target.value)
    console.log(e.target.value);
  }

 const results = !search ? products : products.filter((dato)=> dato.title.toLowerCase().includes(search.toLocaleLowerCase()))

  return (

 
    <div className={styles.listContainer}>
           
    <input className={styles.inputContainer} value={search} onChange={searcher} type="text" placeholder='Search....'/>
       <section className={styles.productsContainer}>
       <ScrollUpButton />
                 {results.map((product) => (
            <section  className={styles.cardStyle} key={product.id}  >
             <>
             <img className={styles.productsImg} src={product.img}
               alt="logo-icon"/>
               <br></br>
               <br></br>
            <span  className={styles.productsTitle}>{product.title}</span>
            <span className={styles.productsPrice}>Precio : $ {product.price}</span> 
         
         

           <button
                    className={styles.btnDetail}
                    onClick={() => togglePopup(product.id)}
                  >
                    {" "}
                    Description{" "}
                  </button>

           {isOpen && (
                    <Popup
                      content={
                        <>
                          <b className={styles.productDetail}>
                          {uniqueProduct}                     
                          </b>
                          <br></br>
                          <br></br>
                          <br></br>

                          <button
                            className={styles.productClose}
                            onClick={togglePopup}
                          >
                            Close
                          </button>
                        </>
                      }
                      handleClose={togglePopup}
                    />
                  )}
                    </>
           </section>
         ))}

    </section>
  
   </div>
 );
}


export { ProductList };
