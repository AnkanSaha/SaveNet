// open update profile menu bar
document.getElementById("updateProfile").addEventListener("click", updateProfileMenubar);
if(window.location.pathname == "/dashboard"){
  document.getElementById("dashboard-userprofile-option").addEventListener("click", updateProfileMenubar);
}
// close update profile menu bar
document
  .getElementById("update-modal-close-icon")
  .addEventListener("click", () => {
    document.getElementById("profile-update-modal").classList.toggle("hidden");
    document.getElementById("dashboard-controller").classList.toggle("hidden");
  });

function updateProfileMenubar() {
  var Name = localStorage.getItem("Name");
  var Email = localStorage.getItem("Email");
  var AccountID = localStorage.getItem("AccountID");
  var Country = localStorage.getItem("Country");
  var AccountCreateDate = localStorage.getItem("AccountCreateDate");
  document.getElementById("Name").value = Name;
  document.getElementById("email").value = Email;
  document.getElementById("AccountID").value = AccountID;
  document.getElementById("Country").value = Country;
  document.getElementById("AccountCreateDate").value = AccountCreateDate;
  document.getElementById("profile-update-modal").classList.toggle("hidden");
}
