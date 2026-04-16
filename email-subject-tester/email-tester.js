const topicInput = document.getElementById('email-topic');
const audienceInput = document.getElementById('target-audience');
const runBtn = document.getElementById('run-test');
const vList = document.getElementById('v-list');
const loader = document.getElementById('loader');

const generateVariations = () => {
    const topic = topicInput.value.trim();
    const audience = audienceInput.value.trim() || 'General Audience';

    if (!topic) return alert("Please enter an email topic first!");

    loader.style.display = 'flex';
    vList.innerHTML = '';

    setTimeout(() => {
        const results = createEmailVariations(topic, audience);
        displayresults(results);
        loader.style.display = 'none';
    }, 1500);
};

const createEmailVariations = (topic, audience) => {
    const cleanTopic = topic.length > 40 ? topic.substring(0, 40) + "..." : topic;

    return [
        {
            text: `[Urgently Required] Solution for ${cleanTopic}`,
            score: 92,
            tag: "HIGH URGENCY / DIRECTIVE",
            type: "high"
        },
        {
            text: `Question about ${cleanTopic} for ${audience}?`,
            score: 68,
            tag: "CURIOSITY / QUESTION-BASED",
            type: "mid"
        },
        {
            text: `Major Update: How we revolutionized ${cleanTopic}`,
            score: 85,
            tag: "AUTHORITY / ANNOUNCEMENT",
            type: "high"
        },
        {
            text: `Wait... you're still doing ${cleanTopic} the old way?`,
            score: 79,
            tag: "PATTERN INTERRUPT / FEAR OF MISSING OUT",
            type: "mid"
        },
        {
            text: `Check this out: A new way to handle ${cleanTopic}`,
            score: 45,
            tag: "LOW IMPACT / GENERIC",
            type: "low"
        }
    ];
};

const displayresults = (results) => {
    vList.innerHTML = results.map(res => `
        <div class="variation-card">
            <div class="score-gauge score-${res.type}">
                ${res.score}%
            </div>
            <div class="subject-content">
                <span class="subject-text">${res.text}</span>
                <span class="subject-tag">${res.tag}</span>
            </div>
        </div>
    `).join('');
};

runBtn.addEventListener('click', generateVariations);
