import { catchAsync } from "../../errors/index.js";
import { MealService } from "./meal.service.js";

const mealService = new MealService()

export const findAllMeals = catchAsync(async(req,res,next) => {
    const meals = await mealService.findAllMeals()

    return res.status(200).json(meals)
})

export const createMeal = catchAsync(async(req,res,next) => {
    
    const { id } = req.params;
    
    const { name, price } = req.body;


    const meal = await mealService.createMeal({name, price, restaurantId : id})

    return res.status(201).json(meal)
})

export const findOneMeal = catchAsync(async(req,res,next) => {
    const {id} = req.params;

    const { status } =req.query;

    const meal = await mealService.findOneMeal(id, status)

    if(!meal){
        return res.status(404).json({
            status: 'error',
            message: `Meal not found with id: ${id}`
        })
    }
    return res.status(200).json(meal)
})

export const updateMeal = catchAsync(async(req,res,next) => {
    const { id } = req.params;
    const {name,price} = req.body;

    const meal = await mealService.findOneMeal(id)

    if(!meal){
        return res.status(404).json({
            status: 'error',
            message: 'Meal not found'
        })
    }

    const mealUpdated = await mealService.updateMeal(meal,{name,price})

    return res.status(200).json(mealUpdated)

    //TODO seguir
})

export const deleteMeal = catchAsync(async(req,res,next) => {
    const { id } = req.params;

    const meal = await mealService.findOneMeal(id, 'active')

    if(!meal){
        return res.status(404).json({
            status: 'error',
            message: `Meal not found with id: ${id}`
        })
    }

    await mealService.deleteMeal(meal)

    return res.status(204).json(null)
})