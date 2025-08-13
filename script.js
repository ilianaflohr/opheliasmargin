// behavior for popups
window.onload = () => {
    document.addEventListener("click", function (event) {
        const target = event.target;

        const showPopup = (popupId) => {
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.style.display = "block";
                const backdrop = document.createElement("div");
                backdrop.id = "popup-backdrop";
                backdrop.dataset.popupId = popupId;
                document.body.appendChild(backdrop);
            }
        };

        const hidePopup = (popupId) => {
            document.getElementById(popupId).style.display = "none";
            document.getElementById("popup-backdrop").remove();
        };

        if (target.classList.contains("link")) {
            showPopup(target.dataset.popupId);
        } else if (target.classList.contains("close-btn")) {
            hidePopup(target.parentElement.id);
        } else if (target.id === "popup-backdrop") {
            hidePopup(target.dataset.popupId);
        }
    });
};

// behavior for the Act • Scene header
window.addEventListener('DOMContentLoaded', () => {
    const acts = document.querySelectorAll(".act");
    const scenes = document.querySelectorAll(".scene");
    const stickyHeader = document.getElementById("sticky-header");
    const dropdown = document.getElementById("dropdown");
    const container = document.getElementById("sticky-container");
    const menuDropdown = document.getElementsByClassName("menu-dropdown")[0];
    const menuContainer = document.getElementsByClassName("menu-container")[0];
    const menuIcon = document.getElementsByClassName("menu-icon")[0];

    // Scroll logic to update the header
    window.addEventListener("scroll", () => {
        const scroll = window.scrollY;

        const getClosestAct = () => {
            let closestAct = null;
            for (let i = 0; i < acts.length; i++) {
                if (acts[i].offsetTop <= scroll) {
                    closestAct = acts[i];
                } else {
                    break;
                }
            }
            return closestAct;
        };

        const getClosestSceneWithinAct = (actElement, nextActElement) => {
            let closestScene = null;
            for (let i = 0; i < scenes.length; i++) {
                const sceneTop = scenes[i].offsetTop;
                if (
                    sceneTop > actElement.offsetTop &&
                    (!nextActElement || sceneTop < nextActElement.offsetTop) &&
                    sceneTop <= scroll
                ) {
                    closestScene = scenes[i];
                }
            }
            return closestScene;
        };

        const act = getClosestAct();
        if (!act) {
            stickyHeader.innerText = "";
            return;
        }

        const actIndex = Array.from(acts).indexOf(act);
        const nextAct = acts[actIndex + 1] || null;

        const scene = getClosestSceneWithinAct(act, nextAct);

        const actText = act.innerText.trim().replace(/\s*\n\s*/g, " ");

        if (scene) {
            const sceneText = scene.innerText.trim().replace(/\s*\n\s*/g, " ");
            stickyHeader.innerText = `${actText} • ${sceneText}`;
        } else {
            // Show just the act if no scene has appeared yet
            stickyHeader.innerText = actText;
        }
    });

    // Show dropdown on click
    stickyHeader.addEventListener("click", (e) => {
        dropdown.classList.add("visible");
    });

    // Toggle hamburger menu on click
    menuIcon.addEventListener("click", (e) => {
        menuDropdown.classList.toggle("visible");
    });

    // Hide dropdown or hamburger menu if click outside
    document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) {
            dropdown.classList.remove("visible");
        }
        if (!menuContainer.contains(e.target)) {
            menuDropdown.classList.remove("visible");
        }
    });

    // Build dropdown
    const buildDropdown = () => {
        const headers = [];

        acts.forEach(act => {
            headers.push({ type: "act", text: act.innerText.trim().replace(/\s*\n\s*/g, " "), element: act });
        });

        scenes.forEach(scene => {
            headers.push({ type: "scene", text: scene.innerText.trim().replace(/\s*\n\s*/g, " "), element: scene });
        });

        // Sort by offsetTop
        headers.sort((a, b) => a.element.offsetTop - b.element.offsetTop);

        headers.forEach(item => {
            const div = document.createElement("div");
            div.innerText = item.text;
            if (item.type === "scene") div.style.paddingLeft = "24px"; // Indent scenes
            div.addEventListener("click", () => {
                window.scrollTo({ top: item.element.offsetTop, behavior: "smooth" });
                dropdown.classList.remove("visible");
            });
            dropdown.appendChild(div);
        });
    };

    buildDropdown(); // Call once on page load
});

// dynamic footer (automatically updates year)
function createFooter() {
    let year = new Date().getFullYear();
    let footer = document.getElementsByTagName("footer");
    footer[0].append(Object.assign(document.createElement("small"), { innerHTML: `&copy; ${year} Ophelia's Margin` }));
}
