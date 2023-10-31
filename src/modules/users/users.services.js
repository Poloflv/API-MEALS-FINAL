import User from "./users.model.js";
import Order from "../orders/order.model.js";

export class UserServive {

    async createUser(data){
        return await User.create(data)
    }

    async findOneUserById(id){
        return await User.findOne({
            where: {
                id,
                status: true
            }
        })
    }

    async updateUser(user,data){
        return await user.update(data)
    }

    async deleteUser(user){
        return await user.update({status: false})
    }

    async findUserByEmail(email){
        return await User.findOne({
            where: {
                email,
                status: true
            }
        })
    }

    async  findAllOrdersUser(id){
        return await User.findOne({
            where:{
                id,
                status: true,
            },
            include: [
                {
                    model: Order,
                    where:{
                        id : sessionUser
                    }
                }
            ]
        })
    }
    
}