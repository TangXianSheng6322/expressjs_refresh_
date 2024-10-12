import { Router } from "express";
import usersRoute from "./users.mjs";
import productsRoute from "./products.mjs";
import authRoute from "./auth.mjs";

const router = Router();

router.use(usersRoute);
router.use(productsRoute);
router.use(authRoute);

export default router;
