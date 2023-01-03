// hamburger menu
document.getElementById("hamburgerbtn").addEventListener("click", () => {
  document.getElementById('navbar-sticky').classList.toggle('hidden');
});

var Name = localStorage.getItem("Name");
var Email = localStorage.getItem("Email");
var AccountID = localStorage.getItem("AccountID");

if (Name == null || Email == null || AccountID == null) {
  window.location.href = "/login";
} else if (Name != null && Email != null && AccountID != null) {
  document.getElementById("titleusername").innerText = `Wellcome ${Name}`;
  document.getElementById("username").innerText = `Hey, ${Name}`;
  document.getElementById('accountID').innerText = `A/C ID : ${AccountID}`
  document.getElementById('email').innerText = `Email : ${Email}`
}

//logout feature
document.getElementById("logoutbtn").addEventListener("click", () => {
  var permission = confirm("Want to password for future login ?");
  if (permission == true) {
    alert("Login details saved for future login 🥰");
    window.location.href = "/";
  } else if (permission != true || permission == false) {
    localStorage.removeItem("Name");
    localStorage.removeItem("Email");
    localStorage.removeItem("AccountID");
    alert("You need password for next login 😢");
    window.location.href = "/login";
  }
});

// document.addEventListener("contextmenu", (e) => {e.preventDefault();}); // Right Click Truned Off
