import { AppError, catchAsync } from "../../errors/index.js";
import { ReviewService } from "./review.service.js";

export const validExistReview = catchAsync(async(req,res,next) => {
    const { id } =req.params;

    const review = await ReviewService.findOneReview(id);


    if(!review){
        return next(new AppError('review not fount',404))
    }

    // console.log(review.user.name);

    req.user = review.user;
    req.review = review;
    next();
})

