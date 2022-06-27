import express from "express";

import { categoriesList, catUpdate, catDelete, findcat, showcat } from "../controllers/category.controller";

const router = express.Router();

//add
router.post('/category-add/', categoriesList)
//find
router.get('/category-show/:id', findcat)

router.get('/category-showall/', showcat)

//update
router.post('/category-update/:id', catUpdate)
//delete
router.post('/category-delete/:id', catDelete)

export default router;