import express from "express";
import { productList, findpro, showAllPro, findbrand, proUpdate, proDelete, updateBrand, proByPrice, searchProduct, productUpload } from "../controllers/product.controller";

const router = express.Router();

router.post('/product-add', productList)

router.get('/product-show/:subcategoryId', findpro)

router.get('/product-showall/', showAllPro)
router.post('/product-upload',productUpload)

router.post('/product/show-product/product-price/', proByPrice)

router.get('/product-brand/:brand', findbrand)

router.post('/product-update/:id', proUpdate)

router.post('/product-delete/:id', proDelete)

router.post('/search-product/', searchProduct)

router.post('/product-addbrandid/:brand', updateBrand)

export default router;