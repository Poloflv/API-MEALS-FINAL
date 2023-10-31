import express from "express";
import { deleteUser, login, orderDetail, ordersUser, register, updateUser } from "./users.controller.js";
import { protect, protectAccountOwner, validateExistUser } from "./auth.middleware.js";

export const router = express.Router();

router.post('/login', login)
router.post('/register', register)// este es el endpoint de crear usuarios

router.route('/:id')
    .patch(protect/*,protectAccountOwner*/,updateUser)
    .delete(protect, validateExistUser/*,protectAccountOwner*/,deleteUser)

router.get('/orders', ordersUser)
router.get('/orders/:id',orderDetail)