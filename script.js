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
const acts = document.getElementsByClassName("act");
const scenes = document.getElementsByClassName("scene");

window.onscroll = () => {
    const scroll = window.scrollY;

    const getClosest = (elements) => {
        const positions = Array.from(elements).map(el => el.offsetTop);
        const closest = [...positions].reverse().find(pos => pos <= scroll);
        return closest !== undefined ? elements[positions.indexOf(closest)].innerText : "";
    };

    const act = getClosest(acts);
    const scene = getClosest(scenes);
    document.getElementById("sticky-header").innerText = `${act}${scene ? ` • ${scene}` : ""}`;
};

// dynamic footer (automatically updates year)
function createFooter() {
    let year = new Date().getFullYear();
    let footer = document.getElementsByTagName("footer");
    footer[0].append(Object.assign(document.createElement("small"), { innerHTML: `&copy; ${year} Ophelia's Margin` }));
}