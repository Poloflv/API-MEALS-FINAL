import Meal from "../../modules/meals/meal.model.js"
import Order from "../../modules/orders/order.model.js"
import Restaurant from "../../modules/restaurants/restaurant.model.js"
import Review from "../../modules/reviews/review.model.js"
import User from "../../modules/users/users.model.js"



export const initModel = () => {
    User.hasMany(Review,{foreignKey: 'userId'})
    Review.belongsTo(User,{foreignKey: 'userId'})

    Restaurant.hasMany(Review, {foreignKey: 'restaurantId'})
    Review.belongsTo(Restaurant, {foreignKey: 'restaurantId'})

    Restaurant.hasMany(Meal, {foreignKey:'restaurantId' })
    Meal.belongsTo(Restaurant, {foreignKey: 'restaurantId'})

    Meal.hasOne(Order, {foreignKey:'mealId'})
    Order.belongsTo(Meal, {foreignKey:'mealId'})
    
    User.hasMany(Order, {foreignKey: 'userId'})
    Order.belongsTo(User, {foreignKey: 'userId'})
}