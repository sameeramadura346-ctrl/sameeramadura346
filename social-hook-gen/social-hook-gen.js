const topicInput = document.getElementById('topic-input');
const styleBtns = document.querySelectorAll('.style-btn');
const generateBtn = document.getElementById('generate-hooks');
const hookX = document.getElementById('hook-x');
const hookLI = document.getElementById('hook-li');
const hookIG = document.getElementById('hook-ig');
const copyBtns = document.querySelectorAll('.copy-btn');

let selectedStyle = 'controversial';

// Style Selection
styleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        styleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedStyle = btn.dataset.style;
    });
});

// Generation Logic
const generateHooks = () => {
    const topic = topicInput.value.trim();
    if (!topic) return alert("Please enter a topic first!");

    generateBtn.textContent = "CHARGING NEURAL PATHS...";
    generateBtn.disabled = true;

    // Simulate AI processing delay
    setTimeout(() => {
        const hooks = createHooks(topic, selectedStyle);
        hookX.textContent = hooks.x;
        hookLI.textContent = hooks.li;
        hookIG.textContent = hooks.ig;

        generateBtn.textContent = "GENERATE NEURAL HOOKS";
        generateBtn.disabled = false;
    }, 1200);
};

const createHooks = (topic, style) => {
    const cleanTopic = topic.length > 50 ? topic.substring(0, 50) + "..." : topic;

    const templates = {
        controversial: {
            x: `Unpopular opinion: Most people are doing ${cleanTopic} completely wrong. Here is the 1% secret that actually works. 🧵👇`,
            li: `I'm tired of seeing everyone overlook ${cleanTopic}. After years in the industry, I've realized that the 'standard' advice is actually holding you back. Here’s why...`,
            ig: `⚠️ THROW AWAY EVERYTHING YOU KNOW ABOUT ${cleanTopic.toUpperCase()}. The truth is much more intense. Read the caption 🤫`
        },
        curiosity: {
            x: `I spent 100+ hours researching ${cleanTopic} so you don't have to. The results were... unexpected. Here are 3 things I learned:`,
            li: `What if I told you that ${cleanTopic} is the missing link to your next 10x growth? Most leaders miss this one subtle detail.`,
            ig: `The one thing NO ONE tells you about ${cleanTopic} 🧐. It might be the game-changer you’ve been looking for.`
        },
        listicle: {
            x: `Top 5 ways to master ${cleanTopic} in 2025: \n1. [Secret A]\n2. [Secret B]...\nAvoid #4 if you want to succeed. 🚀`,
            li: `5 reasons why ${cleanTopic} is the future of digital innovation. Number 3 changed my entire perspective on workflow.`,
            ig: `5 STEPS TO ${cleanTopic.toUpperCase()} PERFECTION 🏆. Save this for your next project!`
        },
        story: {
            x: `Last month, I almost gave up on ${cleanTopic}. Then I tried one small experiment that changed everything. Here is the story:`,
            li: `In my early days, I struggled with ${cleanTopic}. It wasn't until a mentor told me one specific phrase that things finally clicked. Today, I'm sharing that lesson.`,
            ig: `THE JOURNEY TO ${cleanTopic.toUpperCase()} 🎢. Swipe to see how it started vs. how it’s going!`
        }
    };

    return templates[style];
};

// Copy Functionality
copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.previousElementSibling.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = btn.textContent;
            btn.textContent = "COPIED!";
            btn.style.borderColor = "#FF00FF";
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.borderColor = "";
            }, 2000);
        });
    });
});

generateBtn.addEventListener('click', generateHooks);
