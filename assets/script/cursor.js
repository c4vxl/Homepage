document.body.insertAdjacentHTML("beforeend", `
<div class="cursor" id="cursor">
    <img src="assets/media/cursor/link.svg" id="cursor__icon__link" class="cursor__icon">
    <img src="assets/media/cursor/mail.svg" id="cursor__icon__mail" class="cursor__icon">
</div>
`);

setTimeout(() => {
    const cursor = document.querySelector("#cursor");

    window.onmousemove = event => {
        const x = event.clientX - cursor.offsetWidth / 2,
              y = event.clientY - cursor.offsetHeight / 2;

        cursor.animate( { transform: `translate(${x}px, ${y}px)` }, {
            duration: window.getComputedStyle(cursor).getPropertyValue("opacity") == "0" ? 0 : 1, // cursor should appear at the actual mouse cursor when entering the website
            fill: "forwards"
        } );
    };
}, 50);