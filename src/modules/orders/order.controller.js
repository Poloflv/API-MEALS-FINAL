import { totalPrice } from "../../common/utils/totalPrice.js";
import { catchAsync } from "../../errors/index.js";
import Meal from "../meals/meal.model.js";
import { OrderService } from "./order.service.js";

export const orderService = new OrderService()

export const findAllOrders = catchAsync(async(req,res,next) => {
    const orders = await orderService.findAllOrders()

    return res.status(200).json(orders)
})

export const createOrder = catchAsync( async(req,res,next) => {
    const {quantity, mealId} = req.body;

    const { sessionUser } = req;

    //TODO: hacer

    // totalPrice

    // const totalPrice = quantity * Meal[mealId].price

    const order = await orderService.createOrder({quantity, mealId,userId:sessionUser.id})

    return res.status(201).json(order)
})

export const updateOrder = catchAsync(async(req,res,next) => {
    const { id } = req.params;


    const order = await orderService.findOneOrder(id)

    if(!order){
        return res.status(404).json({
            status: 'error',
            message: 'Order not found'
        })
    }

    const orderUpdated = await orderService.updateOrder(order ,{status:'cancelled'})

    return res.status(204).json(orderUpdated)

    //TODO seguir
})

export const deleteOrder = catchAsync(async(req,res,next) => {
    const { id } = req.params;
    
    const order = await orderService.findOneOrder(id, 'active')

    if(!order){
        return res.status(404).json({
            status: 'error',
            message: `Order not found with id: ${id}`
        })
    }

    await orderService.deleteOrder(order)

    return res.status(204).json(null)
})