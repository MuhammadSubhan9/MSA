document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
                    CERTIFICATE EVIDENCE DATA
    ========================================================== */

    const certificateEvidence = {

        "Crew Management in Multi-Pilot Aircraft": {

            context:
                "Understanding how professional flight crews communicate, coordinate and manage operational risk.",

            evidence:
                "Verified Alison credential with 22 hours and 58 minutes of recorded study.",

            application:
                "Builds an early foundation for crew resource management and future multi-pilot training."

        },


        "Basics of Aviation Management": {

            context:
                "Learning how airports, airlines, security and aviation organisations operate together.",

            evidence:
                "Verified Alison credential with 24 hours and 28 minutes of recorded study.",

            application:
                "Supports a broader understanding of the operational environment surrounding professional pilots."

        },


        "Introduction to Aircraft Design": {

            context:
                "Exploring how engineering decisions influence aircraft configuration, performance and airworthiness.",

            evidence:
                "Verified Alison credential covering fundamental aircraft-design principles.",

            application:
                "Strengthens the technical knowledge needed to understand aircraft beyond normal cockpit operation."

        },


        "Diploma in Business Administration": {

            context:
                "Developing an understanding of organisational structure, administration and customer-focused operations.",

            evidence:
                "Verified Alison diploma with 8 hours and 21 minutes of recorded study.",

            application:
                "Supports leadership, organisation and decision-making skills useful throughout an aviation career."

        },


        "Introduction to Business Finance": {

            context:
                "Understanding how organisations evaluate investments, funding and financial decisions.",

            evidence:
                "Verified Alison credential covering foundational business-finance concepts.",

            application:
                "Adds commercial awareness alongside technical and aviation-focused development."

        }

    };


    /* ==========================================================
                    BUILD EVIDENCE CHAINS
    ========================================================== */

    const certificateCards =
        document.querySelectorAll(".cert-card");


    certificateCards.forEach(card => {

        const titleElement =
            card.querySelector("h2");

        const certificateTitle =
            titleElement?.textContent.trim();

        const evidence =
            certificateEvidence[certificateTitle];

        const credentialInformation =
            card.querySelector(".cert-info");

        const verificationLink =
            card.querySelector(
                '.cert-buttons a[href*="/verify/"]'
            );


        /*
        Prevent accidental duplication if this script
        is ever executed more than once.
        */

        if(
            !titleElement ||
            !evidence ||
            card.querySelector(".cert-evidence-chain")
        ){
            return;
        }


        /* Verified status badge */

        if(verificationLink){

            const verifiedBadge =
                document.createElement("div");

            verifiedBadge.className =
                "cert-verified-badge";

            verifiedBadge.setAttribute(
                "aria-label",
                "This credential has an external verification link"
            );


            const verifiedDot =
                document.createElement("span");

            verifiedDot.setAttribute(
                "aria-hidden",
                "true"
            );


            const verifiedText =
                document.createElement("strong");

            verifiedText.textContent =
                "VERIFIABLE";


            verifiedBadge.append(
                verifiedDot,
                verifiedText
            );


            card.prepend(verifiedBadge);


            /*
            Security protection for links opening
            in a new browser tab.
            */

            verificationLink.rel =
                "noopener noreferrer";

        }


        /* Evidence chain */

        const evidenceChain =
            document.createElement("dl");

        evidenceChain.className =
            "cert-evidence-chain";


        const evidenceItems = [

            {
                label: "Context",
                content: evidence.context
            },

            {
                label: "Evidence",
                content: evidence.evidence
            },

            {
                label: "Application",
                content: evidence.application
            }

        ];


        evidenceItems.forEach(item => {

            const evidenceItem =
                document.createElement("div");

            const term =
                document.createElement("dt");

            const description =
                document.createElement("dd");


            term.textContent =
                item.label;

            description.textContent =
                item.content;


            evidenceItem.append(
                term,
                description
            );

            evidenceChain.append(
                evidenceItem
            );

        });


        if(credentialInformation){

            card.insertBefore(
                evidenceChain,
                credentialInformation
            );


            /* Collapsible credential details */

            const details =
                document.createElement("details");

            details.className =
                "cert-evidence-details";


            const summary =
                document.createElement("summary");

            summary.textContent =
                "View credential details";


            card.insertBefore(
                details,
                credentialInformation
            );


            details.append(
                summary,
                credentialInformation
            );

        }else{

            const buttonContainer =
                card.querySelector(".cert-buttons");

            card.insertBefore(
                evidenceChain,
                buttonContainer || null
            );

        }

    });


    /* ==========================================================
                    CERTIFICATE ENTRANCE ANIMATION
    ========================================================== */

    const revealCard = card => {

        card.classList.add(
            "cert-card-visible"
        );

    };


    if(
        "IntersectionObserver" in window
    ){

        const cardObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if(entry.isIntersecting){

                            revealCard(
                                entry.target
                            );

                            cardObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        certificateCards.forEach(card => {

            cardObserver.observe(card);

        });

    }else{

        /*
        Graceful fallback for browsers without
        IntersectionObserver support.
        */

        certificateCards.forEach(
            revealCard
        );

    }

});
