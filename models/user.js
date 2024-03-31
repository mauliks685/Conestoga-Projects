const mongoose = require("mongoose");


// user model: can be use to pass data in the views and database
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    default: "default",
    required: true,
  },
  lastName: {
    type: String,
    default: "default",
    required: true,
  },
  licenseNumber: {
    type: String,
    default: "default",
    required: true,
  },
  userName: {
    type: String,
    default: "default",
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: "default",
    required: true,
  },
  userType: {
    type: String,
    enum: ["driver", "examiner", "admin"],
    default: "driver",
    required: true,
  },
  dob: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  g2Exam: {
    appointmentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    comment: {
      type: String,
      default: " ",
      required: true,
    },
    isPassed: {
      type: Boolean,
      default: false,
      required: true,
    },
    hasTaken: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  gExam: {
    appointmentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    comment: {
      type: String,
      default: " ",
      required: true,
    },
    isPassed: {
      type: Boolean,
      default: false,
      required: true,
    },
    hasTaken: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  carDetails: {
    make: {
      type: String,
      default: "default",
      required: true,
    },
    model: {
      type: String,
      default: "default",
      required: true,
    },
    year: {
      type: Number,
      default: 0000,
      required: true,
    },
    platNumber: {
      type: String,
      default: "default",
      required: true,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
