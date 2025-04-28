setTimeout(() => {
    document.querySelectorAll(".primary").forEach(element => {
        const blur = element.querySelector(".blur");
        if (blur == null) return;
        element.onmousemove = event => {
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - rect.left) / 2,
                  y = (event.clientY - rect.top) / 2;
    
            blur.animate( { transform: `translate(${x}px, ${y}px)` }, {
                duration: 5000,
                fill: "forwards"
            } );
        };
    });
    
    document.querySelectorAll("*[threeD-card]").forEach(element => {
        let strength = parseInt(element.dataset.threedCardStrength) || 20;
        let animationFrame;
        element.style.transition = "transform 0.2s ease";
    
        element.addEventListener("mousemove", (event) => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(() => {
                const rect = element.getBoundingClientRect();
                const relX = (event.clientX - rect.left) / rect.width;
                const relY = (event.clientY - rect.top) / rect.height;
                const rotateX = (relY - 0.5) * -strength;
                const rotateY = (relX - 0.5) * strength;
    
                element.style.transform = `perspective(600px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });
    
        element.addEventListener("mouseleave", () => {
            element.style.transform = "";
        });
    });
}, 150);