// global variables for dashboard control
const main_Design = `<div class="mx-16 mt-[6.25rem]">
<div class="mb-6">
  <label
    for="large-input"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >Enter Data Title name (unique) *</label
  >
  <input
    type="text"
    placeholder="Enter Data Title name *"
    id="Add-Data-Title-Input-Box"
    class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  />
</div>
</div>
<div
class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 mt-[6.5rem] mx-6"
>
<textarea
placeholder="Enter Data here *"
  id="Add-Data-Input-Box"
  rows="1"
  class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  placeholder="Enter your Data here..."
></textarea>
<button
  type="submit"
  class="inline-flex justify-center p-2 text-green-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-green-500 dark:hover:bg-gray-600" id="Add-Data-Submit-Button"
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
  <span class="sr-only">Send message</span>
</button>
</div>`
const Account_ID = localStorage.getItem('AccountID');
const EmailID = localStorage.getItem('Email');
const UserName = localStorage.getItem('Name');
var Date = new Date();

document.getElementById('Add-Data-btn').addEventListener('click', Add_Data_Function)

function Add_Data_Function(){
    document.getElementById('maincontainer').innerHTML = '';
    document.getElementById('maincontainer').innerHTML = main_Design;
    document.getElementById('Add-Data-Submit-Button').addEventListener('click', () => {
        if(navigator.onLine){
            Add_Data_Submit_Function();
        }
        else{
            alert('You are offline, please connect to the internet and try again');
        }
    })
}

async function Add_Data_Submit_Function(){
    let Data_Title = document.getElementById('Add-Data-Title-Input-Box').value;
    let Data = document.getElementById('Add-Data-Input-Box').value;
    if(Data_Title == '' || Data == ''){
        alert('Please enter the Data Title and Data');
    }
    else if (Data_Title.length > 20){
        alert('Data Title should be less than 20 characters');
    }
    else{
      document.getElementById('maincontainer').innerHTML = Sheleton_loading_animation
        var res = await fetch('/savedata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: UserName,
                AccountID: Account_ID,
                Email: EmailID,
                Title: Data_Title,
                Data: Data,
                Date: Date
            })
        });
        var response = await res.json();
        console.log(response);
        if(response.Status == 'Internal Server Error'){
            alert('Internal Server Error, Please try again later');
        }
        else if(response.Status == 'Title already exist'){
            alert('Data Title already exists, please try another Data Title');
        }
        else if(response.Status == 'Success fully saved to the database'){
            alert('Data Added Successfully');
            document.getElementById("maincontainer").innerHTML = `<h1 class="mb-4 text-center text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white lg:mt-[11.25rem] mt-[15.25rem]">Data added successfully</h1>`;
            await caches.delete('titleDetails');
        }
    }
}