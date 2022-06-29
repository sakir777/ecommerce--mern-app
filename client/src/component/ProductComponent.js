import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import { useDispatch } from "react-redux";

const ProductComponent = (props) =>{

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        "& .MuiDialogContent-root": {
          padding: theme.spacing(2),
        },
        "& .MuiDialogActions-root": {
          padding: theme.spacing(1),
        },
      }));
    
      const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;
    
        return (
          <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
        );
      };
    
      BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
      };
    
      const [open, setOpen] = useState([]);
    
      const handleClickOpen = (data) => {
        console.log(data);
        setOpen([true, data]);
      };
    
      const handleClose = (data) => {
        setOpen([false]);
      };
    
      const { products } = props;
      const [noProductStyling, setNoProductStyling] = useState({});
    //   const dispatch = useDispatch();
      let ifProductFoundStyling = {
        justifyContent: "space-evenly",
      };
    
      let ifNoProductFoundStyling = {
        width: "100%",
        height: "90vh",
        display: "flex",
        // alignItems: "center",
        justifyContent: "center",
        fontSize: "25px",
        fontWeight: "bold",
      };
      console.log(products);

    return(
        <>
            <div className='MainCard'>
                {props.products.map((user, index)=> {
                    return(
                            <>
                                <Card sx={{ maxWidth: 295, m:2}} onClick={() => handleClickOpen(user)}>
                                <CardActionArea >
                                <CardMedia
                                    component="img"
                                    height="270"
                                    image={user.image}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        <Typography key={user.name}>Name : {user.name}</Typography>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <Typography key={user.size}>Size : {user.size}</Typography>
                                        <Typography key={user.color}>Color : {user.color}</Typography>
                                        <Typography key={user.email}>Price : {user.price}</Typography>
                                        <Typography key={user.brand}>Brand : {user.brand}</Typography>
                                    </Typography>
                                </CardContent>
                                </CardActionArea>
                                </Card>
                            </>
                        )
                    })}
            </div>

             {/* Modal starts here */}

        <div>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open[0]}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              {/* {open[1]?.name} */}
            </BootstrapDialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={4}>
                  <img className="modalImg" alt="" src={open[1]?.image} />
                </Grid>
                <Grid item xs={6}>
                  <h3 className={"modalP"}>{open[1]?.name}</h3>
                  <p className={"modalP"}>Size : {open[1]?.size}</p>
                  <p className={"modalP"}>Color : {open[1]?.color}</p>
                  <p className={"modalP"}>Price : {open[1]?.price}</p>
                  <p className={"modalP"}>Brand : {open[1]?.brand}</p>
                </Grid>
              </Grid>
            </DialogContent>
          </BootstrapDialog>
        </div>
        </>
    )
}

export default ProductComponent;



// function ProductComponent(props) {
   
//       return (
//       <>
//         {/* <NewNavbar/> */}
//         <Grid
//           className="products-main-div"
//           style={
//             products.length ? ifProductFoundStyling : ifNoProductFoundStyling
//           }
//           container
//           rowGap={4}
//         >
//           {products.length ? (
//             products.map((product) => {
//               return (
//                 <>
//                   {/* <Grid container spacing={2}> */}
//                   <Grid sm={5} xs={10} md={5} lg={3.6}>
//                     <Card>
//                       {/* <CardMedia
//                         component="img"
//                         height="140"
//                         image={product.image}
//                         alt="green iguana"
//                       /> */}
//                       <img
//                         src={product.image}
//                         style={{ width: "100%" }}
//                         onClick={() => handleClickOpen(product)}
//                       />
//                       <CardContent>
//                         <Typography
//                           gutterBottom
//                           // variant="h6"
//                           // style={{ fontSize: "20px" }}
//                           component="div"
//                         >
//                           Name : {product.name}
//                         </Typography>
//                         <Typography gutterBottom component="div">
//                           Brand : {product.brand}
//                         </Typography>
//                         <Typography gutterBottom component="div">
//                           Color : {product.color}
//                         </Typography>
//                         <Typography
//                           color="text.secondary"
//                           style={{ display: "flex" }}
//                         >
//                           <CurrencyRupeeIcon /> <span>{product.price}</span>
//                         </Typography>
//                       </CardContent>
//                       <CardActions>
//                         <Button
//                           variant="contained"
//                           style={{ background: "#373737" }}
//                           onClick={() =>
//                             dispatch({ type: "ADD_CART", payload: product })
//                           }
//                         >
//                           Add to cart
//                         </Button>
//                       </CardActions>
//                     </Card>
//                   </Grid>
//                   {/* </Grid> */}
//                 </>
//               );
//             })
//           ) : (
//             <div>No products found</div>
//           )}
//         </Grid>
  
       
//       </>
//     );
//   }