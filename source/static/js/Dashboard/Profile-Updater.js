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
  let Name = localStorage.getItem("Name");
  let Email = localStorage.getItem("Email");
  let AccountID = localStorage.getItem("AccountID");
  let Country = localStorage.getItem("Country");
  let AccountCreateDate = localStorage.getItem("AccountCreateDate");
  document.getElementById("Name").value = Name;
  document.getElementById("email").value = Email;
  document.getElementById("AccountID").value = AccountID;
  document.getElementById("Country").value = Country;
  document.getElementById("AccountCreateDate").value = AccountCreateDate;
  document.getElementById("profile-update-modal").classList.toggle("hidden");
}

// update profile
document.getElementById('update-profile-button').addEventListener('click', validator)

function validator(){
    var Name = document.getElementById('Name').value
    var Email = document.getElementById('email').value
    var AccountID = document.getElementById('AccountID').value
    var Country = document.getElementById('Country').value
    var AccountCreateDate = document.getElementById('AccountCreateDate').value
    var Password = document.getElementById('password').value
    var Account_Create_Time_Device_Info = {
      Device_Name: navigator.platform,
      Device_OS: navigator.oscpu,
      Device_Browser: navigator.appCodeName,
      Device_Browser_Version: navigator.appVersion,
      Device_Language: navigator.language,
      Device_Country: navigator.country,
      Device_Region: navigator.region,
      Device_City: navigator.city,
      Device_TimeZone: navigator.timezone,
      Device_Screen_Resolution: screen.width + "x" + screen.height,
      Device_Screen_Available_Resolution:
        screen.availWidth + "x" + screen.availHeight,
      Device_Screen_Color_Depth: screen.colorDepth,
      Device_Screen_Available_Color_Depth: screen.availColorDepth,
      Device_Screen_Pixel_Depth: screen.pixelDepth,
      Device_Screen_Available_Pixel_Depth: screen.availPixelDepth,
      Device_Screen_Height: screen.height,
      Device_Screen_Available_Height: screen.availHeight,
      Device_Screen_Width: screen.width,
      Device_Screen_Available_Width: screen.availWidth,
      Device_Screen_AvailLeft: screen.availLeft,
      Device_Screen_AvailTop: screen.availTop,
      Device_Screen_Buffer_Depth: screen.bufferDepth,
      Device_Screen_DeviceXDPI: screen.deviceXDPI,
      Device_Screen_DeviceYDPI: screen.deviceYDPI,
      Device_Screen_LogicalXDPI: screen.logicalXDPI,
      Device_Screen_LogicalYDPI: screen.logicalYDPI,
      Device_Screen_UpdateInterval: screen.updateInterval,
      Device_Screen_AvailHeight: screen.availHeight,
      Device_Screen_AvailWidth: screen.availWidth,
      Device_Screen_AvailLeft: screen.availLeft,
      userAgent: navigator.userAgent,
      Online: navigator.onLine,
    }
    // condition to check
    if(navigator.onLine == false){
      alert('You are offline, please connect to the internet to update your profile')
    }
    else if(Name == '' || Email == '' || AccountID == '' || Country == '' || AccountCreateDate == '' || Password == ''){
      alert('Please fill all the fields')
    }
  else if(Email.includes('@') == false){
      alert('Please enter a valid email address')
    }
    else if(Password.length < 8){
      alert('Password must be at least 8 characters long')
    }
    else{
      document.getElementById('update-profile-button').innerText = 'Updating...'
      updater(AccountID,Name,Email,Country,Password,AccountCreateDate,Account_Create_Time_Device_Info)
    }
}


async function updater(AccountID,Name,Email,Country,Password,AccountCreateDate,Account_Create_Time_Device_Info){
  var response = await fetch('/updateAccountInfo', {
    method:"PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      AccountID: AccountID,
      Name: Name,
      Email: Email,
      Country: Country,
      Password: Password,
      AccountCreateDate: AccountCreateDate,
      Account_Create_Time_Device_Info: Account_Create_Time_Device_Info
    })
  })
  var data = await response.json()
  document.getElementById('update-profile-button').innerText = 'Update Profile'
  console.log(data)
  if(data.status == 'Account Info Updated'){
    localStorage.clear()
    localStorage.setItem('Name', data.Name);
    localStorage.setItem('Email', data.Email);
    localStorage.setItem('Country', data.Country);
    localStorage.setItem('AccountCreateDate', data.AccountCreateDate);
    localStorage.setItem('AccountID', data.AccountID);
    document.getElementById("profile-update-modal").classList.toggle("hidden");
    document.getElementById('maincontainer').innerHTML = Sheleton_loading_animation
    setTimeout(() => {
      document.getElementById("maincontainer").innerHTML = `<h1 class="mb-4 text-center text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white lg:mt-[11.25rem] mt-[15.25rem]">${data.status}</h1>`;
    }, 1000);
  }
  else if(data.status == 'Unable To Update Account Info'){
    document.getElementById("profile-update-modal").classList.toggle("hidden");
    document.getElementById('maincontainer').innerHTML = Sheleton_loading_animation
    setTimeout(() => {
      document.getElementById("maincontainer").innerHTML = `<h1 class="mb-4 text-center text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white lg:mt-[11.25rem] mt-[15.25rem]">${data.status}</h1>`;
    }, 1000);
  }
  else if(data.status == 'User Not Registered'){
    document.getElementById("profile-update-modal").classList.toggle("hidden");
    document.getElementById('maincontainer').innerHTML = Sheleton_loading_animation
    setTimeout(() => {
      document.getElementById("maincontainer").innerHTML = `<h1 class="mb-4 text-center text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white lg:mt-[11.25rem] mt-[15.25rem]">${data.status}</h1>`;
    }, 1000);
  }
}