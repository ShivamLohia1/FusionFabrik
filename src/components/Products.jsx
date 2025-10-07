import React, { useState } from 'react'
import { useEffect } from 'react';
import { API_URL } from '../common/constant.js';

const Products = () => {
    const [products,setProducts]=useState([])
    const [currentPage,setCurrentPage]=useState(0);
    const getProducts= async()=>{
        try {
            const data=await fetch(API_URL);
            const resp=await data.json();
            setProducts(resp.products);
            console.log(resp.products)
        } catch (error) {
            console.log(error);
        }
    }
    const TOTAL_PAGE=Math.ceil(products.length/10);
    const startIndex=currentPage*10 //currentPage 
    const endIndex=startIndex+10;
    useEffect(()=>{
        getProducts();
    },[])
  return (
    <div className="container">
        <div className="row my-3">
            <div className="col-lg-12">
                <ul className="pagination">
                    <li className="page-item">
                        <a href="" className="page-link">Prev</a>
                    </li>
                    {
                        [...Array(TOTAL_PAGE).keys()].map((n)=>{
                            return (
                                <li className="page-item" key={n}>
                                    <button type='button'
                                     onClick={()=>setCurrentPage(n)} 
                                     className="page-link">{n+1}</button>
                                </li>
                            )
                        })
                    }
                    <li className="page-item">
                        <a href="" className="page-link">Next</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="row my-2">
            {
                products &&
                products.slice(startIndex,endIndex).map((product)=>{
                    return (
                        <div className="col-md-4 my-3" key={product.id}>
                        <div className="card shadow-lg">
                            <div className="card-header">
                                <h4 className='text-center'>{product.title}</h4>
                            </div>
                            <div className="card-body">
                                <img src={product.thumbnail} alt={product.title} />
                                <p>{product.description}</p>
                                <strong className='text-success'>{product.price}</strong>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Products