import express from "express";

import { addBrand,findbrand, showbrand, brandUpdate, brandDelete} from "../controllers/brand.controller"

const router = express();

router.post('/brand-add', addBrand);

router.get('/brand-show/:id', findbrand);

router.get('/brand-showall', showbrand);

router.post('/brand-update/:id', brandUpdate);

router.delete('/brand-delete/:id', brandDelete);


export default router;