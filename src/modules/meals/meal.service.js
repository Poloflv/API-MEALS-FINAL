import Restaurant from "../restaurants/restaurant.model.js";
import Meal from "./meal.model.js";

export class MealService {

    async findAllMeals(){
        return await Meal.findAll({
            where: {
                status: 'active'
            },
            include: [
                {
                    model: Restaurant
                }
            ]
        })
    }

    async createMeal(data){
        return await Meal.create(data)
    }

    async findOneMeal(id){
        return await Meal.findOne({
            where: {
                status: 'active',
                id,
            },
            include: [
                {
                    model: Restaurant
                }
            ]
        })
    }

    async updateMeal(meal, data){
        return await meal.update(data)
    }

    async deleteMeal(meal){
        return await meal.update({status: 'deleted'})
    }
}