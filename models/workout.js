const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {type: Date,default: Date.now},
    exercises: [{
        type: {type: String,required: true},
        name: {type: String,required: true},
        duration: {type: Number,required: true},
        weight: {type: Number},
        reps: {type: Number},
        sets: {type: Number},
        distance: {type: Number}
    }]
});

const workout = mongoose.model("workout", workoutSchema);

module.exports = workout;

// let workoutSeed = [
    //     {
    //       day: new Date().setDate(new Date().getDate()-10),
    //       exercises: [
    //         {
    //           type: "resistance",
    //           name: "Bicep Curl",
    //           interviewTime: 20,
    //           interviewLocation: 100,
    //           reps: 10,
    //           sets: 4
    //         }
    //       ]