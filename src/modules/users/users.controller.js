import { verifyPassword } from '../../config/plugins/encriptedPassword.js';
import generateJWT from '../../config/plugins/generate.jwt.js';
import {  AppError, catchAsync } from '../../errors/index.js';
import { orderService } from '../orders/order.controller.js';
import { validateLogin, validateRegister } from './user.schema.js';
import { UserServive } from './users.services.js';

const userService = new UserServive()

export const login = catchAsync(async(req, res , next) => {
   const {hasError,errorMessages,userData} = validateLogin(req.body)

   if(hasError){
      return res.status(422).json({
         status: 'error',
         message: errorMessages
      })
   }

   const user = await userService.findUserByEmail(userData.email);

   if(!user){
      return next(new AppError('this account does not exist', 404))
   }

   const isCorrectPassword = await verifyPassword(userData.password, user.password);

   if(!isCorrectPassword){
      return next(new AppError("Incorrect email or password",401))
   }

   const token = await generateJWT(user.id);


   return res.status(200).json({
      token,
      user:{
         id: user.id,
         name: user.name,
         email: user.email,
         role: user.role
      },
   })
});

export const register = catchAsync(async(req,res,next) => {
   const {hasError,errorMessages,userData} = validateRegister(req.body)

   if(hasError){
      return res.status(422).json({
         status: 'error',
         message: errorMessages
      })
   }

   const user = await userService.createUser(userData)

   const token = await generateJWT(user.id)

   return res.status(201).json({
      token,
      user: {
         id: user.id,
         name: user.name,
         email: user.email,
         role: user.role
      }
   })
});

export const findOneUser = catchAsync( async(req,res,next) => {
   const {user} = req;

   return res.status(200).json(user)
})

export const updateUser = catchAsync( async(req,res,next) => {
   const { id} = req.params
   // const {user} = req;
   const { name, email} = req.body;

   const user = await userService.findOneUserById(id)

   if(!user){
      return res.status(404).json({
         status: 'error',
         message: 'User not found'
      })
   }

   const userUpdated = await userService.updateUser(user, {name, email});

   return res.status(200).json(userUpdated)
// } catch (error) {
//     return res.status(500).json(error)
// }
})

export const deleteUser = catchAsync(async(req,res,next) => {
   const { user } = req;

   await userService.deleteUser(user)

   return res.status(200).json(null)
});


export const ordersUser =catchAsync(async(req,res,next) => {
   const { sessionUser: user } = req;
   const order = await orderService.findAllOrders(user?.id)

   return res.status(200).json(order)

})

export const orderDetail = catchAsync(async(req,res,next) => {
   const {id} = req.params;

   const order = await orderService.findOneOrder(id)

   if(!order){
      return res.status(404).json({
         status: 'error',
         message: 'Order not found'
      })
   }
   return res.status(200).json(order)
})
