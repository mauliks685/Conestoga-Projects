const bcrypt = require("bcrypt");

const User = require("../models/user");

const getLogin = (req, res) => {
    res.render("login", { signUpMessage: "", loginMessage: "" });
};

const getSignUp = (req, res) => {
    res.redirect("/login");
};

const login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName: userName });

        if (user) {
            const isMatched = await bcrypt.compare(password, user.password);
            if (isMatched) {
                req.session.userId = user._id;
                req.session.userType = user.userType;
                res.redirect("/");
            } else {
                res.render("login", {
                    loginMessage: "Username and/or Password are incorrect!",
                    signUpMessage: "",
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.render("login", {
            loginMessage: "Username and/or Password are incorrect!",
            signUpMessage: "",
        });
    }
};

const signUp = async (req, res) => {
    const { userName, password, hashedPassword, userType } = req.body;

    try {
        const isFound = await User.findOne({
            userName,
        });

        if (isFound) {
            res.render("login", {
                signUpMessage: "Username is not available!",
                loginMessage: "",
            });
            return;
        }

        if (password[0] === password[1]) {
            const user = new User({
                userName: userName,
                password: hashedPassword,
                userType: userType,
            });
            const newUser = await user.save();
            res.render("login", {
                signUpMessage: "Signup successfull, Please Login!",
                loginMessage: "",
            });
        } else {
            res.render("login", {
                signUpMessage: "Both password should match!",
                loginMessage: "",
            });
        }
    } catch (error) {
        res.render("login", {
            signUpMessage: "Unable to Signup, Please try again!",
            loginMessage: "",
        });
    }
};

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

module.exports = { getLogin, getSignUp, login, signUp, logout };