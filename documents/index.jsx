module.exports = ({ studentData, result, MinMax }) => {
  const today = new Date();
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
                html, body {
        margin: 0;
        padding: 0;
        font-family: 'Sackers Gothic Std';
        font-weight: 500;
        font-size: 5px;
        background: rgb(241,241,241);
        -webkit-print-color-adjust: exact;
        box-sizing: border-box;
      }
      tr{
          height: 10mm;
      }
.invoice-box {
  max-width: 900px;
  max-heigth: 1400px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); */

  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica";
  color: #555;
}
.school-detail table,
.student-details table,
.cognitive table {
//   max-height: 90mm;
  /* background: red; */
  width: 100%;
}
.school-detail h4 {
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 0;

  font-weight: bolder;
}
.school-detail p {
  /* text-transform: uppercase; */
  text-align: center;
  margin-bottom: 0;
  margin-top: 0;
}
.school-detail h6 {
  /* text-transform: uppercase; */
  text-align: center;
  margin-bottom: 0;
  margin-top: 0;
  font-weight: 800;

}
.school-detail h5 {
  /* text-transform: uppercase; */
  text-align: center;
  margin-bottom: 0;
  margin-top: 0;
  font-weight: 800;

}
.student-details {
  margin-top: 40px;
}
.student-details table,
.attendance-record table,
.cognitive table,
.multi-table table,
.grade table {
  border-collapse: collapse;
  /* border: 1px solid black; */
}
.student-details td,
.attendance-record td,
.cognitive td,
.multi-table td,
.grade td {
  border: 1px solid rgb(165, 155, 155);
  padding: 5px;
  /* color: pink; */
}
.th-1 {
  color: red;
}
.attendance-record table {
}
.multi-table table {
  display: inline-block;
  margin-top: 0;

  /* float: right; */
}
.th-2 {
  color: red;
}

