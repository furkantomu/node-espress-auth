import { Express, Request, Response } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";
import {
  createUserSessionHandler,
  deleteAllSessionsHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import {
  createUserHandler,
  getCurrentUser,
} from "./controller/user.controller";

import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.shema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

const routes = (app: Express) => {
  //
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.get("/api/current-user", requireUser, getCurrentUser);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);
  app.delete("/api/all-sessions",requireUser,deleteAllSessionsHandler)

  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  app.get(
    "/api/products/:productId",
    requireUser,validateResource(getProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
};

export default routes;

/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */

/**
 * @openapi
 * '/api/users':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * '/api/sessions':
 *  post:
 *     tags:
 *     - User session
 *     summary: Create a session
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/createSessionSchema'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/createSessionResponse'
 *      401:
 *        description: Invalid email or password
 */

/**
 * @openapi
 * /api/sessions:
 *  get:
 *     tags:
 *     - Get session
 *     summary: Get user Sessions
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getUserSessionResponse'
 *      403:
 *        description: Forbidden
 */

/**
 * @openapi
 * /api/current-user:
 *  get:
 *     tags:
 *     - Get current user
 *     summary: logged in user
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getCurrentUserSessionResponse'
 *      403:
 *        description: Forbidden
 */



/**
 * @openapi
 * /api/sessions:
 *  delete:
 *     tags:
 *     - User Logout
 *     summary: current user logout
 *     responses:
 *       200:
 *          description: Access Token:Null Refresh Token:Null
 *       403:
 *          description: Forbidden
 */

 /**
 * @openapi
 * /api/all-sessions:
 *  delete:
 *     tags:
 *     - Close all sessions
 *     responses:
 *       200:
 *          description: All sessions are closed
 *       403:
 *          description: Forbidden
 */
