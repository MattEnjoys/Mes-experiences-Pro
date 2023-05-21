import SimplexNoise from "simplex-noise";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

const content = document.querySelector(".content");

gsap.registerPlugin(ScrollTrigger);

const simplex = new SimplexNoise();

// Créer des cercles, des cercles intermédiaires et des lignes
for (let i = 0; i < 3600; i++) {
    // Définir que c'est une expérience tous les 250 cercles (500px)
    const experience = i % 250 === 0 && i !== 0;
    const div = document.createElement("div");

    if (experience) {
        div.classList.add("experience-circle");
    } else {
        div.classList.add("circle");
    }

    // Créer des coefficients de bruit pour le rendu final
    const c1 = simplex.noise2D(i * 0.003, i * 0.0033);
    const c2 = simplex.noise2D(i * 0.002, i * 0.001);

    const style = !experience
        ? {
              transform: `translate(${c2 * 50}px) rotate(${
                  c2 * 300
              }deg) scale(${3 + c1 * 3}, ${3 + c2 * 2})`,
              // Dynamiser la teinte de chaque cercle en fonction de sa position dans la liste
              boxShadow: `0 0 0 .5px hsla(${Math.floor(
                  i * 0.3
              )}, 70%, 70%, .1)`,
          }
        : {
              // Appliquer une transformation dont la valeur va etre multipliée par un coef. généré aléatoirement mais toujours légèrement inf ou sup à la précédente (l.24 et 25) ce qui donnera un aspect non linéaire
              transform: `translate(${c2 * 50}px)`,
              border: `solid 5px hsla(${Math.floor(i * 0.3)}, 70%, 70%, 1)`,
          };
    Object.assign(div.style, style);
    content.appendChild(div);

    if (experience) {
        const div = document.createElement("div");
        div.classList.add("line");
        const style = {
            background: `linear-gradient(90deg, hsla(${Math.floor(
                i * 0.3
            )}, 70%, 70%, 1) 0%, black 100%)`,
        };
        Object.assign(div.style, style);
        content.appendChild(div);
    }
}

//GSAP

// Créer des animations de cercles
const Circles = document.querySelectorAll(".circle");
const tl = gsap.timeline({
    scrollTrigger: {
        scrub: 1,
        start: "top top",
        end: "bottom center",
    },
});
Circles.forEach((c) => {
    tl.from(c, {
        opacity: 0,
    });
});

// Créer des animations de cercles d'expérience
const experienceCircles = document.querySelectorAll(".experience-circle");
experienceCircles.forEach((experience_circle) => {
    gsap.from(experience_circle, {
        scrollTrigger: {
            trigger: experience_circle,
            start: "top center",
            toggleActions: "restart none none reverse",
        },
        scale: 0,
        ease: "back",
    });
});

// Créer des animations de cercles d'expérience
const Lines = document.querySelectorAll(".line");
Lines.forEach((line) => {
    gsap.from(line, {
        scrollTrigger: {
            trigger: line,
            start: "top center",
            toggleActions: "restart none none reverse",
        },
        width: 0,
    });
});

// Créer des animations d'expérience
const experiences = document.querySelectorAll(".experience");
experiences.forEach((experience) => {
    gsap.from(experience, {
        scrollTrigger: {
            trigger: experience,
            start: "top center",
            toggleActions: "restart none none reverse",
        },
        opacity: 0,
    });
});
