import React, { useState, useEffect } from 'react'

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        getProducts();


    }, [])

  
    const getProducts = async () => {

        let result = await fetch('http://localhost:5000/products',{

            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result)

    }
    console.warn("products", products);


    const searchHandle= async(event)=>{

        let key = event.target.value;
        
        if(key){

            let result = await fetch(`http://localhost:5000/search/${key}`,{

            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
            });
            result = await result.json();
            if(result){
    
                setProducts(result)
            }
            else{
                getProducts()
            }


        } 
       
    }

    return (

        <div className='product-list'>
            <h3>Product list</h3>

            <input className='search-box' type="text" placeholder='Search Product' onChange={searchHandle}/>


            <ul>
                <li>S.NO</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
            </ul>
            {
                products.length>0? products.map((item,index)=>

                <ul>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
            </ul>
               
                )
                :<h1>NO RESULT found...!</h1>
            }
            

        </div>
    )


}

export default ProductList