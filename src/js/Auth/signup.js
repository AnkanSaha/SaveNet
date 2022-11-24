document.getElementById("signupbtn").addEventListener("click", () => {
  document.getElementById("signupbtn").classList.add("animate-ping");
  let Name = document.getElementById("NewName").value;
  let Email = document.getElementById("NewEmail").value;
  let Country = document.getElementById("NewCountry").value;
  let Password = document.getElementById("NewPassword").value;
  let ConfirmedPassword = document.getElementById("NewConfirmPassword").value;

  console.log(Password, ConfirmedPassword, Name);
  if (Password == ConfirmedPassword) {
    if (
      Name == "" ||
      Email == "" ||
      Country == "" ||
      Password == "" ||
      ConfirmedPassword == ""
    ) {
      alert("Please Fill up this form to create account 🥺 🙏 🥺");
      document.getElementById("signupbtn").classList.remove("animate-ping");
    } else {
      if (Email.includes("@") && Email.includes(".")) {
        if (
          (Password.length >= 8 && Password.includes("@")) ||
          Password.includes("#") ||
          Password.includes("$")
        ) {
          let RemoteData = {
            Name: Name,
            Email: Email,
            Country: Country,
            Password: ConfirmedPassword,
            Account_Create_Time_Device_Info: {
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
            },
          };
          fetch("/CreateUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(RemoteData),
          }).then((data) => {
            data.json().then((response) => {
              document
                .getElementById("signupbtn")
                .classList.remove("animate-ping");
              console.log(response);
              if (response.status == "User Successfully Registered") {
                localStorage.setItem("Name", Name);
                localStorage.setItem("Email", Email);
                localStorage.setItem("Country", Country);
                localStorage.setItem("Password", ConfirmedPassword);
                localStorage.setItem("AccountID", response.AccountID);
                alert(response.status);
                window.location.href = "/login";
              } else if (
                response.status ==
                "User Already Exist with this details, Please Login 😃"
              ) {
                localStorage.setItem("AccountID", response.AccountID);
                alert(
                  `${response.status} , Account ID : ${response.AccountID}`
                );
                window.location.href = "/login";
              } else if (response.status == "Internal Server Error") {
                alert(response.status);
                window.location.href = "/";
              } else if (
                response.status == "Unable To Register, Please Try Again"
              ) {
                alert(response.status);
                window.location.href = "/signup";
              }
            });
          });
        } else {
          alert("Password must be of 8 characters and must contain @, # or $");
          document.getElementById("signupbtn").classList.remove("animate-ping");
        }
      } else {
        alert("Please Enter Valid Email Address 🥺 🙏 🥺");
        document.getElementById("signupbtn").classList.remove("animate-ping");
      }
    }
  } else if (Password != ConfirmedPassword) {
    alert("Password Doesn't 👎 match with Confirm Password");
    document.getElementById("signupbtn").classList.remove("animate-ping");
  }
});

document.addEventListener("contextmenu", (e) => {
   e.preventDefault();
 }); // Right Click Truned Off