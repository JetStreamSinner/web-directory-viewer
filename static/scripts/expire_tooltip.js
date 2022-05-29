function create_expire_tool_tip(text) {
    const tipFrame = document.createElement("div");
    tipFrame.className = "tip_frame";

    const tip = document.createElement("span");
    tip.innerText = text;

    tipFrame.appendChild(tip);
    document.body.appendChild(tipFrame);
    const expirationTime = 1000;
    const opacityReductionTime = expirationTime / 100;
    let baseOpacity = 100;

    setInterval(() => {
        tipFrame.style.opacity = `${baseOpacity}%`;
        baseOpacity -= 1;
    }, opacityReductionTime);

    setTimeout(() => {
        tipFrame.remove();
    }, expirationTime);
}

module.exports = {
    "create_expire_tool_tip": create_expire_tool_tip
}