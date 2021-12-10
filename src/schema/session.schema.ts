import { object,string } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    createSessionSchema:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: example@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    createSessionResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *        refreshToken:
 *          type: string
 */

export const createSessionSchema = object({
    body: object({
        email:string({
            required_error:'Email is required'
        }),
        password: string({
            required_error:'Password is required'
        })
    })
})

/**
 * @openapi
 * components:
 *  schemas:
 *    getUserSessionResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        user:
 *          type: string
 *        valid:
 *          type: boolean
 *        userAgent:
 *          type: string
 *        createdAt:
 *          type: date
 *        updatedAt:
 *           type: date
 *        __v: 
 *           type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    getCurrentUserSessionResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        email:
 *          type: string
 *        name:
 *          type: boolean
 *        createdAt:
 *          type: date
 *        updatedAt:
 *           type: date
 *        __v: 
 *           type: string
 *        session:
 *           type: string
 *        iat:
 *          type: number
 *        exp:
 *          type: number
 */