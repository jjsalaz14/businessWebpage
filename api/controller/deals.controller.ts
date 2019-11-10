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

      router.route("/deals/:id")
      .delete((req: Request, res: Response) => {
        dealsRepo.findOne(req.params.id).then((foundDeal: Deals | undefined) => {
          if (foundDeal == undefined) {
            console.log("Error when deleting deal")
            res.sendStatus(404);
            return;
          }
          dealsRepo.delete(foundDeal).then(x => {
            res.status(200).send(foundDeal);
            console.log("Deal deleted successfully");
          });
        });
      });


    return router;
  }
}