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