document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
}); // Right Click Truned Off

var Email = localStorage.getItem("Email");
var Password = localStorage.getItem("Password");
console.log(Email, Password);

if (Email == null || Password == null) {
  console.log("Unregistered");
} else if (Email != null && Password != null) {
  var ReadyData = {
    Email: Email,
    Password: Password,
  };
  fetch("/CheckUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ReadyData),
  }).then((data) => {
    data.json().then((response) => {
      console.log(response.status);
      if (response.status == "User Not Registered") {
        console.log("User Not Registered");
      } else if (response.status != "User Not Registered") {
        localStorage.setItem("Email", response.status[0].Email);
        localStorage.setItem("Password", Password);
        window.location.href = "/signedwelcome";
      }
    });
  });
}
