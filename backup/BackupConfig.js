//Global Variables
var Registration = "backup/registration.json";
var LoginActivity = "backup/LoginActivity.json";

function RegistrationBackup(RegistrationDetails, UniqueAccountID) {
  var fs = require("fs");
  fs.chmod(Registration, "775", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Permission Granted");
      fs.readFile(Registration, "utf8", (err, data) => {
        if (err) {
          console.log(err);
        } else if (data) {
          var json = JSON.parse(data);
          console.log(json);
          json[`${UniqueAccountID}`] = RegistrationDetails;
          console.log(json);
          fs.writeFile(Registration, JSON.stringify(json), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Saved With ID: ${UniqueAccountID}`);
              console.log("Registration Details Saved locally");
              fs.chmod(Registration, "000", (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Permission Change to No Access");
                }
              });
            }
          });
        }
      });
    }
  });
}

function LoginBackup(LoginDetails) {
  var CurrentDate = `Login Time is : ${new Date()}`;
  var fs = require("fs");
  fs.chmod(LoginActivity, "775", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Permission Granted");
      fs.readFile(LoginActivity, "utf8", (err, data) => {
        if (err) {
          console.log(err);
        } else if (data) {
          var json = JSON.parse(data);
          json[`${CurrentDate}`] = LoginDetails;
          fs.writeFile(LoginActivity, JSON.stringify(json), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Login Details Saved locally");
              fs.chmod(LoginActivity, "000", (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Permission Change to No Access");
                }
              });
            }
          });
        }
      });
    }
  });
}
module.exports = {
  Registration: RegistrationBackup,
  Login: LoginBackup,
};
