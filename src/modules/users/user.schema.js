import z from 'zod';
import { extractValidationData } from '../../common/utils/extracErrorData.js';

const registerUserSchema = z.object({
    name: z.string().min(3, {message: 'name is too short'}),
    email: z.string().email({message: 'invalid email'}),
    password: z.string().min(8,{ message: 'password is too short'})
})

const loginValidation = z.object({

    email: z.string().email({message: 'invalid email'}),
    password: z.string().min(8,{ message: 'password is too short'})
})

const updateUserSchema = z.object({
    email: z.string().email({message: 'invalid email'}),
    name: z.string().min(3, {message: 'name is too short'}),
})

export const validateRegister = (data) => {
    const result = registerUserSchema.safeParse(data);

    const {hasError,errorMessages, data: userData} = extractValidationData(result)

    return {hasError, errorMessages, userData}
}


export const validateLogin = (data) => {
    const result = loginValidation.safeParse(data);

    const {hasError,errorMessages, data: userData} = extractValidationData(result)

    return {hasError, errorMessages, userData}
}


export const updateUserValidation = (data) => {
    const result = updateUserSchema.safeParse(data);

    const {hasError,errorMessages, data: userData} = extractValidationData(result)

    return {hasError, errorMessages, userData}
}