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
  document.getElementById('Useremail').innerText = `Email : ${Email}`
}

//logout feature
document.getElementById("logoutbtn").addEventListener("click", () => {
  document.getElementById('logout_modal').classList.toggle('hidden');
});
document.getElementById('logout-cross-icon').addEventListener('click', ()=>{
  document.getElementById('logout_modal').classList.toggle('hidden');
})
document.getElementById('i-dont-want-to-logout').addEventListener('click', ()=>{
  document.getElementById('logout_modal').classList.toggle('hidden');
})
document.getElementById('logout-me-without-quick-login').addEventListener('click', ()=>{
localStorage.removeItem("Name");
localStorage.removeItem("Email");
localStorage.removeItem("AccountID");
document.getElementById('logout_modal').classList.toggle('hidden');
alert("You need password for next login 😢");
window.location.href = "/login";
})
document.getElementById('logout-me-with-quick-login').addEventListener('click', ()=>{
  document.getElementById('logout_modal').classList.toggle('hidden');
  window.location.href = "/"
})

setInterval(()=>{
  let online_status = navigator.onLine;
  if(online_status == true){
    document.getElementById('user-online-status-icon').classList.remove('bg-red-600')
    document.getElementById('user-online-status-icon').classList.add('bg-green-600')
    document.getElementById('user-online-status').innerText = "You're Online" 
  }
  else if(online_status == false){
    document.getElementById('user-online-status-icon').classList.remove('bg-green-600');
    document.getElementById('user-online-status-icon').classList.add('bg-red-600');
    document.getElementById('user-online-status').innerText = "You're Offline" 
  }
}, 1)

// document.addEventListener("contextmenu", (e) => {e.preventDefault();}); // Right Click Truned Off


