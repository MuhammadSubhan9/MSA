/* ==========================================================
                CONNECTION BRIEF COMPOSER
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const topicButtons = [
        ...document.querySelectorAll(
            "[data-connection-topic]"
        )
    ];


    const briefNumber =
        document.querySelector(
            "#connectionBriefNumber"
        );

    const previewTitle =
        document.querySelector(
            "#connectionPreviewTitle"
        );

    const previewDescription =
        document.querySelector(
            "#connectionPreviewDescription"
        );

    const checklist =
        document.querySelector(
            "#connectionChecklist"
        );

    const emailButton =
        document.querySelector(
            "#connectionEmailButton"
        );


    if(
        !topicButtons.length ||
        !previewTitle ||
        !previewDescription ||
        !checklist ||
        !emailButton
    ){
        return;
    }


    const contactEmail =
        "subhan.ahmadbaqa@gmail.com";


    const connectionTopics = {

        aviation: {

            number: "01",

            title:
                "Aviation & Training",

            description:
                "For conversations about aviation education, pilot pathways, courses or useful industry knowledge.",

            checklist: [

                "Your aviation background or interest",

                "The programme, course or topic you are referring to",

                "The specific information or perspective you would like to discuss"

            ],

            subject:
                "Aviation Conversation — Portfolio Contact",

            body:
`Hello Muhammad Subhan,

My name is [Your name], and I found your portfolio through [where you found it].

I am contacting you regarding aviation and training.

Topic or programme:
[Add the relevant topic]

Reason for reaching out:
[Explain your message or question]

Relevant context:
[Add anything that would help explain your message]

Kind regards,
[Your name]`

        },


        networking: {

            number: "02",

            title:
                "Events & Networking",

            description:
                "For conferences, aviation events, technology events or relevant professional communities.",

            checklist: [

                "The event, organisation or community involved",

                "When and where it is taking place",

                "Why you believe it may be relevant"

            ],

            subject:
                "Event or Networking Opportunity — Portfolio Contact",

            body:
`Hello Muhammad Subhan,

My name is [Your name], representing or connected with [organisation or event].

I am reaching out regarding:
[Event, conference or community name]

Date and location:
[Add the relevant details]

Why it may be relevant:
[Briefly explain the connection to aviation, technology or professional development]

Additional information:
[Registration link or useful context]

Kind regards,
[Your name]`

        },


        technology: {

            number: "03",

            title:
                "Technology & Projects",

            description:
                "For discussions involving websites, digital systems, smart technology or shared project interests.",

            checklist: [

                "A short explanation of the project or technology",

                "Why you are contacting me specifically",

                "The type of conversation or contribution you have in mind"

            ],

            subject:
                "Technology or Project Discussion — Portfolio Contact",

            body:
`Hello Muhammad Subhan,

My name is [Your name], and I am reaching out regarding a technology-related discussion.

Project or topic:
[Briefly describe it]

Reason for contacting you:
[Explain the connection]

What I would like to discuss:
[Question, feedback or proposed contribution]

Relevant link:
[Optional website or project link]

Kind regards,
[Your name]`

        },


        general: {

            number: "04",

            title:
                "General Message",

            description:
                "For questions, feedback or a professional introduction that does not fit another category.",

            checklist: [

                "Your name and how you found my portfolio",

                "The reason for your message",

                "Any relevant context or question"

            ],

            subject:
                "Portfolio Contact — General Message",

            body:
`Hello Muhammad Subhan,

My name is [Your name], and I found your portfolio through [where you found it].

I am reaching out because:
[Explain the reason for your message]

Additional context:
[Add any relevant information]

Kind regards,
[Your name]`

        }

    };


    function updateConnectionBrief(
        requestedTopic
    ){

        const topic =
            connectionTopics[requestedTopic]
                ? requestedTopic
                : "general";

        const selectedTopic =
            connectionTopics[topic];


        topicButtons.forEach(button => {

            const isSelected =
                button.dataset.connectionTopic ===
                topic;


            button.setAttribute(
                "aria-pressed",
                isSelected.toString()
            );

        });


        if(briefNumber){

            briefNumber.textContent =
                selectedTopic.number;

        }


        previewTitle.textContent =
            selectedTopic.title;


        previewDescription.textContent =
            selectedTopic.description;


        checklist.replaceChildren();


        selectedTopic.checklist.forEach(
            checklistText => {

                const item =
                    document.createElement("li");

                item.textContent =
                    checklistText;

                checklist.append(item);

            }
        );


        const emailSubject =
            encodeURIComponent(
                selectedTopic.subject
            );

        const emailBody =
            encodeURIComponent(
                selectedTopic.body
            );


        emailButton.href =
            `mailto:${contactEmail}` +
            `?subject=${emailSubject}` +
            `&body=${emailBody}`;

    }


    topicButtons.forEach(button => {

        button.addEventListener("click", () => {

            updateConnectionBrief(
                button.dataset.connectionTopic
            );

        });

    });


    updateConnectionBrief("general");

});