import express from "express";
import { getMyProfile } from "../controllers/user.js";
import { register } from "../controllers/user.js";
import { login } from "../controllers/user.js";
import { logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
// import { } from "../controllers/user.js";
// import { updateUserDetail } from "../controllers/user.js";
// import { deleteUserDetail } from "../controllers/user.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout",logout);

router.get("/me",isAuthenticated,getMyProfile);
    // .put(updateUserDetail)
    // .delete(deleteUserDetail);


export default router;

