fetch('../HTML/header.html').then(res=>res.text()).then((page)=>{
    document.querySelector('div#header').innerHTML=page
})
fetch('../HTML/footer.html').then(res=>res.text()).then((page)=>{
    document.querySelector('div#footer').innerHTML=page
})