import express from "express";
import { adminRegistration, login} from "../controllers/admin.controller";

const router = express.Router();

router.post('/admin-register/', adminRegistration);

router.post('/admin-login/', login);

export default router;