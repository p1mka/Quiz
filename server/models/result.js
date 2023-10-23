const mongoose = require("mongoose");

const ResultSchema = mongoose.Schema({
  date: {
    type: String,
  },
  quizLength: {
    type: Number,
  },
  answers: {
    type: Array,
    required: true,
  },
});

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;
