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



export default function AddCategory() {

    let [categoryList, setCategoryList] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


const handleSubmitCat = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let payload = {
        name: data.get('name')
    }
    
        axios.post("http://localhost:8000/user/category-add/",payload).then((res)=>{
            setCategoryList([...categoryList, res.data.data]);
            console.log(res.data.data);
            alert('Category Added Successfully')
            setOpen(false)
            event.target.reset();
        }).catch((err)=>{
            console.log(err)
        })
    event.preventDefault();
    console.log({
        name: data.get('name'),
    });
    };

useEffect(()=>{
    axios.get(`http://localhost:8000/user/category-showall/`).then((res)=>{
        setCategoryList(res.data.data);
    }).catch((err)=>{
        console.log({err});
    })
    },[])

const deleteHandle = ((e)=>{
  
    axios.post(`http://localhost:8000/user/category-delete/${e.target.value}`).then((res)=>{
        // setCategoryList([...categoryList]);
    }).catch((err)=>{
        console.log(err)
    })
    alert('Category Deleted Successfully')
    e.preventDefault();

    axios.get(`http://localhost:8000/user/category-showall/`).then((res)=>{
        setCategoryList(res.data.data);
    }).catch((err)=>{
        console.log({err});
    })
    
})

  return (
      <>
      <div>
      <Button style={{color:"white", backgroundColor:"black"}} sx={{pl:3, pr:3}} onClick={handleOpen}>Add Category</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        align="center"
      >
        <Box className={'modalpro'} sx={style} component="form" Validate onSubmit={handleSubmitCat}>
        <TextField className={"textField"}  name="name" required id="name" label="Add Category"/>
        <Button className={"btnhover"} type="submit" variant="contained" sx={{backgroundColor: "black"}}>
                    Add Category
        </Button>
        </Box>
      </Modal>
    </div>
    <Box >
    <TableContainer component={Paper} sx={{width:500, m:"auto", mt:4}}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Category Name</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoryList.map((row) => (
            <StyledTableRow>
              <StyledTableCell  align="center">{row.name}</StyledTableCell>
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
