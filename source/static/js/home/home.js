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
  backSpeed: 150,
  loop: true,
  cursorChar: "",
});
// changing value of unsername for animation

var maintext_type_animation = new Typed(".maintext", {
  strings: [
    `Hey ${UserName}, Welcome to Savenet, the ultimate data saving destination! With our innovative tools and resources, you can easily manage your data usage and stretch your data plan further than ever before. Our user-friendly interface makes it easy to track your data usage, set limits, and access a variety of features to help you save money on your monthly mobile plan. Whether you're a budget-conscious consumer or a busy professional, Savenet has you covered. Start saving on your data today!`,
  ],
  typeSpeed: 30,
  loop: false,
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
//function for checking server status
const ServerStatus = async () => {
  var response = await fetch('/api/server/getsystemhelth');
  var FinalResponse = await response.json();
  document.getElementById('user-online-status').innerText = `${FinalResponse.Status} (${FinalResponse.FreeRam})`;
  if(FinalResponse.Status =="Server is busy"){
    document.getElementById('user-online-status-icon').classList.add('bg-red-700')
  }
  else if(FinalResponse.Status =="Slighly Low Ram in server"){
    document.getElementById('user-online-status-icon').classList.add('bg-yellow-500')
  }
  else if(FinalResponse.Status =="Server is running smoothly"){
    document.getElementById('user-online-status-icon').classList.add('bg-green-700')
  }
  
}
document.addEventListener('DOMContentLoaded', ServerStatus);

setInterval(ServerStatus, 5000);

//disabling right click
document.addEventListener("contextmenu", (event) => event.preventDefault());

// contact us form validation
document.getElementById("contactus-button").addEventListener("click", contactus);
async function contactus(){
  var Name = document.getElementById("name").value;
  var Email = document.getElementById("email").value;
  var Message = document.getElementById("message").value;
  console.log(Name, Email, Message);

  // validation
  if(Name == "" || Email == "" || Message == ""){
    alert("Please fill all the fields");
  }
  else {
    document.getElementById("contactus-button").innerText = "Sending...";
    var response = await fetch('/api/contactus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name: Name,
        Email: Email,
        Message: Message
      })
    });
    var FinalResponse = await response.json();
    document.getElementById("contactus-button").innerText = "Send Message";
    alert(FinalResponse.message);
  }
}