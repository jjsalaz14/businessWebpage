import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Deals } from "../entity";

import { getRepository } from "typeorm";


export class DealsController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();
    const dealsRepo = getRepository(Deals);
    router.route("/deals")
      .get((req: Request, res: Response) => {
        console.log("retrieving deals information");
        dealsRepo.find().then((services: Deals[]) => {
          res.status(200).send(services);
      })
    });

    router.route("/newdeal")
      .post((req: Request, res: Response) => {
        const newDeal = new Deals();
        newDeal.title = req.body.title;
        newDeal.expiration = req.body.expiration;
        newDeal.description = req.body.description;
        dealsRepo.save(newDeal).then((savedDeal: Deals) => {
          res.status(200).send(savedDeal);
          console.log("New Deal Added");
        });
      });


    return router;
  }
}