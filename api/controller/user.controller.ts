import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import Path from "path";

import { getRepository } from "typeorm";
import { Session, User } from "../entity";

export class UserController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    const userRepo = getRepository(User);

    router.route("/users")
      .get((req: Request, res: Response) => {
        userRepo.find().then((users: User[]) => {
          res.status(200).send({ users });
        });
      });

    return router;
  }
}

export default UserController;