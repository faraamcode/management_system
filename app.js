const express = require('express');
const studentRoute = require('./route/studentRoute');
const staffRoute = require('./route/staffRoute');
const classRoute = require('./route/classRoute');
const app = express();
app.use(express.json())
app.use(studentRoute)
app.use(staffRoute)
app.use(classRoute)
app.listen(3000)