/* ==========================================================================
   Peak Exposure Media — Attention/Identity Strategy Finder
   Decision-tree logic + UI wiring
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. CONFIG — set this to your Formspree endpoint (see README.md)
   -------------------------------------------------------------------------- */
const FORM_ENDPOINT = "https://formspree.io/f/mvkpdvka"; // <-- replace me

/* --------------------------------------------------------------------------
   2. QUESTION TREE
   -------------------------------------------------------------------------- */
const QUESTIONS = {
  q1: {
    prompt: "If social media could accomplish ONE thing for your business this year, which would be more valuable?",
    options: [
      { id: "A", text: "More of the right people discovering us.", next: "a2" },
      { id: "B", text: "The people who discover us understanding why we're different.", next: "b2" }
    ]
  },

  // ---------------- Attention branch ----------------
  a2: {
    prompt: "How well known is your business within your target market?",
    options: [
      { id: "A", text: "Not well enough. We need significantly more awareness.", next: "a3" },
      { id: "B", text: "People generally know we exist. Awareness isn't our biggest problem.", next: "c3" }
    ]
  },
  a3: {
    prompt: "Which outcome would make social media feel more successful over the next 12 months?",
    options: [
      { id: "A", text: "More reach, traffic, inquiries or customers.", next: "a4" },
      { id: "B", text: "A stronger reputation and a more recognizable brand.", next: "c3" }
    ]
  },
  a4: {
    prompt: "Which would you rather have?",
    options: [
      { id: "A", text: "20 pieces of good content reaching lots of different people.", next: "a5" },
      { id: "B", text: "5 exceptional pieces of content that perfectly represent our company.", next: "c3" }
    ]
  },
  a5: {
    prompt: "Imagine a simple iPhone video about your business gets 250,000 views. It's authentic and entertaining, but isn't beautifully produced. How would you feel?",
    options: [
      { id: "A", text: "That's a huge win. I want more of that.", next: "RESULT_1" },
      { id: "B", text: "I'd be happy about the reach, but I'd worry about how it represents our brand.", next: "RESULT_2" }
    ]
  },

  // ---------------- Identity branch ----------------
  b2: {
    prompt: "What matters more when someone chooses your business?",
    options: [
      { id: "A", text: "Being visible when they need what we sell.", next: "c3" },
      { id: "B", text: "Trusting, wanting or identifying with our specific brand.", next: "b3" }
    ]
  },
  b3: {
    prompt: "Which problem would hurt your business more?",
    options: [
      { id: "A", text: "Not enough people knowing we exist.", next: "c3" },
      { id: "B", text: "People seeing us but not understanding our quality, value or difference.", next: "b4" }
    ]
  },
  b4: {
    prompt: "How important is the way your company visually presents itself?",
    options: [
      { id: "A", text: "Important — but authenticity and frequency can sometimes matter more than polish.", next: "c3" },
      { id: "B", text: "Extremely important. Everything we publish affects how people perceive our value.", next: "b5" }
    ]
  },
  b5: {
    prompt: "You have to choose between two videos.",
    options: [
      {
        id: "A", text: "Video #1", next: "RESULT_4",
        stats: ["500,000 views", "Shot quickly", "Feels native to social media", "Gets people talking about your company"]
      },
      {
        id: "B", text: "Video #2", next: "RESULT_5",
        stats: ["50,000 views", "Beautifully produced", "Tells a meaningful story", "Perfectly represents what your brand stands for"]
      }
    ]
  },

  // ---------------- Crossover branch ----------------
  c3: {
    prompt: "Which statement sounds more like your business?",
    options: [
      { id: "A", text: "We have a great company. We just need more people to know about it.", next: "c4a" },
      { id: "B", text: "People know about us, but our marketing doesn't communicate how good we actually are.", next: "c4b" }
    ]
  },
  c4a: {
    prompt: "Would you be comfortable publishing casual, lower-production content if it consistently reached significantly more people?",
    options: [
      { id: "A", text: "Absolutely. Performance matters more than polish on every post.", next: "RESULT_2" },
      { id: "B", text: "Sometimes — but we still need a strong premium brand presence.", next: "RESULT_3" }
    ]
  },
  c4b: {
    prompt: "Would you sacrifice some production quality if simpler content allowed you to reach substantially more potential customers?",
    options: [
      { id: "A", text: "Yes. We still need growth and reach.", next: "RESULT_3" },
      { id: "B", text: "Usually not. Protecting our brand perception is more important.", next: "RESULT_4" }
    ]
  }
};

/* --------------------------------------------------------------------------
   3. RESULTS
   -------------------------------------------------------------------------- */
