import cors from 'cors'
import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/user.route';
import categoryRoute from './routes/category.route';
import subcategoryRoute from './routes/subcategory.route';
import productRoute from './routes/product.route';
import brandRoute from './routes/brand.route';
import adminRoute from './routes/admin.route';

const app = express();
// app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(cors());
// app.use(notFound);
// app.use(errorHandler);
app.use(express.json());

// app.use(express.static(__dirname+"/public"))

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended:true }));


app.use('/user', userRoute);
app.use('/user', categoryRoute);
app.use('/user', subcategoryRoute);
app.use('/user', productRoute);
app.use('/user', brandRoute);
app.use('/admin', adminRoute);

if (process.env.NODE_ENV =="production") {
  app.use(express.static("client/build"));
}
// const DB = "mongodb://localhost:27017/ecommerceProject"
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.DB)
  .then(() => {
    console.log('mongodb started.');
  }).catch((err) => {
    console.log('mongodb connection failed.')
    console.log({err})
  })  

app.listen(PORT, function () {
  console.log(`Ecommerce app listening on port ${PORT}!`);
});