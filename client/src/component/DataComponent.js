import axios from 'axios'
import * as React from 'react';
import { useEffect, useState } from "react";  
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProductComponent from './ProductComponent';
import Grid from '@mui/material/Grid';

const DataComponent = () =>{

    let [categoryList, setCategoryList] = useState([])
    let [subcategoryList, setSubcategoryList] = useState([])
    let [productList, setProductList] = useState([])

    const [priceFilter,setPriceFilter] = useState([]);
    const [filterType,setFilterType] = useState("");
    const [filterTypeValues,setFilterTypeValues] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/user/category-showall/`).then((res)=>{
            setCategoryList(res.data.data);
        }).catch((err)=>{
            console.log({err});
        })
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:8000/user/product-showall/`).then((res)=>{
            setProductList(res.data.data);
        }).catch((err)=>{
            console.log({err});
        })
    },[])

    const getSelectedData=(e,testing)=>{
        console.log(e.target.value,testing);
        axios.get(`http://localhost:8000/user/subcategory-show/${e.target.value}`).then((res)=>{
            setSubcategoryList(res.data.data);
            console.log(res.data.data)
        }).catch((err)=>{
            console.log({err});
        })
    }

    const getSelectedSub=(e)=>{
        console.log(e.target.value);    
        axios.get(`http://localhost:8000/user/product-show/${e.target.value}`)
        .then((res)=>{
            console.log(res.data.data);
            setProductList(res.data.data);
        }).catch((err)=>{
            console.log({err});
        })
    }


    //filter

    const filterProductByPrice = async (e) => {
        const[min,max] = e.target.value.split("-");
        let filteredDataByPrice = await axios.post("http://localhost:8000/user/product/show-product/product-price",{
            min,max
        })
        setProductList(filteredDataByPrice.data.data);
    }

    function checkFilterType(filterType){
        if(filterType==="price"){
          return (
            <>
                <InputLabel id="filtertype_select">PRICE</InputLabel>
                <Select
                    labelId="filterprice_select"
                    id="demo-simple-select"
                    label={"PRICE"}
                    onChange={filterProductByPrice}
                >
                    <MenuItem value="0-10000">0-10000</MenuItem>
                    <MenuItem value="10000-20000">10000-20000</MenuItem>
                    <MenuItem value="20000-30000">20000-30000</MenuItem>
                    <MenuItem value="30000-40000">30000-40000</MenuItem>
                    <MenuItem value="40000-50000">40000-50000</MenuItem>
                </Select>
            </>
          )
          }
      }


    // Search product
    const searchProduct = () => {
      let name = document.getElementById("product_search").value;
      axios
        .post("http://localhost:8000/user/search-product/", { name })
        .then((response) => {
          console.log(response);
          setProductList(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

  return(
        <>
        <Grid container spacing={2} sx={{mt:0.5}}>
         <Grid item 
          xs={12}
          md={12}
          lg={2.5}
          style={{
            background: "#e1e1e1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
          }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{
                width: "200px",
                marginTop: "30px",
                backgroundColor: "white",
              }}>
                <InputLabel id="select-label">Category</InputLabel>
                  <Select onChange={(e)=>getSelectedData(e,"testData")} label="Category">
                    {
                        categoryList.map((users,index)=>{
                            return <MenuItem key={index} value={users._id}>{users.name}</MenuItem>
                        })
                    }
                  </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            {subcategoryList.length ? <FormControl sx={{
                width: "200px",
                marginTop: "30px",
                backgroundColor: "white",
              }}>
                <InputLabel id="select-sub">SubCategory</InputLabel>
                  <Select onChange={getSelectedSub} label="SubCategory">
                      {
                          subcategoryList.map((users,index)=>{
                              return <MenuItem key={index} value={users._id}>{users.name}</MenuItem>
                          })
                      }
                  </Select>
            </FormControl>:null}
            </Box>

            <h2>Apply Filter</h2>
            <Box sx={{ minWidth: 120 }}>
                <FormControl  sx={{width:"200px", backgroundColor:"white"}}>
                    <InputLabel id="filtertype_select">FILTER</InputLabel>
                      <Select
                          labelId="filtertype_select"
                          id="demo-simple-select"
                          label={"category"}
                          onChange={(e) => setFilterType(e.target.value)}
                      >
                          <MenuItem value="select">Select</MenuItem>
                          <MenuItem value="price">Filter by price</MenuItem>
                      </Select>
                </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{width:"200px", backgroundColor:"white", marginTop:"20px"}}>
                    {
                        checkFilterType(filterType)
                    }  
                </FormControl>
            </Box>
        </Grid>
        <Grid item lg={9.5} md={12} xs={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "30px 0",
            }}
          >
            <div style={{ border: "1px solid black" }}>
              <input
                id="product_search"
                type="text"
                placeholder="Enter name of the product"
                style={{
                  border: "none",
                  borderRight: "1px solid black",
                  padding: "15px 50px",
                  outline: "none",
                }}
              ></input>
              <button
                style={{ border: "none", padding: "15px 10px" }}
                onClick={searchProduct}
              >
                Search Product
              </button>
            </div>
          </div>
                <ProductComponent products={productList} min={priceFilter[0]} max={priceFilter[1]}/>
            </Grid>
        </Grid>
        </>
    )
}

export default DataComponent;