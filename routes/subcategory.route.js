import express from "express";
import { subCategoriesList, findsub, showsub, subUpdate, subDelete } from "../controllers/subcategory.controller";

const router = express.Router();

router.post('/subcategory-add/', subCategoriesList)

router.get('/subcategory-show/:categoryId', findsub)

router.get('/subcategory-showall/', showsub)

router.post('/subcategory-update/:id', subUpdate)

router.post('/subcategory-delete/:id', subDelete)

export default router;