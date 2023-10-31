import express from "express";

export const router = express.Router();


import {
    findAllMeals,
    createMeal,
    findOneMeal,
    updateMeal,
    deleteMeal,
} from './meal.controller.js'
import { validExistRestaurant } from "../restaurants/restaurant.middleware.js";


router
    .route('/')
    .get(findAllMeals);

router
    .route('/:id')
    .post(validExistRestaurant,createMeal)


router
    .route('/:id')
    .get(findOneMeal)
    .patch(updateMeal)
    .delete(deleteMeal)