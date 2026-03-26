import express from "express";
import controller from "../controllers/user";
import hazardReportController from "../controllers/hazardreport";
import { checkAuth, hasPermission } from "../middlewares/auth";

const router = express.Router();

// Admin auth routes
router.post("/admin/signup", controller.adminSignup);
router.post("/admin/signin", controller.adminSignin);

// Admin hazard report management routes
router.get(
  "/admin/reports",
  checkAuth,
  hasPermission("view_reports"),
  hazardReportController.getAllHazardReports,
);

export default router;
