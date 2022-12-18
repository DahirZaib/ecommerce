import React from "react";

import {useNavigate} from 'react-router-dom'

const AddProduct=()=>{
    const[name,setName] = React.useState('');
    const[price,setPrice] = React.useState('');
    const[category,setCategory] = React.useState('');
     const[company,setCompany] = React.useState('');
   

        const navigate = useNavigate();

     
      
    const addProduct= async()=>{

        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch('http://localhost:5000/add-product', {

            method: 'post',
            body: JSON.stringify({ name,price,category,company,userId }),
            headers: {

                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.name){

              localStorage.setItem("user", JSON.stringify(result));
              navigate('/')
               }else{
                console.log("PLease enter correct details")
               }

    }

    return(
        <div className="login">
            <input type="text" className='inputBox' placeholder="Enter name" onChange={(e)=>setName(e.target.value)} value={name}/>
            <input type="text" className='inputBox' placeholder="Enter price" onChange={(e)=>setPrice(e.target.value)} value={price}/>
            <input type="text" className='inputBox' placeholder="Enter category" onChange={(e)=>setCategory(e.target.value)} value={category}/>
            <input type="text" className='inputBox' placeholder="Enter Company" onChange={(e)=>setCompany(e.target.value)} value={company}/>
                        <button onClick={addProduct} className='appbutton' type="button">Add Product</button>
        </div>
    )
}
export default AddProduct