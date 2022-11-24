document.getElementById("loginbtn").addEventListener("click", () => {
  document.getElementById("loginbtn").classList.add("animate-ping");
  var Email = document.getElementById("RegisteredEmail").value;
  var Password = document.getElementById("RegisteredPassword").value;
  //validator
  if (Email == "" || Password == "") {
    alert("Please Fill all Login details 😢");
    document.getElementById("loginbtn").classList.remove("animate-ping");
  } else if (Email != "" && Password != "") {
    if (Email.includes("@") && Email.includes(".")) {
      if (
        (Password.length >= 8 && Password.includes("@")) ||
        Password.includes("#") ||
        Password.includes("$")
      ) {
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
            document
              .getElementById("loginbtn")
              .classList.remove("animate-ping");
            if (response.status == "User Not Registered") {
              localStorage.removeItem("AccountID");
              alert(response.status);
              window.location.href = "/signup";
            }else if(response.status == 'Internal Server Error'){
              alert(response.status)
            }
            else if (response.status != "User Not Registered") {
              localStorage.setItem("Email", response.status[0].Email);
              localStorage.setItem("Password", response.status[0].Password);
              localStorage.setItem("Name", response.status[0].Name);
              localStorage.setItem("AccountID", response.status[0].Account_ID);
              window.location.href = "/signedwelcome";
            }
          });
        });
      } else {
        alert("Password must be 8 characters long and must contain @, # or $");
        document.getElementById("loginbtn").classList.remove("animate-ping");
      }
    } else {
      alert("Please Enter Valid Email Address 😢");
      document.getElementById("loginbtn").classList.remove("animate-ping");
    }
  }
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
}); // Right Click Truned Off
