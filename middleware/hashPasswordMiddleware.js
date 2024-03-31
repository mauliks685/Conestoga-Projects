const bcrypt = require("bcrypt");

// used to encrypt license number

const hashLicense = async(req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashLicense = await bcrypt.hash(req.body.licenseNumber, salt);

    req.body.licenseNumber = hashLicense;

    next();
};


// used to encrypt password
const hashPassword = async(req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password[0], salt);

    req.body.hashedPassword = hashedPassword;

    next();
};

module.exports = { hashLicense, hashPassword };