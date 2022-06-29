import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddProduct() {

    let [categoryList, setCategoryList] = useState([]);
    let [subcategoryList, setSubCategoryList] = useState([])
    let [productList, setProductList] = useState([])

    const [catValueP, setCatValueP] = useState([]); 
    const [subcatValueP, setSubCatValueP] = useState([]); 
    const [addProduct, setAddProduct] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const productRef = useRef();
    const [file, setFile] = useState()


    const [product, setProduct] = useState({ name: "", size: "", color: "", price: "", brand: ""});
  function handleChange(event) {
    setFile(event.target.files[0])
  }

    const getSelectedData=(e)=>{
          setCatValueP(e.target.value)
          axios.get(`http://localhost:8000/user/subcategory-show/${e.target.value}`).then((res)=>{
              setAddProduct(res.data.data)
              console.log(res.data.data)
          }).catch((err)=>{
              console.log({err});
          })
      }

    const handleSubmitProduct = (event) => {
        event.preventDefault();
        const { name, size, color, price, brand} = product;
        const data = new FormData();
        // console.log("evetn",event.currentTarget);
      
            data.append('name', product.name);
            data.append('size', product.size);
            data.append('color', product.color);
            data.append('price', product.price);
            data.append('brand', product.brand);
            data.append('image', file);
            data.append('categoryId', catValueP);
            data.append('subcategoryId', subcatValueP);

            
            axios.post("http://localhost:8000/user/product-add/",data).then((res)=>{
              setProductList([...productList, res.data.data]);
                console.log(res.data);
                alert('Product Added Successfully')
                setOpen(false)
            }).catch((err)=>{
                console.log(err)
            })

            // axios.get(`http://localhost:8000/user/product-showall/`).then((res)=>{
            //   setProductList([...productList, res.data.data]);
            // }).catch((err)=>{
            //     console.log({err});
            // })
            axios.get(`http://localhost:8000/user/subcategory-showall/`).then((res)=>{
              setSubCategoryList([...subcategoryList, res.data.data]);
            }).catch((err)=>{
                console.log({err});
            })
            axios.get(`http://localhost:8000/user/category-showall/`).then((res)=>{
              setCategoryList([...categoryList, res.data.data]);
            }).catch((err)=>{
                console.log({err});
            })
      };

const handle = (e) => {
  let name = e.target.name;
  let value = e.target.value;
  setProduct({ ...product, [name]: value })
}

useEffect(()=>{
    axios.get(`http://localhost:8000/user/product-showall/`).then((res)=>{
        setProductList(res.data.data);
    }).catch((err)=>{
        console.log({err});
    })
    },[])

useEffect(()=>{
    axios.get(`http://localhost:8000/user/subcategory-showall/`).then((res)=>{
        setSubCategoryList(res.data.data);
    }).catch((err)=>{
        console.log({err});
    })
    },[])



useEffect(()=>{
    axios.get(`http://localhost:8000/user/category-showall/`).then((res)=>{
        setCategoryList(res.data.data);
    }).catch((err)=>{
        console.log({err});
    })
    },[])

const deleteHandle = ((e)=>{
  
    axios.post(`http://localhost:8000/user/product-delete/${e.target.value}`).then((res)=>{
        // setCategoryList([...categoryList]);
    }).catch((err)=>{
        console.log(err)
    })
    alert('Product Deleted Successfully')

    e.preventDefault();
    
    axios.get(`http://localhost:8000/user/category-showall/`).then((res)=>{
        setCategoryList(res.data.data);
    }).catch((err)=>{
        console.log({err});
    })
    axios.get(`http://localhost:8000/user/subcategory-showall/`).then((res)=>{
        setSubCategoryList(res.data.data);
    }).catch((err)=>{
        console.log({err});
    })
    axios.get(`http://localhost:8000/user/product-showall/`).then((res)=>{
        setProductList(res.data.data);
    }).catch((err)=>{
        console.log({err});
    })
})

  return (
      <>
       <div>
      <Button style={{color:"white", backgroundColor:"black"}} sx={{pl:3, pr:3}} onClick={handleOpen}>Add Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        align="center"
      >
        <Box className={'modalpro'} sx={style} component="form" Validate onSubmit={handleSubmitProduct}>
        <TextField size="small" sx={{mt:1}} onChange={(e) => handle(e)} className={"textField"}  name="name" required id="name" label="Product Name"/>
        <TextField size="small" sx={{mt:1}} onChange={(e) => handle(e)}  name="size" required id="size" label="Size"/>
        <TextField size="small" sx={{mt:1}} onChange={(e) => handle(e)}  name="color" required id="color" label="color"/>
        <TextField size="small" sx={{mt:1}} onChange={(e) => handle(e)}  name="price" required id="price" label="price"/>
        <TextField size="small" sx={{mt:1}} onChange={(e) => handle(e)}  name="brand" required id="brand" label="brand"/>
        <br></br>
          <input className={"proint"} type="file" name="image" ref={productRef} onChange={handleChange}/>
        <Select size="small" sx={{width:210,mt:2}} onChange={getSelectedData} label="Category">
                    {
                        categoryList.map((users,index)=>{
                            return <MenuItem key={index} value={users._id}>{users.name}</MenuItem>
                        })
                    }
        </Select>
        <Select size="small" sx={{width:210,mt:2}} onChange={(e)=>{
                        setSubCatValueP(e.target.value)
                    }} label="Sub Category">
                      {
                          addProduct.map((users,index)=>{
                              return <MenuItem key={index} value={users._id}>{users.name}</MenuItem>
                          })
                      }
        </Select>
        <Button className={"btnhover"} type="submit" variant="contained" sx={{backgroundColor: "black"}}>
            Add Product
        </Button>
        </Box>
      </Modal>
    </div>
    <Box>
    <TableContainer component={Paper} sx={{width:700, m:"auto", mt:4}}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Product Name</StyledTableCell>
            <StyledTableCell align="center">Subcategory Name</StyledTableCell>
            <StyledTableCell align="center">Category Name</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell >{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.subcategoryId.name}</StyledTableCell>
              <StyledTableCell align="center">{row.categoryId.name}</StyledTableCell>
              <StyledTableCell align="center"><Button className={"btnX"} onClick={deleteHandle} value={row._id} >X</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
    </Box>
    </>
  );
}
