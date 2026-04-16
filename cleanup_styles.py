import re

with open('image-generation.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove style-glass, style-gradient, style-border, style-transparent
content = content.replace('big-card-text style-glass', 'big-card-text')
content = content.replace('big-card-text style-gradient', 'big-card-text')
content = content.replace('big-card-text style-border', 'big-card-text')
content = content.replace('big-card-text style-transparent', 'big-card-text')

with open('image-generation.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Successfully cleaned up HTML classes.")
