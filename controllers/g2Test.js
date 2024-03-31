const mongoose = require("mongoose");

const User = require("../models/user");
const Appointment = require("../models/appointment");

// Render G2 Page
const getG2 = async (req, res) => {
  const timeSlots = {
    slot1: "09:00AM to 09:30AM",
    slot2: "09:30AM to 10:00AM",
    slot3: "10:00AM to 10:30AM",
    slot4: "10:30AM to 11:00AM",
    slot5: "11:00AM to 11:30AM",
    slot6: "11:30AM to 12:00PM",
    slot7: "12:00PM to 12:30PM",
    slot8: "12:30PM to 01:00PM",
    slot9: "01:00PM to 01:30PM",
    slot10: "01:30PM to 02:00PM",
  };
  // try and catch condition with if else
  try {
    const user = await User.findById(req.session.userId);

    if (user.firstName == "default") {
      res.render("g2test", {
        user: user,
        date: null,
        appointment: null,
      });
    } else if (user.g2Exam.isPassed === true) {
      res.render("g2test", {
        user: user,
        date: null,
        appointment: null,
      });
    } else if (mongoose.Types.ObjectId.isValid(user.g2Exam.appointmentID)) {
      const appointmentDetail = await Appointment.findById(
        new mongoose.Types.ObjectId(user.g2Exam.appointmentID)
      );
      const appointmentObj = {
        firstName: user.firstName,
        date: appointmentDetail.date,
        time: timeSlots[appointmentDetail.time],
      };
      res.render("g2test", {
        user: null,
        date: null,
        appointment: appointmentObj,
      });
    } else {
      res.render("g2test", {
        user: null,
        date: null,
        appointment: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect("/g2");
  }
};

const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    licenseNumber,
    dob,
    make,
    model,
    year,
    platNumber,
  } = req.body;
  try {
    await User.findByIdAndUpdate(
      req.session.userId,
      {
        firstName,
        lastName,
        licenseNumber,
        dob,
        carDetails: {
          make,
          model,
          year,
          platNumber,
        },
      },
//       { new: true } 
    );
    res.redirect("/g2");
  } catch (error) {
    console.log(error);
    res.redirect("/g2");
  }
};

module.exports = {
  getG2,
  createUser,
  
};
