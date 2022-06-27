import * as React from 'react';
import { useEffect, useState } from 'react';
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



export default function AddSubcategory() {

    let [categoryList, setCategoryList] = useState([]);
    let [subcategoryList, setSubCategoryList] = useState([])

    const [catValue, setCatValue] = useState([]); 

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmitSub = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        console.log(data)
        let payload = {
            name: data.get('name'),
            categoryId: catValue
        }
            axios.post("http://localhost:8000/user/subcategory-add/",payload).then((res)=>{
                setSubCategoryList([...subcategoryList, res.data.data]);
                alert('SubCategory Added Successfully')
                event.target.reset();
                setOpen(false)
            }).catch((err)=>{
                console.log(err)
            })
        event.preventDefault();

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

        console.log({
          name: data.get('name'),
          categoryId: catValue
        });
      };


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
  
      axios.post(`http://localhost:8000/user/subcategory-delete/${e.target.value}`).then((res)=>{
          // setCategoryList([...categoryList]);
      }).catch((err)=>{
          console.log(err)
      })
    alert('Subcategory Deleted Successfully')
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
})

  return (
      <>
      <div>
      <Button style={{color:"white", backgroundColor:"black"}} sx={{pl:3, pr:3}} onClick={handleOpen}>Add Subcategory</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        align="center"
      >
        <Box className={'modalpro'} sx={style} component="form" Validate onSubmit={handleSubmitSub}>
        <TextField size="small" sx={{width:220}}className={"textField"}  name="name" required id="name" label="Add Sub Category"/>
        <Select size="small"  sx={{width:220, m:2}} onChange={(e)=>{setCatValue(e.target.value)}} label="Category">
            {
                categoryList.map((users,index)=>{
                    return <MenuItem key={index} value={users._id}>{users.name}</MenuItem>
                })
            }
        </Select>
        <Button className={"btnhover"} type="submit" variant="contained" sx={{backgroundColor: "black"}}>
            Add Sub Category
        </Button>
        </Box>
      </Modal>
    </div>

    <Box>
    <TableContainer component={Paper} sx={{width:700, m:"auto", mt:4}}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Sub Category</StyledTableCell>
            <StyledTableCell align="center">Category Name</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subcategoryList.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.categoryId.name}</StyledTableCell>
              <StyledTableCell  align="center"><Button className={"btnX"} onClick={deleteHandle} value={row._id} >X</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </>
  );
}
