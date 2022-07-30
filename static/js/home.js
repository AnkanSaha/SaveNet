// checking all savedata forms 
document.getElementById('btnsend').addEventListener('click', ()=>{
    let title = document.getElementById('exampleInputEmail1').value
    var temptitle = localStorage.getItem('title');
    if(title == temptitle){
        window.location.href = '/'
    }
    else if(title != temptitle){
        localStorage.setItem('title', title);
        console.log('New Data Created on server')
    }

});