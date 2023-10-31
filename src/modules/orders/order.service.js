import Order from "./order.model.js";

export class OrderService{

    async findAllOrders(){
        return await Order.findAll()
    }

    async findOneOrder(id){
        return await Order.findOne({
            where:{
                id,
                status: 'active'
            }
        })
    }

    async createOrder(data){
        return await Order.create(data)
    }

    async updateOrder(order){
        return await order.update({ status: 'completed'})
    }

    async deleteOrder(order){
        return await order.update({status: 'cancelled'})
    }

}