const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/index", function (req, res) {
    console.log('here@index');
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/stats", function (req, res) {
    console.log('here@stats');
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});


app.get("/exercise", function (req, res) {
    console.log('here@exercise');
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/api/workouts/range", (req, res) => {
    console.log('get>workouts>range');
    console.log(req);
    db.Workout
        .find({})
        .then((workout) => {
            for (var i = 0; i < workout.length; i++) {
                console.log(workout[i]);
            }
            res.json(workout)
        }).catch(err => {
            res.json(err)
        });
});

app.get("/api/workouts", (req, res) => {
    console.log('get>workouts');
    db.Workout
        .find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
});

app.post("/api/workouts", (req, res) => {
    console.log('create>workouts');
    db.Workout
    .create({})
    .then(data => {
        res.json(data)
    }).catch(err => {
        console.log("err", err)
        res.json(err)
    })
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
    console.log('update?>workouts');
    db.Workout
    .findByIdAndUpdate(
        params.id, { $push: { exercises: body } })
        .then(data => {
            console.log('update>exercise');
            res.json(data)
        })
        .catch(err => {
            console.log("err", err)
            res.json(err)
        })
});

mongoose.connect(
    "mongodb://localhost/workout",
);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Listening on ${PORT}`);