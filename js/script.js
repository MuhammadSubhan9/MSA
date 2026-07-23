/* ==========================================================
                FIRST-VISIT CINEMATIC WELCOME
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const welcome =
        document.getElementById(
            "cinematicWelcome"
        );

    const skipButton =
        document.getElementById(
            "cinematicWelcomeSkip"
        );


    /*
    If this tab has already shown the welcome,
    remove the unused element completely.
    */

    if(
        document.documentElement.classList.contains(
            "welcome-already-seen"
        )
    ){

        welcome?.remove();
        return;

    }


    if(!welcome){
        return;
    }


    document.body.classList.add(
        "cinematic-welcome-active"
    );


    let hasFinished =
        false;

    let finishTimer =
        null;


    function rememberWelcome(){

        try{

            sessionStorage.setItem(
                "msa-welcome-seen",
                "true"
            );

        }catch(error){

            /*
            The welcome still works if storage
            is unavailable.
            */

        }

    }


    function finishWelcome(){

        if(hasFinished){
            return;
        }


        hasFinished =
            true;

        window.clearTimeout(
            finishTimer
        );

        rememberWelcome();


        welcome.classList.add(
            "is-leaving"
        );


        window.setTimeout(() => {

            document.body.classList.remove(
                "cinematic-welcome-active"
            );

            document.documentElement.classList.add(
                "welcome-already-seen"
            );

            welcome.remove();

        }, 1400);

    }

    if(skipButton){

        skipButton.addEventListener(
            "click",
            event => {
    
                event.preventDefault();
                event.stopImmediatePropagation();
    
                finishWelcome();
    
            }
        );
    
    }



    /*
    The written sequence lasts about 4.2 seconds,
    followed by the cinematic curtain exit.
    */

    finishTimer =
    window.setTimeout(
        finishWelcome,
        6250
    );


    skipButton?.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        finishWelcome();
    });


    /*
    Escape also skips the introduction.
    */

    document.addEventListener(
        "keydown",
        event => {

            if(
                event.key === "Escape" &&
                !hasFinished
            ){

                finishWelcome();

            }

        }
    );

});
/* =========================================
   ADAPTIVE PERFORMANCE MODE
========================================= */

(() => {
    "use strict";

    const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

    const slowConnection =
        connection?.effectiveType === "slow-2g" ||
        connection?.effectiveType === "2g";

    const dataSaving = connection?.saveData === true;

    const lowMemory =
        typeof navigator.deviceMemory === "number" &&
        navigator.deviceMemory <= 2;

    if (slowConnection || dataSaving || lowMemory) {
        document.documentElement.dataset.msaPerformance = "lite";
    }
})();


const particles = document.querySelector(".particles");

if(particles){

    for(let i = 0; i < 40; i++){

        let particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left = Math.random()*100 + "%";
        particle.style.top = Math.random()*100 + "%";

        particle.style.animationDelay =
        Math.random()*5 + "s";

        particles.appendChild(particle);

    }

}


/* =========================================
   ACCESSIBLE MOBILE NAVIGATION
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    function setMenu(open) {
        navLinks.classList.toggle("active", open);
        document.body.classList.toggle("mobile-menu-open", open);

        menuToggle.setAttribute(
            "aria-expanded",
            String(open)
        );

        menuToggle.setAttribute(
            "aria-label",
            open
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        const icon = menuToggle.querySelector("span");

        if (icon) {
            icon.textContent = open ? "×" : "☰";
        }
    }

    menuToggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const open =
            menuToggle.getAttribute("aria-expanded") === "true";

        setMenu(!open);
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setMenu(false);
        }
    });

    document.addEventListener("click", (event) => {
        if (
            navLinks.classList.contains("active") &&
            !event.target.closest("nav")
        ) {
            setMenu(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenu(false);
            menuToggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            setMenu(false);
        }
    });
}
/* Cursor-following card glow */

const interactiveCards = document.querySelectorAll(
    ".card, .stat-card, .progress-card, .content, .about-section, " +
    ".skill-card, .cert-card, .experience-card, .contact-card"
);


interactiveCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", mouseX + "px");
        card.style.setProperty("--mouse-y", mouseY + "px");

    });

});
/* ==========================================================
        CURSOR CARD TILT
========================================================== */

const tiltCards = document.querySelectorAll(
    ".card, .stat-card, .progress-card, .content, .about-section, " +
    ".skill-card, .cert-card, .experience-card, .contact-card"
);


tiltCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY =
            ((x - centerX) / centerX) * 12;

        const rotateX =
            ((centerY - y) / centerY) * 12;

        card.style.setProperty(
            "--rotate-x",
            rotateX + "deg"
        );

        card.style.setProperty(
            "--rotate-y",
            rotateY + "deg"
        );

    });


    card.addEventListener("mouseleave", () => {

        card.style.setProperty(
            "--rotate-x",
            "0deg"
        );

        card.style.setProperty(
            "--rotate-y",
            "0deg"
        );

    });

});
/* =========================================
   PAGE SCROLL PROGRESS INDICATOR
========================================= */

function updatePageScrollProgress() {
    const progressFill = document.querySelector(
        ".page-scroll-progress-fill"
    );

    if (!progressFill) return;

    const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;

    const scrollableHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrollPercentage =
        scrollableHeight > 0
            ? (scrollTop / scrollableHeight) * 100
            : 0;

    progressFill.style.width =
        `${Math.min(Math.max(scrollPercentage, 0), 100)}%`;
}

window.addEventListener(
    "scroll",
    updatePageScrollProgress,
    { passive: true }
);

window.addEventListener(
    "resize",
    updatePageScrollProgress
);

document.addEventListener(
    "DOMContentLoaded",
    updatePageScrollProgress
);
/* ==========================================================
        SIMPLE PAGE LOADING TRANSITION
========================================================== */

document.body.classList.add("page-enter");


window.addEventListener("load", () => {

    setTimeout(() => {

        document.body.classList.remove("page-enter");

    }, 150);

});


const pageLinks = document.querySelectorAll(
    'a[href$=".html"], a[href="./"], a[href="/"]'
);


pageLinks.forEach(link => {

    link.addEventListener("click", event => {

        const href = link.getAttribute("href");


        if(
            !href ||
            link.target === "_blank" ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:")
        ){

            return;

        }


        event.preventDefault();

        document.body.classList.add("page-exit");


        setTimeout(() => {

            window.location.href = href;

        }, 180);

    });

});


window.addEventListener("pageshow", () => {

    document.body.classList.remove("page-exit");

});
/* ==========================================================
                    BUTTON RIPPLE
========================================================== */

const rippleButtons = document.querySelectorAll(
    ".btn, button:not(.cinematic-welcome__skip):not(.constellation-item), .nav-btn, .download-btn, .contact-btn"
);


