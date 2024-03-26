import express, { Request, Response } from "express";
import { registerUser } from "../Controllers/auth/Signup.js";
import { loginUser } from "../Controllers/auth/login.js";
import { getAllUsers } from "../Controllers/users/getAllUsers.js";
import getSingleUser from "../Controllers/users/getSingleUser.js";
import authenticateToken from "../middleware/AuthMiddleware.js";
import UpdateUser from "../Controllers/users/updateUser.js";
import deleteUser from "../Controllers/users/deleteUsers.js";
import { Prediction } from "../Controllers/prediction/index.js";
import { deleteMulti } from "../Controllers/deleteMulti/index.js";
import { verifyingUserCallback } from "../Controllers/auth/verify.js";
const router=express.Router();
router.get("/api", (req:Request, res:Response) => {
    res.send("api working succesful!");
  });

  router.post("/api/auth/signup", registerUser);
  router.post("/api/auth/login", loginUser);
  router.post("/api/auth/verify",verifyingUserCallback);
  router.route('/api/users/').get(getAllUsers);
  router.route('/api/predict/:id').patch(Prediction);
  router.route('/api/delete/users').delete(deleteMulti)

  export default  router