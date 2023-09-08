export const asyncWrapper = (controller) => {
    return async (res, req, next) => {
        try {
            await controller(res, req, next)
        } catch(err) {
            next(err)
        }
    }
}