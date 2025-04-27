// Handle scroll
const pages = document.querySelector("#pages");
const scrollToPage = (id) => {
    pages.scroll({ top: pages.clientHeight * id, left: 0, behavior: 'smooth' })
}

// Title handler
(async () => {
    const title = document.querySelector("#intro__title");
    if (title == null) return;
    const titles = [ "AI Developer", "Frontend Developer", "Backend Developer", "Newbie Designer" ];
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const writeTitle = async (text) => {
        const current = title.textContent;

        if (text === "") {
            if (current.length > 0) {
                title.textContent = current.substring(0, current.length - 1);
                await sleep(100);
                await writeTitle("");
            }
            return;
        }

        await writeTitle("");
        for (let i = 0; i < text.length; i++) {
            title.textContent += text[i];
            await sleep(100);
        }
    }

    for (let i = 0; i < titles.length; i++) {
        await writeTitle(titles[i]);
        await sleep(1000);
        if (i + 1 == titles.length) i = -1;
    }
})()


// Star background
const starMask = document.querySelector("#background__star__mask");
if (starMask != null) {
    starMask.innerHTML = "";
    for (let i = 0; i < 50; i++) {
        starMask.innerHTML += `
        <div class="star look__at__mouse" style="left: ${Math.random() * window.innerWidth}px; top: ${Math.random() * window.innerHeight}px;">+</div>
        `;
    }

    pages.addEventListener("scroll", () => {
        starMask.style.display = pages.scrollTop > 10 ? "none" : "unset";
    });
}


// Make blurry and stars corners follow the mouse
let lastMove = 0;
document.addEventListener("mousemove", (event) => {
    const now = Date.now();
    if (now - lastMove < 16) return;
    lastMove = now;
    
    const mouseX = event.clientX, mouseY = event.clientY;
    document.querySelectorAll(".look__at__mouse").forEach(element => {
        const rect = element.getBoundingClientRect();
        const dX = mouseX - (rect.left + rect.width / 2),
              dY = mouseY - (rect.top + rect.height / 2),
              distance = Math.sqrt(dX ** 2 + dY ** 2);
        const x = (dX / distance) * Math.min(distance, 50),
              y = (dY / distance) * Math.min(distance, 50);
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Messages
const msgForm = document.querySelector("#message__form");

msgForm?.addEventListener("submit", () => {
    let formdata = new FormData();
    formdata.append("mail", msgForm.querySelector("#mail").value);
    formdata.append("name", msgForm.querySelector("#name").value);
    formdata.append("msg", msgForm.querySelector("#msg").value);

    fetch("api/message.php", { method: "POST", body: formdata }).then(r => r.json())
        .then(data => {
            console.log(data);

            if (data.success) {
                showNotification("Success", "Your message has been sent successfully", "green");
            } else {
                showNotification("Error", data.error);
            }
        })
        .catch(e => showNotification("Error", e))
});


// Projects
if (!window.location.pathname.endsWith("project.html")) {
    fetch("assets/configs/projects.json")
        .then(projects => projects.json())
        .then(projects => projects.sort((a, b) => a.pos - b.pos).forEach(proj => {
            console.log(proj)
            const element = document.querySelector(".project__list");
            element.insertAdjacentHTML("afterbegin", `
            <li data-cursor-event="link" class="primary" threeD-card onclick="window.open('${proj.url}')">
                <div class="blur"></div>
                <p class="title">${proj.name}</p>
                <br>
                <span class="hr"></span>
                <p>${proj.description}</p>
            </li>`);
        }))
        .catch(e => showNotification("Error", "Couldn't fetch project list!"))
}