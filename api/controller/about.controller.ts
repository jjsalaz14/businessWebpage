import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { About } from "../entity";

import { getRepository } from "typeorm";


export class AboutController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();
    const aboutRepo = getRepository(About);
    router.route("/about")
      .get((req: Request, res: Response) => {
        console.log("retrieving about information");
        aboutRepo.find().then((about: About[]) => {
          res.status(200).send(about);
      })
    });

    router.route("/")
      .get((req: Request, res: Response) => {
        console.log("retrieving phone information");
        aboutRepo.find().then((about: About[]) => {
          res.status(200).send(about);
        })
    });

    return router;
  }
}