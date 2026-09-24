const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

    });

    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuButton.setAttribute(
                "aria-label",
                "Open menu"
            );

        });

    });

}

/* =========================
   BUSINESS X-RAY
   ZEROSE X-RAY ENGINE v3
========================= */

const xrayButton = document.querySelector("#run-xray");

if (xrayButton) {
    xrayButton.addEventListener("click", () => {

        /* ---------------------------------
           1. GET USER ANSWERS
        --------------------------------- */

        const getValue = (selector) => {
            return document.querySelector(selector)?.value || "";
        };

        const businessType = getValue("#business-type");
        const businessStage = getValue("#business-stage");
        const businessProblem = getValue("#business-problem");
        const digitalPresence = getValue("#digital-presence");
        const businessGoal = getValue("#business-goal");


        /* ---------------------------------
           2. GET RESULT ELEMENTS
        --------------------------------- */

        const result = document.querySelector("#xray-result");

        const opportunity =
            document.querySelector("#xray-opportunity");

        const solution =
            document.querySelector("#xray-solution");

        const start =
            document.querySelector("#xray-start");

        const scoreEl =
            document.querySelector("#xray-score");

        const summaryEl =
            document.querySelector("#xray-score-summary");


        /* ---------------------------------
           3. VALIDATION
        --------------------------------- */

        if (
            !businessType ||
            !businessStage ||
            !businessProblem ||
            !digitalPresence ||
            !businessGoal
        ) {
            alert("Please answer all 5 questions first.");
            return;
        }


        /* ---------------------------------
           4. BASE SCORE
        --------------------------------- */

        let scores = {
            presence: 50,
            growth: 50,
            operations: 50,
            automation: 50,
            brand: 50
        };


        /* ---------------------------------
           5. DIGITAL PRESENCE
        --------------------------------- */

        const presenceScores = {
            nothing: 15,
            social: 35,
            website: 60,
            "website-social": 75,
            software: 88,
            complete: 96
        };

        scores.presence =
            presenceScores[digitalPresence] ?? 50;


        /* ---------------------------------
           6. BUSINESS STAGE
        --------------------------------- */

        const stageImpact = {

            starting: {
                presence: -5,
                growth: -5,
                operations: 0,
                automation: 0,
                brand: 5
            },

            offline: {
                presence: -10,
                growth: -5,
                operations: 5,
                automation: 0,
                brand: 0
            },

            online: {
                presence: 5,
                growth: 5,
                operations: 0,
                automation: 2,
                brand: 0
            },

            growing: {
                presence: 5,
                growth: 10,
                operations: 5,
                automation: 5,
                brand: 2
            },

            scaling: {
                presence: 5,
                growth: 12,
                operations: 10,
                automation: 10,
                brand: 5
            }
        };

        const stage = stageImpact[businessStage];

        if (stage) {
            Object.keys(stage).forEach((key) => {
                scores[key] += stage[key];
            });
        }


        /* ---------------------------------
           7. BUSINESS PROBLEM
        --------------------------------- */

        const problemImpact = {

            presence: {
                presence: -25,
                growth: -5,
                operations: 0,
                automation: 0,
                brand: -10
            },

            manual: {
                presence: 0,
                growth: 0,
                operations: -15,
                automation: -20,
                brand: 0
            },

            customers: {
                presence: -5,
                growth: -25,
                operations: 0,
                automation: 0,
                brand: -5
            },

            data: {
                presence: 0,
                growth: 0,
                operations: -20,
                automation: -10,
                brand: 0
            },

            operations: {
                presence: 0,
                growth: 0,
                operations: -25,
                automation: -10,
                brand: 0
            },

            automation: {
                presence: 0,
                growth: 0,
                operations: -5,
                automation: -30,
                brand: 0
            },

            other: {
                presence: -5,
                growth: -5,
                operations: -5,
                automation: -5,
                brand: -5
            }
        };

        const problem =
            problemImpact[businessProblem];

        if (problem) {
            Object.keys(problem).forEach((key) => {
                scores[key] += problem[key];
            });
        }


        /* ---------------------------------
           8. BUSINESS GOAL
        --------------------------------- */

        const goalImpact = {

            launch: {
                presence: 10,
                growth: 5,
                operations: 0,
                automation: 0,
                brand: 15
            },

            online: {
                presence: 15,
                growth: 10,
                operations: 0,
                automation: 0,
                brand: 5
            },

            organize: {
                presence: 0,
                growth: 0,
                operations: 15,
                automation: 5,
                brand: 0
            },

            automate: {
                presence: 0,
                growth: 5,
                operations: 10,
                automation: 20,
                brand: 0
            },

            customers: {
                presence: 5,
                growth: 20,
                operations: 0,
                automation: 5,
                brand: 5
            },

            scale: {
                presence: 5,
                growth: 15,
                operations: 10,
                automation: 15,
                brand: 5
            }
        };

        const goal =
            goalImpact[businessGoal];

        if (goal) {
            Object.keys(goal).forEach((key) => {
                scores[key] += goal[key];
            });
        }


        /* ---------------------------------
           9. BUSINESS TYPE
        --------------------------------- */

        const businessTypeImpact = {

            startup: {
                presence: 0,
                growth: 5,
                operations: 0,
                automation: 0,
                brand: 10
            },

            retail: {
                presence: 5,
                growth: 10,
                operations: 5,
                automation: 5,
                brand: 5
            },

            restaurant: {
                presence: 10,
                growth: 10,
                operations: 5,
                automation: 5,
                brand: 10
            },

            "real-estate": {
                presence: 10,
                growth: 10,
                operations: 5,
                automation: 5,
                brand: 10
            },

            education: {
                presence: 5,
                growth: 0,
                operations: 10,
                automation: 10,
                brand: 5
            },

            professional: {
                presence: 5,
                growth: 5,
                operations: 5,
                automation: 5,
                brand: 10
            },

            other: {
                presence: 0,
                growth: 0,
                operations: 0,
                automation: 0,
                brand: 0
            }
        };

        const type =
            businessTypeImpact[businessType];

        if (type) {
            Object.keys(type).forEach((key) => {
                scores[key] += type[key];
            });
        }


        /* ---------------------------------
           10. NORMALIZE SCORES
        --------------------------------- */

        Object.keys(scores).forEach((key) => {
            scores[key] = Math.max(
                0,
                Math.min(
                    100,
                    Math.round(scores[key])
                )
            );
        });


        /* ---------------------------------
           11. OVERALL SCORE
        --------------------------------- */

        const overallScore = Math.round(
            (
                scores.presence +
                scores.growth +
                scores.operations +
                scores.automation +
                scores.brand
            ) / 5
        );


        /* ---------------------------------
           12. SCORE LABELS
        --------------------------------- */

        const scoreNames = {

            presence: "Website & Digital Presence",

            growth: "Leads & Growth",

            operations: "Business Operations",

            automation: "Automation & AI",

            brand: "Brand & Positioning"
        };


        /* ---------------------------------
           13. FIND WEAKEST AREA
        --------------------------------- */

        const weakestArea = Object.keys(scores).reduce(
            (lowest, key) => {
                return scores[key] < scores[lowest]
                    ? key
                    : lowest;
            },
            Object.keys(scores)[0]
        );


        /* ---------------------------------
           14. FIND STRONGEST AREA
        --------------------------------- */

        const strongestArea = Object.keys(scores).reduce(
            (highest, key) => {
                return scores[key] > scores[highest]
                    ? key
                    : highest;
            },
            Object.keys(scores)[0]
        );


        /* ---------------------------------
           15. SCORE SUMMARY
        --------------------------------- */

        let scoreSummary = "";

        if (overallScore < 40) {

            scoreSummary =
                "Your business has several important digital growth opportunities. A focused digital foundation can create the biggest improvement.";

        } else if (overallScore < 60) {

            scoreSummary =
                "Your business has a starting digital foundation, but several systems can be improved to support stronger growth.";

        } else if (overallScore < 80) {

            scoreSummary =
                "Your business has a solid digital foundation. The next opportunity is improving weak areas and connecting your systems.";

        } else {

            scoreSummary =
                "Your business has a strong digital foundation. The next step is optimization, automation and scalable growth systems.";
        }


        /* ---------------------------------
           16. PROBLEM DIAGNOSIS
        --------------------------------- */

        const opportunityMap = {

            presence:
                "Your biggest opportunity is building a professional digital presence that makes your business easier to discover and trust.",

            manual:
                "Your business is spending valuable time on manual processes that could be organized and digitized.",

            customers:
                "Your biggest growth opportunity is creating a stronger system for attracting, capturing and converting customers.",

            data:
                "Your business needs better visibility and organization of its important data.",

            operations:
                "Your business operations have an opportunity to become more organized, measurable and digitally manageable.",

            automation:
                "Your business has clear potential to save time and improve consistency through automation and AI.",

            other:
                "Your answers show several areas where a customized digital assessment could uncover growth opportunities."
        };


        /* ---------------------------------
           17. SOLUTION ENGINE
        --------------------------------- */

        const solutionMap = {

            presence:
                "Website + Brand Identity + Digital Presence",

            manual:
                "Custom Business Software + Workflow Automation",

            customers:
                "Lead Generation + Content + Conversion System",

            data:
                "Business Dashboard + Data Management System",

            operations:
                "Custom Business Software + Operations System",

            automation:
                "AI + Workflow Automation",

            other:
                "Custom Digital Growth System"
        };


        /* ---------------------------------
           18. GOAL SOLUTIONS
        --------------------------------- */

        const goalSolutionMap = {

            launch:
                "Brand Identity + Professional Website + Launch System",

            online:
                "Website + Online Business Setup + Customer Journey",

            organize:
                "Business Management Software + Operations Dashboard",

            automate:
                "AI + Workflow Automation + Process Optimization",

            customers:
                "Lead Generation + Digital Marketing + Conversion System",

            scale:
                "Growth Systems + Automation + Custom Software"
        };


        /* ---------------------------------
           19. START ACTIONS
        --------------------------------- */

        const startMap = {

            presence:
                "Start by building a fast professional website, clear brand identity and consistent digital presence.",

            manual:
                "Start by identifying the repetitive tasks your team performs every day and convert the highest-impact process into a digital workflow.",

            customers:
                "Start with your customer journey: visibility → lead capture → follow-up → conversion.",

            data:
                "Start by organizing your important business records into one structured digital system.",

            operations:
                "Start by mapping your current workflow and identifying the operational bottleneck that affects the business most.",

            automation:
                "Start with one repetitive high-volume task and build a simple automation around it.",

            other:
                "Start with a deeper business discovery session to identify the highest-impact digital opportunity."
        };


        /* ---------------------------------
           20. BUILD INITIAL RESULT
        --------------------------------- */

        let mainOpportunity =
            opportunityMap[businessProblem] ||
            opportunityMap.other;

        let recommendedSolution =
            solutionMap[businessProblem] ||
            "Custom Digital Growth System";

        let whereToStart =
            startMap[weakestArea] ||
            startMap.other;


        /* ---------------------------------
           21. GOAL REFINEMENT
        --------------------------------- */

        if (goalSolutionMap[businessGoal]) {

            /*
             * Don't completely ignore the actual
             * business problem.
             * Combine problem + goal.
             */

            if (
                businessProblem !== "other" &&
                businessProblem !== businessGoal
            ) {

                recommendedSolution =
                    `${solutionMap[businessProblem]} focused on ${goalSolutionMap[businessGoal].toLowerCase()}`;

            } else {

                recommendedSolution =
                    goalSolutionMap[businessGoal];
            }
        }


        /* ---------------------------------
           22. BUSINESS-SPECIFIC REFINEMENT
        --------------------------------- */

        /* RESTAURANT */

        if (
            businessType === "restaurant" &&
            businessGoal === "customers"
        ) {

            recommendedSolution =
                "Restaurant Website + Online Ordering + Local Growth System";

            whereToStart =
                "Start with your online menu, ordering journey, Google/social presence and a simple customer lead system.";

            mainOpportunity =
                "Your biggest opportunity is turning your restaurant's local visibility into a stronger digital customer journey.";
        }


        /* RETAIL */

        if (
            businessType === "retail" &&
            businessGoal === "customers"
        ) {

            recommendedSolution =
                "Online Store + Product Showcase + Lead Generation";

            whereToStart =
                "Start by making your products easy to discover online and create a simple path from visitor to customer.";

            mainOpportunity =
                "Your biggest opportunity is making your products easier to discover, trust and purchase through digital channels.";
        }


        /* EDUCATION */

        if (
            businessType === "education" &&
            (
                businessProblem === "operations" ||
                businessProblem === "data"
            )
        ) {

            recommendedSolution =
                "Student Management Software + Data Dashboard";

            whereToStart =
                "Start by digitizing student records, attendance, fees and the daily administrative workflow.";

            mainOpportunity =
                "Your biggest opportunity is creating one organized digital system for student information and daily administration.";
        }


        /* AUTOMATION + SCALE */

        if (
            businessProblem === "automation" &&
            businessGoal === "scale"
        ) {

            recommendedSolution =
                "AI Automation + Business Systems + Scalable Workflow";

            whereToStart =
                "Start with the repetitive process that consumes the most team time, then build an automation that can scale with the business.";

            mainOpportunity =
                "Your biggest opportunity is replacing repetitive manual work with scalable systems, automation and AI.";
        }


        /* ---------------------------------
           23. PROFESSIONAL DIAGNOSIS
        --------------------------------- */

        let diagnosis = "";

        if (weakestArea === "presence") {

            diagnosis =
                `Your strongest current area is ${scoreNames[strongestArea]}, while ${scoreNames[weakestArea]} represents the clearest digital gap. Improving how your business appears and communicates online can strengthen discovery and customer trust.`;

        } else if (weakestArea === "growth") {

            diagnosis =
                `Your current digital foundation shows room to improve customer acquisition. Your ${scoreNames[weakestArea]} score indicates that creating a clearer path from visibility to lead and conversion should be a key focus.`;

        } else if (weakestArea === "operations") {

            diagnosis =
                `Your business has an opportunity to make its internal workflow more organized and measurable. Improving ${scoreNames[weakestArea]} can reduce operational friction and create a stronger foundation for growth.`;

        } else if (weakestArea === "automation") {

            diagnosis =
                `Your business has an opportunity to reduce repetitive work through smarter systems. Improving ${scoreNames[weakestArea]} can help your team save time and create more consistent processes.`;

        } else {

            diagnosis =
                `Your business has a clear opportunity to strengthen its positioning and consistency. Improving ${scoreNames[weakestArea]} can help create stronger recognition and trust around your digital presence.`;
        }


        /* ---------------------------------
           24. PRIORITY LEVEL
        --------------------------------- */

        let priorityLevel = "Growth Opportunity";

        if (overallScore < 40) {

            priorityLevel = "Foundation Required";

        } else if (overallScore < 60) {

            priorityLevel = "High-Priority Improvement";

        } else if (overallScore < 80) {

            priorityLevel = "Optimization Opportunity";

        } else {

            priorityLevel = "Scale & Optimize";
        }


        /* ---------------------------------
           25. UPDATE SCORE
        --------------------------------- */

        const updateScore = (id, value) => {

            const element =
                document.querySelector(`#${id}`);

            if (element) {
                element.textContent = value;
            }
        };


        /* ---------------------------------
           26. UPDATE BAR
        --------------------------------- */

        const updateBar = (id, value) => {

            const element =
                document.querySelector(`#${id}`);

            if (element) {
                element.style.width = `${value}%`;
            }
        };


        /* ---------------------------------
           27. MAIN SCORE
        --------------------------------- */

        updateScore(
            "xray-score",
            overallScore
        );


        /* ---------------------------------
           28. SCORE SUMMARY
        --------------------------------- */

        if (summaryEl) {

            summaryEl.textContent =
                scoreSummary;
        }


        /* ---------------------------------
           29. CATEGORY SCORES
        --------------------------------- */

        updateScore(
            "score-presence",
            scores.presence
        );

        updateScore(
            "score-growth",
            scores.growth
        );

        updateScore(
            "score-operations",
            scores.operations
        );

        updateScore(
            "score-automation",
            scores.automation
        );

        updateScore(
            "score-brand",
            scores.brand
        );


        /* ---------------------------------
           30. SCORE BARS
        --------------------------------- */

        updateBar(
            "bar-presence",
            scores.presence
        );

        updateBar(
            "bar-growth",
            scores.growth
        );

        updateBar(
            "bar-operations",
            scores.operations
        );

        updateBar(
            "bar-automation",
            scores.automation
        );

        updateBar(
            "bar-brand",
            scores.brand
        );


        /* ---------------------------------
           31. RESULT CARDS
        --------------------------------- */

        if (opportunity) {

            opportunity.textContent =
                mainOpportunity;
        }

        if (solution) {

            solution.textContent =
                recommendedSolution;
        }

        if (start) {

            start.textContent =
                whereToStart;
        }


        /* ---------------------------------
           32. OPTIONAL PROFESSIONAL DATA
        --------------------------------- */

        const diagnosisEl =
            document.querySelector("#xray-diagnosis");

        const strongestEl =
            document.querySelector("#xray-strongest");

        const weakestEl =
            document.querySelector("#xray-weakest");

        const priorityEl =
            document.querySelector("#xray-priority");


        if (diagnosisEl) {

            diagnosisEl.textContent =
                diagnosis;
        }

        if (strongestEl) {

            strongestEl.textContent =
                `${scoreNames[strongestArea]} — ${scores[strongestArea]}/100`;
        }

        if (weakestEl) {

            weakestEl.textContent =
                `${scoreNames[weakestArea]} — ${scores[weakestArea]}/100`;
        }

        if (priorityEl) {

            priorityEl.textContent =
                priorityLevel;
        }

        // Save Business X-Ray Context for ZEROSE Consultant
        sessionStorage.setItem(
            "zeroseXrayContext",
            JSON.stringify({
                businessType,
                businessStage,
                businessProblem,
                digitalPresence,
                businessGoal,
                overallScore,
                strongestArea:
            scoreNames[strongestArea],
                weakestArea:
            scoreNames[weakestArea],
                priorityLevel,
                diagnosis,
                opportunity:
            mainOpportunity,
                recommendedSolution,
                whereToStart
            })
        );

        /* ---------------------------------
           33. SHOW RESULT
        --------------------------------- */

        if (result) {

            result.hidden = false;

            result.classList.remove(
                "is-visible"
            );

            requestAnimationFrame(() => {

                result.classList.add(
                    "is-visible"
                );
            });
        }


        /* ---------------------------------
           34. SCROLL TO REPORT
        --------------------------------- */

        if (result) {

            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }


        /* ---------------------------------
           35. DEBUG DATA
        --------------------------------- */

        console.log(
            "ZEROSE X-RAY v3 RESULT",
            {
                businessType,
                businessStage,
                businessProblem,
                digitalPresence,
                businessGoal,

                scores,
                overallScore,

                weakestArea:
                    scoreNames[weakestArea],

                strongestArea:
                    scoreNames[strongestArea],

                priorityLevel,

                diagnosis,

                recommendedSolution
            }
        );

    });
}

 (function () {
  // 1. Create Container
  const hostDiv = document.createElement('div');
  hostDiv.id = 'zerose-chat-root';
  document.body.appendChild(hostDiv);

  // 2. Attach Shadow DOM (Complete CSS Isolation)
  const shadow = hostDiv.attachShadow({ mode: 'open' });

  // 3. Helper: Simple Markdown Parser
  function formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^### (.*$)/gim, '<strong style="display:block; margin-top:6px;">$1</strong>')
      .replace(/^## (.*$)/gim, '<strong style="display:block; font-size:14px; margin-top:8px;">$1</strong>')
      .replace(/^\* (.*$)/gim, '• $1')
      .replace(/^- (.*$)/gim, '• $1')
      .replace(/\n/g, '<br>');
  }

  // 4. HTML & Responsive CSS Structure
  shadow.innerHTML = `
    <style>
      :host {
        all: initial;
      }
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: system-ui, -apple-system, sans-serif;
      }
      .zc-widget {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 99999999;
      }
      .zc-btn {
        background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
        color: #ffffff;
        border: none;
        border-radius: 50px;
        padding: 12px 22px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 10px 25px rgba(0, 198, 255, 0.35);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .zc-box {
        display: none;
        width: 360px;
        height: 500px;
        max-height: 80vh;
        background: #0f1219;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        position: absolute;
        bottom: 60px;
        right: 0;
        flex-direction: column;
        overflow: hidden;
      }
      .zc-box.active {
        display: flex !important;
      }
      .zc-header {
        background: #161b26;
        padding: 14px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        flex-shrink: 0;
      }
      .zc-title {
        color: #ffffff;
        font-size: 15px;
        font-weight: 600;
      }
      .zc-status {
        font-size: 11px;
        color: #00c6ff;
        display: block;
      }
      .zc-close-btn {
        background: transparent;
        border: none;
        color: #888888;
        font-size: 18px;
        cursor: pointer;
        padding: 4px 8px;
      }
      .zc-messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .zc-msg {
        max-width: 85%;
        padding: 10px 14px;
        border-radius: 12px;
        font-size: 13px;
        line-height: 1.5;
        word-break: break-word;
      }
      .zc-msg-user {
        align-self: flex-end;
        background: #00c6ff;
        color: #000000;
        font-weight: 500;
        border-bottom-right-radius: 2px;
      }
      .zc-msg-ai {
        align-self: flex-start;
        background: rgba(255, 255, 255, 0.08);
        color: #e2e8f0;
        border-top-left-radius: 2px;
      }
      .zc-input-area {
        padding: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        background: #121620;
        display: flex;
        gap: 8px;
        height: 64px;
        flex-shrink: 0;
        align-items: center;
      }
      .zc-input {
        flex: 1;
        background: #090b10;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        padding: 8px 12px;
        color: #ffffff;
        font-size: 14px;
        outline: none;
        height: 40px;
      }
      .zc-send-btn {
        background: #00c6ff;
        color: #000000;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        font-weight: 600;
        cursor: pointer;
        height: 40px;
      }
      /* MOBILE RESPONSIVE FIX */
      @media screen and (max-width: 480px) {
        .zc-widget {
          bottom: 0;
          right: 0;
          left: 0;
          top: 0;
          pointer-events: none;
        }
        .zc-btn {
          pointer-events: auto;
          position: fixed;
          bottom: 20px;
          right: 20px;
        }
        .zc-box {
          pointer-events: auto;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100dvh; /* Handles mobile browser bars */
          max-height: 100dvh;
          border-radius: 0;
          border: none;
        }
      }
    </style>

    <div class="zc-widget">
      <button class="zc-btn" id="toggle-btn">💬 ZEROSE AI</button>
      <div class="zc-box" id="chat-box">
        <div class="zc-header">
          <div>
            <div class="zc-title">ZEROSE Consultant</div>
            <span class="zc-status">● Active Now</span>
          </div>
          <button class="zc-close-btn" id="close-btn">✕</button>
        </div>
        <div class="zc-messages" id="chat-messages">
          <div class="zc-msg zc-msg-ai">Hello! 👋 Welcome to ZEROSE. How can I help you today?</div>
        </div>
        <div class="zc-input-area">
          <input type="text" class="zc-input" id="chat-input" placeholder="Type your message...">
          <button class="zc-send-btn" id="send-btn">Send</button>
        </div>
      </div>
    </div>
  `;

  // 5. Logic Implementation
  const chatBox = shadow.getElementById('chat-box');
  const toggleBtn = shadow.getElementById('toggle-btn');
  const closeBtn = shadow.getElementById('close-btn');
  const chatInput = shadow.getElementById('chat-input');
  const sendBtn = shadow.getElementById('send-btn');
  const chatMessages = shadow.getElementById('chat-messages');

  const toggleChat = () => chatBox.classList.toggle('active');
  toggleBtn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

 const sendMessage = async () => {
  const text = chatInput.value.trim();
  if (!text) return;

  // User Message
  const userMsg = document.createElement('div');
  userMsg.className = 'zc-msg zc-msg-user';
  userMsg.innerText = text;
  chatMessages.appendChild(userMsg);

  chatInput.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Loading State
  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'zc-msg zc-msg-ai';
  loadingMsg.innerText = 'Thinking...';
  chatMessages.appendChild(loadingMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const apiUrl = window.location.origin + '/api/chat';

    // Get previous conversation from the chatbot
    const history = Array.from(
      chatMessages.querySelectorAll('.zc-msg')
    )
      .slice(-11, -1)
      .map((msg) => ({
        role: msg.classList.contains('zc-msg-user')
          ? 'user'
          : 'assistant',
        content: msg.innerText
      }));
    const xrayContext =

    sessionStorage.getItem("zeroseXrayContext");
      
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: text,
        history: history,
        xrayContext: xrayContext
              ?
    JSON.parse(xrayContext)
            : null
      })
    });

    const data = await response.json();

    if (chatMessages.contains(loadingMsg)) {
      chatMessages.removeChild(loadingMsg);
    }

    if (!response.ok) {
      throw new Error(data.error || 'Server returned an error');
    }

    const aiMsg = document.createElement('div');
    aiMsg.className = 'zc-msg zc-msg-ai';

    const rawReply = data.reply || 'No response received.';

    aiMsg.innerHTML = formatMarkdown(rawReply);
    chatMessages.appendChild(aiMsg);

  } catch (err) {
    if (chatMessages.contains(loadingMsg)) {
      chatMessages.removeChild(loadingMsg);
    }

    const errorMsg = document.createElement('div');
    errorMsg.className = 'zc-msg zc-msg-ai';
    errorMsg.style.color = '#ff6b6b';
    errorMsg.innerText = 'Failed to connect to AI server.';
    chatMessages.appendChild(errorMsg);

    console.error('Chatbot Error:', err);
  }

  chatMessages.scrollTop = chatMessages.scrollHeight;
};

  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
})();

