<<<<<<< HEAD
document.addEventListener("DOMContentLoaded",()=>{


    const fills =
    document.querySelectorAll(".fill");
    
    
    fills.forEach(fill=>{
    
        fill.style.setProperty(
            "--width",
            fill.dataset.width
        );
    
    
    });
    
    
    const observer =
    new IntersectionObserver(entries=>{
    
    
    entries.forEach(entry=>{
    
    
    if(entry.isIntersecting){
    
    
    entry.target.classList.add("active");
    
    
    }
    
    
    });
    
    
    },{threshold:.5});
    
    
    
    fills.forEach(fill=>{
    
    observer.observe(fill);
    
    });
    
    
    });
=======
document.addEventListener("DOMContentLoaded",()=>{


    const fills =
    document.querySelectorAll(".fill");
    
    
    fills.forEach(fill=>{
    
        fill.style.setProperty(
            "--width",
            fill.dataset.width
        );
    
    
    });
    
    
    const observer =
    new IntersectionObserver(entries=>{
    
    
    entries.forEach(entry=>{
    
    
    if(entry.isIntersecting){
    
    
    entry.target.classList.add("active");
    
    
    }
    
    
    });
    
    
    },{threshold:.5});
    
    
    
    fills.forEach(fill=>{
    
    observer.observe(fill);
    
    });
    
    
    });
>>>>>>> eb69bdb4dda774a4d4c353d302a6becab1a27222
