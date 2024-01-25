let TotalTitle
let ViewAllTitlesHtmlTemplate = ''
// variables for the dashboard controller
const Sheleton_loading_animation = `<div id="dashboard-skeleton-loading" role="status" class="max-w-[100%] animate-pulse lg:mb-2 lg:py-3 py-10">
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[82%] mb-4"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 max-w-[60%] mb-2.5"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[82%] mb-2.5"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 max-w-[60%]  mb-2.5"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[82%] mb-2.5"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 max-w-[60%]  mb-2.5"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[82%] mb-2.5"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 max-w-[60%] mb-2.5"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[82%] mb-2.5"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 max-w-[60%] mb-2.5"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[82%] mb-2.5"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 max-w-[60%] mb-2.5"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 w-[82%] mb-2.5"></div>
<div class="h-[1.75rem] bg-gray-200 rounded-full dark:bg-gray-700 max-w-[60%]"></div>
<span class="sr-only">Loading...</span>
</div>`
// getting the data title from the database
async function FetchTitle () {
  const res = await fetch('/gettitles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ AccountID, Email })
  })
  const data = await res.json()
  if (data.titles.length == 0) {
    alert('No titles found')
  } else {
    return data
  }
}

// Function for getting the all titles & store in the caches for offline use
async function gettotalTilteLength () {
  const TitleData = await FetchTitle()
  if (TitleData.titles.length == 0) {
    TotalTitle = 0
  } else if (TitleData.titles.length != 0) {
    TotalTitle = TitleData.titles.length
    caches.open('titleDetails').then((cache) => {
      cache.put('/titlenumber', new Response(TotalTitle))
      document.getElementById('dashboard-titles-count').innerText =
        TitleData.titles.length
    })
    caches.open('titleDetails').then((cache) => {
      cache.put('/Alltitles', new Response(JSON.stringify(TitleData.titles)))
    })
    caches.open('titleDetails').then((cache) => {
      cache.put('/AlltitlesID', new Response(JSON.stringify(TitleData.DataID)))
    })
  }
}

// rendering all the titles in the dashboard for dashboard controller
document
  .getElementById('dashboard-view-all-titles-btn')
  .addEventListener('click', async () => {
    document.getElementById('maincontainer').innerHTML = ''
    showAlltitles()
  })

function showAlltitles () {
  document
    .getElementById('maincontainer')
    .insertAdjacentHTML('afterbegin', Sheleton_loading_animation)
  document.getElementById('maincontainer').insertAdjacentHTML(
    'beforeend',
    `<div id="View-AllTitle-Viewer" class="hidden flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full" id="View-All-Data-Titles-Section">
            <thead class="border-b">
              <tr>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Rank
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Data Titles
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Data Actions
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>`
  )
  caches.open('titleDetails').then(async (cache) => {
    const TitleNameres = await cache.match('/Alltitles')
    const TitleID = await cache.match('/AlltitlesID')
    if (TitleNameres) {
      var DataID = await TitleID.json()
      var Titles = await TitleNameres.json()
      Titles.forEach((Selectedtitle, index) => {
        ViewAllTitlesHtmlTemplate += `<tbody>
          <tr class="border-b">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${
              index + 1
            }</td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              ${Selectedtitle}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <button name='${
              DataID[index]
            }' class="px-5 bg-green-600 text-white font-extrabold py-1 rounded-full read-btn">Read</button>
            <button name='${
              DataID[index]
            }' class="px-5 bg-red-600 text-white font-extrabold py-1 rounded-full delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>`
      })
      document.getElementById('dashboard-skeleton-loading').remove()
      document
        .getElementById('View-AllTitle-Viewer')
        .classList.toggle('hidden')
      document
        .getElementById('View-All-Data-Titles-Section')
        .insertAdjacentHTML('beforeend', ViewAllTitlesHtmlTemplate)
    } else if (!TitleNameres) {
      await gettotalTilteLength()
      const resp = await cache.match('/Alltitles')
      if (resp) {
        var Titles = await resp.json()
        Titles.forEach((Selectedtitle, index) => {
          ViewAllTitlesHtmlTemplate += `<tbody>
          <tr class="border-b">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${
              index + 1
            }</td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              ${Selectedtitle}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <button name='${
              DataID[index]
            }' class="px-5 bg-green-600 text-white font-extrabold py-1 rounded-full read-btn">Read</button>
            <button name='${
              DataID[index]
            }' class="px-5 bg-cyan-600 text-white font-extrabold py-1 rounded-full delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>`
        })
        document.getElementById('dashboard-skeleton-loading').remove()
        document
          .getElementById('View-AllTitle-Viewer')
          .classList.toggle('hidden')
        document
          .getElementById('View-All-Data-Titles-Section')
          .insertAdjacentHTML('beforeend', ViewAllTitlesHtmlTemplate)
      }
    }
    // adding event listener to the delete button
    document.querySelectorAll('.delete-btn').forEach((selectedbtn) => {
      selectedbtn.addEventListener('click', (event) => {
        const online_status = navigator.onLine
        if (online_status == true) {
          const Selected_Button_title = event.target.getAttribute('name')
          document.getElementById('maincontainer').innerHTML =
            Sheleton_loading_animation
          DeleteTitle(Selected_Button_title)
        } else if (online_status == false) {
          alert(
            'Your internet connection is not working, please try again later'
          )
        }
      })
    })
    // adding event listener to the read button
    document.querySelectorAll('.read-btn').forEach((selectedbtn) => {
      selectedbtn.addEventListener('click', (event) => {
        const online_status = navigator.onLine
        if (online_status == true) {
          const Selected_Button_title = event.target.getAttribute('name')
          document.getElementById('maincontainer').innerHTML =
            Sheleton_loading_animation
          ReadTitle(Selected_Button_title)
        } else if (online_status == false) {
          alert(
            'Your internet connection is not working, please try again later'
          )
        }
      })
    })
  })
}

// function for deleting the title from the database
async function DeleteTitle (ID) {
  const res = await fetch('/deletedata', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ DataID: ID })
  })
  const DeleteResponsedata = await res.json()
  if (DeleteResponsedata.Status == 'Success') {
    await caches.delete('titleDetails')
    gettotalTilteLength()
    alert('Data Deleted successfully from the database')
    document.getElementById('maincontainer').innerHTML =
      '<h1 class="mb-4 text-center text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white lg:mt-[11.25rem] mt-[15.25rem]">Data deleted successfully</h1>'
  } else {
    alert(`${DeleteResponsedata.Status}`)
  }
}
// function for reading the specific title data from the database
async function ReadTitle (DATAID) {
  const response = await fetch('/getdatainfo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ DataID: DATAID })
  })
  const responsedata = await response.json()
  let Read_data_HTML_Template = ''
  responsedata.Data.forEach((data, index) => {
    Read_data_HTML_Template += `<div class="mt-5">
    <h1 class="mb-4 text-center text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">${data.Title}</h1>
    <h4 class="lg:ml-[2.75rem] ml-[1rem] my-[2.75rem]" style="font-family: 'Montserrat', sans-serif">By ${data.Name}</h4>
    <p class="mx-6">
      ${data.Description}
    </p>
  </div>`
  })
  document.getElementById('maincontainer').innerHTML = ''
  document.getElementById('maincontainer').innerHTML = Read_data_HTML_Template
}
