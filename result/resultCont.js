const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db/connect");
const Query = require("../model/queryClass");
const QueryMultiple = require("../model/psycomotorClass");
const table = "year1_result_table";
/*
==========
ROUTES
==========
*/
let Maxresult = [];

const fetchMax = async (arr, term, session) => {
  if (arr.length === 0) return Maxresult;

  const subject = arr[0];
  const max = await pool.query(
    "SELECT MAX(total) AS maximumscore FROM year1_result_table WHERE subject_id = $1 AND term = $2 AND session= $3",
    [arr[0], term, session]
  );
  const maxValue = max.rows[0];
  const min = await pool.query(
    "SELECT MIN(total) AS minimumscore FROM year1_result_table WHERE subject_id = $1 AND term = $2 AND session= $3",
    [arr[0], term, session]
  );
  const minValue = min.rows[0];
  Maxresult.push({ subject, ...maxValue, ...minValue });

  return fetchMax(arr.slice(1), term, session);
};

// inserting total scores seperately
exports.findTotal = async (req, res, next) => {
  const { class_id, subject_id, admission_no, term, session } = req.body;
  const result = await pool.query(
    `INSERT INTO ${table} SET total = welcome_test + first_ca + first_assignment + second_ca + second_assignment + exam WHERE class_id =$1 AND subject_id = $2 AND admission_no =$3 AND term =$4 AND session = $5`,
    [class_id, subject_id, admission_no, term, session]
  );
  console.log(result);
};

exports.testResult = async (req, res, next) => {
  const fieldvalue = [req.body.admission_no, req.body.term, req.body.session];
  const field = ["admission_no", "term", "session"];
  const fieldtofectch =
    "first_ca, second_ca, exam, total, subject_name, subject_id";
  const table2 = "subject_tbl";
  const relation = "year1_result_table.subject_id= subject_tbl.id";
  const result = await QueryMultiple.fetchByMultipleLeftJoin(
    table,
    table2,
    fieldtofectch,
    relation,
    field,
    fieldvalue
  );
  const subjects = [
    ...new Set(
      result.map((subject) => {
        return subject.subject_id;
      })
    ),
  ];
  const MinMax = await fetchMax(subjects, req.body.term, req.body.session);

  res.send({ result, MinMax });
};

// checking if a result is availabe Note: this will be used as middleware to check fro result availability avoid redundancy
exports.checkIfAvailable = async (req, res, next) => {
  const fieldvalue = [
    req.body.class_id,
    req.body.subject_id,
    req.body.admission_no,
    req.body.term,
    req.body.session,
  ];
  const field = ["class_id", "subject_id", "admission_no", "term", "session"];
  const result = await QueryMultiple.fetchByMultiple(table, field, fieldvalue);
  if (result.length > 0) {
    const field = ["class_id", "subject_id", "admission_no", "term", "session"];
    const updatefield = ["welcome_test", "first_assignment", "first_ca"];
    const allfields = [
      req.body.welcome_test,
      req.body.first_assignment,
      req.body.first_ca,
      req.body.class_id,
      req.body.subject_id,
      req.body.admission_no,
      req.body.term,
      req.body.session,
    ];
    const updateResult = await QueryMultiple.UpdateWithMultiple(
      table,
      updatefield,
      field,
      allfields
    );
    if (updateResult === 1) {
      res.status(201).json({
        message: "result updated",
      });
    } else {
      res.status(500).json({
        message: "bad request",
      });
    }
  } else {
    next();
  }
};

