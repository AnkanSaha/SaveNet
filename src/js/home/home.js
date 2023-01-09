let UserName = localStorage.getItem("Name");
  const UserMail = localStorage.getItem("Email");
  if (
    UserName == null ||
    UserName == undefined ||
    UserName == "" ||
    UserMail == null ||
    UserMail == undefined ||
    UserMail == ""
  ) {
    UserName = "User";
    document.getElementById(
      "front-introduction"
    ).innerText = `" Hey User, Secure your Account Information on Internet with SaveNet "`;
  } else if (
    UserName != null ||
    UserName != undefined ||
    UserName != "" ||
    UserMail != null ||
    UserMail != undefined ||
    UserMail != ""
  ) {
    document.getElementById(
      "front-introduction"
    ).innerText = `" Hey ${UserName}, Secure your Account Information on Internet with SaveNet "`;
    document.getElementById("name").value = UserName;
    document.getElementById("email").value = UserMail;
  }

var typed = new Typed(".typed", {
  strings: ["SaveNet", "Save Data", "Read Data", "Update Data", "Remove Data"],
  typeSpeed: 100,
  backSpeed: 100,
  loop: true,
  cursorChar: "",
});
// changing value of unsername for animation

var maintext_type_animation = new Typed(".maintext", {
  strings: [
    `Hey ${UserName}, Welcome to Savenet, the ultimate data saving destination! With our innovative tools and resources, you can easily manage your data usage and stretch your data plan further than ever before. Our user-friendly interface makes it easy to track your data usage, set limits, and access a variety of features to help you save money on your monthly mobile plan. Whether you're a budget-conscious consumer or a busy professional, Savenet has you covered. Start saving on your data today!`,
  ],
  typeSpeed: 20,
  backSpeed: 10,
  loop: true,
  showCursor: false,
});
setInterval(() => {
  let loging = localStorage.getItem("AccountID");
  console.log(loging);
  if (loging != null || loging != undefined || loging != "") {
    document.getElementById("loginbutton").innerText = "Go To Dashboard";
    document.getElementById("frontBTN").innerText = "Go To Dashboard";
    document.getElementById("secondfrontBTN").innerText = "Go To Dashboard";
    document.getElementById("loginbutton").href = "/signedwelcome";
    document.getElementById("secondfrontBTN").href = "/signedwelcome";
    document.getElementById("frontBTN").href = "/signedwelcome";
  }
  if (loging == null || loging == undefined || loging == "") {
    document.getElementById("loginbutton").innerText = "Create Account";
    document.getElementById("secondfrontBTN").innerText = "Create Account";
    document.getElementById("frontBTN").innerText = "Login Now";
    document.getElementById("loginbutton").href = "/signup";
    document.getElementById("secondfrontBTN").href = "/signup";
    document.getElementById("frontBTN").href = "/login";
  }
}, 200);
document.getElementById("hamburgerbtn").addEventListener("click", () => {
  document.getElementById("navbar-sticky").classList.toggle("hidden");
});
setInterval(() => {
  let online_status = navigator.onLine;
  if (online_status == true) {
    document
      .getElementById("user-online-status-icon")
      .classList.remove("bg-red-600");
    document
      .getElementById("user-online-status-icon")
      .classList.add("bg-green-600");
    document.getElementById("user-online-status").innerText = "You're Online";
  } else if (online_status == false) {
    document
      .getElementById("user-online-status-icon")
      .classList.remove("bg-green-600");
    document
      .getElementById("user-online-status-icon")
      .classList.add("bg-red-600");
    document.getElementById("user-online-status").innerText = "You're Offline";
  }
}, 1);

document.addEventListener("contextmenu", (event) => event.preventDefault());