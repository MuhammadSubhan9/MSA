/* ==========================================================
                EVIDENCE CONSTELLATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const constellation =
        document.querySelector(
            ".evidence-constellation"
        );

    if(!constellation){
        return;
    }


    const filterButtons = [
        ...constellation.querySelectorAll(
            "[data-evidence-filter]"
        )
    ];

    const evidenceNodes = [
        ...constellation.querySelectorAll(
            ".evidence-node"
        )
    ];

    const insightCount =
        constellation.querySelector(
            "#evidenceInsightCount"
        );

    const insightType =
        constellation.querySelector(
            "#evidenceInsightType"
        );

    const insightTitle =
        constellation.querySelector(
            "#evidenceInsightTitle"
        );

    const insightSummary =
        constellation.querySelector(
            "#evidenceInsightSummary"
        );

    const insightDomains = [
        ...constellation.querySelectorAll(
            "[data-insight-domain]"
        )
    ];


    if(
        !filterButtons.length ||
        !evidenceNodes.length ||
        !insightCount ||
        !insightType ||
        !insightTitle ||
        !insightSummary
    ){
        return;
    }


    const domainInformation = {

        all: {

            type:
                "Complete evidence map",

            title:
                "Connected learning and experience",

            summary:
                "Select a point in the constellation or filter by domain to explore how individual experiences contribute to my wider development."

        },


        aviation: {

            type:
                "Aviation evidence",

            title:
                "Building an aviation foundation",

            summary:
                "Courses and industry events have developed my awareness of aircraft, crew operations, airports, management and the wider aviation environment."

        },


        technology: {

            type:
                "Technology evidence",

            title:
                "Understanding modern systems",

            summary:
                "Technology events and technical learning have expanded my awareness of cybersecurity, artificial intelligence, digital industries and engineering."

        },


        business: {

            type:
                "Business evidence",

            title:
                "Developing commercial awareness",

            summary:
                "Business courses and industry exposure have introduced organisational operations, finance, investment and commercial decision-making."

        }

    };


    let activeFilter =
        "all";

    let selectedNode =
        null;


    function getNodeDomains(node){

        return (
            node.dataset.evidenceDomain ||
            ""
        )
            .split(/\s+/)
            .filter(Boolean);

    }


    function updateDomainIndicators(
        domains
    ){

        insightDomains.forEach(indicator => {

            const domain =
                indicator.dataset.insightDomain;


            indicator.classList.toggle(
                "active",
                domains.includes(domain)
            );

        });

    }


    function showDomainOverview(domain){

        const information =
            domainInformation[domain] ||
            domainInformation.all;


        const visibleNodes =
            evidenceNodes.filter(
                node =>
                    !node.classList.contains(
                        "evidence-node-filtered"
                    )
            );


        insightCount.textContent =
            `${visibleNodes.length} / ${evidenceNodes.length}`;


        insightType.textContent =
            information.type;

        insightTitle.textContent =
            information.title;

        insightSummary.textContent =
            information.summary;


        updateDomainIndicators(
            domain === "all"
                ? [
                    "aviation",
                    "technology",
                    "business"
                ]
                : [domain]
        );

    }


    function selectEvidenceNode(node){

        if(
            node.classList.contains(
                "evidence-node-filtered"
            )
        ){
            return;
        }


        evidenceNodes.forEach(
            evidenceNode => {

                evidenceNode.classList.remove(
                    "evidence-node-selected"
                );

                evidenceNode.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }
        );


        selectedNode =
            node;


        selectedNode.classList.add(
            "evidence-node-selected"
        );

        selectedNode.setAttribute(
            "aria-pressed",
            "true"
        );


        const domains =
            getNodeDomains(selectedNode);


        const visibleNodes =
            evidenceNodes.filter(
                evidenceNode =>
                    !evidenceNode.classList
                        .contains(
                            "evidence-node-filtered"
                        )
            );


        insightCount.textContent =
            `${visibleNodes.indexOf(selectedNode) + 1} / ${visibleNodes.length}`;


        insightType.textContent =
            selectedNode.dataset
                .evidenceType ||
            "Evidence";


        insightTitle.textContent =
            selectedNode.dataset
                .evidenceTitle ||
            "Selected evidence";


        insightSummary.textContent =
            selectedNode.dataset
                .evidenceSummary ||
            "Evidence contributing to my development.";


        updateDomainIndicators(
            domains
        );

    }


    function applyEvidenceFilter(domain){

        activeFilter =
            domain;


        filterButtons.forEach(button => {

            button.setAttribute(
                "aria-pressed",
                (
                    button.dataset
                        .evidenceFilter ===
                    activeFilter
                ).toString()
            );

        });


        evidenceNodes.forEach(node => {

            const domains =
                getNodeDomains(node);


            const shouldShow =
                activeFilter === "all" ||
                domains.includes(
                    activeFilter
                );


            node.classList.toggle(
                "evidence-node-filtered",
                !shouldShow
            );

            node.tabIndex =
                shouldShow
                    ? 0
                    : -1;

        });


        if(
            selectedNode &&
            selectedNode.classList.contains(
                "evidence-node-filtered"
            )
        ){

            selectedNode.classList.remove(
                "evidence-node-selected"
            );

            selectedNode.setAttribute(
                "aria-pressed",
                "false"
            );

            selectedNode =
                null;

        }


        showDomainOverview(
            activeFilter
        );

    }


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                applyEvidenceFilter(
                    button.dataset
                        .evidenceFilter
                );

            }
        );

    });


    evidenceNodes.forEach(node => {

        node.setAttribute(
            "aria-pressed",
            "false"
        );


        node.addEventListener(
            "click",
            () => {

                selectEvidenceNode(
                    node
                );

            }
        );

    });


    applyEvidenceFilter("all");

});