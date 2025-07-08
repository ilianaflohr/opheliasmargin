window.onload = () => {
    // Elements for "who"
    const whoLink = document.getElementById('link-1-1-1-who');
    const popupWho = document.getElementById('popup-1-1-1-who');
    const closeBtnWho = document.getElementById('close-btn-1-1-1-who');

    // Elements for "to be or not to be"
    const tobeLink = document.getElementById('link-1-1-2-unfold');
    const popupTobe = document.getElementById('popup-1-1-2-unfold');
    const closeBtnTobe = document.getElementById('close-btn-1-1-2-unfold');

    // Shared backdrop
    const backdrop = document.getElementById('popup-backdrop');

    whoLink.addEventListener('click', function () {
        popupWho.style.display = 'block';
        backdrop.style.display = 'block';
    });

    closeBtnWho.addEventListener('click', function () {
        popupWho.style.display = 'none';
        backdrop.style.display = 'none';
    });

    tobeLink.addEventListener('click', function () {
        popupTobe.style.display = 'block';
        backdrop.style.display = 'block';
    });

    closeBtnTobe.addEventListener('click', function () {
        popupTobe.style.display = 'none';
        backdrop.style.display = 'none';
    });

    backdrop.addEventListener('click', function () {
        popupWho.style.display = 'none';
        popupTobe.style.display = 'none';
        backdrop.style.display = 'none';
    });
}

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