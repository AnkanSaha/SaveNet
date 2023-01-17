document.getElementById("loginbtn").addEventListener("click", () => {
  document.getElementById("loginbtn").disabled = true;
  var Email = document.getElementById("RegisteredEmail").value;
  var Password = document.getElementById("RegisteredPassword").value;
  //validator
  if (Email == "" || Password == "") {
    alert("Please Fill all Login details 😢");
  } else if (Email != "" && Password != "") {
    if (Email.includes("@") && Email.includes(".")) {
      if (
        (Password.length >= 8 && Password.includes("@")) ||
        Password.includes("#") ||
        Password.includes("$")
      ) {
        document.getElementById("loginbtn").innerText = "Please Wait ...";
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
            if (response.status == "User Not Registered") {
              localStorage.removeItem("AccountID");
              localStorage.removeItem("Email");
              localStorage.removeItem("Name");
              document.getElementById("loginbtn").innerText = "Login Now";
              document.getElementById("loginbtn").disabled = false;
              alert(response.status);
              window.location.href = "/signup";
            }else if(response.status == 'Internal Server Error'){
              alert(response.status)
              document.getElementById("loginbtn").innerText = "Login Now";
              document.getElementById("loginbtn").disabled = false;
            }
            else if (response.status != "User Not Registered") {
                localStorage.setItem("Email", response.status[0].Email);
                localStorage.setItem("Name", response.status[0].Name);
                localStorage.setItem("AccountID", response.status[0].Account_ID);
                localStorage.setItem("AccountCreateDate", response.status[0].Account_Create_Date);
                localStorage.setItem("Country", response.status[0].Country);
                document.getElementById("loginbtn").innerText = "Login Now";
                document.getElementById("loginbtn").disabled = false;
              window.location.href = "/signedwelcome";
            }
          });
        });
      } else {
        alert("Password must be 8 characters long and must contain @, # or $");
        document.getElementById("loginbtn").disabled = false;
      }
    } else {
      alert("Please Enter Valid Email Address 😢");
      document.getElementById("loginbtn").disabled = false;
    }
  }
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
}); // Right Click Truned Off
