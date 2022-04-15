const linksList = document.getElementById("linksList")
const hamburger = document.getElementById("hamburger")


hamburger.addEventListener("click", ()=>{ 
    console.log("Navigation requested : ",linksList.style.display)
    if(linksList.style.display === "block"){
        linksList.style.display = "none" 
    }
    else{
        linksList.style.display = "block" 
    }
})