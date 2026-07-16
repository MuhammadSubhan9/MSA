document.addEventListener("DOMContentLoaded",()=>{


    const cards =
    document.querySelectorAll(".cert-card");
    
    
    const observer =
    new IntersectionObserver(entries=>{
    
    
    entries.forEach(entry=>{
    
    
    if(entry.isIntersecting){
    
    entry.target.style.opacity="1";
    
    entry.target.style.transform="translateY(0)";
    
    }
    
    
    });
    
    
    },{threshold:.2});
    
    
    
    cards.forEach(card=>{
    
    card.style.opacity="0";
    
    card.style.transform="translateY(40px)";
    
    card.style.transition=".8s ease";
    
    observer.observe(card);
    
    });
    
    
    });
