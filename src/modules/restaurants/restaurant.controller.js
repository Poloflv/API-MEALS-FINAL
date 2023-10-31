import { catchAsync } from "../../errors/index.js"
import { ReviewService } from "../reviews/review.service.js"
import { RestaurantService } from "./restaurant.service.js"

const restaurantService = new RestaurantService()
const reviewService = new ReviewService()

export const findAllRestaurants = catchAsync(async(req,res,next) => {
    const restaurants = await restaurantService.findAllRestaurants()

    return res.status(200).json(restaurants)

} )

export const createRestaurant = catchAsync(async(req,res,next) => {

    const { name, address, rating} = req.body;

    const restaurant = await restaurantService.createRestaurant({ name, address, rating})

    return res.status(201).json(restaurant)

} )

export const findOneRestaurant = catchAsync(async(req,res,next) => { //TODO
    const {id} = req.params;

    const restaurant = await restaurantService.findOneRestaurant(id)

    if(!restaurant){
        return res.status(404).json({
            status: 'error',
            message: `Restaurant not found with id: ${id}`
        })
    }

    return res.status(200).json(restaurant)
} )

export const updateRestaurant = catchAsync(async(req,res,next) => { //TODO
    const {id} = req.params;

    const restaurant= await restaurantService.findOneRestaurant(id)

    if(!restaurant){
        return res.status(404).json({
            status: 'error',
            message: 'Restaurant not found'
        })
    }

    const restaurantUpdated = await restaurantService.update(restaurant, req.body)

    return res.status(200).json(restaurantUpdated)
} )
export const deleteRestaurant = catchAsync(async(req,res,next) => { //TODO
    const { id } = req.params;

    const restaurant = await restaurantService.findOneRestaurant(id)

    if(!restaurant){
        return res.status(404).json({
            status: 'error',
            message: `Restaurant not found with id: ${id}`
        })
    }

    await restaurantService.delete(restaurant)

    return res.status(204).json(null)
} )

export const createReviewToRestaurant = catchAsync(async(req,res,next) => {
    const { comment, rating } = req.body;

    const { id } = req.params;

    const { sessionUser } = req;

    const review = await reviewService.create({ 
        comment,
        rating,
        restaurantId: id,
        userId: sessionUser.id
    });

    return res.status(201).json(review)

} )


export const deleteReview = catchAsync(async(req,res,next) => {
    
} )

export const updateReview = catchAsync(async(req,res,next) => {
    const { comment, rating } = req.body;
    const { review } = req;
    const { id } = req.params;

    const reviewS = await reviewService.findOneReview(id)

    if(!reviewS){
        return res.status(404).json({
            status: 'error',
            message: 'Review not found'
        })
    }

    const reviewUpdated = await reviewService.updateReview(review, {comment, rating});

    return res.status(200).json(reviewUpdated)
} )