/* ==========================================================
                JOURNEY PHASE NAVIGATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const phaseNavigation =
        document.querySelector(
            ".journey-phase-navigation"
        );

    const phaseLinks = [
        ...document.querySelectorAll(
            "[data-journey-phase]"
        )
    ];


    if(
        !phaseNavigation ||
        !phaseLinks.length
    ){
        return;
    }


    const phaseSections =
        phaseLinks
            .map(link => {

                const targetSelector =
                    link.getAttribute("href");

                const target =
                    targetSelector
                        ? document.querySelector(
                            targetSelector
                        )
                        : null;


                return target
                    ? {
                        link,
                        target
                    }
                    : null;

            })
            .filter(Boolean);


    if(!phaseSections.length){
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    /* ======================================================
                    SMOOTH PHASE JUMP
    ====================================================== */

    phaseLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetSelector =
                link.getAttribute("href");

            const target =
                targetSelector
                    ? document.querySelector(
                        targetSelector
                    )
                    : null;


            if(!target){
                return;
            }


            event.preventDefault();


            target.scrollIntoView({

                behavior:
                    reducedMotion.matches
                        ? "auto"
                        : "smooth",

                block:
                    "center"

            });

        });

    });


    /* ======================================================
                    ACTIVE PHASE DETECTION
    ====================================================== */

    function updateActivePhase(){

        const readingPosition =
            window.innerHeight * 0.48;


        let activePhase =
            phaseSections[0];


        phaseSections.forEach(phase => {

            const phasePosition =
                phase.target
                    .getBoundingClientRect()
                    .top;


            if(
                phasePosition <=
                readingPosition
            ){

                activePhase =
                    phase;

            }

        });


        phaseLinks.forEach(link => {

            if(
                link === activePhase.link
            ){

                link.setAttribute(
                    "aria-current",
                    "step"
                );

            }else{

                link.removeAttribute(
                    "aria-current"
                );

            }

        });

    }


    /* ======================================================
                    PERFORMANCE-SAFE SCROLLING
    ====================================================== */

    let updateScheduled = false;


    function schedulePhaseUpdate(){

        if(updateScheduled){
            return;
        }


        updateScheduled = true;


        requestAnimationFrame(() => {

            updateActivePhase();

            updateScheduled = false;

        });

    }


    window.addEventListener(
        "scroll",
        schedulePhaseUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        schedulePhaseUpdate
    );


    window.addEventListener(
        "load",
        schedulePhaseUpdate
    );


    updateActivePhase();

});