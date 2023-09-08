import { CustomError } from "../errors/custom_error.mjs"

export const errHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg: "Something went wrong, try again later!"})
}