// hamburger menu
document.getElementById('hamburgerbtn').addEventListener('click', () => {
  document.getElementById('navbar-sticky').classList.toggle('hidden')
})

const Name = localStorage.getItem('Name')
const Email = localStorage.getItem('Email')
const AccountID = localStorage.getItem('AccountID')

if (Name == null || Email == null || AccountID == null) {
  window.location.href = '/login'
} else if (Name != null && Email != null && AccountID != null) {
  document.getElementById('titleusername').innerText = `Wellcome ${Name}`
  document.getElementById('username').innerText = `Hey, ${Name}`
  document.getElementById('accountID').innerText = `A/C ID : ${AccountID}`
  document.getElementById('Useremail').innerText = `Email : ${Email}`
}

// logout feature
document.getElementById('logoutbtn').addEventListener('click', () => {
  document.getElementById('logout_modal').classList.toggle('hidden')
})
document.getElementById('logout-cross-icon').addEventListener('click', () => {
  document.getElementById('logout_modal').classList.toggle('hidden')
})
document
  .getElementById('i-dont-want-to-logout')
  .addEventListener('click', () => {
    document.getElementById('logout_modal').classList.toggle('hidden')
  })
document
  .getElementById('logout-me-without-quick-login')
  .addEventListener('click', async () => {
    localStorage.removeItem('Name')
    localStorage.removeItem('Email')
    localStorage.removeItem('AccountCreateDate')
    localStorage.removeItem('Country')
    localStorage.removeItem('AccountID')
    await caches.delete('titleDetails')
    document.getElementById('logout_modal').classList.toggle('hidden')
    alert('You need password for next login 😢')
    window.location.href = '/login'
  })
document
  .getElementById('logout-me-with-quick-login')
  .addEventListener('click', () => {
    document.getElementById('logout_modal').classList.toggle('hidden')
    window.location.href = '/'
  })

// function for checking server status
const ServerStatus = async () => {
  const response = await fetch('/api/server/getsystemhelth')
  const FinalResponse = await response.json()
  console.log(FinalResponse)
  document.getElementById('user-online-status').innerText =
    `${FinalResponse.Status} (${FinalResponse.FreeRam})`
  if (FinalResponse.Status == 'Server is busy') {
    document
      .getElementById('user-online-status-icon')
      .classList.add('bg-red-700')
  } else if (FinalResponse.Status == 'Slighly Low Ram in server') {
    document
      .getElementById('user-online-status-icon')
      .classList.add('bg-yellow-500')
  } else if (FinalResponse.Status == 'Server is running smoothly') {
    document
      .getElementById('user-online-status-icon')
      .classList.add('bg-green-700')
  }
}
document.addEventListener('DOMContentLoaded', ServerStatus)

setInterval(ServerStatus, 5000)

document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
}) // Right Click Truned Off
