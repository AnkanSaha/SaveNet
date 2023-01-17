const Main_update_page = `<div id="update-data-finder-container" class=" hidden mt-[10.25rem] ml-[7.25rem] lg:ml-[16.25rem]">
<select class="w-3/6 text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="data-selector-dropdown" id="data-selector-dropdown">
</select>
<br>
<button id="data-edit-finder-button" type="button" class="mt-[9.25rem] ml-[0.25rem] lg:ml-[9.25rem] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Edit Now</button>
</div>`


//getting the data title from the database
async function FetchTitle() {
    var res = await fetch("/gettitles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ AccountID: AccountID, Email: Email }),
    });
    var data = await res.json();
    if (data.titles.length == 0) {
      alert("No titles found");
    } else {
      return data;
    }
  }
  
  // Function for getting the all titles & store in the caches for offline use
  async function gettotalTilteLength() {
    let TitleData = await FetchTitle();
    if (TitleData.titles.length == 0) {
      TotalTitle = 0;
    } else if (TitleData.titles.length != 0) {
      TotalTitle = TitleData.titles.length;
      caches.open("titleDetails").then((cache) => {
        cache.put("/titlenumber", new Response(TotalTitle));
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

// listener for click on update data button
document.getElementById('update-Data-btn').addEventListener('click', async ()=>{
    document.getElementById('maincontainer').innerHTML = '';
    document.getElementById('maincontainer').insertAdjacentHTML('afterbegin', Sheleton_loading_animation)
    await caches.delete("titleDetails")
    await gettotalTilteLength();
    document.getElementById('maincontainer').insertAdjacentHTML('beforeend', Main_update_page)
    var response = await caches.open("titleDetails")
    var data = await response.match("/Alltitles")
    var dataID = await response.match("/AlltitlesID")
    var AllTitles = await data.json()
    var TitlesID = await dataID.json()
    let select_html_element = "";
    AllTitles.forEach((title, index) => {
        select_html_element+= `<option class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value="${TitlesID[index]}">${title}</option>`
    });
    document.getElementById('data-selector-dropdown').innerHTML = select_html_element;
    document.getElementById('dashboard-skeleton-loading').remove();
    document.getElementById('update-data-finder-container').classList.remove('hidden')
    document.getElementById('data-edit-finder-button').addEventListener('click', (event)=>{
        event.preventDefault();
        if(navigator.onLine){
            update_data_get(document.getElementById('data-selector-dropdown').value)
        }
        else{
            alert("You are offline, Please connect to the internet")
        }
    })
})


async function update_data_get(DataID){
    document.getElementById('maincontainer').innerHTML = Sheleton_loading_animation;
    var response = await fetch('/getdatainfo', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({DataID: DataID }),
    });
    var data = await response.json();
    let Edit_data_html_template = "";
    data.Data.forEach((title, index) => {
        Edit_data_html_template+= `
        <div class="mx-7 mt-[6.25rem]">
            <div class="mb-6">
        <div class="mb-6">
        <label
          for="large-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Edit Data Title name (unique) *</label
        >
        <input
          type="text"
          placeholder="Edit Data Title name *"
          value="${title.Title}"
          id="Edited-Data-Title-Input-Box"
          class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      </div>
      <div
      class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 mt-[6.5rem]"
      >
      <textarea id="Edited-message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">${title.Description}</textarea>
      <button
        type="submit"
        class="inline-flex justify-center p-2 text-green-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-green-500 dark:hover:bg-gray-600" id="Edit-Data-Submit-Button"
      >
        <svg
          aria-hidden="true"
          class="w-6 h-6 rotate-90"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
          ></path>
        </svg>
        <span class="sr-only">Save Data</span>
      </button>
      </div>`
    });
    document.getElementById('maincontainer').innerHTML = Edit_data_html_template;
    document.getElementById('Edit-Data-Submit-Button').addEventListener('click', (event)=>{
        event.preventDefault();
        if(navigator.onLine){
            Main_updater(DataID)
        }
        else{
            alert("You are offline, Please connect to the internet")
        }
    })
}
const TodayDate = Date
async function Main_updater(DataID){
    console.log(DataID)
    let AccountID = localStorage.getItem('AccountID');
    let Name = localStorage.getItem('Name');
    let Email = localStorage.getItem('Email');
    let Title = document.getElementById('Edited-Data-Title-Input-Box').value;
    let Description = document.getElementById('Edited-message').value;
    document.getElementById('maincontainer').innerHTML = Sheleton_loading_animation;
    var response = await fetch('/updatedata', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({AccountID: AccountID, Name: Name, Email: Email, Title: Title, Description: Description, Date: TodayDate, DataID : DataID })
    })
    var data = await response.json();
    console.log(data)
    if(data.Status == "Success fully updated"){
        document.getElementById("maincontainer").innerHTML = `<h1 class="mb-4 text-center text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white lg:mt-[11.25rem] mt-[15.25rem]">Data Updated successfully</h1>`;
            await caches.delete('titleDetails');
            await gettotalTilteLength();
    }
    else if(Status == "Failed to update"){
        alert("Failed to update")
    }
    else if(Status == "Internal Server Error"){
        alert("Internal Server Error")
    }
    else if(Status == "Title not found"){
        alert("Title not found")
    }
    else{
        alert("Something went wrong")
        location.reload()
    }
}