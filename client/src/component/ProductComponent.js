import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const ProductComponent = (props) =>{

    return(
        <>
            <div className='MainCard'>
                {props.products.map((user, index)=> {
                    return(
                            <>
                                <Card sx={{ maxWidth: 295, m:2}}>
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
        </>
    )
}

export default ProductComponent;