.thead-2 {
  font-weight: bolder;
}
.cognitive table tr td:nth-child(10) {
  font-weight: bolder;
}
.cognitive table tr :nth-child(2) {
  font-weight: bolder;
}
.thead-1 td {
  font-weight: 700;
  font-weight: bolder;
  text-align: center;
}
.cognitive td {
  text-align: center;
}
.th-3 {
  text-align: left;
}
.th-empty {
  border: 0 !important;
}
.special td {
  font-weight: bolder;
}
.multi-2 {
  margin-top: 20px;
}
.second-tbl {
  float: right;
  clear: both;
}
.table-head {
  margin-top: 0;
  margin-bottom: 0;
}
.th-1 span {
  color: black
}
td{

}
          </style>
       </head>
       <body>
      <div class="invoice-box">
          <div class="school-detail">
              <table>
                  <tr>
                      <td>
                          <img
                            src="https://res.cloudinary.com/faraamcoderoemichs/image/upload/v1621691124/logo_l4zejb.png"
                            style="width: 100%; max-width: 156px"
                          />
                          
                        </td>
                        <td>
                            <h4>Roemichs International Schools</h4>
                            <p>Ajase-Ipo Road, Offa Garage, Ilorin</p>
                            <p>Tel. No 08035125100</p>
                            <p>Email: info@roemichsschools.com</p>
                            <p>Website: www.roemichsschools.com</p>
                            <h6>Session: 2020/2021</h6>
                            <h5>1st Term Examination Report Sheet</h5>

                        </td>
                      </td>
                        <td>
                          <img
                            src="https://res.cloudinary.com/faraamcoderoemichs/image/upload/v1621691124/logo_l4zejb.png"
                            style="width: 100%; max-width: 156px"
                          />

                      </td>
                  </tr>
              </table>
          </div>
          <div class="student-details">
              <table>
                  <tr>
                      <td class="th-1">NAME OF STUDENT</td>
                      <td>ABDUL-GAFAR NAIMAH OPEYEMI</td>
                      <td class="th-1">AGE:</td>
                      <td>14 Years</td>
                  </tr>
                  <tr>
                      <td class="th-1">GENDER:</td>
                      <td>Female</td>
                      <td class="th-1">CLASS:</td>
                      <td>Year 10 Humanities</td>
                  </tr>
              </table>
          </div>
          <div class="attendance-record">
              <h5 class="table-head">1. ATTENDANCE RECORD</h5>
              <div class="multi-table">

                  <table>
                      <tr>
                          <td class="th-1">No. times School Opened:</td>
                          <td>100</td>
                          <td rowspan="3">
                              90%
                            </td>
                        </tr>  
                        <tr>
                            <td class="th-1">No. of times Present</td>
                            <td>90</td>
                        </tr>  
                        <tr>
                            <td class="th-1">No. of times Absent/td>
                                <td>10</td>
                            </tr> 
                            
                        </table>
                        <table class="second-tbl">
                            <tr>
                                <td class="th-1">No. times School Opened:</td>
                                <td>100</td>
                                <td rowspan="3">
                                    90%
                                </td>
                            </tr>  
                            <tr>
                                <td class="th-1">No. of times Present</td>
                                <td>90</td>
                            </tr>  
                            <tr>
                                <td class="th-1">No. of times Absent/td>
                                    <td>10</td>
                                </tr> 
                                
                            </table>
                        </div>
                        </div>
                        <div class="cognitive">
                          <h5 class="table-head">2. Congnitve</h5>  
                            <table>
                                <tr class="thead-1">
                                    <td class="th-2">
                                        Subject Name
                                    </td>
                                    <td>
                                        Continuous Ass.1
                                    </td>
                                    <td>
                                        Continuous Ass.2
                                    </td>
                                    <td>
                                        Examination
                                    </td>
                                    <td>
                                        Total scores
                                    </td>
                                    <td>
                                        Grade
                                    </td>
                                    <td>
                                        Class Highest score
                                    </td>
                                    <td>
                                        Class Lowesest score
                                    </td>
                                    <td>
                                        Class Average score
                                    </td>
                                    <td class="th-2">
                                        Teacher's Remark
                                    </td>
                                </tr>
                                <tr class="thead-2">
                                    <td class="th-4">
                                    Maximum scores
                                    </td>
                                    <td>
                                        20
                                    </td>
                                    <td>
                                      20
                                    </td>
                                    <td>
                                        60
                                    </td>
                                    <td>
                                        100
                                    </td>
                                    <td>
                                        -
                                    </td>
                                    <td>
                                        -
                                    </td>
                                    <td>
                                    -
                                    </td>
                                    <td>
                                       -
                                    </td>
                                    <td class="th-3">
                                       -
                                    </td>
                                </tr>
                                <tr>
                                    <td class="th-3">
                                    Biology
                                    </td>
                                    <td>
                                        3773
                                    </td>
                                    <td>
                                      40
                                    </td>
                                    <td>
                                        29
                                    </td>
                                    <td>
                                        100
                                    </td>
                                    <td>
                                        09
                                    </td>
                                    <td>
                                        89
                                    </td>
                                    <td>
                                        90
                                    </td>
                                    <td>
                                       23
                                    </td>
                                    <td class="th-3">
                                        Execellent
                                    </td>
                                </tr>
                                <tr>
                                    <td class="th-3">
                                    Biology education
                                    </td>
                                    <td>
                                        3773
                                    </td>
                                    <td>
                                      40
                                    </td>
                                    <td>
                                        29
                                    </td>
                                    <td>
                                        100
                                    </td>
                                    <td>
                                        09
                                    </td>
                                    <td>
                                        89
                                    </td>
                                    <td>
                                        90
                                    </td>
                                    <td>
                                       23
                                    </td>
                                    <td class="th-3">
                                        Execellent
                                    </td>
                                </tr>
                                <tr>
                                    <td class="th-3">
                                    Biology
                                    </td>
                                    <td>
                                        3773
                                    </td>
                                    <td>
                                      40
                                    </td>
                                    <td>
                                        29
                                    </td>
                                    <td>
                                        100
                                    </td>
                                    <td>
                                        09
                                    </td>
                                    <td>
                                        89
                                    </td>
                                    <td>
                                        90
                                    </td>
                                    <td>
                                       23
                                    </td>
                                    <td class="th-3">
                                        Execellent
                                    </td>
                                </tr>
                                <tr>
                                    <td class="th-3">
                                    Biology
                                    </td>
                                    <td>
                                        3773
                                    </td>
                                    <td>
                                      40
                                    </td>
                                    <td>
                                        29
                                    </td>
                                    <td>
                                        100
                                    </td>
                                    <td>
                                        09
                                    </td>
                                    <td>
                                        89
                                    </td>
                                    <td>
                                        90
                                    </td>
                                    <td>
                                       23
                                    </td>
                                    <td class="th-3">
                                        Execellent
                                    </td>
                                </tr>
                                <tr>
                                    <td class="th-3">
                                    Biology
                                    </td>
                                    <td>
                                        3773
                                    </td>
                                    <td>
                                      40
                                    </td>
                                    <td>
                                        29
                                    </td>
                                    <td>
                                        100
                                    </td>
                                    <td>
                                        09
                                    </td>
                                    <td>
                                        89
                                    </td>
                                    <td>
                                        90
                                    </td>
                                    <td>
                                       23
                                    </td>
                                    <td class="th-3">
                                        Execellent
                                    </td>
                                </tr>
                                <tr>
                                    <td class="th-3">
                                    Biology
                                    </td>
                                    <td>
                                        3773
                                    </td>
                                    <td>
                                      40
                                    </td>
                                    <td>
                                        29
                                    </td>
                                    <td>
                                        100
                                    </td>
                                    <td>
                                        09
                                    </td>
                                    <td>
                                        89
                                    </td>
                                    <td>
                                        90
                                    </td>
                                    <td>
                                       23
                                    </td>
                                    <td class="th-3">
                                        Execellent
                                    </td>
                                </tr>
                                <tr>
                                    <td class="th-3">
                                    Biology
                                    </td>
                                    <td>
                                        3773
                                    </td>
                                    <td>
                                      40
                                    </td>
                                    <td>
                                        29
                                    </td>
                                    <td>
                                        100
                                    </td>
                                    <td>
                                        09
                                    </td>
                                    <td>
                                        89
                                    </td>
                                    <td>
                                        90
                                    </td>
                                    <td>
                                       23
                                    </td>
                                    <td class="th-3">
                                        Execellent
                                    </td>
                                </tr>
                                <tr class="special">
                                    <td class="th-empty">
                                   
                                    </td>
                                    <td colspan="4">
                                    Total: 984/1100
                                    </td>
                                    <td class="th-empty">
                                      
                                    </td>
                                    <td colspan="3">
                                       Overall Percentage: 89.45% 
                                    </td>
                                    <td class="th-empty" >

                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="multi-table multi-2">
                            <table>
                                <tr class="thead-2">
                                    <td class="th-2 th-empty"> 3. Psychomotor Domain</td>
                                    <td class="th-2">5</td>
                                    <td class="th-2">4</td>
                                    <td class="th-2">3</td>
                                    <td class="th-2">2</td>
                                    <td class="th-2">1</td>
                                </tr>
                                <tr>
                                    <td>attendance</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>attendance</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>attendance</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>attendance</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                            <table class="second-tbl">
                                <tr class="thead-2">
                                    <td class="th-2 th-empty"> 3. Psychomotor Domain</td>
                                    <td class="th-2">5</td>
                                    <td class="th-2">4</td>
                                    <td class="th-2">3</td>
                                    <td class="th-2">2</td>
                                    <td class="th-2">1</td>
                                </tr>
                                <tr>
                                    <td>attendance</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>attendance</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>attendance</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>attendance</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>attendance</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>attendance</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>attendance</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                        <div class="grade">
                            <h5 class="table-head">Key Grade</h5>
                            <table>
                                <tr class="thead-2">
                                    <td>90.00 - 100.00</td>
                                    <td>A</td>
                                    <td>DISTINCTION</td>
                                </tr>
                                <tr class="thead-2">
                                    <td>80.00 - 89.90</td>
                                    <td>B</td>
                                    <td>Excellent</td>
                                </tr>
                                <tr class="thead-2">
                                    <td>70.00 - 79.99</td>
                                    <td>C</td>
                                    <td>Very Good</td>
                                </tr>
                                <tr class="thead-2">
                                    <td>60.00 - 69.99</td>
                                    <td>D</td>
                                    <td> Good</td>
                                </tr>
                                    <td>50.00 - 59.99</td>
                                    <td>E</td>
                                    <td>Fairly Good</td>
                                </tr>
                                    <td>40.00 - 49.99</td>
                                    <td>P</td>
                                    <td>Pass</td>
                                </tr>
                                </tr>
                                    <td>0.00 - 39.99 </td>
                                    <td>F</td>
                                    <td>Fail</td>
                                </tr>
                            </table>
                        </div>
                        <div class="student-details">
                            <table>
                                <tr>
                                    <td class="th-1">CLASS TEACHER'S COMMENT <span> ADEOLA SEGUN</span></td>
                                    <td class="th-1">PRINCIPAL'S Signaturee</td>
                                    
                                </tr>
                                <tr>
                                    <td >Naimah is a team leader and a team player. She only needs to put in more efforts to attain
all A's</td>
                                    <td>ABDUL-GAFAR NAIMAH OPEYEMI</td>
                                    
                                </tr>
                            </table>
                        </div>
                    </div>
       </body>
    </html>
    `;
};
