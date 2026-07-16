/* ==========================================================
                    JOURNEY.JS
                    PART 1
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const milestones = [...document.querySelectorAll(".milestone")];
    
    const timeline = document.querySelector(".timeline");
    
    const progressLine = document.getElementById("timelineProgress");
    
    const progressFill = document.getElementById("progressFill");
    
    const completedCount = document.getElementById("completedCount");
    
    const currentStage = document.getElementById("currentStage");
    
    const nextMilestone = document.getElementById("nextMilestone");
    
    const lastUpdated = document.getElementById("lastUpdated");
    
    
    /* -----------------------------------
        SETTINGS
    ------------------------------------ */
    
    // Change ONLY these if your journey changes.
    
    const completed = 7;
    
    const current = 7;
    
    
    // Progress card
    
    completedCount.textContent =
    `${completed} / ${milestones.length}`;
    
    currentStage.textContent =
    "IGCSE Graduate";
    
    nextMilestone.textContent =
    "Grade 11";
    
    lastUpdated.textContent =
    "July 2026";
    
    const percent =
    (completed / milestones.length) * 100;
    
    requestAnimationFrame(() => {
    
    progressFill.style.width =
    percent + "%";
    
    });
    
    
    /* -----------------------------------
        MARK PERMANENT STATES
    ------------------------------------ */
    
    milestones.forEach((m,index)=>{
    
    if(index<completed){
    
    m.classList.add("completed");
    
    }
    
    else if(index===current){
    
    m.classList.add("current");
    
    }
    
    });
    
    
    /* -----------------------------------
    TIMELINE ANIMATION
------------------------------------ */

function updateTimeline() {

    const timelineRect = timeline.getBoundingClientRect();

    const currentMilestone = milestones[current];
    
    const currentRect = currentMilestone.getBoundingClientRect();
    
    
    const stopPoint =
        (currentRect.top + currentRect.height / 2)
        - timelineRect.top;
    
    
    let progress =
        (window.innerHeight * 0.70)
        - timelineRect.top;
    
    
    progress = Math.max(0, progress);
    
    progress = Math.min(progress, stopPoint);
    
    
    progressLine.style.height =
        progress + "px";


    milestones.forEach((milestone, index) => {

        const rect =
            milestone.getBoundingClientRect();


        if (
            rect.top <
            window.innerHeight * 0.72
        ) {

            milestone.classList.add("visible");

        }


        if (index < completed) {

            milestone.classList.add("completed");

        }


        if (index === current) {

            milestone.classList.add("current");

        }

    });

}
/* -----------------------------------
    START EVERYTHING
------------------------------------ */

function animate() {

    updateTimeline();

    requestAnimationFrame(animate);

}


/* Initial update */

updateTimeline();


/* Start animation */

requestAnimationFrame(animate);


/* Update after resize */

window.addEventListener("resize", () => {

    updateTimeline();

});


/* Refresh Lucide icons */

if (window.lucide) {

    lucide.createIcons();

}

});