rippleButtons.forEach(button => {

    button.addEventListener("click", event => {

        const rect = button.getBoundingClientRect();

        const ripple = document.createElement("span");

        ripple.classList.add("button-ripple");

        ripple.style.left =
            event.clientX - rect.left + "px";

        ripple.style.top =
            event.clientY - rect.top + "px";

        button.appendChild(ripple);


        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});
/* ==========================================================
                    MAGNETIC BUTTONS
========================================================== */

const magneticButtons = document.querySelectorAll(
    "button:not(.cinematic-welcome__skip):not(.constellation-item):not(.command-centre-trigger):not(.command-centre-result):not(.experience-dialog-close):not(.evidence-node):not([data-evidence-filter])"
);
magneticButtons.forEach(button => {

    button.addEventListener("mousemove", event => {

        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        button.style.setProperty(
            "transform",
            `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`,
            "important"
        );

    });

    button.addEventListener("mouseleave", () => {

        button.style.setProperty(
            "transform",
            "translate(0, 0) scale(1)",
            "important"
        );

    });

});
/* ==========================================================
                    CUSTOM CURSOR
========================================================== */

const cursor = document.querySelector(".custom-cursor");
const cursorDot = document.querySelector(".custom-cursor-dot");


if(cursor && cursorDot){

    let cursorX = 0;
    let cursorY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener("mousemove", event => {

        cursorX = event.clientX;
        cursorY = event.clientY;

        cursorDot.style.left = cursorX + "px";
        cursorDot.style.top = cursorY + "px";

    });


    function animateCursor(){

        ringX += (cursorX - ringX) * 0.18;
        ringY += (cursorY - ringY) * 0.18;

        cursor.style.left = ringX + "px";
        cursor.style.top = ringY + "px";

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    const interactiveElements = document.querySelectorAll(
        "a, button, .card, .stat-card, .about-section, .content"
    );
    
    
    interactiveElements.forEach(element => {
    
        element.addEventListener("mouseenter", () => {
    
            cursor.classList.add("hovering");
    
        });
    
    
        element.addEventListener("mouseleave", () => {
    
            cursor.classList.remove("hovering");
    
        });
    
    });
}
/* ==========================================================
                PORTFOLIO COMMAND CENTRE
========================================================== */

const commandPalette =
    document.querySelector(
        ".command-palette"
    );

const commandBox =
    document.querySelector(
        ".command-box"
    );

const commandInput =
    document.querySelector(
        "#commandInput"
    );

const commandResults =
    document.querySelector(
        ".command-results"
    );


if(
    commandPalette &&
    commandBox &&
    commandInput &&
    commandResults
){

    /* ======================================================
                    AVAILABLE COMMANDS
    ====================================================== */

    const portfolioCommands = [

        {
            title:
                "Home",

            description:
                "Return to the portfolio overview",

            group:
                "Page",

            icon:
                "⌂",

            href:
                "index.html",

            keywords:
                "home overview introduction muhammad subhan portfolio"
        },


        {
            title:
                "About Me",

            description:
                "My story, thinking and aviation motivation",

            group:
                "Page",

            icon:
                "◉",

            href:
                "about.html",

            keywords:
                "about biography story values curiosity pilot motivation"
        },


        {
            title:
                "Journey",

            description:
                "View the complete personal and academic timeline",

            group:
                "Page",

            icon:
                "↗",

            href:
                "timeline.html",

            keywords:
                "journey timeline milestones progress education aviation"
        },


        {
            title:
                "Skills",

            description:
                "Explore evidence-based capabilities",

            group:
                "Page",

            icon:
                "◇",

            href:
                "skills.html",

            keywords:
                "skills capabilities technology research mathematics physics"
        },


        {
            title:
                "Certifications",

            description:
                "View verified learning and credentials",

            group:
                "Page",

            icon:
                "✓",

            href:
                "certification.html",

            keywords:
                "certificates certifications credentials courses alison evidence"
        },


        {
            title:
                "Contact",

            description:
                "Prepare a purposeful message",

            group:
                "Page",

            icon:
                "✦",

            href:
                "contact.html",

            keywords:
                "contact connect message email networking opportunity"
        },


        {
            title:
                "Academic Path",

            description:
                "Jump to the academic phase of my journey",

            group:
                "Journey",

            icon:
                "02",

            href:
                "timeline.html#phase-academic",

            keywords:
                "academic school igcse grade 11 a level education"
        },


        {
            title:
                "Flight Training Phase",

            description:
                "Jump to the planned professional-training phase",

            group:
                "Journey",

            icon:
                "03",

            href:
                "timeline.html#phase-training",

            keywords:
                "flight training university pilot licence cpl type rating"
        },


        {
            title:
                "Airline Career",

            description:
                "Jump to the First Officer and Captain goals",

            group:
                "Journey",

            icon:
                "04",

            href:
                "timeline.html#phase-career",

            keywords:
                "airline career first officer captain commercial pilot"
        },


        {
            title:
                "Events & Experiences",

            description:
                "Explore conferences and industry exposure",

            group:
                "Evidence",

            icon:
                "◎",

            href:
                "certification.html#experiences",

            keywords:
                "events experiences conferences black hat aviation ai games"
        },


        {
            title:
                "Email Muhammad Subhan",

            description:
                "Open a new email message",

            group:
                "Connect",

            icon:
                "@",

            href:
                "mailto:subhan.ahmadbaqa@gmail.com",

            keywords:
                "email contact message connect"
        },


        {
            title:
                "Open LinkedIn",

            description:
                "View my professional LinkedIn profile",

            group:
                "External",

            icon:
                "in",

            href:
                "https://www.linkedin.com/in/ms910",

            external:
                true,

            keywords:
                "linkedin social professional profile connect"
        },


        {
            title:
                "Display Preferences",

            description:
                "Adjust motion, contrast and decorative effects",

            group:
                "Action",

            icon:
                "Aa",

            action:
                "display-preferences",

            keywords:
                "display accessibility motion contrast focus settings preferences"
        }

    ];


    /* ======================================================
                    ADD COMMAND-BOX INTERFACE
    ====================================================== */

    const commandHeader =
        document.createElement("div");

    commandHeader.className =
        "command-centre-header";


    const commandHeaderLabel =
        document.createElement("span");

    commandHeaderLabel.textContent =
        "NAVIGATION COMMAND";


    const escapeKey =
        document.createElement("kbd");

    escapeKey.textContent =
        "ESC";


    commandHeader.append(
        commandHeaderLabel,
        escapeKey
    );


    const commandFooter =
        document.createElement("div");

    commandFooter.className =
        "command-centre-footer";

    commandFooter.innerHTML = `

        <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            Navigate
        </span>

        <span>
            <kbd>Enter</kbd>
            Open
        </span>

        <span>
            <kbd>Esc</kbd>
            Close
        </span>

    `;


    commandBox.insertBefore(
        commandHeader,
        commandInput
    );


    commandBox.append(
        commandFooter
    );


    commandInput.placeholder =
        "Search pages, milestones, evidence or actions…";

    commandInput.setAttribute(
        "aria-label",
        "Search portfolio commands"
    );

    commandInput.setAttribute(
        "role",
        "combobox"
    );

    commandInput.setAttribute(
        "aria-controls",
        "portfolioCommandResults"
    );

    commandInput.setAttribute(
        "aria-expanded",
        "true"
    );

    commandInput.setAttribute(
        "aria-autocomplete",
        "list"
    );


    commandResults.id =
        "portfolioCommandResults";

    commandResults.setAttribute(
        "role",
        "listbox"
    );


    /* ======================================================
                    VISIBLE SEARCH TRIGGER
    ====================================================== */

    const mainNavigation =
    document.querySelector(
        "body > nav:not(.section-constellation)"
    );

    const mobileMenuButton =
        mainNavigation?.querySelector(
            ".menu-toggle"
        );


    const commandTrigger =
        document.createElement("button");

    commandTrigger.type =
        "button";

    commandTrigger.className =
        "command-centre-trigger";

    commandTrigger.setAttribute(
        "aria-label",
        "Open portfolio search"
    );

    commandTrigger.setAttribute(
        "aria-keyshortcuts",
        "Control+K Meta+K"
    );

    commandTrigger.innerHTML = `

        <span aria-hidden="true">
            ⌕
        </span>

        <span>
            Search
        </span>

        <kbd>
            Ctrl K
        </kbd>

    `;


    if(mainNavigation){

        if(mobileMenuButton){

            mainNavigation.insertBefore(
                commandTrigger,
                mobileMenuButton
            );

        }else{

            mainNavigation.append(
                commandTrigger
            );

        }

    }


    /* ======================================================
                    SEARCH STATE
    ====================================================== */

    let visibleCommands = [];

    let activeCommandIndex = 0;


    function normaliseSearchValue(value){

        return value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, " ");

    }


    function commandMatchesSearch(
        command,
        searchValue
    ){

        if(!searchValue){
            return true;
        }


        const searchTerms =
            searchValue.split(" ");


        const searchableContent =
            normaliseSearchValue(
                [
                    command.title,
                    command.description,
                    command.group,
                    command.keywords
                ].join(" ")
            );


        return searchTerms.every(
            term =>
                searchableContent.includes(
                    term
                )
        );

    }


    function highlightSearchText(
        text,
        searchValue
    ){

        const fragment =
            document.createDocumentFragment();


        if(!searchValue){

            fragment.append(
                document.createTextNode(text)
            );

            return fragment;

        }


        const terms =
            searchValue
                .split(" ")
                .filter(Boolean)
                .sort(
                    (first, second) =>
                        second.length -
                        first.length
                );


        const escapedTerms =
            terms.map(term =>
                term.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&"
                )
            );


        if(!escapedTerms.length){

            fragment.append(
                document.createTextNode(text)
            );

            return fragment;

        }


        const expression =
            new RegExp(
                `(${escapedTerms.join("|")})`,
                "gi"
            );


        const parts =
            text.split(expression);


        parts.forEach(part => {

            const isMatch =
                terms.some(
                    term =>
                        part.toLowerCase() ===
                        term.toLowerCase()
                );


            if(isMatch){

                const mark =
                    document.createElement("mark");

                mark.textContent =
                    part;

                fragment.append(
                    mark
                );

            }else{

                fragment.append(
                    document.createTextNode(
                        part
                    )
                );

            }

        });


        return fragment;

    }


    /* ======================================================
                    ACTIVE RESULT
    ====================================================== */

    function updateActiveCommand(){

        const resultElements = [
            ...commandResults.querySelectorAll(
                ".command-centre-result"
            )
        ];


        if(!resultElements.length){

            commandInput.removeAttribute(
                "aria-activedescendant"
            );

            return;
        }


        activeCommandIndex =
            Math.max(
                0,
                Math.min(
                    activeCommandIndex,
                    resultElements.length - 1
                )
            );


        resultElements.forEach(
            (result, index) => {

                const isActive =
                    index ===
                    activeCommandIndex;


                result.classList.toggle(
                    "command-result-active",
                    isActive
                );


                result.setAttribute(
                    "aria-selected",
                    isActive.toString()
                );


                if(isActive){

                    commandInput.setAttribute(
                        "aria-activedescendant",
                        result.id
                    );


                    result.scrollIntoView({

                        block:
                            "nearest"

                    });

                }

            }
        );

    }


    /* ======================================================
                    RUN A COMMAND
    ====================================================== */

    function runPortfolioCommand(command){

        if(!command){
            return;
        }


        if(
            command.action ===
            "display-preferences"
        ){

            closeCommandCentre();


            const preferencesDialog =
                document.querySelector(
                    "#experiencePreferencesDialog"
                );


            if(
                preferencesDialog &&
                typeof preferencesDialog
                    .showModal === "function"
            ){

                preferencesDialog.showModal();

            }


            return;

        }


        if(command.external){

            closeCommandCentre();


            window.open(
                command.href,
                "_blank",
                "noopener,noreferrer"
            );


            return;

        }


        if(
            command.href.startsWith(
                "mailto:"
            )
        ){

            closeCommandCentre();


            window.location.href =
                command.href;


            return;

        }


        closeCommandCentre();


        document.body.classList.add(
            "page-exit"
        );


        window.setTimeout(() => {

            window.location.href =
                command.href;

        }, 180);

    }


    /* ======================================================
                    RENDER RESULTS
    ====================================================== */

    function renderPortfolioCommands(){

        const searchValue =
            normaliseSearchValue(
                commandInput.value
            );


        visibleCommands =
            portfolioCommands.filter(
                command =>
                    commandMatchesSearch(
                        command,
                        searchValue
                    )
            );


        commandResults.replaceChildren();


        activeCommandIndex = 0;


        if(!visibleCommands.length){

            const emptyState =
                document.createElement("div");

            emptyState.className =
                "command-centre-empty";


            const emptyIcon =
                document.createElement("span");

            emptyIcon.textContent =
                "⌕";


            const emptyTitle =
                document.createElement("strong");

            emptyTitle.textContent =
                "No matching command";


            const emptyDescription =
                document.createElement("p");

            emptyDescription.textContent =
                "Try a page, topic, milestone or action.";


            emptyState.append(
                emptyIcon,
                emptyTitle,
                emptyDescription
            );


            commandResults.append(
                emptyState
            );


            updateActiveCommand();

            return;

        }


        visibleCommands.forEach(
            (command, index) => {

                const result =
                    document.createElement("button");

                result.type =
                    "button";

                result.className =
                    "command-centre-result";

                result.id =
                    `portfolio-command-${index}`;

                result.setAttribute(
                    "role",
                    "option"
                );

                result.setAttribute(
                    "aria-selected",
                    "false"
                );


                const icon =
                    document.createElement("span");

                icon.className =
                    "command-result-icon";

                icon.textContent =
                    command.icon;


                const resultCopy =
                    document.createElement("span");

                resultCopy.className =
                    "command-result-copy";


                const title =
                    document.createElement("strong");

                title.append(
                    highlightSearchText(
                        command.title,
                        searchValue
                    )
                );


                const description =
                    document.createElement("small");

                description.append(
                    highlightSearchText(
                        command.description,
                        searchValue
                    )
                );


                resultCopy.append(
                    title,
                    description
                );


                const resultGroup =
                    document.createElement("span");

                resultGroup.className =
                    "command-result-group";

                resultGroup.textContent =
                    command.group;


                result.append(
                    icon,
                    resultCopy,
                    resultGroup
                );


                result.addEventListener(
                    "mouseenter",
                    () => {

                        activeCommandIndex =
                            index;

                        updateActiveCommand();

                    }
                );


                result.addEventListener(
                    "click",
                    () => {

                        runPortfolioCommand(
                            command
                        );

                    }
                );


                commandResults.append(
                    result
                );

            }
        );


        updateActiveCommand();

    }


    /* ======================================================
                    OPEN AND CLOSE
    ====================================================== */

    function openCommandCentre(){

        commandPalette.classList.add(
            "open"
        );


        document.body.classList.add(
            "command-centre-open"
        );


        commandInput.value =
            "";


        renderPortfolioCommands();


        window.setTimeout(() => {

            commandInput.focus();

        }, 80);

    }


    function closeCommandCentre(){

        commandPalette.classList.remove(
            "open"
        );


        document.body.classList.remove(
            "command-centre-open"
        );


        commandInput.value =
            "";

    }


    commandTrigger.addEventListener(
        "click",
        openCommandCentre
    );


    commandInput.addEventListener(
        "input",
        renderPortfolioCommands
    );


    commandInput.addEventListener(
        "keydown",
        event => {

            if(
                event.key ===
                "ArrowDown" &&
                visibleCommands.length
            ){
                event.preventDefault();


                activeCommandIndex =
                    (
                        activeCommandIndex + 1
                    ) %
                    visibleCommands.length;


                updateActiveCommand();

            }


            if(
                event.key ===
                "ArrowUp" &&
                visibleCommands.length
            ){

                event.preventDefault();


                activeCommandIndex =
                    (
                        activeCommandIndex -
                        1 +
                        visibleCommands.length
                    ) %
                    visibleCommands.length;


                updateActiveCommand();

            }


            if(
                event.key ===
                "Enter" &&
                visibleCommands.length
            ){

                event.preventDefault();


                runPortfolioCommand(
                    visibleCommands[
                        activeCommandIndex
                    ]
                );

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if(
                (
                    event.ctrlKey ||
                    event.metaKey
                ) &&
                event.key.toLowerCase() ===
                "k"
            ){

                event.preventDefault();


                if(
                    commandPalette.classList
                        .contains("open")
                ){

                    closeCommandCentre();

                }else{

                    openCommandCentre();

                }

            }


            if(
                event.key ===
                "Escape" &&
                commandPalette.classList
                    .contains("open")
            ){

                closeCommandCentre();


                commandTrigger.focus();

            }

        }
    );


    commandPalette.addEventListener(
        "click",
        event => {

            if(
                event.target ===
                commandPalette
            ){

                closeCommandCentre();

            }

        }
    );


    renderPortfolioCommands();

}
/* ==========================================================
                    BACK TO TOP BUTTON
========================================================== */

const backToTopButton = document.querySelector(".back-to-top");

if(backToTopButton){

    window.addEventListener("scroll", () => {

        if(window.scrollY > 500){

            backToTopButton.classList.add("show");

        }else{

            backToTopButton.classList.remove("show");

        }

    });


    backToTopButton.addEventListener("click", () => {

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}
/* ==========================================================
                    VISITOR LENS
========================================================== */

const visitorLensButtons = document.querySelectorAll(
    "[data-visitor-lens]"
);

const visitorRouteCards = document.querySelectorAll(
    "[data-visitor-audience]"
);

const visitorRouteTitle = document.querySelector(
    "#visitorRouteTitle"
);

const visitorRouteCount = document.querySelector(
    "#visitorRouteCount"
);


const visitorLensTitles = {

    aviation:
        "Your route into my aviation journey",

    opportunities:
        "A quick view of my experience and potential",

    technology:
        "Explore my technical development",

    all:
        "Explore my complete portfolio"

};


function getSavedVisitorLens(){

    try{

        return localStorage.getItem(
            "muhammad-subhan-visitor-lens"
        );

    }catch(error){

        return null;

    }

}


function saveVisitorLens(lens){

    try{

        localStorage.setItem(
            "muhammad-subhan-visitor-lens",
            lens
        );

    }catch(error){

        /*
        The visitor lens still works if the browser
        blocks local storage.
        */

    }

}


function applyVisitorLens(selectedLens, shouldSave = true){

    const validLenses = [
        "aviation",
        "opportunities",
        "technology",
        "all"
    ];


    const lens = validLenses.includes(selectedLens)
        ? selectedLens
        : "all";


    visitorLensButtons.forEach(button => {

        const isSelected =
            button.dataset.visitorLens === lens;


        button.setAttribute(
            "aria-pressed",
            isSelected.toString()
        );

    });


    let visibleRoutes = 0;


    visitorRouteCards.forEach((card, index) => {

        const audiences = (
            card.dataset.visitorAudience || ""
        )
            .split(" ")
            .filter(Boolean);


        const shouldShow =
            lens === "all" ||
            audiences.includes(lens);


        card.hidden = !shouldShow;

        card.classList.remove(
            "visitor-route-enter"
        );


        if(shouldShow){

            visibleRoutes++;

            /*
            Restart the entrance animation only for
            cards being displayed.
            */

            void card.offsetWidth;

            card.style.animationDelay =
                `${visibleRoutes * 55}ms`;

            card.classList.add(
                "visitor-route-enter"
            );

        }

    });


    if(visitorRouteTitle){

        visitorRouteTitle.textContent =
            visitorLensTitles[lens];

    }


    if(visitorRouteCount){

        visitorRouteCount.textContent =
            `${visibleRoutes} ${
                visibleRoutes === 1 ? "page" : "pages"
            }`;

    }


    if(shouldSave){

        saveVisitorLens(lens);

    }

}


visitorLensButtons.forEach(button => {

    button.addEventListener("click", () => {

        applyVisitorLens(
            button.dataset.visitorLens
        );

    });

});


if(
    visitorLensButtons.length &&
    visitorRouteCards.length
){

    applyVisitorLens(
        getSavedVisitorLens() || "all",
        false
    );

}
/* ==========================================================
                PORTFOLIO ROUTE MEMORY
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const pageFooter =
        document.querySelector("footer");


    if(!pageFooter){
        return;
    }


    /* ======================================================
                    PORTFOLIO PAGE ROUTE
    ====================================================== */

    const portfolioPages = [

        {
            file:
                "index.html",

            label:
                "Home",

            nextTitle:
                "Begin with the person behind the portfolio",

            nextDescription:
                "Learn about my background, motivation, mindset and the values guiding my development."
        },


        {
            file:
                "about.html",

            label:
                "About",

            nextTitle:
                "Follow how the journey developed",

            nextDescription:
                "Move from my personal story into the milestones that shaped my academic and aviation direction."
        },


        {
            file:
                "timeline.html",

            label:
                "Journey",

            nextTitle:
                "Explore the capabilities being built",

            nextDescription:
                "See the knowledge, interests and practical capabilities supporting each stage of the journey."
        },


        {
            file:
                "skills.html",

            label:
                "Skills",

            nextTitle:
                "Review the evidence behind the learning",

            nextDescription:
                "Continue to verified courses, credentials and professional experiences."
        },


        {
            file:
                "certification.html",

            label:
                "Credentials",

            nextTitle:
                "Continue the conversation",

            nextDescription:
                "Use the guided connection brief to get in touch with the right context."
        },


        {
            file:
                "contact.html",

            label:
                "Contact",

            nextTitle:
                "Portfolio route complete",

            nextDescription:
                "Return to the overview or revisit any stage of the portfolio."
        }

    ];


    const knownFiles =
        new Set(
            portfolioPages.map(
                page => page.file
            )
        );


    const pathFile =
        window.location.pathname
            .split("/")
            .filter(Boolean)
            .pop();


    const currentFile =
        knownFiles.has(pathFile)
            ? pathFile
            : "index.html";


    const currentIndex =
        portfolioPages.findIndex(
            page => page.file === currentFile
        );


    const currentPage =
        portfolioPages[currentIndex];


    const isFinalPage =
        currentIndex ===
        portfolioPages.length - 1;


    const nextPage =
        isFinalPage
            ? portfolioPages[0]
            : portfolioPages[currentIndex + 1];


    /* ======================================================
                    VISITED PAGE MEMORY
    ====================================================== */

    function getVisitedPages(){

        try{

            const storedValue =
                localStorage.getItem(
                    "muhammad-subhan-portfolio-route"
                );


            const parsedValue =
                storedValue
                    ? JSON.parse(storedValue)
                    : [];


            if(!Array.isArray(parsedValue)){
                return [];
            }


            return parsedValue.filter(
                file => knownFiles.has(file)
            );

        }catch(error){

            return [];

        }

    }


    function saveVisitedPages(pages){

        try{

            localStorage.setItem(
                "muhammad-subhan-portfolio-route",
                JSON.stringify(pages)
            );

        }catch(error){

            /*
            The route still displays when storage
            is unavailable.
            */

        }

    }


    const visitedPages =
        new Set(
            getVisitedPages()
        );


    visitedPages.add(
        currentFile
    );


    saveVisitedPages(
        [...visitedPages]
    );


    const exploredPercentage =
        (
            visitedPages.size /
            portfolioPages.length
        ) * 100;
        const routeComplete =
    visitedPages.size ===
    portfolioPages.length;


    /* ======================================================
                    BUILD THE COMPONENT
    ====================================================== */

    const routeSection =
        document.createElement("aside");

    routeSection.className =
        "portfolio-route-memory";

    routeSection.setAttribute(
        "aria-labelledby",
        "portfolioRouteMemoryTitle"
    );


    /* Top information */

    const routeTop =
        document.createElement("div");

    routeTop.className =
        "portfolio-route-top";


    const routeIdentity =
        document.createElement("div");


    const routeEyebrow =
        document.createElement("p");

    routeEyebrow.className =
        "portfolio-route-eyebrow";

    routeEyebrow.textContent =
        "PORTFOLIO ROUTE";


    const routeHeading =
        document.createElement("h2");

    routeHeading.id =
        "portfolioRouteMemoryTitle";

    routeHeading.textContent =
        "Your progress through my story";


    routeIdentity.append(
        routeEyebrow,
        routeHeading
    );


    const routeCount =
        document.createElement("span");

    routeCount.className =
        "portfolio-route-count";

    routeCount.textContent =
        `${visitedPages.size} / ${portfolioPages.length} explored`;


    routeTop.append(
        routeIdentity,
        routeCount
    );


    /* Main progress bar */

    const progressTrack =
        document.createElement("div");

    progressTrack.className =
        "portfolio-route-progress";

    progressTrack.setAttribute(
        "role",
        "progressbar"
    );

    progressTrack.setAttribute(
        "aria-label",
        "Portfolio pages explored"
    );

    progressTrack.setAttribute(
        "aria-valuemin",
        "0"
    );

    progressTrack.setAttribute(
        "aria-valuemax",
        portfolioPages.length.toString()
    );

    progressTrack.setAttribute(
        "aria-valuenow",
        visitedPages.size.toString()
    );


    const progressIndicator =
        document.createElement("span");

    progressIndicator.style.width =
        `${exploredPercentage}%`;


    progressTrack.append(
        progressIndicator
    );


    /* Individual route stages */

    const stageList =
        document.createElement("ol");

    stageList.className =
        "portfolio-route-stages";


    portfolioPages.forEach(
        (page, index) => {

            const stage =
                document.createElement("li");

            const marker =
                document.createElement("span");

            const stageLabel =
                document.createElement("span");


            marker.className =
                "portfolio-route-marker";

            marker.textContent =
                String(index + 1)
                    .padStart(2, "0");


            stageLabel.className =
                "portfolio-route-stage-label";

            stageLabel.textContent =
                page.label;


            if(
                visitedPages.has(page.file)
            ){

                stage.classList.add(
                    "portfolio-route-visited"
                );

            }


            if(page.file === currentFile){

                stage.classList.add(
                    "portfolio-route-current"
                );

                stage.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            stage.append(
                marker,
                stageLabel
            );


            stageList.append(
                stage
            );

        }
    );


    /* Recommended next page */

    const recommendation =
        document.createElement("div");

    recommendation.className =
        "portfolio-route-recommendation";


    const recommendationCopy =
        document.createElement("div");


    const recommendationEyebrow =
        document.createElement("p");

        recommendationEyebrow.textContent =
        routeComplete
            ? "PORTFOLIO COMPLETED"
            : isFinalPage
                ? "FINAL STAGE"
                : "NEXT RECOMMENDED";


    const recommendationTitle =
        document.createElement("h3");

        recommendationTitle.textContent =
        routeComplete
            ? "Thank you for exploring my complete portfolio"
            : currentPage.nextTitle;


    const recommendationDescription =
        document.createElement("p");

        recommendationDescription.textContent =
        routeComplete
            ? "You have reached every stage of my story—from my background and journey to my capabilities, credentials and contact page. I genuinely appreciate the time you took to explore it."
            : currentPage.nextDescription;


    recommendationCopy.append(
        recommendationEyebrow,
        recommendationTitle,
        recommendationDescription
    );


    const nextLink =
        document.createElement("a");

    nextLink.href =
        nextPage.file;


    const nextLinkText =
        document.createElement("span");

    nextLinkText.textContent =
        isFinalPage
            ? "Return home"
            : `Continue to ${nextPage.label}`;


    const nextLinkArrow =
        document.createElement("span");

    nextLinkArrow.setAttribute(
        "aria-hidden",
        "true"
    );

    nextLinkArrow.textContent =
        "→";


    nextLink.append(
        nextLinkText,
        nextLinkArrow
    );


    if(routeComplete){

        recommendation.classList.add(
            "portfolio-route-complete"
        );
    
    
        const completionMessage =
            document.createElement("div");
    
        completionMessage.className =
            "portfolio-route-thank-you";
    
    
        const completionIcon =
            document.createElement("span");
    
        completionIcon.setAttribute(
            "aria-hidden",
            "true"
        );
    
        completionIcon.textContent =
            "✓";
    
    
        const completionText =
            document.createElement("span");
    
    
        const completionTitle =
            document.createElement("strong");
    
        completionTitle.textContent =
            "Route complete";
    
    
        const completionSubtitle =
            document.createElement("small");
    
        completionSubtitle.textContent =
            "Thank you for your time";
    
    
        completionText.append(
            completionTitle,
            completionSubtitle
        );
    
    
        completionMessage.append(
            completionIcon,
            completionText
        );
    
    
        recommendation.append(
            recommendationCopy,
            completionMessage
        );
    
    }else{
    
        recommendation.append(
            recommendationCopy,
            nextLink
        );
    
    }


    routeSection.append(
        routeTop,
        progressTrack,
        stageList,
        recommendation
    );


    pageFooter.parentNode.insertBefore(
        routeSection,
        pageFooter
    );


    /* ======================================================
                    PAGE TRANSITION FOR NEW LINK
    ====================================================== */

if(!routeComplete){

    nextLink.addEventListener(
        "click",
        event => {

            const destination =
                nextLink.getAttribute(
                    "href"
                );


            if(!destination){
                return;
            }


            event.preventDefault();


            document.body.classList.add(
                "page-exit"
            );


            window.setTimeout(() => {

                window.location.href =
                    destination;

            }, 180);

        }
    );

}
});
/* ==========================================================
                ADAPTIVE EXPERIENCE CONTROLS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const root =
        document.documentElement;


    const storageKey =
        "muhammad-subhan-experience-preferences";


    const systemReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    const defaultPreferences = {

        calmMotion:
            systemReducedMotion.matches,

        enhancedContrast:
            false,

        focusMode:
            false

    };


    /* ======================================================
                    LOAD AND SAVE SETTINGS
    ====================================================== */

    function loadExperiencePreferences(){

        try{

            const savedPreferences =
                localStorage.getItem(
                    storageKey
                );


            if(!savedPreferences){

                return {
                    ...defaultPreferences
                };

            }


            const parsedPreferences =
                JSON.parse(
                    savedPreferences
                );


            return {

                calmMotion:
                    Boolean(
                        parsedPreferences
                            .calmMotion
                    ),

                enhancedContrast:
                    Boolean(
                        parsedPreferences
                            .enhancedContrast
                    ),

                focusMode:
                    Boolean(
                        parsedPreferences
                            .focusMode
                    )

            };

        }catch(error){

            return {
                ...defaultPreferences
            };

        }

    }


    function saveExperiencePreferences(){

        try{

            localStorage.setItem(
                storageKey,
                JSON.stringify(
                    experiencePreferences
                )
            );

        }catch(error){

            /*
            Controls continue working during
            the current visit.
            */

        }

    }


    let experiencePreferences =
        loadExperiencePreferences();


    /* ======================================================
                    APPLY SETTINGS
    ====================================================== */

    function applyExperiencePreferences(){

        root.dataset.userMotion =
            experiencePreferences.calmMotion
                ? "calm"
                : "standard";


        root.dataset.userContrast =
            experiencePreferences
                .enhancedContrast
                    ? "enhanced"
                    : "standard";


        root.dataset.userFocus =
            experiencePreferences.focusMode
                ? "focused"
                : "decorative";


        const motionControl =
            document.querySelector(
                "#experienceCalmMotion"
            );

        const contrastControl =
            document.querySelector(
                "#experienceEnhancedContrast"
            );

        const focusControl =
            document.querySelector(
                "#experienceFocusMode"
            );


        if(motionControl){

            motionControl.checked =
                experiencePreferences
                    .calmMotion;

        }


        if(contrastControl){

            contrastControl.checked =
                experiencePreferences
                    .enhancedContrast;

        }


        if(focusControl){

            focusControl.checked =
                experiencePreferences
                    .focusMode;

        }

    }


    /*
    Apply immediately before constructing the
    visible controls.
    */

    applyExperiencePreferences();


    /* ======================================================
                    CREATE TRIGGER
    ====================================================== */

    const experienceTrigger =
        document.createElement("button");

    experienceTrigger.type =
        "button";

    experienceTrigger.className =
        "experience-preferences-trigger";

    experienceTrigger.setAttribute(
        "aria-label",
        "Open display and motion preferences"
    );

    experienceTrigger.setAttribute(
        "aria-haspopup",
        "dialog"
    );

    experienceTrigger.setAttribute(
        "aria-controls",
        "experiencePreferencesDialog"
    );


    const triggerMainText =
        document.createElement("span");

    triggerMainText.textContent =
        "Aa";


    const triggerLabel =
        document.createElement("span");

    triggerLabel.textContent =
        "Display";


    experienceTrigger.append(
        triggerMainText,
        triggerLabel
    );


    /* ======================================================
                    CREATE DIALOG
    ====================================================== */

    const experienceDialog =
        document.createElement("dialog");

    experienceDialog.className =
        "experience-preferences-dialog";

    experienceDialog.id =
        "experiencePreferencesDialog";

    experienceDialog.setAttribute(
        "aria-labelledby",
        "experiencePreferencesTitle"
    );


    experienceDialog.innerHTML = `

        <form method="dialog">

            <header class="experience-dialog-header">

                <div>

                    <p>
                        ADAPTIVE EXPERIENCE
                    </p>

                    <h2 id="experiencePreferencesTitle">
                        Display preferences
                    </h2>

                    <span>
                        Adjust the portfolio without changing
                        its content.
                    </span>

                </div>


                <button
                    type="submit"
                    class="experience-dialog-close"
                    aria-label="Close display preferences"
                    value="close"
                >
                    ×
                </button>

            </header>


            <div class="experience-preference-list">

                <label class="experience-preference">

                    <span class="experience-preference-icon">
                        ◌
                    </span>

                    <span class="experience-preference-copy">

                        <strong>
                            Calm motion
                        </strong>

                        <small>
                            Remove animated movement, card tilting
                            and magnetic interactions.
                        </small>

                    </span>

                    <input
                        type="checkbox"
                        id="experienceCalmMotion"
                    >

                    <span
                        class="experience-toggle"
                        aria-hidden="true"
                    ></span>

                </label>


                <label class="experience-preference">

                    <span class="experience-preference-icon">
                        ◐
                    </span>

                    <span class="experience-preference-copy">

                        <strong>
                            Enhanced contrast
                        </strong>

                        <small>
                            Strengthen text, borders and important
                            interface elements.
                        </small>

                    </span>

                    <input
                        type="checkbox"
                        id="experienceEnhancedContrast"
                    >

                    <span
                        class="experience-toggle"
                        aria-hidden="true"
                    ></span>

                </label>


                <label class="experience-preference">

                    <span class="experience-preference-icon">
                        ◎
                    </span>

                    <span class="experience-preference-copy">

                        <strong>
                            Focus mode
                        </strong>

                        <small>
                            Remove decorative particles, background
                            glows and the custom cursor.
                        </small>

                    </span>

                    <input
                        type="checkbox"
                        id="experienceFocusMode"
                    >

                    <span
                        class="experience-toggle"
                        aria-hidden="true"
                    ></span>

                </label>

            </div>


            <footer class="experience-dialog-footer">

                <button
                    type="button"
                    id="resetExperiencePreferences"
                >
                    Reset preferences
                </button>


                <button
                    type="submit"
                    value="done"
                >
                    Done
                </button>

            </footer>

        </form>

    `;


    document.body.append(
        experienceTrigger,
        experienceDialog
    );


    /* ======================================================
                    CONTROL EVENTS
    ====================================================== */

    const calmMotionControl =
        experienceDialog.querySelector(
            "#experienceCalmMotion"
        );

    const contrastControl =
        experienceDialog.querySelector(
            "#experienceEnhancedContrast"
        );

    const focusModeControl =
        experienceDialog.querySelector(
            "#experienceFocusMode"
        );

    const resetButton =
        experienceDialog.querySelector(
            "#resetExperiencePreferences"
        );


    applyExperiencePreferences();


    experienceTrigger.addEventListener(
        "click",
        () => {

            if(
                typeof experienceDialog
                    .showModal === "function"
            ){

                experienceDialog.showModal();

            }else{

                experienceDialog.setAttribute(
                    "open",
                    ""
                );

            }

        }
    );


    calmMotionControl.addEventListener(
        "change",
        () => {

            experiencePreferences.calmMotion =
                calmMotionControl.checked;

            applyExperiencePreferences();

            saveExperiencePreferences();

        }
    );


    contrastControl.addEventListener(
        "change",
        () => {

            experiencePreferences
                .enhancedContrast =
                    contrastControl.checked;

            applyExperiencePreferences();

            saveExperiencePreferences();

        }
    );


    focusModeControl.addEventListener(
        "change",
        () => {

            experiencePreferences.focusMode =
                focusModeControl.checked;

            applyExperiencePreferences();

            saveExperiencePreferences();

        }
    );


    resetButton.addEventListener(
        "click",
        () => {

            experiencePreferences = {
                ...defaultPreferences
            };


            applyExperiencePreferences();

            saveExperiencePreferences();

        }
    );


    /*
    Clicking the dark backdrop closes the dialog.
    */

    experienceDialog.addEventListener(
        "click",
        event => {

            if(event.target === experienceDialog){

                experienceDialog.close();

            }

        }
    );


    /*
    Update the default if the operating-system
    preference changes and the visitor has not
    manually saved preferences.
    */

    systemReducedMotion.addEventListener?.(
        "change",
        event => {

            try{

                const hasSavedPreferences =
                    localStorage.getItem(
                        storageKey
                    );


                if(hasSavedPreferences){
                    return;
                }

            }catch(error){

                /*
                Continue using the current-session
                preference.
                */

            }


            experiencePreferences.calmMotion =
                event.matches;


            applyExperiencePreferences();

        }
    );

});
/* ==========================================================
                NAVIGATION ORIENTATION SYSTEM
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const primaryNavigation =
    document.querySelector(
        "body > nav:not(.section-constellation)"
    );

    if(!primaryNavigation){
        return;
    }


    const primaryLinks = [
        ...primaryNavigation.querySelectorAll(
            ".nav-links a"
        )
    ];

    const orientationMenuToggle =
        primaryNavigation.querySelector(
            ".menu-toggle"
        );

    const orientationNavLinks =
        primaryNavigation.querySelector(
            ".nav-links"
        );

    const navigationLogo =
        primaryNavigation.querySelector(
            ".logo"
        );


    const navigationPages = {

        "index.html":
            "Home",

        "about.html":
            "About",

        "timeline.html":
            "Journey",

        "skills.html":
            "Skills",

        "certification.html":
            "Credentials",

        "contact.html":
            "Contact"

    };


    const pathFile =
        window.location.pathname
            .split("/")
            .filter(Boolean)
            .pop();


    const currentFile =
        navigationPages[pathFile]
            ? pathFile
            : "index.html";


    const currentPageName =
        navigationPages[currentFile];


    /* ======================================================
                    MARK CURRENT PAGE
    ====================================================== */

    primaryLinks.forEach(link => {

        const linkFile =
            link.getAttribute("href")
                ?.split("#")[0];


        if(linkFile === currentFile){

            link.setAttribute(
                "aria-current",
                "page"
            );

        }else{

            link.removeAttribute(
                "aria-current"
            );

        }

    });


    /* ======================================================
                    PAGE CONTEXT BESIDE LOGO
    ====================================================== */

    if(
        navigationLogo &&
        !navigationLogo.querySelector(
            ".navigation-page-context"
        )
    ){

        const pageContext =
            document.createElement("span");

        pageContext.className =
            "navigation-page-context";


        const contextDivider =
            document.createElement("span");

        contextDivider.setAttribute(
            "aria-hidden",
            "true"
        );

        contextDivider.textContent =
            "/";


        const contextName =
            document.createElement("span");

        contextName.textContent =
            currentPageName;


        pageContext.append(
            contextDivider,
            contextName
        );


        navigationLogo.append(
            pageContext
        );

    }


    /* ======================================================
                    ACCESSIBLE MOBILE MENU
    ====================================================== */

    if(
        orientationMenuToggle &&
        orientationNavLinks
    ){

        orientationNavLinks.id =
            "primaryNavigationLinks";


        orientationMenuToggle.setAttribute(
            "role",
            "button"
        );

        orientationMenuToggle.setAttribute(
            "tabindex",
            "0"
        );

        orientationMenuToggle.setAttribute(
            "aria-controls",
            "primaryNavigationLinks"
        );

        orientationMenuToggle.setAttribute(
            "aria-expanded",
            orientationNavLinks.classList
                .contains("active")
                .toString()
        );

        orientationMenuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        function updateMobileMenuState(){

            const menuOpen =
                orientationNavLinks.classList
                    .contains("active");


            orientationMenuToggle.setAttribute(
                "aria-expanded",
                menuOpen.toString()
            );

            orientationMenuToggle.setAttribute(
                "aria-label",
                menuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            orientationMenuToggle.classList.toggle(
                "menu-toggle-open",
                menuOpen
            );

        }


        /*
        Your original click handler performs the
        actual opening. This listener synchronises
        the accessibility state afterwards.
        */

        orientationMenuToggle.addEventListener(
            "click",
            () => {

                requestAnimationFrame(
                    updateMobileMenuState
                );

            }
        );


        orientationMenuToggle.addEventListener(
            "keydown",
            event => {

                if(
                    event.key === "Enter" ||
                    event.key === " "
                ){

                    event.preventDefault();

                    orientationMenuToggle.click();

                }

            }
        );


        primaryLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    orientationNavLinks.classList
                        .remove("active");

                    updateMobileMenuState();

                }
            );

        });


        document.addEventListener(
            "keydown",
            event => {

                if(
                    event.key === "Escape" &&
                    orientationNavLinks.classList
                        .contains("active")
                ){

                    orientationNavLinks.classList
                        .remove("active");

                    updateMobileMenuState();

                    orientationMenuToggle.focus();

                }

            }
        );


        document.addEventListener(
            "click",
            event => {

                if(
                    !primaryNavigation.contains(
                        event.target
                    ) &&
                    orientationNavLinks.classList
                        .contains("active")
                ){

                    orientationNavLinks.classList
                        .remove("active");

                    updateMobileMenuState();

                }

            }
        );


        updateMobileMenuState();

    }

});
/* ==========================================================
                CONNECTION RECOVERY INDICATOR
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const connectionStatus =
        document.getElementById("connectionStatus");

    const connectionStatusText =
        document.getElementById("connectionStatusText");


    if(
        !connectionStatus ||
        !connectionStatusText
    ){
        return;
    }


    let hideTimer = null;


    function showConnectionStatus(
        message,
        isOnline,
        hideAutomatically = true
    ){

        window.clearTimeout(hideTimer);

        connectionStatusText.textContent =
            message;

        connectionStatus.classList.toggle(
            "is-online",
            isOnline
        );

        connectionStatus.classList.add(
            "is-visible"
        );

        connectionStatus.setAttribute(
            "aria-hidden",
            "false"
        );


        if(hideAutomatically){

            hideTimer =
                window.setTimeout(() => {

                    connectionStatus.classList.remove(
                        "is-visible"
                    );

                    connectionStatus.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }, 3000);

        }

    }


    window.addEventListener("offline", () => {

        showConnectionStatus(
            "You are offline",
            false,
            false
        );

    });


    window.addEventListener("online", () => {

        showConnectionStatus(
            "Connection restored",
            true,
            true
        );

    });


    if(!navigator.onLine){

        showConnectionStatus(
            "You are offline",
            false,
            false
        );

    }

});
/* ==========================================================
                    EXTERNAL LINK INTELLIGENCE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const links =
        document.querySelectorAll("a[href]");


    links.forEach(link => {

        const rawHref =
            link.getAttribute("href");


        if(
            !rawHref ||
            rawHref.startsWith("#") ||
            rawHref.startsWith("mailto:") ||
            rawHref.startsWith("tel:") ||
            rawHref.startsWith("javascript:") ||
            link.hasAttribute("download")
        ){
            return;
        }


        let linkURL;


        try{

            linkURL =
                new URL(
                    rawHref,
                    window.location.href
                );

        }catch(error){

            return;

        }


        const isExternal =
            linkURL.origin !==
            window.location.origin;


        if(!isExternal){
            return;
        }


        link.target =
            "_blank";

        link.rel =
            "noopener noreferrer";


        link.classList.add(
            "external-link"
        );


        if(
            !link.querySelector(
                ".external-link__icon"
            )
        ){

            const icon =
                document.createElement("span");

            icon.className =
                "external-link__icon";

            icon.setAttribute(
                "aria-hidden",
                "true"
            );

            icon.textContent =
                "↗";

            link.appendChild(icon);

        }


        const existingLabel =
            link.getAttribute("aria-label");

        if(!existingLabel){

            const visibleText =
                link.textContent.trim();

            if(visibleText){

                link.setAttribute(
                    "aria-label",
                    `${visibleText} — opens an external website`
                );

            }

        }

    });

});

/* ==========================================================
                SECTION CONSTELLATION NAVIGATOR
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const navigator =
        document.getElementById(
            "sectionConstellation"
        );

    if(!navigator){
        return;
    }

    const sections = [
        ...document.querySelectorAll(
            "body > section:not(#cinematicWelcome)"
        )
    ].filter(section => {

        return (
            section.id !==
            "cinematicWelcome"
        );

    });

    if(sections.length < 2){

        navigator.remove();
        return;

    }

    const items = [];

    function createLabel(section){

        const customLabel =
            section.dataset.navLabel;

        if(customLabel){
            return customLabel;
        }

        const heading =
            section.querySelector(
                "h1, h2, h3"
            );

        if(heading){

            return heading
                .textContent
                .trim();

        }

        return section.id
            .replace(/[-_]/g, " ")
            .replace(
                /\b\w/g,
                letter =>
                    letter.toUpperCase()
            );

    }

    sections.forEach(section => {

        const label =
            createLabel(section);

        const button =
            document.createElement(
                "button"
            );

        button.type =
            "button";

        button.className =
            "constellation-item";

        button.setAttribute(
            "aria-label",
            `Go to ${label}`
        );

        const dot =
            document.createElement(
                "span"
            );

        dot.className =
            "constellation-dot";

        dot.setAttribute(
            "aria-hidden",
            "true"
        );

        const labelElement =
            document.createElement(
                "span"
            );

        labelElement.className =
            "constellation-label";

        labelElement.textContent =
            label;

        button.appendChild(dot);
        button.appendChild(labelElement);

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopImmediatePropagation();

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

        navigator.appendChild(
            button
        );

        items.push(button);

    });

    function updateConstellation(){

        const marker =
            window.innerHeight * 0.45;

        let activeIndex =
            0;

        sections.forEach(
            (section, index) => {

                const rect =
                    section.getBoundingClientRect();

                if(rect.top <= marker){

                    activeIndex =
                        index;

                }

            }
        );

        items.forEach(
            (item, index) => {

                item.classList.toggle(
                    "is-active",
                    index === activeIndex
                );

                item.classList.toggle(
                    "is-passed",
                    index < activeIndex
                );

            }
        );

    }

    updateConstellation();

    window.addEventListener(
        "scroll",
        updateConstellation,
        {
            passive: true
        }
    );

    window.addEventListener(
        "resize",
        updateConstellation
    );

    window.setTimeout(() => {

        navigator.classList.add(
            "is-ready"
        );

    }, 500);

});

/* ==========================================================
                SECTION ARRIVAL ANIMATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const sections = [
        ...document.querySelectorAll(
            "body > section:not(#cinematicWelcome)"
        )
    ];

    if(!sections.length){
        return;
    }

    const arrivalObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if(!entry.isIntersecting){
                        return;
                    }

                    entry.target.classList.add(
                        "section-arrived"
                    );

                    arrivalObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.28,
                rootMargin:
                    "0px 0px -12% 0px"
            }
        );

    sections.forEach(section => {

        const heading =
            section.querySelector(
                "h1, h2, h3"
            );

        if(!heading){
            return;
        }

        arrivalObserver.observe(section);

    });

});
