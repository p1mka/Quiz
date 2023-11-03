const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    results: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result",
      },
    ],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
