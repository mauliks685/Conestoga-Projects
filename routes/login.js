const router = require("express").Router();

const {
    signUp,
    login,
    getSignUp,
    logout,
    getLogin,
} = require("../controllers/login");

const { hashPassword } = require("../middleware/hashPasswordMiddleware");
const redirectIfAuthenticatedMiddleware = require("../middleware/redirectIfAuthenticatedMiddleware");

/**
 ** Route: /login
 ** Method: GET
 */
router.get("/login", redirectIfAuthenticatedMiddleware, getLogin);

/**
 ** Route: /signup
 ** Method: POST
 */
router.post("/signup", hashPassword, signUp);

/**
 ** Route: /signup
 ** Method: GET
 */
router.get("/signup", getSignUp);

/**
 ** Route: /login
 ** Method: POST
 */
router.post("/login", login);

/**
 ** Route: /logout
 ** Method: GET
 */
router.get("/logout", logout);

module.exports = router;