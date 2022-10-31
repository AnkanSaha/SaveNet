document.getElementById("loginbtn").addEventListener("click", () => {
  document.getElementById("loginbtn").classList.add("animate-ping");
  var Email = document.getElementById("RegisteredEmail").value;
  var Password = document.getElementById("RegisteredPassword").value;
  //validator
  if (Email == "" || Password == "") {
    alert("Please Fill all Login details 😢");
    document.getElementById("loginbtn").classList.remove("animate-ping");
  } else if (Email != "" && Password != "") {
    fetch("/CheckUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: Email, Password: Password }),
    }).then((data) => {
      data.json().then((response) => {
        document.getElementById("loginbtn").classList.remove("animate-ping");
        console.log(response.status[0]);
        if (response.status == "User Not Registered") {
          alert(response.status);
          window.location.href = "/";
        } else if (response.status != "User Not Registered") {
          localStorage.setItem("Email", response.status[0].Email);
          localStorage.setItem("Password", response.status[0].Password);
          localStorage.setItem("Name", response.status[0].Name);
          window.location.href = "/signedwelcome";
        }
      });
    });
  }
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
}); // Right Click Truned Off
