document.getElementById('loginbtn').addEventListener('click', ()=>{
    var Email = document.getElementById('RegisteredEmail').value
    var Password = document.getElementById('RegisteredPassword').value
    fetch('/CheckUser', {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({Email:Email, Password:Password})
    }).then((data)=>{
        data.json().then((response)=>{
            console.log(response.status[0].Email)
            if(response.status == 'User Not Registered'){
                alert(response.status);
                window.location.href = '/'
            }
            else if(response.status != 'User Not Registered'){
                localStorage.setItem('Email', response.status[0].Email)
                localStorage.setItem('Password', response.status[0].Password)
                localStorage.setItem('Name', response.status[0].Name)
                window.location.href='/signedwelcome'
            }
        })
    })
})