const express = require("express");
// const fetch= require("node-fetch");
// mod.cjs
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
// const API_KEY="8UHT67ITOFDGRDHG";
// const { thingspeak_handler } = require('../handler/thingspeak_handler');

const middlewares = require("../middlewares/auth");
const driver_profile = require("../handler/driver_handler/driver_profile_handler");
const driver = require("../handler/driver_handler/driver");
const traffic = require("../handler/traffic_handler/traffic_profile_handler");
const gust = require("../handler/gust_handler");
const router = express.Router();
const device = require("../handler/device_handler/device");
const admin = require("../handler/admin_handler/admin_login");
const road = require("../handler/road_handler/road");
//driver routes
router.post(
  "/driver/driver_signup",
  middlewares.authenticate,
  middlewares.Authorize(["admin"]),
  driver_profile.driver_signup
);
router.post("/driver/driver_login", driver_profile.driver_login);
router.post("/driver/accident_form", driver.accident_report);
router.post("/driver/send_email", driver_profile.sendEmail);
router.get(
  "/driver/driver_by_id/:driver_id",
  middlewares.authenticate,
  middlewares.Authorize(["admin", "traffic"]),
  driver.findDriverById
);
router.put(
  "/driver/change_password",
  middlewares.authenticate,
  driver_profile.change_password
);
router.post(
  "/driver/number_of_vehcle",
  middlewares.authenticate,
  device.number_of_vehcle
);

//traffic routes
router.post(
  "/traffic/traffic_signup",
  middlewares.authenticate,
  middlewares.Authorize(["admin"]),
  traffic.traffic_signup
);
router.post("/traffic/traffic_login", traffic.traffic_login);
router.get("/traffic/issued_cases", traffic.issued_cases);
router.get("/traffic/reported_cases", traffic.reported_cases);
router.post("/traffic/report_form", traffic.traffic_report_form);
router.get("/test", traffic.test);

//device routes
router.post("/device/location_information", device.overspeed);

router.post("/device/new_location", device.add_location); //takes input lat and lon only

//routers that weill be implemted
/*
  traffic analysis -return data informations about a single traffic 
                   -return data info about multiple traffics in a certain region
                   -
  
*/

//road routes

router.post("/roads/new_road", road.add_roads);
router.post("/roads/new_path", road.add_path);
router.get("/roads/list_of_roads", road.get_path_roads);
router.get("/roads/get_destinations", road.get_destinations);
router.get("/road/get_congesion_info/:road", road.get_congesion_info);
//admin apis
router.post("/admin/admin_login", admin.admin_login);

//gust routes

router.post("/gust/gust_form", gust.gust_form);

//thingspeak route
// router.get("/thingspeak",thingspeak_handler)

module.exports = router;
