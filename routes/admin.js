const router = require("express").Router();

const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getAppointment,
  checkDate,
  setTimeSlot,
} = require("../controllers/appointment");
const { getCandidates } = require("../controllers/examiner");

/**
 ** Route: /appointment
 ** Method: GET
 */
router.get("/appointment", adminMiddleware, getAppointment);

/**
 ** Route: /appointment/date
 ** Method: POST
 */
router.post("/appointment/date", adminMiddleware, checkDate);

/**
 ** Route: /appointment/setTimes
 ** Method: POST
 */
router.post("/appointment/setTimes/:date", adminMiddleware, setTimeSlot);

/**
 ** Route: /candidate
 ** Method: GET
 */
router.get("/candidate", adminMiddleware, getCandidates);

module.exports = router;
