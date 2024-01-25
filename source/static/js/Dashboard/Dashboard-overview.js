// dashboard overview
document.addEventListener('DOMContentLoaded', overview)
document
  .getElementById('dashboard-overview')
  .addEventListener('click', overview)
const Username = localStorage.getItem('Name')

async function overview () {
  document.getElementById('maincontainer').innerHTML = ''
  const overview_design = `<p style="font-family: 'Sofia Sans Extra Condensed', sans-serif;" class="text-2xl mt-[2rem] ml-[1.75rem] lg:ml-[2.25rem] lg:text-6xl text-gray-900 dark:text-white">Wellcome ${Username}</p>
  <p style="font-family: 'Moon Dance', cursive;" class="tracking-widest text-gray-500 md:text-lg dark:text-gray-600 my-3 ml-[1.75rem] lg:ml-[2.25rem] mb-3">Here is your all saved data overview.</p>`
  document
    .getElementById('maincontainer')
    .insertAdjacentHTML('afterbegin', overview_design)
  document.getElementById('maincontainer').insertAdjacentHTML(
    'beforeend',
    ` <div
  class="flex justify-between flex-col lg:flex-row mx-5 flex-wrap cursor-pointer mt-[1.25rem] lg:mt-0"
  id="renderFront"
>
</div>`
  )
  document
    .getElementById('maincontainer')
    .insertAdjacentHTML('beforeend', Sheleton_loading_animation)
  const res = await caches.open('titleDetails')
  const data = await res.match('Alltitles')
  const DataID = await res.match('AlltitlesID')
  const Main_data_Title = await data.json()
  const Main_Data_ID = await DataID.json()
  let overview_data_HTML_Template = ''
  Main_data_Title.forEach((data, index) => {
    overview_data_HTML_Template += `
              <a DataID="${Main_Data_ID[index]}" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${data}</h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">Added By ${Username}.</p>
            </a>`
  })
  document.getElementById('renderFront').innerHTML =
    overview_data_HTML_Template
  document.getElementById('dashboard-skeleton-loading').remove()
}

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
