import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Services } from "../entity";

import { getRepository } from "typeorm";


export class ServicesController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();
    const servicesRepo = getRepository(Services);
    router.route("/services")
      .get((req: Request, res: Response) => {
        console.log("retrieving services information");
        servicesRepo.find().then((services: Services[]) => {
          res.status(200).send(services);
      })
    });

    router.route("/newservice")
    .post((req: Request, res: Response) => {
      const newService = new Services();
      newService.seTitle = req.body.seTitle;
      newService.sePrice = req.body.sePrice;
      newService.seDescription = req.body.seDescription;
      servicesRepo.save(newService).then((savedService: Services) => {
        res.status(200).send(savedService);
        console.log("New Service Added");
      });
    });

    router.route("/services/:id")
    .delete((req: Request, res: Response) => {
      servicesRepo.findOne(req.params.id).then((foundService: Services | undefined) => {
        if (foundService == undefined) {
          console.log("Error when deleting service")
          res.sendStatus(404);
          return;
        }
        servicesRepo.delete(foundService).then(x => {
          res.status(200).send(foundService);
          console.log("Service deleted successfully");
        });
      });
    });

    router.route("/updateservices/:id")
    .put((req: Request, res: Response) => {
      console.log("inside updating services")
      servicesRepo.findOne(req.params.id).then((foundService: Services | undefined) => {
        if (foundService == undefined) {
          console.log("Error updating service")
          res.sendStatus(404);
          return;
        }

        foundService.seTitle = req.body.seTitle
        foundService.sePrice = req.body.sePrice
        foundService.seDescription = req.body.seDescription

        servicesRepo.save(foundService).then((updatedService: Services) => {
          console.log("Service Updated Successfully")
          res.status(200).send(updatedService);
        });
      });
    });

    return router;
  }
}