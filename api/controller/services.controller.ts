import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Services } from "../entity";

import { getRepository } from "typeorm";


export class ServicesController extends DefaultController {
  protected initializeRoutes(): express.Router {
    console.log("inside services controller");
    const router = express.Router();
    const servicesRepo = getRepository(Services);
    router.route("/services")
      .get((req: Request, res: Response) => {
        console.log("retrieving services information");
        servicesRepo.find().then((services: Services[]) => {
          res.status(200).send(services);
      })
    });
    return router;
  }
}