import User from "../users/users.model.js";
import Review from "./review.model.js";

export class ReviewService {
    static async findOneReview(id){
        return Review.findOne({
            where: {
                id: id,
                status: 'active'
            },
            include: [
                {
                    model: User
                }
            ]
        })
    }

    static async create(data){
        return await Review.create(data)
    }

    static async updateReview(review, data){
        return await review.update(data)
    }
}