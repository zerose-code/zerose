/* =====================================================
   ZEROSE — MAIN JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HELPERS
       ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];


    function escapeHTML(value) {
        const div = document.createElement("div");
        div.textContent = String(value ?? "");
        return div.innerHTML;
    }


    /* =====================================================
       BODY LOADED
       ===================================================== */

    document.body.classList.add("js-loaded");


    /* =====================================================
       NAVBAR / MOBILE MENU
       ===================================================== */

    const hamburger = $(".hamburger");
    const navLinks = $(".nav-links");

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", () => {

            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");

            const expanded =
                hamburger.classList.contains("active");

            hamburger.setAttribute(
                "aria-expanded",
                expanded
            );
        });


        // Close mobile menu after clicking a link
        $$(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");
                hamburger.classList.remove("active");

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetID =
                this.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            const navbar =
                $(".navbar");

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       THEME TOGGLE
       ===================================================== */

    const themeToggle =
        $("#themeToggle");

    const savedTheme =
        localStorage.getItem("zerose-theme");


    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        document.documentElement
            .setAttribute(
                "data-theme",
                "light"
            );

    } else {

        document.documentElement
            .setAttribute(
                "data-theme",
                "dark"
            );

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (!icon) return;

        const isLight =
            document.body.classList.contains(
                "light-mode"
            );

        icon.className =
            isLight
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isLight =
                    document.body.classList.toggle(
                        "light-mode"
                    );

                document.documentElement
                    .setAttribute(
                        "data-theme",
                        isLight
                            ? "light"
                            : "dark"
                    );

                localStorage.setItem(
                    "zerose-theme",
                    isLight
                        ? "light"
                        : "dark"
                );

                updateThemeIcon();

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        $$(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("active");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("active");

        });

    }


    /* =====================================================
       ACTIVE NAV LINK
       ===================================================== */

    const sections =
        $$("section[id]");

    const navAnchors =
        $$(".nav-links a[href^='#']");


    if (
        sections.length &&
        navAnchors.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;

                            navAnchors.forEach(
                                link => {

                                    link.classList
                                        .remove("active");

                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) === `#${id}`
                                    ) {

                                        link.classList
                                            .add("active");

                                    }

                                });

                        }

                    });

                },
                {
                    threshold: 0.25,
                    rootMargin: "-100px 0px -50% 0px"
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       BACKGROUND PARTICLES
       ===================================================== */

    const canvas =
        $("#bgCanvas");

    if (canvas) {

        const ctx =
            canvas.getContext("2d");

        let particles = [];
        let animationFrame;


        function resizeCanvas() {

            const dpr =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );

            canvas.width =
                window.innerWidth * dpr;

            canvas.height =
                window.innerHeight * dpr;

            canvas.style.width =
                window.innerWidth + "px";

            canvas.style.height =
                window.innerHeight + "px";

            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );

            createParticles();

        }


        function createParticles() {

            particles = [];

            const count =
                window.innerWidth < 700
                    ? 35
                    : 70;


            for (
                let i = 0;
                i < count;
                i++
            ) {

                particles.push({

                    x:
                        Math.random() *
                        window.innerWidth,

                    y:
                        Math.random() *
                        window.innerHeight,

                    vx:
                        (Math.random() - 0.5) *
                        0.25,

                    vy:
                        (Math.random() - 0.5) *
                        0.25,

                    size:
                        Math.random() *
                        1.5 +
                        0.5,

                    alpha:
                        Math.random() *
                        0.35 +
                        0.1

                });

            }

        }


        function animateParticles() {

            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );


            particles.forEach(particle => {

                particle.x += particle.vx;
                particle.y += particle.vy;


                if (
                    particle.x < -10
                ) {
                    particle.x =
                        window.innerWidth + 10;
                }

                if (
                    particle.x >
                    window.innerWidth + 10
                ) {
                    particle.x = -10;
                }

                if (
                    particle.y < -10
                ) {
                    particle.y =
                        window.innerHeight + 10;
                }

                if (
                    particle.y >
                    window.innerHeight + 10
                ) {
                    particle.y = -10;
                }


                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(80, 220, 210, ${particle.alpha})`;

                ctx.fill();

            });


            // Very subtle connecting lines
            for (
                let i = 0;
                i < particles.length;
                i++
            ) {

                for (
                    let j = i + 1;
                    j < particles.length;
                    j++
                ) {

                    const a =
                        particles[i];

                    const b =
                        particles[j];

                    const dx =
                        a.x - b.x;

                    const dy =
                        a.y - b.y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (distance < 130) {

                        const opacity =
                            (1 - distance / 130) *
                            0.08;

                        ctx.beginPath();

                        ctx.moveTo(
                            a.x,
                            a.y
                        );

                        ctx.lineTo(
                            b.x,
                            b.y
                        );

                        ctx.strokeStyle =
                            `rgba(80, 220, 210, ${opacity})`;

                        ctx.lineWidth = 1;

                        ctx.stroke();

                    }

                }

            }


            animationFrame =
                requestAnimationFrame(
                    animateParticles
                );

        }


        resizeCanvas();

        animateParticles();


        window.addEventListener(
            "resize",
            () => {

                cancelAnimationFrame(
                    animationFrame
                );

                resizeCanvas();

                animateParticles();

            }
        );

    }


    /* =====================================================
       GITHUB PROJECTS
       ===================================================== */

    const githubContainer =
        $("#githubContainer");

    const githubUsername =
        "zerose-code";


    async function loadGitHubProjects() {

        if (!githubContainer) return;


        githubContainer.innerHTML = `

            <div class="project-placeholder">

                <i class="fa-solid fa-spinner fa-spin"></i>

                <span>
                    Loading projects...
                </span>

            </div>

        `;


        try {

            const response =
                await fetch(
                    `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`,
                    {
                        headers: {
                            "Accept":
                                "application/vnd.github+json"
                        }
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `GitHub API error: ${response.status}`
                );

            }


            const repos =
                await response.json();


            const projects =
                repos
                    .filter(repo => !repo.fork)
                    .slice(0, 6);


            if (!projects.length) {

                githubContainer.innerHTML = `

                    <div class="project-placeholder">

                        <i class="fa-brands fa-github"></i>

                        <span>
                            No public projects found.
                        </span>

                        <a
                            href="https://github.com/${githubUsername}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="card-link"
                        >
                            Visit GitHub
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>

                    </div>

                `;

                return;

            }


            /*
             * IMPORTANT:
             * Remove old generated cards first.
             */
            githubContainer.innerHTML = "";


            projects.forEach(
                (repo, index) => {

                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "glass-card project-card reveal";


                    const description =
                        repo.description ||
                        "A project built by the ZEROSE team.";


                    const language =
                        repo.language ||
                        "Development";


                    card.innerHTML = `

                        <div class="project-card-header">

                            <div class="project-folder">

                                <i class="fa-regular fa-folder"></i>

                            </div>


                            <a
                                href="${escapeHTML(repo.html_url)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="project-github"
                                aria-label="Open GitHub repository"
                            >

                                <i class="fa-brands fa-github"></i>

                            </a>

                        </div>


                        <h3>
                            ${escapeHTML(repo.name)}
                        </h3>


                        <p class="project-description">

                            ${escapeHTML(description)}

                        </p>


                        <div class="project-meta">

                            <span>

                                <i class="fa-solid fa-code"></i>

                                ${escapeHTML(language)}

                            </span>


                            <span>

                                <i class="fa-solid fa-star"></i>

                                ${repo.stargazers_count || 0}

                            </span>


                            <span>

                                <i class="fa-solid fa-code-branch"></i>

                                ${repo.forks_count || 0}

                            </span>

                        </div>


                        <a
                            href="${escapeHTML(repo.html_url)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="project-view-link"
                        >

                            <span>
                                View Project
                            </span>

                            <i class="fa-solid fa-arrow-up-right-from-square"></i>

                        </a>

                    `;


                    githubContainer.appendChild(
                        card
                    );


                    // Small stagger animation
                    setTimeout(
                        () => {

                            card.classList.add(
                                "active"
                            );

                        },
                        index * 100
                    );

                }
            );


        } catch (error) {

            console.error(
                "GitHub Projects Error:",
                error
            );


            githubContainer.innerHTML = `

                <div class="project-placeholder">

                    <i class="fa-brands fa-github"></i>

                    <span>
                        Unable to load GitHub projects.
                    </span>


                    <a
                        href="https://github.com/${githubUsername}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="card-link"
                    >

                        Visit GitHub

                        <i class="fa-solid fa-arrow-up-right-from-square"></i>

                    </a>

                </div>

            `;

        }

    }


    loadGitHubProjects();


    /* =====================================================
       AI CHAT
       ===================================================== */

    const aiLauncher =
        $(".ai-chat-launcher");

    const aiWindow =
        $(".ai-chat-window");

    const closeChat =
        $(".close-chat");

    const aiInput =
        $(".ai-chat-input");


    function openAIChat() {

        if (!aiWindow) return;

        aiWindow.classList.add(
            "active"
        );

        if (aiInput) {

            setTimeout(
                () => aiInput.focus(),
                200
            );

        }

    }


    function closeAIChat() {

        if (!aiWindow) return;

        aiWindow.classList.remove(
            "active"
        );

    }


    if (aiLauncher) {

        aiLauncher.addEventListener(
            "click",
            openAIChat
        );

    }


    if (closeChat) {

        closeChat.addEventListener(
            "click",
            closeAIChat
        );

    }


    // Close chat by clicking outside
    document.addEventListener(
        "click",
        event => {

            if (
                !aiWindow ||
                !aiLauncher
            ) {
                return;
            }


            if (
                aiWindow.classList.contains(
                    "active"
                ) &&
                !aiWindow.contains(
                    event.target
                ) &&
                !aiLauncher.contains(
                    event.target
                )
            ) {

                closeAIChat();

            }

        }
    );


    /* =====================================================
       AI CHAT MESSAGE SYSTEM
       ===================================================== */

    const chatMessages =
        $(".ai-chat-messages");


    function addChatMessage(
        message,
        type = "bot"
    ) {

        if (!chatMessages) return;


        const messageElement =
            document.createElement(
                "div"
            );


        messageElement.className =
            `message ${type}`;


        messageElement.innerHTML =
            `<p>${escapeHTML(message)}</p>`;


        chatMessages.appendChild(
            messageElement
        );


        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }


    function showTyping() {

        if (!chatMessages) return;


        const typing =
            document.createElement(
                "div"
            );


        typing.className =
            "message bot ai-typing";


        typing.innerHTML = `

            <p>
                <span>•</span>
                <span>•</span>
                <span>•</span>
            </p>

        `;


        chatMessages.appendChild(
            typing
        );


        chatMessages.scrollTop =
            chatMessages.scrollHeight;


        return typing;

    }


    async function sendAIMessage() {

        if (!aiInput) return;


        const message =
            aiInput.value.trim();


        if (!message) return;


        addChatMessage(
            message,
            "user"
        );


        aiInput.value = "";


        const typing =
            showTyping();


        try {

            const response =
                await fetch(
                    "/api/ai-chat",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                message
                            })
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "AI request failed"
                );

            }


            const data =
                await response.json();


            if (typing) {

                typing.remove();

            }


            const reply =
                data.reply ||
                data.message ||
                "Sorry, I couldn't process that request.";


            addChatMessage(
                reply,
                "bot"
            );


        } catch (error) {

            console.error(
                "AI Chat Error:",
                error
            );


            if (typing) {

                typing.remove();

            }


            addChatMessage(
                "I'm having trouble connecting right now. Please try again or contact ZEROSE directly.",
                "bot"
            );

        }

    }


    // Enter key
    if (aiInput) {

        aiInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendAIMessage();

                }

            }
        );

    }


    // Find send button
    const aiSendButton =
        aiWindow
            ? aiWindow.querySelector(
                "button[type='submit'], .ai-send, .send-btn"
            )
            : null;


    if (aiSendButton) {

        aiSendButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                sendAIMessage();

            }
        );

    }


    // Handle chat form if available
    const aiForm =
        aiWindow
            ? aiWindow.querySelector(
                "form"
            )
            : null;


    if (aiForm) {

        aiForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                sendAIMessage();

            }
        );

    }


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        $("#contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const submitButton =
                    contactForm.querySelector(
                        "button[type='submit']"
                    );


                const status =
                    contactForm.querySelector(
                        ".form-status"
                    );


                const originalText =
                    submitButton
                        ? submitButton.innerHTML
                        : "";


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.innerHTML = `

                        <i class="fa-solid fa-spinner fa-spin"></i>

                        Sending...

                    `;

                }


                if (status) {

                    status.textContent =
                        "";

                    status.className =
                        "form-status";

                }


                try {

                    const formData =
                        new FormData(
                            contactForm
                        );


                    const data =
                        Object.fromEntries(
                            formData.entries()
                        );


                    const response =
                        await fetch(
                            "/api/contact",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        data
                                    )
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Contact request failed"
                        );

                    }


                    const result =
                        await response.json();


                    if (status) {

                        status.textContent =
                            result.message ||
                            "Your message has been sent successfully.";

                        status.classList.add(
                            "success"
                        );

                    }


                    contactForm.reset();


                } catch (error) {

                    console.error(
                        "Contact Form Error:",
                        error
                    );


                    if (status) {

                        status.textContent =
                            "Something went wrong. Please try again.";

                        status.classList.add(
                            "error"
                        );

                    }

                } finally {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            originalText;

                    }

                }

            }
        );

    }


    /* =====================================================
       PRIVACY / TERMS MODALS
       ===================================================== */

    const modalOverlays =
        $$(".modal-overlay");


    function openModal(id) {

        const modal =
            document.getElementById(id);

        if (!modal) return;

        modal.classList.add(
            "active"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    // Privacy links
    $$(
        'a[href="#privacy"], [data-modal="privacy"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const modal =
                    modalOverlays.find(
                        item =>
                            item.id
                                .toLowerCase()
                                .includes("privacy")
                    );

                if (modal) {

                    modal.classList.add(
                        "active"
                    );

                    document.body.classList.add(
                        "modal-open"
                    );

                }

            }
        );

    });


    // Terms links
    $$(
        'a[href="#terms"], [data-modal="terms"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const modal =
                    modalOverlays.find(
                        item =>
                            item.id
                                .toLowerCase()
                                .includes("terms")
                    );

                if (modal) {

                    modal.classList.add(
                        "active"
                    );

                    document.body.classList.add(
                        "modal-open"
                    );

                }

            }
        );

    });


    // Modal close buttons
    $$(".modal-close").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.closest(
                            ".modal-overlay"
                        )
                    );

                }
            );

        }
    );


    // Click outside modal
    modalOverlays.forEach(
        modal => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        closeModal(
                            modal
                        );

                    }

                }
            );

        }
    );


    // Escape key
    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                modalOverlays.forEach(
                    modal => {

                        closeModal(
                            modal
                        );

                    }
                );


                closeAIChat();

            }

        }
    );


    /* =====================================================
       BUTTON RIPPLE EFFECT
       ===================================================== */

    $$(".btn, .social-btn").forEach(
        button => {

            button.addEventListener(
                "click",
                function (event) {

                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.className =
                        "ripple";


                    const rect =
                        this.getBoundingClientRect();


                    ripple.style.left =
                        `${event.clientX - rect.left}px`;

                    ripple.style.top =
                        `${event.clientY - rect.top}px`;


                    this.appendChild(
                        ripple
                    );


                    setTimeout(
                        () => {

                            ripple.remove();

                        },
                        600
                    );

                }
            );

        }
    );


    /* =====================================================
       CARD MOUSE GLOW
       ===================================================== */

    $$(".glass-card, .problem-card, .solution-card, .industry-card, .security-card")
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );

                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.removeProperty(
                        "--mouse-x"
                    );

                    card.style.removeProperty(
                        "--mouse-y"
                    );

                }
            );

        });


    /* =====================================================
       FOOTER YEAR
       ===================================================== */

    const yearElement =
        $("#currentYear") ||
        $(".current-year") ||
        $("[data-year]");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    // Also support #year
    const footerYear =
        $("#year");

    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       HASH FIX
       ===================================================== */

    if (
        window.location.hash === "#"
    ) {

        history.replaceState(
            null,
            "",
            window.location.pathname +
            window.location.search
        );

    }


    /* =====================================================
       PAGE VISIBILITY
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            // Canvas animation automatically continues,
            // but reducing unnecessary work when hidden
            // can help slower devices.

            if (
                document.hidden
            ) {

                // Nothing required here.

            }

        }
    );


    console.log(
        "%cZEROSE%c — Website initialized successfully.",
        "font-weight:bold;font-size:16px;",
        "font-size:14px;"
    );

});
