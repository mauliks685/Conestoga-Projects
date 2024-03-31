const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const dashboard = require("../controllers/dashboard");
const { getG2, createUser } = require("../controllers/g2Test");
const { getG, updateUser } = require("../controllers/gTest");
const {
  bookAppointment,
  bookAppointmentSlot,
  bookAppointmentg,
  bookAppointmentSlotg,
} = require("../controllers/appointment");

/**
 ** Route: /
 ** Method: GET
 */
router.get("/", dashboard);

/**
 ** Route: /g2
 ** Method: GET
 */
router.get("/g2", authMiddleware, getG2);

/**
 ** Route: /g2
 ** Method: POST
 */
router.post("/g2", authMiddleware, createUser);

/**
 ** Route: /bookAppointment/date
 ** Method: POST
 */
router.post("/bookAppointment/date", authMiddleware, bookAppointment);

/**
 ** Route: /bookAppointment/setTimes
 ** Method: POST
 */
router.post("/bookAppointment/setTimes", authMiddleware, bookAppointmentSlot);

/**
 ** Route: /bookAppointmentg/date
 ** Method: POST
 */
router.post("/bookAppointmentg/date", authMiddleware, bookAppointmentg);

/**
 ** Route: /bookAppointmentg/setTimes
 ** Method: POST
 */
router.post("/bookAppointmentg/setTimes", authMiddleware, bookAppointmentSlotg);

/**
 ** Route: /g
 ** Method: GET
 */
router.get("/g", authMiddleware, getG);

/**
 ** Route: /g
 ** Method: POST
 */
router.post("/g", authMiddleware, updateUser);

module.exports = router;