const RESULTS = {
  RESULT_1: {
    strategy: "Attention Heavy — 80/20",
    attention: 80, identity: 20,
    kicker: "You need to GET SEEN.",
    lede: "Your biggest opportunity right now is increasing awareness. Your social strategy should prioritize <strong>frequency, relevance, personality and reach.</strong> That doesn't mean producing bad content — it means not allowing production to become a bottleneck.",
    columns: [
      { title: "Your Content Mix", items: ["Short-form video", "iPhone / native content", "Trends", "Educational content", "Personality", "Behind the scenes", "Quick-turn content", "High posting frequency"], note: "With occasional premium content reinforcing what your brand represents." }
    ],
    kpis: ["Reach", "Views", "Discovery", "Engagement", "Leads"]
  },
  RESULT_2: {
    strategy: "Attention Led — 60/40",
    attention: 60, identity: 40,
    kicker: "Grow the audience. Build the brand.",
    lede: "Your business still needs significant awareness, but you can't focus on reach alone. Your strategy should combine frequent social-native content with intentional brand-building pieces. <strong>Attention gets people through the door. Identity gives them a reason to stay.</strong>",
    columns: [],
    kpis: ["Reach", "Engagement", "Audience Growth", "Leads", "Brand Recognition"]
  },
  RESULT_3: {
    strategy: "Hybrid — 50/50",
    attention: 50, identity: 50,
    kicker: "You need both.",
    lede: "Your business has two jobs on social media: <strong>get discovered and become memorable.</strong> Your content strategy should intentionally maintain two content engines — neither should replace the other.",
    columns: [
      { title: "Attention Content", items: ["Fast", "Native", "Relevant", "Frequent"] },
      { title: "Identity Content", items: ["Intentional", "Story-driven", "Premium", "Memorable"] }
    ],
    kpis: ["Reach", "Engagement", "Leads", "Brand Recognition", "Content Quality"]
  },
  RESULT_4: {
    strategy: "Identity Led — 40/60",
    attention: 40, identity: 60,
    kicker: "Build a brand people choose.",
    lede: "Awareness still matters, but your bigger opportunity is differentiation. People shouldn't simply know that your company exists — they should understand <strong>who you are, what you represent, why you're different, and why you're worth choosing.</strong> Social-native content can continue generating reach, while more intentional storytelling establishes your brand.",
    columns: [],
    kpis: ["Brand Recognition", "Engagement Quality", "Consideration", "Leads", "Audience Growth"]
  },
  RESULT_5: {
    strategy: "Identity Heavy — 20/80",
    attention: 20, identity: 80,
    kicker: "Become desirable.",
    lede: "Your social presence is an extension of the product or experience you're selling. For your business, <strong>how people perceive the brand can matter more than how many people see an individual post.</strong>",
    columns: [
      { title: "Your Content Mix", items: ["Storytelling", "Professional photography", "Cinematic video", "Customer stories", "Founder stories", "Lifestyle", "Craftsmanship", "Culture", "Emotion"], note: "Social trends should be used selectively rather than driving the strategy." }
    ],
    kpis: ["Brand Perception", "Consideration", "Qualified Leads", "Customer Sentiment", "Brand Equity"]
  }
};

/* --------------------------------------------------------------------------
   4. STATE
   -------------------------------------------------------------------------- */
let history = [];       // stack of { qid, answerId }
let currentQid = "q1";
let path = [];          // full record for submission: { question, answer }
const APPROX_TOTAL_STEPS = 5; // used only to animate the progress bar smoothly

/* --------------------------------------------------------------------------
   5. DOM REFS
   -------------------------------------------------------------------------- */
const screens = {
  intro: document.getElementById("screen-intro"),
  question: document.getElementById("screen-question"),
  result: document.getElementById("screen-result")
};
const progressWrap = document.getElementById("progressWrap");
const progressFill = document.getElementById("progressFill");
const questionTitle = document.getElementById("questionTitle");
const questionEyebrow = document.getElementById("questionEyebrow");
const optionsGrid = document.getElementById("optionsGrid");
const backBtn = document.getElementById("backBtn");

/* --------------------------------------------------------------------------
   6. NAVIGATION
   -------------------------------------------------------------------------- */
function showScreen(name){
  Object.values(screens).forEach(s => s.removeAttribute("data-active"));
  screens[name].setAttribute("data-active", "true");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz(){
  history = [];
  path = [];
  currentQid = "q1";
  progressWrap.hidden = false;
  renderQuestion();
  showScreen("question");
}

function renderQuestion(){
  const q = QUESTIONS[currentQid];
  questionEyebrow.textContent = `Question ${history.length + 1}`;
  questionTitle.textContent = q.prompt;

  optionsGrid.innerHTML = "";
  q.options.forEach(opt => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "option-card";
    card.setAttribute("aria-label", opt.text);

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = opt.id;
    card.appendChild(letter);

    const text = document.createElement("span");
    text.className = "option-text";
    text.textContent = opt.text;
    card.appendChild(text);

    if (opt.stats){
      const ul = document.createElement("ul");
      ul.className = "option-stats";
      opt.stats.forEach((s, i) => {
        const li = document.createElement("li");
        if (i === 0){
          const strong = document.createElement("strong");
          strong.textContent = s;
          li.appendChild(strong);
        } else {
          li.textContent = s;
        }
        ul.appendChild(li);
      });
      card.appendChild(ul);
    }

    card.addEventListener("click", () => selectOption(q, opt));
    optionsGrid.appendChild(card);
  });

  backBtn.hidden = history.length === 0;
  updateProgress();
}

