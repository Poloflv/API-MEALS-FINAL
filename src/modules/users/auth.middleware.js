import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import { AppError, catchAsync } from '../../errors/index.js'
import { envs } from '../../config/enviroments/enviroments.js'
import { UserServive } from './users.services.js'

const userService = new UserServive()


export const protect = catchAsync(async (req,res,next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(
            new AppError('You are not logget in! Please log in to get access',401)
        );
    }

    const decoded = await promisify(jwt.verify)(
        token,
        envs.SECRET_JWT_SEED
    );

    const user = await userService.findOneUserById(decoded.id)

    if(!user){
        return next(
            new AppError('The owner of this token it not longer available',401)
        );
    }


    req.sessionUser = user;
    next();

});




export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.sessionUser.role)) {
            return next(
                new AppError('You do not have permission to perform this action!',401)
            );
        }

        next()
    };
}


export const protectAccountOwner = (req,res,next) => {
    // const {user, sessionUser} = req;
    // if(user.id !== sessionUser.id){
    //     return next(new AppError('You do not own this account'),401)
    // }
    // next()
}

export const validateExistUser = catchAsync(async(req,res,next) => {
    const {id} = req.params;

    const user = await userService.findOneUserById(id);

    if(!user){
        return next(new AppError(`User not found with id: ${id}`,404))
    }

    req.user = user

    next()
})