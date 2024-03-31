const mongoose = require("mongoose");

const Appointment = require("../models/appointment");
const User = require("../models/user");

// renders appointment page
const getAppointment = async (req, res) => {
  res.render("appointment", { date: null });
};

const checkDate = async (req, res) => {
  const { date } = req.body;
  const slot = {
    date: date,
    slot1: "",
    slot2: "",
    slot3: "",
    slot4: "",
    slot5: "",
    slot6: "",
    slot7: "",
    slot8: "",
    slot9: "",
    slot10: "",
  };

  try {
    const getdate = await Appointment.find({ date });

    if (getdate.length != 0) {
      getdate.map((dates) => {
        slot[dates.time] = dates.time;
      });
      res.render("appointment", { date: date, ...slot });
    } else {
      res.render("appointment", { date: date, ...slot });
    }
  } catch (error) {
    console.log(error);
  }
};


// sets time slot for the user
const setTimeSlot = async (req, res) => {
  const { date } = req.params;
  const slotsObj = req.body;

  try {
    const slotsArray = [];
    for (const slot in slotsObj) {
      if (Object.hasOwnProperty.call(slotsObj, slot)) {
        const obj = { date, time: slot };
        slotsArray.push(obj);
      }
    }

    const response = await Appointment.insertMany(slotsArray);
    res.redirect("/appointment");
  } catch (error) {
    console.log(error);
    res.render("appointment", { date: null });
  }
};

// books appointment for the user
const bookAppointment = async (req, res) => {
  const { date } = req.body;
  const slot = {
    date: date,
    slot1: "",
    slot2: "",
    slot3: "",
    slot4: "",
    slot5: "",
    slot6: "",
    slot7: "",
    slot8: "",
    slot9: "",
    slot10: "",
  };

  try {
    const getdate = await Appointment.find({
      date,
      isTimeSlotAvailable: { $eq: true },
    }).exec();

    if (getdate.length != 0) {
      getdate.map((dates) => {
        slot[dates.time] = dates._id;
      });
      res.render("g2test", {
        user: null,
        appointment: null,
        date: date,
        ...slot,
      });
    } else {
      res.render("g2test", {
        user: null,
        appointment: null,
        date: date,
        ...slot,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// book perticular date slot for the user for g2 test
const bookAppointmentSlot = async (req, res) => {
  let user;
  const { time } = req.body;

  try {
    user = await User.findById(req.session.userId);

    if (user) {
      user.g2Exam.appointmentID = new mongoose.Types.ObjectId(time.trim());
      user = await user.save();
      await Appointment.findByIdAndUpdate(time.trim(), {
        isTimeSlotAvailable: false,
      });
    }
    res.redirect("/g2");
  } catch (error) {
    console.log(error);
    res.redirect("/g2");
  }
};

// book perticular date slot for the user for g test
const bookAppointmentg = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const { date } = req.body;
  const slot = {
    date: date,
    slot1: "",
    slot2: "",
    slot3: "",
    slot4: "",
    slot5: "",
    slot6: "",
    slot7: "",
    slot8: "",
    slot9: "",
    slot10: "",
  };

  try {
    const getdate = await Appointment.find({
      date,
      isTimeSlotAvailable: { $eq: true },
    }).exec();

    if (getdate.length != 0) {
      getdate.map((dates) => {
        slot[dates.time] = dates._id;
      });
      res.render("gtest", {
        user: user,
        appointment: null,
        date: date,
        ...slot,
      });
    } else {
      res.render("gtest", {
        user: user,
        appointment: null,
        date: date,
        ...slot,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bookAppointmentSlotg = async (req, res) => {
  let user;
  const { time } = req.body;

  try {
    user = await User.findById(req.session.userId);

    if (user) {
      user.gExam.appointmentID = new mongoose.Types.ObjectId(time.trim());
      user = await user.save();
      await Appointment.findByIdAndUpdate(time.trim(), {
        isTimeSlotAvailable: false,
        examType: "G",
      });
    }
    res.render("gtest", {
      user: user,
      appointment: null,
      date: date,
      ...slot,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/g");
  }
};



module.exports = {
  getAppointment,
  checkDate,
  setTimeSlot,
  bookAppointment,
  bookAppointmentSlot,
  bookAppointmentg,
  bookAppointmentSlotg,
};
