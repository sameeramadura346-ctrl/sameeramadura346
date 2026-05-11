import re

# Read the original HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define replacement pattern for card structure
# This will replace the entire card structure keeping the link but changing icon to image

replacements = [
    # Performance Panel
    {
        'url': 'https://chatgpt.com',
        'logo': 'google.png',
        'name': 'Google'
    },
    {
        'url': 'https://gemini.google.com',
        'logo': 'cognitek.png',
        'name': 'CogniTek'
    },
    {
        'url': 'https://claude.ai',
        'logo': 'dataflow.png',
        'name': 'DataFlow'
    },
    {
        'url': 'https://www.perplexity.ai',
        'logo': 'dataflow2.png',
        'name': 'DataFlow'
    },
    {
        'url': 'https://copilot.microsoft.com',
        'logo': 'neurogrid.png',
        'name': 'NeuroGrid'
    },
    {
        'url': 'https://www.midjourney.com',
        'logo': 'synapseai.png',
        'name': 'SynapseAI'
    },
    {
        'url': 'https://stability.ai',
        'logo': 'synapseai2.png',
        'name': 'SynapseAI'
    },
    {
        'url': 'https://www.jasper.ai',
        'logo': 'synapseai3.png',
        'name': 'SynapseAI'
    }
]

# Pattern to match tool cards: <a href="URL" class="tool-card" target="_blank">...entire card...</a>
for replacement in replacements:
    # Pattern finds the card with specific URL
    pattern = rf'(<a href="{re.escape(replacement["url"])}" class="tool-card" target="_blank">)(.*?)(</a>)'
    
    # Replacement HTML
    new_card = f'''<a href="{replacement['url']}" class="tool-card" target="_blank">
                            <img src="images/logos/{replacement['logo']}" alt="{replacement['name']}" class="card-logo">
                            <h3 class="card-title">{replacement['name']}</h3>
                            <p class="card-subtitle">with AI section</p>
                        </a>'''
    
    # Replace
    content = re.sub(pattern, new_card, content, flags=re.DOTALL, count=1)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Performance panel cards successfully!")
