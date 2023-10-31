import express from "express";

export const router = express.Router();

import {
    findAllOrders,
    createOrder,
    updateOrder,
    deleteOrder,
} from './order.controller.js'



router
    .route('/')
    .post(createOrder)

router
    .route('/me')
    .get(findAllOrders)

router
    .route('/:id')
    .patch(updateOrder)
    .delete(deleteOrder)