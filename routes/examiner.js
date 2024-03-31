const router = require("express").Router();

const examinerMiddleware = require("../middleware/examinerMiddleware");
const {
  getExaminer,
  takeExam,
  g2result,
  gresult,
} = require("../controllers/examiner");

/**
 ** Route: /examiner
 ** Method: GET
 */
router.get(/examiner/, examinerMiddleware, getExaminer);

/**
 ** Route: /exam/:id
 ** Method: GET
 */
router.get("/exam/:id", examinerMiddleware, takeExam);

/**
 ** Route: /result/G2/:id
 ** Method: GET
 */
router.post("/result/G2/:id", examinerMiddleware, g2result);

/**
 ** Route: /result/G/:id
 ** Method: GET
 */
router.post("/result/G/:id", examinerMiddleware, gresult);

module.exports = router;
