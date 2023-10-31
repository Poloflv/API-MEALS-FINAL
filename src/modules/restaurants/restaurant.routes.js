import express from "express";

export const router = express.Router();

import {
    findAllRestaurants,
    createRestaurant,
    findOneRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createReviewToRestaurant,
    updateReview,
    deleteReview,

} from './restaurant.controller.js'
import { validExistRestaurant } from "./restaurant.middleware.js";
import { validExistReview } from "../reviews/review.middleware.js";
import { protectAccountOwner } from "../users/auth.middleware.js";

router
    .route('/')
    .get(findAllRestaurants)
    .post(createRestaurant);


router
    .route('/:id')
    .get(findOneRestaurant)
    .patch(updateRestaurant)
    .delete(deleteRestaurant)


router.route('/reviews/:id')
    .post(validExistRestaurant,createReviewToRestaurant)

router.
    route('/reviews/:restaurantId/:id')
    .patch(validExistRestaurant,
        validExistReview,
        //validExistUser,
        protectAccountOwner,
        updateReview
        )
    .delete(
        validExistRestaurant,
        validExistReview,
        protectAccountOwner,
        deleteReview,
        )