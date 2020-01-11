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




    router.route("/about/:id")


    .put((req: Request, res: Response) => {
      aboutRepo.findOne(req.params.id).then((foundAbout: About | undefined) => {
        if (foundAbout == undefined) {
          res.sendStatus(404);
          return;
        }

        foundAbout.mHours = req.body.mHours;
        foundAbout.tHours = req.body.tHours;
        foundAbout.wHours = req.body.wHours;
        foundAbout.rHours = req.body.rHours;
        foundAbout.fHours = req.body.fHours;
        foundAbout.saHours = req.body.saHours;
        foundAbout.suHours = req.body.suHours;
        foundAbout.phoneNumber = req.body.phoneNumber;
        foundAbout.street = req.body.street;
        foundAbout.city = req.body.city;
        foundAbout.stateName = req.body.stateName;
        foundAbout.zipcode = req.body.zipcode;

        aboutRepo.save(foundAbout).then((updatedAbout: About) => {
          console.log(updatedAbout)
          res.status(200).send(updatedAbout);
        });
      });
    });




    // .put((req: Request, res: Response) => {
    //   aboutRepo.findOne(req.params.id).then((foundAbout: About | undefined) => {
    //     if (foundAbout == undefined) {
    //       res.sendStatus(404);
    //       return;
    //     }

    //     foundAbout.mHours = req.body.mHours;
    //     foundAbout.tHours = req.body.tHours;
    //     foundAbout.wHours = req.body.wHours;
    //     foundAbout.rHours = req.body.rHours;
    //     foundAbout.fHours = req.body.fHours;
    //     foundAbout.saHours = req.body.saHours;
    //     foundAbout.suHours = req.body.suHours;
    //     foundAbout.phoneNumber = req.body.phoneNumber;
    //     foundAbout.street = req.body.street;
    //     foundAbout.city = req.body.city;
    //     foundAbout.stateName = req.body.stateName;
    //     foundAbout.zipcode = req.body.zipcode;

    //     aboutRepo.save(foundAbout).then((updatedAbout: About) => {
    //       console.log(updatedAbout)
    //       res.status(200).send(updatedAbout);
    //     });
    //   });
    // });

    return router;
  }
}