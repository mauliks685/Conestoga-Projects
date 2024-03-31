const mongoose = require("mongoose");


// appointment model: can be use to pass data in the views and database
const appointmentSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  time: {
    type: String,
    default: "slot1",
    required: true,
  },
  isTimeSlotAvailable: {
    type: Boolean,
    default: true,
    required: true,
  },
  examType: {
    type: String,
    enum: ["G2", "G"],
    default: "G2",
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
