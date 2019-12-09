import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import Path from "path";

import { getRepository, AdvancedConsoleLogger } from "typeorm";
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

      router.route("/users/:id").get((req: Request, res: Response) => {
        
        userRepo.findOne(req.params.id).then(
          (user: User | undefined) => {
            if (user) {
              res.send({ user });
            } else {
              res.status(404).send({reason: "no user with that id exists"});
              return;
            }
          }
        );
      });

    return router;
  }
}

export default UserController;