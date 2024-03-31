const User = require("../models/user");

module.exports = async(req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user || user.userType != "admin") return res.redirect("/");
        next();
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};