import { Router } from "express";
import EventController from "../controllers";

const router: Router = Router();

router.get("/events", EventController.getEvents);

export default router;
