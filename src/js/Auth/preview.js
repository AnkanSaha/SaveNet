var Name=localStorage.getItem('Name');
var Email =localStorage.getItem('Email');
var Password = localStorage.getItem('Password');

if(Name==null || Email==null || Password==null){
    window.location.href = '/login'
}
else if(Name!=null && Email!=null && Password!=null){
    alert(`Wellcome ${Name} To Your Secure Account`)
    document.getElementById('username').innerText = `Wellcome ${Name}`
    document.getElementById('titleusername').innerText = `Wellcome ${Name}`
}

//logout feature
document.getElementById('logoutbtn').addEventListener('click', ()=>{
    var permission = confirm('Want to password for future login ?')
    if(permission==true){
        alert('Login details saved for future login 🥰');
    }
    else if(permission!=true || permission== false){
        localStorage.removeItem('Name')
        localStorage.removeItem('Email')
        localStorage.removeItem('Password')
        alert('You need password for next login 😢')
        window.location.href='/login'
    }
})