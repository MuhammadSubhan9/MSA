/* ==========================================================
                JOURNEY MISSION BRIEFS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const milestones = [
        ...document.querySelectorAll(
            ".timeline .milestone"
        )
    ];


    if(!milestones.length){
        return;
    }


    /* ======================================================
                    FUTURE MILESTONE CONTEXT
    ====================================================== */

    const milestoneDescriptions = {

        "Grade 11":
            "The next academic stage, focused on building a stronger foundation for advanced study and future aviation training.",

        "AS Level Examinations":
            "The first major assessment stage of advanced-level study and an important measure of academic progress.",

        "Grade 12":
            "The final school year and the last period of preparation before completing advanced-level education.",

        "A2 Level Examinations":
            "The concluding examination stage before completing school and progressing toward university and professional training.",

        "Graduation":
            "The completion of secondary education and the transition into the next stage of academic and professional development.",

        "University":
            "A planned period of higher education intended to provide academic depth alongside preparation for an aviation career.",

        "Flight Training":
            "The stage where academic preparation begins transforming into practical aviation knowledge, decision-making and aircraft operation.",

        "Commercial Pilot Licence (CPL)":
            "A major professional qualification required to progress toward operating aircraft commercially.",

        "Type Rating":
            "Specialised training and qualification for operating a specific commercial aircraft type.",

        "First Officer":
            "The first airline flight-deck role and the beginning of professional line-flying experience.",

        "Captain":
            "The long-term objective: earning the experience, judgement and responsibility required to command a commercial aircraft."

    };


    const phaseNames = {

        foundations:
            "Foundations",

        academic:
            "Academic Path",

        training:
            "Flight Training",

        career:
            "Airline Career"

    };


    /* ======================================================
                    CREATE DIALOG
    ====================================================== */

    const briefDialog =
        document.createElement("dialog");

    briefDialog.className =
        "journey-brief-dialog";

    briefDialog.setAttribute(
        "aria-labelledby",
        "journeyBriefTitle"
    );


    briefDialog.innerHTML = `

        <div class="journey-brief-shell">

            <header class="journey-brief-header">

                <div>

                    <p>
                        JOURNEY MISSION BRIEF
                    </p>

                    <span id="journeyBriefPosition">
                        01 / 18
                    </span>

                </div>


                <button
                    type="button"
                    class="journey-brief-close"
                    aria-label="Close milestone brief"
                >
                    ×
                </button>

            </header>


            <div class="journey-brief-body">

                <div class="journey-brief-classification">

                    <span id="journeyBriefPhase">
                        Foundations
                    </span>

                    <span id="journeyBriefStatus">
                        Completed
                    </span>

                </div>


                <h2 id="journeyBriefTitle">
                    Milestone
                </h2>


                <p
                    class="journey-brief-date"
                    id="journeyBriefDate"
                >
                    Date
                </p>


                <p
                    class="journey-brief-description"
                    id="journeyBriefDescription"
                >
                    Milestone description
                </p>


                <dl class="journey-brief-metadata">

                    <div>

                        <dt>
                            Phase
                        </dt>

                        <dd id="journeyBriefMetadataPhase">
                            Foundations
                        </dd>

                    </div>


                    <div>

                        <dt>
                            Status
                        </dt>

                        <dd id="journeyBriefMetadataStatus">
                            Completed
                        </dd>

                    </div>


                    <div>

                        <dt>
                            Position
                        </dt>

                        <dd id="journeyBriefMetadataPosition">
                            01 of 18
                        </dd>

                    </div>

                </dl>

            </div>


            <footer class="journey-brief-navigation">

                <button
                    type="button"
                    id="previousJourneyBrief"
                >

                    <span aria-hidden="true">
                        ←
                    </span>

                    <span>

                        <small>
                            PREVIOUS
                        </small>

                        <strong id="previousJourneyLabel">
                            Previous milestone
                        </strong>

                    </span>

                </button>


                <button
                    type="button"
                    id="nextJourneyBrief"
                >

                    <span>

                        <small>
                            NEXT
                        </small>

                        <strong id="nextJourneyLabel">
                            Next milestone
                        </strong>

                    </span>

                    <span aria-hidden="true">
                        →
                    </span>

                </button>

            </footer>

        </div>

    `;


    document.body.append(
        briefDialog
    );


    /* ======================================================
                    DIALOG ELEMENTS
    ====================================================== */

    const closeButton =
        briefDialog.querySelector(
            ".journey-brief-close"
        );

    const positionElement =
        briefDialog.querySelector(
            "#journeyBriefPosition"
        );

    const phaseElement =
        briefDialog.querySelector(
            "#journeyBriefPhase"
        );

    const statusElement =
        briefDialog.querySelector(
            "#journeyBriefStatus"
        );

    const titleElement =
        briefDialog.querySelector(
            "#journeyBriefTitle"
        );

    const dateElement =
        briefDialog.querySelector(
            "#journeyBriefDate"
        );

    const descriptionElement =
        briefDialog.querySelector(
            "#journeyBriefDescription"
        );

    const metadataPhase =
        briefDialog.querySelector(
            "#journeyBriefMetadataPhase"
        );

    const metadataStatus =
        briefDialog.querySelector(
            "#journeyBriefMetadataStatus"
        );

    const metadataPosition =
        briefDialog.querySelector(
            "#journeyBriefMetadataPosition"
        );

    const previousButton =
        briefDialog.querySelector(
            "#previousJourneyBrief"
        );

    const nextButton =
        briefDialog.querySelector(
            "#nextJourneyBrief"
        );

    const previousLabel =
        briefDialog.querySelector(
            "#previousJourneyLabel"
        );

    const nextLabel =
        briefDialog.querySelector(
            "#nextJourneyLabel"
        );


    let activeMilestoneIndex = 0;

    let currentPhase =
        "foundations";


    /* ======================================================
                    PREPARE MILESTONE DATA
    ====================================================== */

    const milestoneData =
        milestones.map(
            (milestone, index) => {

                if(
                    milestone.dataset
                        .journeyPhaseStart
                ){

                    currentPhase =
                        milestone.dataset
                            .journeyPhaseStart;

                }


                const heading =
                    milestone.querySelector("h2");

                const date =
                    milestone.querySelector(
                        ".date"
                    );

                const originalDescription =
                    milestone.querySelector(
                        ".content > p"
                    );

                const title =
                    heading?.textContent.trim() ||
                    `Milestone ${index + 1}`;


                let status =
                    "Planned";

                let statusClass =
                    "planned";


                if(
                    milestone.classList.contains(
                        "completed"
                    )
                ){

                    status =
                        "Completed";

                    statusClass =
                        "completed";

                }


                if(
                    milestone.classList.contains(
                        "current"
                    )
                ){

                    status =
                        "Current position";

                    statusClass =
                        "current";

                }


                return {

                    milestone,

                    content:
                        milestone.querySelector(
                            ".content"
                        ),

                    title,

                    date:
                        date?.textContent.trim() ||
                        "Date to be determined",

                    description:
                        originalDescription
                            ?.textContent
                            .trim() ||
                        milestoneDescriptions[title] ||
                        "A planned stage in my long-term academic and professional journey.",

                    phase:
                        phaseNames[currentPhase] ||
                        "Journey",

                    status,

                    statusClass

                };

            }
        );


    /* ======================================================
                    RENDER A MISSION BRIEF
    ====================================================== */

    function getPaddedPosition(index){

        return String(index + 1)
            .padStart(2, "0");

    }


    function renderJourneyBrief(index){

        const safeIndex =
            Math.max(
                0,
                Math.min(
                    index,
                    milestoneData.length - 1
                )
            );


        activeMilestoneIndex =
            safeIndex;


        const selectedMilestone =
            milestoneData[safeIndex];


        positionElement.textContent =
            `${getPaddedPosition(safeIndex)} / ${milestoneData.length}`;


        phaseElement.textContent =
            selectedMilestone.phase;


        statusElement.textContent =
            selectedMilestone.status;


        statusElement.dataset.status =
            selectedMilestone.statusClass;


        titleElement.textContent =
            selectedMilestone.title;


        dateElement.textContent =
            selectedMilestone.date;


        descriptionElement.textContent =
            selectedMilestone.description;


        metadataPhase.textContent =
            selectedMilestone.phase;


        metadataStatus.textContent =
            selectedMilestone.status;


        metadataPosition.textContent =
            `${getPaddedPosition(safeIndex)} of ${milestoneData.length}`;


        const previousMilestone =
            milestoneData[safeIndex - 1];

        const nextMilestone =
            milestoneData[safeIndex + 1];


        previousButton.disabled =
            !previousMilestone;

        nextButton.disabled =
            !nextMilestone;


        previousLabel.textContent =
            previousMilestone
                ? previousMilestone.title
                : "Beginning of journey";


        nextLabel.textContent =
            nextMilestone
                ? nextMilestone.title
                : "End of planned route";

    }


    /* ======================================================
                    OPEN AND CLOSE
    ====================================================== */

    function openJourneyBrief(index){

        renderJourneyBrief(index);


        document.body.classList.add(
            "journey-brief-open"
        );


        if(
            typeof briefDialog.showModal ===
            "function"
        ){

            briefDialog.showModal();

        }else{

            briefDialog.setAttribute(
                "open",
                ""
            );

        }


        closeButton.focus();

    }


    function closeJourneyBrief(){

        document.body.classList.remove(
            "journey-brief-open"
        );


        if(
            typeof briefDialog.close ===
            "function"
        ){

            briefDialog.close();

        }else{

            briefDialog.removeAttribute(
                "open"
            );

        }


        milestoneData[
            activeMilestoneIndex
        ]?.content?.focus();

    }


    /* ======================================================
                    MAKE CARDS INTERACTIVE
    ====================================================== */

    milestoneData.forEach(
        (data, index) => {

            if(!data.content){
                return;
            }


            data.content.tabIndex =
                0;

            data.content.setAttribute(
                "role",
                "button"
            );

            data.content.setAttribute(
                "aria-label",
                `Open mission brief for ${data.title}`
            );

            data.content.dataset
                .journeyBriefReady =
                    "true";


            data.content.addEventListener(
                "click",
                event => {

                    if(
                        event.target.closest(
                            "a, button"
                        )
                    ){
                        return;
                    }


                    openJourneyBrief(index);

                }
            );


            data.content.addEventListener(
                "keydown",
                event => {

                    if(
                        event.key === "Enter" ||
                        event.key === " "
                    ){

                        event.preventDefault();

                        openJourneyBrief(index);

                    }

                }
            );

        }
    );


    /* ======================================================
                    BRIEF NAVIGATION
    ====================================================== */

    previousButton.addEventListener(
        "click",
        () => {

            if(activeMilestoneIndex > 0){

                renderJourneyBrief(
                    activeMilestoneIndex - 1
                );

            }

        }
    );


    nextButton.addEventListener(
        "click",
        () => {

            if(
                activeMilestoneIndex <
                milestoneData.length - 1
            ){

                renderJourneyBrief(
                    activeMilestoneIndex + 1
                );

            }

        }
    );


    closeButton.addEventListener(
        "click",
        closeJourneyBrief
    );


    briefDialog.addEventListener(
        "click",
        event => {

            if(event.target === briefDialog){

                closeJourneyBrief();

            }

        }
    );


    briefDialog.addEventListener(
        "close",
        () => {

            document.body.classList.remove(
                "journey-brief-open"
            );

        }
    );

});