function selectOption(question, opt){
  path.push({ question: question.prompt, answer: opt.text });
  history.push({ qid: currentQid });

  if (opt.next.startsWith("RESULT_")){
    showResult(opt.next);
    return;
  }

  currentQid = opt.next;
  // brief exit/enter animation
  screens.question.style.opacity = "0";
  setTimeout(() => {
    renderQuestion();
    screens.question.style.opacity = "1";
  }, 160);
}

function goBack(){
  if (history.length === 0) return;
  const last = history.pop();
  path.pop();
  currentQid = last.qid;
  renderQuestion();
}

function updateProgress(){
  const step = history.length + 1;
  const pct = Math.min(100, Math.round((step / APPROX_TOTAL_STEPS) * 100));
  progressFill.style.width = pct + "%";
}

/* --------------------------------------------------------------------------
   7. RESULT RENDERING
   -------------------------------------------------------------------------- */
function showResult(resultKey){
  const r = RESULTS[resultKey];
  progressFill.style.width = "100%";

  document.getElementById("resultKicker").textContent = r.kicker;
  document.getElementById("resultLede").innerHTML = r.lede;
  document.getElementById("pctAttention").textContent = r.attention + "%";
  document.getElementById("pctIdentity").textContent = r.identity + "%";
  document.getElementById("spectrumFill").style.width = r.attention + "%";
  document.getElementById("spectrumMarker").style.left = r.attention + "%";

  const columnsWrap = document.getElementById("resultColumns");
  columnsWrap.innerHTML = "";
  columnsWrap.className = "result-columns" + (r.columns.length > 1 ? " two-col" : "");
  r.columns.forEach(col => {
    const card = document.createElement("div");
    card.className = "mix-card";
    const h4 = document.createElement("h4");
    h4.textContent = col.title;
    card.appendChild(h4);
    const ul = document.createElement("ul");
    col.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    card.appendChild(ul);
    if (col.note){
      const note = document.createElement("p");
      note.className = "mix-note";
      note.textContent = col.note;
      card.appendChild(note);
    }
    columnsWrap.appendChild(card);
  });

  const kpiWrap = document.getElementById("kpiPills");
  kpiWrap.innerHTML = "";
  r.kpis.forEach(k => {
    const pill = document.createElement("span");
    pill.className = "kpi-pill";
    pill.textContent = k;
    kpiWrap.appendChild(pill);
  });

  // hidden fields for lead form
  document.getElementById("hiddenStrategy").value = r.strategy;
  document.getElementById("hiddenAttention").value = r.attention;
  document.getElementById("hiddenIdentity").value = r.identity;
  document.getElementById("hiddenPath").value = path.map(p => `Q: ${p.question} | A: ${p.answer}`).join("\n");
  document.getElementById("hiddenDate").value = new Date().toISOString();

  // reset lead form UI state
  document.getElementById("leadForm").hidden = false;
  document.getElementById("leadSuccess").hidden = true;
  document.getElementById("leadForm").reset();

  showScreen("result");
}

/* --------------------------------------------------------------------------
   8. LEAD FORM SUBMISSION
   -------------------------------------------------------------------------- */
const leadForm = document.getElementById("leadForm");
const submitLeadBtn = document.getElementById("submitLeadBtn");

leadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (FORM_ENDPOINT.includes("YOUR_FORM_ID")){
    alert("Heads up: the lead form isn't connected yet. Set FORM_ENDPOINT in script.js — see README.md for setup steps.");
    return;
  }

  const originalText = submitLeadBtn.innerHTML;
  submitLeadBtn.disabled = true;
  submitLeadBtn.innerHTML = "<span>Sending…</span>";

  try{
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(leadForm)
    });

    if (res.ok){
      leadForm.hidden = true;
      document.getElementById("leadSuccess").hidden = false;
    } else {
      throw new Error("Submission failed");
    }
  } catch (err){
    alert("Something went wrong sending your details. Please try again, or email Cameron@peakexposuremedia.com directly.");
    submitLeadBtn.disabled = false;
    submitLeadBtn.innerHTML = originalText;
  }
});

/* --------------------------------------------------------------------------
   9. EVENTS
   -------------------------------------------------------------------------- */
document.getElementById("startBtn").addEventListener("click", startQuiz);
backBtn.addEventListener("click", goBack);
document.getElementById("restartBtn").addEventListener("click", () => {
  progressWrap.hidden = true;
  showScreen("intro");
});
