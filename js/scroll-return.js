(() => {
    "use strict";

    const buttons = document.querySelectorAll(
        "[data-progress-return]"
    );

    if (!buttons.length) return;

    let frame = null;
    let lastPercentage = -1;

    function updateProgress() {
        frame = null;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? Math.round(
                    Math.min(
                        1,
                        Math.max(0, window.scrollY / documentHeight)
                    ) * 100
                )
                : 100;

        if (percentage === lastPercentage) return;

        lastPercentage = percentage;

        buttons.forEach((button) => {
            const label = button.querySelector(
                ".progress-return__percentage"
            );

            button.style.setProperty(
                "--page-progress",
                String(percentage / 100)
            );

            button.setAttribute(
                "aria-label",
                `Back to top — ${percentage}% through page`
            );

            if (label) {
                label.textContent = `${percentage}%`;
            }
        });
    }

    function requestUpdate() {
        if (frame !== null) return;

        frame = window.requestAnimationFrame(updateProgress);
    }

    window.addEventListener("scroll", requestUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestUpdate);

    updateProgress();
})();