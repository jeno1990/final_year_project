var bcrypt = require("bcryptjs");
const Traffic = require("../../models/traffic.model");
const Reported_accident = require("../../models/report_accident.model");
// const sendMail = require('../helpers/sendEmail')

const traffic_signup = function (req, res) {
  let { first_name, last_name, email, password } = req.body;
  if (first_name === "" || email === "") {
    res.json({ status: 0, data: "error", msg: " Enter all fields" });
  } else {
    Traffic.findOne({ email: email }, function (err, traffic) {
      if (err) console.log(err);

      if (traffic) {
        res.json({
          code: 403,
          status: 0,
          data: traffic.email,
          msg: " Driver already exists",
        });
      } else {
        let pass = Math.floor(100000 + Math.random() * 900000); //6 digit random number
        var traffic = new Traffic({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: `${pass}`, //just to test node mailer (to be generated)
        });
        console.log("password--> " + traffic.password);
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(traffic.password, salt, function (err, hash) {
            if (err) {
              res.json({
                status: 0,
                data: err,
                msg: " error while hashing password",
              });
            }
            traffic.password = hash;
            traffic.save(function (err) {
              //you can use promise here
              //user.save().then().catch() you can use promise like this also
              if (err) {
                //if error send that to user
                res.json({
                  code: 500,
                  status: 0,
                  data: err,
                  msg: "internale server error",
                });
              } else {
                try {
                  //----------------- TRY TO MAKE IT ONLY SAVE USER INFORMATION IF PASSWORD IS DELIVERD----->
                  //this will send password with provided email address
                  require("../../helpers/sendEmail")(
                    traffic.email,
                    traffic.password
                  );
                } catch (error) {
                  console.log(error);
                }

                //Send response to the user that registration process is complete
                res.json({
                  status: 1,
                  data: traffic,
                  msg: `Thank You for registering.`,
                });
              }
            });
          });
        });
      }
    });
  }
};

const traffic_login = function (req, res) {
  let { email, password } = req.body;
  //checks that both email and password is provided at api call
  if (email === "" || password === "") {
    res.json({ status: 0, data: "error", msg: " Enter all fields!!!" });
  } else {
    //check the provided email with  our database
    Traffic.findOne({ email: email }, (err, traffic) => {
      if (err) {
        res.json({ code: 500, status: 0, message: "internal server error" });
      }
      // if the email is not found , respond user that this email is not found
      if (!traffic) {
        res.json({
          code: 404,
          status: 0,
          msg: "no acount found with provided email",
        });
      } else {
        //if email found hash the password for the comparision as our system have hashed password
        bcrypt.compare(password, traffic.password, (err, isMatch) => {
          if (err) {
            res.json({ status: 0, data: err, msg: " error" });
          } else {
            //if passowrd didnt match respond to the user
            if (!isMatch) {
              res.status(401);
              res.json({
                status: 0,
                data: isMatch,
                msg: " user credentials doesn't match",
              });
            } else {
              // if email and password match , respond that to user
              res.json({
                status: 1,
                data: {
                  id: traffic.id,
                  first_name: traffic.first_name,
                  last_name: traffic.last_name,
                  email: traffic.email,
                  // type: traffic.type ??what is type
                },
                msg: "Welcome " + email,
              });
            }
          }
        });
      }
    });
  }
};
const issued_cases = function (req, res) {
  //
  Reported_accident.find()
    .select(" accident_type plate_number ")
    .exec((err, alart) => {
      if (err) {
        res.send("error" + err);
      } else {
        res.json(alart);
      }
    });
};
const reported_cases = function (req, res) {
  Gust.find()
    .select(" violation_type plate_number ")
    .exec((err, alart) => {
      if (err) {
        res.send("error" + err);
      } else {
        res.send(alart);
      }
    });
};

const traffic_report_form = function (req, res) {
  console.log("inside the traffic_report_form");

  let { violation_type, plate_number, driver_name, action_taken, comment } =
    req.body;
  //checks that both email and password is provided at api call
  if (
    violation_type === "" ||
    plate_number === "" ||
    driver_name === "" ||
    action_taken === "" ||
    comment === ""
  ) {
    res.json({ status: 0, data: "error", msg: " Enter all fields!!!" });
  } else {
    var traffic_report = new TrafficReport({
      traffic_id: req.params.id,
      driver_name: driver_name,
      violation_type: violation_type,
      plate_number: plate_number,
      action_taken: action_taken,
      comment: comment,
    });

    traffic_report
      .save()
      .then(() => {
        res.status(200).json("form register successful");
      })
      .catch((err) => {
        console.log("error");
        res.status(403).json(err);
      });
  }
};
const test = function (req, res) {
  console.log("test api is working");
  res.status(200).send("hello");
};

module.exports = {
  traffic_signup,
  traffic_login,
  issued_cases,
  reported_cases,
  traffic_report_form,
  test,
};
