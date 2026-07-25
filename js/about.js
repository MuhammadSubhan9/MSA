document.addEventListener("DOMContentLoaded", () => {

    const aboutSections =
        document.querySelectorAll(".about-section, .about-closing");


    const aboutObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add("about-visible");

                    aboutObserver.unobserve(entry.target);

                }

            });

        },{
            threshold:0.15
        });


    aboutSections.forEach(section => {

        aboutObserver.observe(section);

    });

});
/* ==========================================================
                ABOUT PAGE READING MODE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const readingButtons =
        document.querySelectorAll(
            "[data-about-reading]"
        );

    const readingDescription =
        document.querySelector(
            "#aboutReadingDescription"
        );


    const validReadingModes = [
        "scan",
        "full"
    ];


    const readingDescriptions = {

        scan:
            "Quick Scan is showing the essential points from each section.",

        full:
            "Full Story is currently showing the complete narrative."

    };


    function getSavedReadingMode(){

        try{

            return localStorage.getItem(
                "muhammad-subhan-about-reading-mode"
            );

        }catch(error){

            return null;

        }

    }


    function saveReadingMode(mode){

        try{

            localStorage.setItem(
                "muhammad-subhan-about-reading-mode",
                mode
            );

        }catch(error){

            /*
            The control continues working if storage
            is unavailable.
            */

        }

    }


    function applyReadingMode(
        selectedMode,
        shouldSave = true
    ){

        const mode =
            validReadingModes.includes(selectedMode)
                ? selectedMode
                : "full";


        document.documentElement.dataset.aboutReading =
            mode;


        readingButtons.forEach(button => {

            const isSelected =
                button.dataset.aboutReading === mode;


            button.setAttribute(
                "aria-pressed",
                isSelected.toString()
            );

        });


        if(readingDescription){

            readingDescription.textContent =
                readingDescriptions[mode];

        }


        if(shouldSave){

            saveReadingMode(mode);

        }

    }


    readingButtons.forEach(button => {

        button.addEventListener("click", () => {

            applyReadingMode(
                button.dataset.aboutReading
            );

        });

    });


    if(readingButtons.length){

        applyReadingMode(
            getSavedReadingMode() || "full",
            false
        );

    }

});
