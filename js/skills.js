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