// Global Variables 
const Name = localStorage.getItem("Name");
const Email = localStorage.getItem("Email");
const AccountID = localStorage.getItem("AccountID");

// variables for the dashboard controller
let TotalTitles ;
// updating All title number in the dashboard
async function Display_updater(){
  await gettotalTilteLength();
  var cache = await caches.open("titleDetails");
    let res = await cache.match("/titlenumber")
        var text = await res.text()
          TotalTitles = text;
          document.getElementById('dashboard-titles-count').classList.replace('hidden', 'inline-flex');
          document.getElementById('dashboard-titles-count').innerText = TotalTitles;
        await overview();
}
Display_updater();

async function overview(){
  document.getElementById("maincontainer").innerHTML = "";
  const overview_design = `<p style="font-family: 'Sofia Sans Extra Condensed', sans-serif;" class="text-2xl mt-[2rem] ml-[1.75rem] lg:ml-[2.25rem] lg:text-6xl text-gray-900 dark:text-white">Wellcome ${Username}</p>
  <p style="font-family: 'Moon Dance', cursive;" class="tracking-widest text-gray-500 md:text-lg dark:text-gray-600 my-3 ml-[1.75rem] lg:ml-[2.25rem] mb-3">Here is your all saved data overview.</p>`;
  document.getElementById("maincontainer").insertAdjacentHTML('afterbegin', overview_design);
  document.getElementById("maincontainer").insertAdjacentHTML('beforeend', ` <div
  class="flex justify-between flex-col lg:flex-row mx-5 flex-wrap cursor-pointer mt-[1.25rem] lg:mt-0"
  id="renderFront"
>
</div>`);
  document.getElementById("maincontainer").insertAdjacentHTML('beforeend', Sheleton_loading_animation)
      var res = await caches.open('titleDetails')
          var data = await res.match('Alltitles')
          var DataID = await res.match('AlltitlesID')
          var Main_data_Title = await data.json();
          var Main_Data_ID = await DataID.json();
          let overview_data_HTML_Template = "";
          Main_data_Title.forEach((data,index)=>{
              overview_data_HTML_Template+=`
              <a DataID="${Main_Data_ID[index]}" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${data}</h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">Added By ${Username}.</p>
            </a>`
          })
          document.getElementById("renderFront").innerHTML = overview_data_HTML_Template;
          document.getElementById("dashboard-skeleton-loading").remove()
}

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
document.getElementById('logout-me-without-quick-login').addEventListener('click', async ()=>{
  localStorage.clear();
 await caches.delete("titleDetails");
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