// inputing new result
exports.insertNewResult = async (req, res, next) => {
  const fieldvalue = [
    req.body.class_id,
    req.body.subject_id,
    req.body.admission_no,
    req.body.term,
    req.body.first_assignment,
    req.body.second_assignment,
    req.body.welcome_test,
    req.body.first_ca,
    req.body.second_ca,
    req.body.exam,
    req.body.total,
    req.body.grade,
    req.body.session,
  ];
  const field = [
    "class_id",
    "subject_id",
    "admission_no",
    "term",
    "first_assignment",
    "second_assignment",
    "welcome_test",
    "first_ca",
    "second_ca",
    "exam",
    "total",
    "grade",
    "session",
  ];

  const QueryInstance = new Query(table, field);
  QueryInstance.turnArray();
  try {
    const result = await QueryInstance.postAll(fieldvalue);
    if (result.rowCount === 1) {
      res.status(201).json({
        message: "new  result  added ",
      });
    } else {
      res.status(500).json({
        message: "error occured",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ erclass_id });
  }
};
//  updating result I.e inserting second ca

exports.insertSecondCa = async (req, res, next) => {
  //  console.log("work");
  const fieldvalue = [
    req.body.second_assignment,
    req.body.second_ca,
    req.body.class_id,
    req.body.subject_id,
    req.body.admission_no,
    req.body.term,
    req.body.session,
  ];
  const updatefield = ["second_assignment", "second_ca"];
  const clausefield = [
    "class_id",
    "subject_id",
    "admission_no",
    "term",
    "session",
  ];
  const result = await QueryMultiple.UpdateWithMultiple(
    table,
    updatefield,
    clausefield,
    fieldvalue
  );
  if (result === 1) {
    res.status(201).json({
      message: "result saved",
    });
  } else {
    res.status(500).json({
      message: "bad request",
    });
  }
};

// updating for exam
exports.insertExam = async (req, res, next) => {
  //  console.log("work");
  const fieldvalue = [
    req.body.exam,
    req.body.class_id,
    req.body.subject_id,
    req.body.admission_no,
    req.body.term,
    req.body.session,
  ];
  const updatefield = ["exam"];
  const clausefield = [
    "class_id",
    "subject_id",
    "admission_no",
    "term",
    "session",
  ];
  const result = await QueryMultiple.UpdateWithMultiple(
    table,
    updatefield,
    clausefield,
    fieldvalue
  );
  if (result === 1) {
    const { class_id, subject_id, admission_no, term, session } = req.body;
    const resultTotal = await pool.query(
      `UPDATE ${table} SET total = (welcome_test + first_ca + first_assignment + second_ca + second_assignment + exam) WHERE class_id =$1 AND subject_id = $2 AND admission_no =$3 AND term =$4 AND session = $5`,
      [class_id, subject_id, admission_no, term, session]
    );
    if (resultTotal.rowCount === 1) {
      res.status(201).json({
        message: "Result saved",
      });
    } else {
      res.status(500).json({
        message: "Result not saved",
      });
    }
  } else {
    res.status(500).json({
      message: "You have not created the record",
    });
  }
};

// geting midterm result for a student
// getting term result for a studennt
exports.getStudentTermResult = async (req, res, next) => {
  const fieldvalue = [req.body.admission_no, req.body.term, req.body.session];
  const field = ["admission_no", "term", "session"];
  const fieldtofectch =
    "welcome_test, first_assignment, first_ca, second_assignment, second_ca, exam, total, subject_name, subject_id";
  const table2 = "subject_tbl";
  const relation = "year1_result_table.subject_id= subject_tbl.id";
  const result = await QueryMultiple.fetchByMultipleLeftJoin(
    table,
    table2,
    fieldtofectch,
    relation,
    field,
    fieldvalue
  );
  const subjects = [
    ...new Set(
      result.map((subject) => {
        return subject.subject_id;
      })
    ),
  ];
  const MinMax = await fetchMax(subjects, req.body.term, req.body.session);

  if (result.length === 0) {
    return res.send({
      message: "no result found",
    });
  } else if (result.length > 0) {
    return res.send({ result, MinMax });
  } else {
    return res.send({
      message: " error occured",
    });
  }
};
// getting mideterm for a class

// getting term result for a whole class
exports.getClassTermResult = async (req, res, next) => {
  const fieldvalue = [req.body.term, req.body.session];
  const field = ["term", "session"];
  const fieldtofectch =
    "first_ca, second_ca, exam, total, subject_name, subject_id";
  const table2 = "subject_tbl";
  const relation = "year1_result_table.subject_id= subject_tbl.id";
  const result = await QueryMultiple.fetchByMultipleLeftJoin(
    table,
    table2,
    fieldtofectch,
    relation,
    field,
    fieldvalue
  );

  if (result.length === 0) {
    return res.send({
      message: "no result found",
    });
  } else if (result.length > 0) {
    return res.send(result);
  } else {
    return res.send({
      message: " error occured",
    });
  }
};

// gettiing a session result for a student
exports.getStudentSessionResult = async (req, res, next) => {
  const fieldvalue = [req.body.admission_no, req.body.session];
  const field = ["admission_no", "session"];
  const fieldtofectch =
    "first_ca, second_ca, exam, total, subject_name, subject_id";
  const table2 = "subject_tbl";
  const relation = "year1_result_table.subject_id= subject_tbl.id";
  const result = await QueryMultiple.fetchByMultipleLeftJoin(
    table,
    table2,
    fieldtofectch,
    relation,
    field,
    fieldvalue
  );

  if (result.length === 0) {
    return res.send({
      message: "no result found",
    });
  } else if (result.length > 0) {
    return res.send(result);
  } else {
    return res.send({
      message: " error occured",
    });
  }
};

// getting a session result for a class
exports.getClassSessionResult = async (req, res, next) => {
  const fieldvalue = [req.body.session];
  const field = ["session"];
  const fieldtofectch =
    "first_ca, second_ca, exam, total, subject_name, subject_id";
  const table2 = "subject_tbl";
  const relation = "year1_result_table.subject_id= subject_tbl.id";
  const result = await QueryMultiple.fetchByMultipleLeftJoin(
    table,
    table2,
    fieldtofectch,
    relation,
    field,
    fieldvalue
  );

  if (result.length === 0) {
    return res.send({
      message: "no result found",
    });
  } else if (result.length > 0) {
    return res.send(result);
  } else {
    return res.send({
      message: " error occured",
    });
  }
};

/*
==========
LOGICS
==========
*/
// getting the heightest and the lowest score a particular subject
