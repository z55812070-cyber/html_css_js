const express = require('express');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to intercept and render .md files
app.get('/*.md', (req, res) => {
    const filePath = path.join(__dirname, req.path);

    if (fs.existsSync(filePath)) {
        const markdownContent = fs.readFileSync(filePath, 'utf8');
        const htmlContent = marked(markdownContent);

        // Wrap in basic HTML structure
        const fullHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${path.basename(filePath)}</title>
                <link rel="stylesheet" href="/portfolio_website/style.css">
                <style>
                    body { max-width: 900px; margin: 0 auto; padding: 2rem; background: #fff; line-height: 1.6; color: #333; }
                    h1, h2, h3, h4 { text-align: left; margin-top: 2rem; }
                    h1 { border-bottom: 2px solid #eee; padding-bottom: 0.5rem; }
                    pre { background: #f4f4f4; padding: 1rem; border-radius: 5px; overflow-x: auto; border: 1px solid #ddd; }
                    code { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; background: #f0f0f0; padding: 0.2rem 0.4rem; border-radius: 3px; }
                    pre code { background: none; padding: 0; }
                    img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    blockquote { border-left: 5px solid #007bff; margin: 1.5rem 0; padding: 0.5rem 1.5rem; background: #f8f9fa; font-style: italic; }
                    .back-home { margin-bottom: 2rem; display: inline-block; text-decoration: none; color: #007bff; font-weight: bold; padding: 0.5rem 1rem; border: 1px solid #007bff; border-radius: 5px; transition: all 0.3s; }
                    .back-home:hover { background: #007bff; color: white; }
                    .markdown-body { padding: 1rem 0; }
                    ul, ol { margin-bottom: 1rem; }
                    li { margin-bottom: 0.5rem; }
                </style>
            </head>
            <body>
                <a href="/" class="back-home">← Back to Platform Home</a>
                <div class="markdown-body">
                    ${htmlContent}
                </div>
            </body>
            </html>
        `;

        res.send(fullHtml);
    } else {
        res.status(404).send('File not found');
    }
});

// Serve static files from the root directory
app.use(express.static(__dirname));

// Route to serve the main index.html for any request that doesn't match a static file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
