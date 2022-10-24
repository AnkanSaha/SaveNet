document.addEventListener('contextmenu', (e)=>{
    e.preventDefault()
}) // Right Click Truned Off

// Validator of saved Login Info
var SavedLoginEmail = localStorage.getItem('Email');
var SavedLoginPassword = localStorage.getItem('Password');
if(SavedLoginEmail != null || SavedLoginPassword!= null){
    window.location.href = '/login'
}
else if(SavedLoginEmail == null || SavedLoginPassword == null){
    console.log('Login Info Not Saved')
}