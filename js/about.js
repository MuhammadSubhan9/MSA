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
