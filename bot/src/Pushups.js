const mongoose = require("mongoose");
const moment = require("moment");
const pushups = {};

const PushupSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  today: {
    type: Date,
    required: true,
  },
  pushups_today: {
    type: Number,
    required: true,
    default: 0,
  },
  history: [
    {
      date: {
        type: Date,
        required: true,
      },
      pushups: {
        type: Number,
        required: true,
      },
    },
  ],
});

PushupSchema.methods.incrementPushups = function (pushups) {
  // Get today's date
  const today = moment().startOf("day");

  if (moment(this.today).isSame(today, "day")) {
    // If it is, increment pushups_today
    this.pushups_today += pushups;
  } else {
    // If it's not, reset pushups_today and add a new entry to the history array
    this.history.push({
      date: this.today,
      pushups: this.pushups_today,
    });

    this.pushups_today = pushups;
    this.today = new Date();
  }

  // Save the document
  return this.save();
};

// Create the model from the schema
const Pushup = mongoose.model("Pushup", PushupSchema);

module.exports = { Pushup };
