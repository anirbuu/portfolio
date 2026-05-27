const API_URL = "https://portfolio-2opz.onrender.com";

let loadedProjects = [];

// ================= DOM CONTENT LOADED =================

document.addEventListener("DOMContentLoaded", () => {

  // ================= CONTACT FORM =================

  const form = document.getElementById("contactForm");
  const msg = document.getElementById("msg");

  if (form && msg) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        msg.textContent = "Please fill all fields.";
        msg.style.color = "#f87171";
        return;
      }

      try {
        msg.textContent = "Sending...";
        msg.style.color = "#38bdf8";

        const response = await fetch(`${API_URL}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            message
          })
        });

        const data = await response.json();

        if (data.success) {
          msg.textContent = "Message sent successfully!";
          msg.style.color = "#38bdf8";
          form.reset();
        } else {
          msg.textContent = data.message || "Something went wrong.";
          msg.style.color = "#f87171";
        }

      } catch (error) {
        msg.textContent = "Backend not connected. Please try again later.";
        msg.style.color = "#f87171";
        console.error(error);
      }

      setTimeout(() => {
        msg.textContent = "";
      }, 4000);
    });
  }

  // ================= SMOOTH SCROLL =================

  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // ================= ACTIVE NAV LINK =================

  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ================= CHANGING HERO TEXT =================

  const changingText = document.getElementById("changing-text");

  const titles = [
    "A Web Developer",
    "Your HTML Expert",
    "Website Chef",
    "UI/UX Designer",
    "Frontend Creator",
    "JavaScript Developer",
    "Creative Coder"
  ];

  let currentIndex = 0;

  if (changingText) {
    setInterval(() => {
      changingText.classList.add("fade-out");

      setTimeout(() => {
        currentIndex++;

        if (currentIndex >= titles.length) {
          currentIndex = 0;
        }

        changingText.textContent = titles[currentIndex];
        changingText.classList.remove("fade-out");

      }, 400);

    }, 2500);
  }

  // ================= LOAD PROJECTS =================

  loadProjects();

});


// ================= LOAD PROJECTS FROM BACKEND =================

async function loadProjects() {

  try {
    const response = await fetch(`${API_URL}/api/projects`);
    const data = await response.json();

    const projectsGrid = document.getElementById("projectsGrid");

    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";

    loadedProjects = data.projects || [];

    loadedProjects.forEach((project, index) => {

      const card = document.createElement("div");

      card.classList.add("card", "project-card");

      card.innerHTML = `
        <img
          src="${project.image}"
          alt="${project.title}"
          loading="lazy"
        >

        <h3>${project.title}</h3>

        <p>${project.description}</p>

        <button class="btn small" onclick="openProjectDetails(${index})">
          View Details
        </button>
      `;

      projectsGrid.appendChild(card);
    });

  } catch (error) {
    console.error("Failed to load projects:", error);
  }
}


// ================= DYNAMIC PROJECT MODAL =================
function openProjectDetails(index) {
  const project = loadedProjects[index];

  if (!project) return;

  const modal = document.getElementById("projectModal");

  if (!modal) return;

  const modalContent = modal.querySelector(".modal-content");

  const projectImages =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];

  modalContent.innerHTML = `
    <span class="close" onclick="closeModal()">&times;</span>

    <h2 class="project-modal-title">
      ${project.title}
    </h2>

    <div class="project-modal-gallery">
      ${projectImages
        .map(
          (img) => `
            <img
              src="${img}"
              alt="${project.title}"
              loading="lazy"
              onclick="openLightbox(this.src)"
            >
          `
        )
        .join("")}
    </div>

    <div class="project-modal-description">
      <h3>Project Description</h3>

      <ul>
        ${project.description
          .split(".")
          .filter((point) => point.trim() !== "")
          .map((point) => `<li>${point.trim()}.</li>`)
          .join("")}
      </ul>
    </div>

    <div class="project-links">
      ${
        project.liveLink
          ? `<a href="${project.liveLink}" target="_blank" rel="noopener" class="btn small">Live Demo</a>`
          : ""
      }

      ${
        project.githubLink
          ? `<a href="${project.githubLink}" target="_blank" rel="noopener" class="btn small">GitHub</a>`
          : ""
      }
    </div>
  `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}


// ================= MODAL =================

function openModal(type) {
  let modal;

  if (type === "AI") {
    modal = document.getElementById("aiModal");
  } else {
    modal = document.getElementById("projectModal");
  }

  if (!modal) return;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal(type) {
  let modal;

  if (type === "AI") {
    modal = document.getElementById("aiModal");
  } else {
    modal = document.getElementById("projectModal");
  }

  if (!modal) return;

  modal.style.display = "none";
  document.body.style.overflow = "auto";
}


// ================= CLOSE MODAL WHEN CLICKING OUTSIDE =================

window.addEventListener("click", (e) => {
  const ecommerceModal = document.getElementById("projectModal");
  const aiModal = document.getElementById("aiModal");

  if (e.target === ecommerceModal) {
    closeModal();
  }

  if (e.target === aiModal) {
    closeModal("AI");
  }
});


// ================= LIGHTBOX =================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function openLightbox(src) {
  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = src;
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
}


// ================= ESC KEY SUPPORT =================

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeModal("AI");
    closeLightbox();
  }
});


// ================= PRELOAD MODAL IMAGES =================

window.addEventListener("load", () => {
  const images = document.querySelectorAll(".modal-images img");

  images.forEach((img) => {
    const preload = new Image();
    preload.src = img.src;
  });
});