let Name = localStorage.getItem("Name");
let Email = localStorage.getItem("Email");
let Password = localStorage.getItem("Password");
let AccountID = localStorage.getItem("AccountID");

if (Name == null || Email == null || Password == null || AccountID == null) {
  window.location.href = "/login";
} else if (Name != null && Email != null && Password != null) {
  document.getElementById("titleusername").innerText = `Wellcome ${Name}`;
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
      localStorage.removeItem("Password");
      localStorage.removeItem("AccountID");
      alert("You need password for next login 😢");
      window.location.href = "/login";
    }
  });


  //getting the data title from the database
async function FetchTitle(){
  var Titleloading = `<img src="../../image/arrow-clockwise.svg" class="mt-[7.25rem] lg:mt-[6.25rem] ml-[4rem] lg:ml-[3rem] w-[60.666667%] animate-spin" alt="spinner">`;
document.getElementById("titles").innerHTML = Titleloading;
  var res = await fetch("/gettitles", {method: "POST",headers: {"Content-Type": "application/json",},body: JSON.stringify({AccountID: AccountID,Email: Email})});
  var data = await res.json();
  console.log(data)
  if(data.Status == "Success"){
    let TitleTemplate ="";
    data.titles.forEach((selected)=>{
      var Title = selected.Title;
      TitleTemplate += `<h5 class="alltitles cursor-pointer hover:text-2xl font-semibold" name="${Title}">${Title}</h5><hr>`
      document.getElementById("titles").innerHTML = TitleTemplate;
      // adding event listener to the titles
      var id = document.querySelectorAll('.alltitles')
        id.forEach(selected=>{
          selected.addEventListener('click', ()=>{
            var DescriptionLoading = `<img src="../../image/arrow-clockwise.svg" class="mt-[7.25rem] lg:mt-[0.25rem] ml-[4rem] lg:ml-[7rem] w-[60.666667%] animate-spin" alt="spinner">`
            document.getElementById("descriptiontemplate").innerHTML = DescriptionLoading;
              var Attname = selected.getAttribute('name')
              fetch("/getdatainfo", {method: "POST",headers: {"Content-Type": "application/json",},body: JSON.stringify({Title: Attname,Email: Email})}).then(res=>res.json()).then(data=>{
                  if(data.Status == "Success"){
                    var DataTemplate = `<p id="description">${data.Data[0].Description}</p><br><button name="${data.Data[0].Title}" class= "deletebtn text-white bg-red-700 px-6 rounded-lg hover:bg-red-900  mx-4">Delete</button>`
                      document.getElementById("descriptiontemplate").innerHTML = DataTemplate;
                      // adding event listener to the delete button
                      var id = document.querySelectorAll('.deletebtn');
                      id.forEach(selected=>{
                        selected.addEventListener('click', ()=>{
                          var Attname = selected.getAttribute('name')
                          console.log(Attname)
                          var permission = confirm("Want to delete this data ?");
                          if (permission == true) {
                            fetch("/deletedata", {method: "POST",headers: {"Content-Type": "application/json",},body: JSON.stringify({Title: Attname,Account_ID: AccountID})}).then(res=>res.json()).then(data=>{
                              if(data.Status == "Success"){
                                alert("Data deleted successfully");
                                FetchTitle();
                                window.location.href = "/dashboard";
                              }
                              else if(data.Status == "Title not found"){
                                alert("Title not found");
                              }
                              else if(data.Status == "Internal Server Error"){
                                alert("Internal Server Error");}
                            })
                          }
                          else if (permission != true || permission == false) {
                            console.log("Data not deleted");
                          }
                        })
                      })

                  }
                  else{
                      alert("Title not found");
                  }
              })
              
          })
        })
    })
}
}
FetchTitle()

// register data to server
document.getElementById("registerdata").addEventListener("click", () => {
  let Title = document.getElementById("TitleData").value
  let Data = document.getElementById("descriptionData").value
  if (Title == "" || Data == "") {
    alert("Please fill the form 🥺");
  }
  else if (Title != "" && Data != "") {
    document.getElementById('registerdata').innerText = "Saving..."
    document.getElementById('registerdata').disabled = true;
    document.getElementById('registerdata').classList.add("cursor-not-allowed")
    document.getElementById('registerdata').classList.add("opacity-50")
    console.log(Title, Data)
    document.getElementById("TitleData").value = "";
    document.getElementById("descriptionData").value = "";
    fetch("/savedata", {method: "POST",headers: {"Content-Type": "application/json",},body: JSON.stringify({Name :Name,AccountID: AccountID,Email: Email,Title: Title,Data: Data, Password: Password, Date: new Date()})})
    .then(res=>res.json())
    .then(data=>{
      if(data.Status == "Success fully saved to the database"){
        console.log(data)
        document.getElementById('registerdata').innerText = "Save Now"
        document.getElementById('registerdata').disabled = false;
        document.getElementById('registerdata').classList.remove("cursor-not-allowed")
        document.getElementById('registerdata').classList.remove("opacity-50")
        FetchTitle()
      }
      else if(data.Status == "Title already exist"){
        alert(data.Status)
      }
      else if(data.Status == "Internal Server Error"){
        alert(data.Status)
      }
    })
  }
});