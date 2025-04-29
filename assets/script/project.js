(async () => {
    const args = new URLSearchParams(window.location.search);
    const from = args.get("from") || "index.html#page__projects";
    const name = args.get("id");

    document.querySelector(".back__button").setAttribute("onclick", `window.location.href = '${from}'`);

    let data;
    try {
        data = await (await fetch(`assets/configs/projects/${name}.json`)).json();
    } catch (e) {
        document.title = "404 Project not found!";
        document.querySelector("#not__a__proj__modal").classList.add("active");
        return;
    }

    let contentTable = [ "About", "Technologies used", "Contributors", ...Object.keys(data.content) ];

    const replace = (key, value) => {
        
    }

    let source = document.querySelector("html").innerHTML;
    source = source.replaceAll("$name$", data.title);
    source = source.replaceAll("$logo$", data.logo);
    source = source.replaceAll("$description_short$", data.description_short).replaceAll("$description$", data.description);
    document.querySelector("html").innerHTML = source;

    data.categories.forEach(category => {
        document.querySelector("#title__categories").innerHTML += `<span class="primary" data-cursor-event="none">${category}</span>`
    });

    data.technologies.forEach(t => {
        document.querySelector("#technologies_used").innerHTML += `<span class="primary" data-cursor-event="none">${t}</span>`
    });

    data.links.forEach(link => {
        document.querySelector("#title__links").innerHTML += `<a href="${link.src}" style="gap: 10px" class="row" data-cursor-event="link">${link.name} <span class="arrow__left">→</span></a>`;
        document.querySelector("#footer__links").innerHTML += `<p><a href="${link.src}" style="gap: 10px; width: max-content;" class="row" data-cursor-event="link">${link.name}</a></p>`;
    });

    data.contributors.forEach(c => {
        document.querySelector("#contributors").innerHTML += `<a data-cursor-event="link" no-highlight href="${c.href}" class="primary">${c.name}</a>`;
    });

    data.nav_links.forEach(e => {
        document.querySelector(".right__buttons").innerHTML += `<div class="nav__button" data-cursor-event="default" onclick="window.open('${e.link}')">
            <img src="${e.icon}" alt="${e.icon}">
        </div>`;
    })

    const parse = (d) => {
        let element;

        if (d.type == "title") {
            element = document.createElement("p");
            element.classList.add("title");
            element.innerHTML = d.content;
        } else if (d.type == "row") {
            element = document.createElement("div");
            element.classList.add("row");
            d.content.forEach(c => { let child = parse(c); if (child != null) element.appendChild(child); });
        } else if (d.type == "div") {
            element = document.createElement("div");
            d.content.forEach(c => { let child = parse(c); if (child != null) element.appendChild(child); });
        } else if (d.type == "img") {
            element = document.createElement("img");
            element.src = d.src;
            element.alt = d.alt;
        } else if (d.type == "h2") {
            element = document.createElement("h2");
            element.innerHTML = d.content;
        } else {
            element = document.createElement(d.type);
            if (d.content != null) element.innerHTML = d.content;
        }

        if (d.style != null) element.setAttribute("style", d.style);
        if (d.class != null) element.setAttribute("class", d.class);

        return element;
    }

    Object.keys(data.content).forEach(name => {
        document.querySelector(".content").innerHTML += `<span class="hr"></span>`;
        const section = document.createElement("section");
        section.id = name.toLowerCase().replaceAll(" ", "_");
        section.classList.add("primary");
        data.content[name].forEach(c => { let child = parse(c); if (child != null) section.appendChild(child) });
        document.querySelector(".content").appendChild(section);
    })

    contentTable.forEach(c => {
            document.querySelector("#table__of__contents").innerHTML += `<li data-cursor-event="link"><a href="#${c.toLowerCase().replaceAll(" ", "_")}">${c}</a></li>`;
            document.querySelector("#footer__table").innerHTML += `<p><a data-cursor-event="link" href="#${c.toLowerCase().replaceAll(" ", "_")}">${c}</a></p>`
}); })()

// darkmode button
let darkmode = false; // start of with white mode
// darkmode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; // uncomment to auto-detect light/darkmode
const setDarkmode = (isMode) => {
    darkmode = isMode;
    document.querySelector("#darkmode__button__moon").style.display = !isMode ? "unset" : "none";
    document.querySelector("#darkmode__button__sun").style.display = isMode ? "unset" : "none";
    if (isMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
}
setDarkmode(darkmode);