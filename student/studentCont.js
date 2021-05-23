const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db/connect");
const Query = require("../model/queryClass");
const { cloud_name, api_key, api_secret } =
  require("../secret/data").cloudinary;
const cloudinary = require("cloudinary").v2;
// console.log(cloud_name, api_key, api_secret);
cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const table = "students_tbl";
// reading of or feching of students

exports.fechAllStudents = async (req, res, next) => {
  try {
    const result = await Query.fetchAll(table);
    if (result) {
      res.send(result);
    } else {
      res.send({
        message: "error occured",
      });
    }
  } catch (error) {
    res.send({ error });
  }
};
//  inserting new student into the table

exports.insertNewStudent = async (req, res, next) => {
  //  checking if the user already exist
  const Querynew = new Query(table, null);
  const ifExist = await Querynew.fetchByid(
    req.body.admission_no,
    "admission_no"
  );
  if (ifExist.length === 1) {
    return res.status(400).json({
      message: "user already exist",
    });
  } else if (ifExist.length === 0) {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: "ja9yyvue",
    });
    console.log(uploadResponse);
    const fieldvalue = [
      req.body.admission_no,
      req.body.last_name,
      req.body.other_names,
      req.body.parent_no,
      req.body.home_address,
      req.body.admission_type,
      req.body.gender,
      req.body.date_of_birth,
      req.body.class_id,
      req.body.passport,
      req.body.parent_name,
      req.body.parent_email,
      req.body.parent_occupation,
      req.body.class_section_name,
      hashed,
    ];
    // console.log(req.body.image);
    const field = [
      "admission_no",
      "last_name",
      "other_names",
      "parent_no",
      "home_address",
      "admission_type",
      "gender",
      "date_of_birth",
      "class_id",
      "passport",
      "parent_name",
      "parent_email",
      "parent_occupation",
      "class_section_name",
      "password",
    ];
    const QueryInstance = new Query(table, field);
    QueryInstance.turnArray();
    try {
      const result = await QueryInstance.postAll(fieldvalue);
      if (result.rowCount === 1) {
        res.send({
          message: "new  student added saved",
        });
      } else {
        res.send({
          message: "error occured",
        });
      }
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  } else {
    return res.send({
      message: "error ",
    });
  }
};
// deleting students by admission no

exports.deletebyAdmission = async (req, res, next) => {
  const admission = req.body.admission_no;
  const result = await Query.deleteByID(table, "admission_no", [admission]);
  if (result === 1) {
    res.status(201).json({
      message: `student ${admission} successfully deleted`,
    });
  } else {
    res.status(400).json({
      message: `process failed`,
    });
  }
};

// updating subject combination using class id
exports.updateStudentByAdmission = async (req, res, next) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const fieldvalue = [
    req.body.last_name,
    req.body.other_names,
    req.body.parent_no,
    req.body.home_address,
    req.body.admission_type,
    req.body.gender,
    req.body.date_of_birth,
    req.body.class_id,
    req.body.passport,
    req.body.parent_name,
    req.body.parent_email,
    req.body.parent_occupation,
    req.body.class_section_name,
    hashed,
  ];
  const field = [
    "last_name",
    "other_names",
    "parent_no",
    "home_address",
    "admission_type",
    "gender",
    "date_of_birth",
    "class_id",
    "passport",
    "parent_name",
    "parent_email",
    "parent_occupation",
    "class_section_name",
    "password",
  ];

  const updatefield = "admission_no";
  const updatevalue = [req.body.admission_no];
  const fields = await Query.turnUpdateArray(field);
  const result = await Query.updateByID(
    table,
    fields,
    fieldvalue,
    updatefield,
    updatevalue
  );
  if (result === 1) {
    res.send({
      message: "upaded succesfully",
    });
  } else {
    res.send({
      message: "error occured",
    });
  }
};

// getting students by class id
exports.getStudentByClassId = async (req, res, next) => {
  const class_id = req.body.class_id;
  const Querynew = new Query(table, null);
  const result = await Querynew.fetchByid(class_id, "class_id");
  res.send(result);
};

// getting students by ADadmission_no
exports.getStudentByAdmission = async (req, res, next) => {
  const admission_no = req.body.admission_no;
  const Querynew = new Query(table, null);
  const result = await Querynew.fetchByid(admission_no, "admission_no");
  res.send(result);
};
//  student login
exports.studentSignIn = async (req, res, next) => {
  const admission_no = req.body.admission_no;
  const password = req.body.password;
  const Querynew = new Query(table, null);

  const result = await Querynew.fetchByid(admission_no, "admission_no");
  //  chech to know if the user exist as a student
  if (result.length === 1) {
    const dbpassword = result[0].password;
    const access = await bcrypt.compare(password, dbpassword);
    //  check to know if the password is correct
    if (access) {
      // set other detail and token for other route
      const otherDetails = result[0];
      const user = {
        admission_no,
        password,
        role: "user",
      };
      jwt.sign({ user }, "roemichs", { expiresIn: 60 * 60 }, (err, token) => {
        return res.send({ otherDetails, token });
      });
    } else {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
  } else {
    res.status(401).json({
      message: "user does not exist",
    });
  }
};
