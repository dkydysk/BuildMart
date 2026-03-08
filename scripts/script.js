const buttons = document.querySelectorAll("#rating-container [data-rating]");

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const isChecked = btn.getAttribute("data-state") === "checked";
        buttons.forEach((b) => {
            b.setAttribute("data-state", "unchecked");
            b.setAttribute("aria-checked", "false");
            const span = b.querySelector("span[data-state]");
            if (span) span.setAttribute("data-state", "unchecked");
        });
        if (isChecked) return;
        btn.setAttribute("data-state", "checked");
        btn.setAttribute("aria-checked", "true");
        const span = btn.querySelector("span[data-state]");
        if (span) span.setAttribute("data-state", "checked");
    });
});
