const pool = require("../db/connect");
const express = require("express");
const pdf = require("html-pdf");
const jwt = require("jsonwebtoken");
const router = express.Router();
const resultController = require("./resultCont");
const pdfTemplate = require("../documents/index.jsx");

router.post("/result/check", resultController.checkIfAvailable);

/*
==========
ROUTES
==========
*/
// inputing new result
router.post(
  "/result",
  resultController.checkIfAvailable,
  resultController.insertNewResult
);
// inputing new second ca result
router.post("/result/secondca", resultController.insertSecondCa);

// inputing new exam score
router.post("/result/exam", resultController.insertExam);

// getting term result for a studennt
router.get("/result/term", resultController.getStudentTermResult);

// getting term result for a whole class
router.get("/result/term/class", resultController.getClassTermResult);

// gettiing a session result for a student
router.get("/result/session/student", resultController.getStudentSessionResult);

// getting a session result for a class
router.get("/result/session/class", resultController.getClassSessionResult);

router.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(), {}).toFile("./public/result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});

router.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

/*
==========
LOGICS
==========
*/

// getting the heightest and the lowest score a particular subject

module.exports = router;
