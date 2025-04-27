const showNotification = async (title, content, color = "red", time=8000) => {
    document.querySelector(".notification__container").insertAdjacentHTML("beforeend", `
        <div class="notification">
            <p class="title">${title}</p>
            <span class="hr"></span>
            <p class="subtitle">${content}</p>
            <div class="progress" style="background: ${color}"></div>
        </div>
    `);
    let element = document.querySelector(".notification__container .notification:last-of-type");
    element.querySelector(".progress").animate([ { width: '100%', opacity: 1 }, { width: '0%', opacity: 0 } ], { duration: time, fill: 'forwards' } ).onfinish = () => element.remove();
}