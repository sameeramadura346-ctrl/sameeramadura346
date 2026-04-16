import re

with open('image-generation.html', 'r', encoding='utf-8') as f:
    content = f.read()

styles = ['style-glass', 'style-gradient', 'style-border', 'style-transparent']
matches = list(re.finditer(r'<div class="big-card-text">', content))

if len(matches) >= 4:
    new_content = content
    # Start from the 4th match and go backwards to avoid offset issues
    for i in range(3, -1, -1):
        start = matches[i].start()
        end = matches[i].end()
        new_tag = f'<div class="big-card-text {styles[i]}">'
        new_content = new_content[:start] + new_tag + new_content[end:]
    
    with open('image-generation.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully applied 4 styles to first 4 cards.")
else:
    print(f"Found only {len(matches)} matches. Expected at least 4.")
