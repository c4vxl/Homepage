document.querySelectorAll(".snap__scroll__container").forEach(container => {
    const dotContainer = container.querySelector(".dots");
    
    // create dots
    const slides = container.querySelectorAll(".snap__scroll__section");
    dotContainer.innerHTML = "";
    slides.forEach((s, i) => { dotContainer.innerHTML +=
        `<span style="cursor: pointer" onclick="this.parentNode.parentNode.parentNode.scroll({ top: '${container.clientHeight * i}', left: 0, behavior: 'smooth' });"></span>`
    });

    const dots = dotContainer.querySelectorAll("span");    

    container.onscroll = (event) => {
        const currentSection = Math.floor(container.scrollTop / container.clientHeight);

        dots.forEach(x => x.classList.remove("active"));
        dots[currentSection]?.classList?.add("active");
    };

    // activate first dot
    container.scrollTop = container.clientHeight;
    container.scrollTop = 0;
});