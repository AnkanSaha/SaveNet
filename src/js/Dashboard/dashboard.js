// Global Variables 
const Name = localStorage.getItem("Name");
const Email = localStorage.getItem("Email");
const AccountID = localStorage.getItem("AccountID");

// variables for the dashboard controller
let TotalTitles ;
// updating All title number in the dashboard
caches.open("titleDetails").then(async (cache) => {
    let res = await cache.match("/titlenumber")
      if (res) {
        var text = await res.text()
          TotalTitles = text;
          document.getElementById('dashboard-titles-count').classList.replace('hidden', 'inline-flex');
          document.getElementById('dashboard-titles-count').innerText = TotalTitles;
      }
      else if(!res){
        await gettotalTilteLength()
          document.getElementById('dashboard-titles-count').classList.replace('hidden', 'inline-flex');
          document.getElementById('dashboard-titles-count').innerText = TotalTitles;
      }
  });

// checking online status continious
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


// hamburger menu
document.getElementById("hamburgerbtn").addEventListener("click", () => {
  document.getElementById('dashboard-titles-count').innerText = TotalTitles;
  document.getElementById('dashboard-controller').classList.toggle('hidden');
});
// document.addEventListener("contextmenu", (e) => {e.preventDefault();}); // Right Click Truned Off

// continious checking that is user logined
setInterval(()=>{
  let Name = localStorage.getItem("Name");
  let Email = localStorage.getItem("Email");
  let AccountID = localStorage.getItem("AccountID");
if (Name == null || Email == null || AccountID == null) {
  window.location.href = "/login";
} else if (Name != null && Email != null && AccountID != null) {
  document.getElementById("titleusername").innerText = `Wellcome ${Name}`;
}
}, 200)

//logout feature
document.getElementById("logoutbtn").addEventListener("click", () => {document.getElementById('logout_modal').classList.toggle('hidden');});

document.getElementById("dashboard-logout-btn").addEventListener("click", () => {document.getElementById('logout_modal').classList.toggle('hidden');});

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
caches.delete("titleDetails");
document.getElementById('logout_modal').classList.toggle('hidden');
alert("You need password for next login 😢");
window.location.href = "/login";
})
document.getElementById('logout-me-with-quick-login').addEventListener('click', ()=>{
  document.getElementById('logout_modal').classList.toggle('hidden');
  window.location.href = "/"
})

//getting the data title from the database
async function FetchTitle() {
  var res = await fetch("/gettitles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ AccountID: AccountID, Email: Email }),
  });
  var data = await res.json();
  if(data.titles.length == 0){
    alert("You don't have any title yet 😢");
  }
  else if(data.titles.length != 0){
    return data;
  }
  else if(data.Status == 'Internal Server Error'){
    alert("Internal Server Error 😢");
  }
  else if(data.titles == undefined){
    alert("Internal Server Error 😢");
  }
}

// Function for getting the all titles & store in the caches for offline use
async function gettotalTilteLength (){
  let TitleData = await FetchTitle();
  if (TitleData.titles.length == 0) {
    TotalTitles = 0;
  }
  else if(TitleData.titles.length != 0){
    TotalTitles = TitleData.titles.length;
    caches.open("titleDetails").then((cache) => {
      cache.put("/titlenumber", new Response(TotalTitles));
      document.getElementById('dashboard-titles-count').innerText = TitleData.titles.length;
    });
    caches.open("titleDetails").then((cache) => {
      cache.put("/Alltitles", new Response(JSON.stringify(TitleData.titles)));
    });
    caches.open("titleDetails").then((cache) => {
      cache.put("/AlltitlesID", new Response(JSON.stringify(TitleData.DataID)));
    });
  }
}