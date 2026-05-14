#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const { createRequire } = require('module');

const requireFromRoot = createRequire(path.join(__dirname, '..', 'package.json'));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function resolveMermaidBundle(projectRoot) {
  const candidatePaths = [];
  try {
    candidatePaths.push(requireFromRoot.resolve('mermaid/dist/mermaid.min.js'));
  } catch (_) {
    candidatePaths.push(path.join(projectRoot, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js'));
  }
  for (const candidate of candidatePaths) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch (_) {}
  }
  throw new Error('Unable to locate mermaid/dist/mermaid.min.js.');
}

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const docsDir = path.join(projectRoot, 'docs', 'viva_reports');
  const files = await fs.readdir(docsDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  const [{ marked }, puppeteerModule] = await Promise.all([
    import('marked'),
    import('puppeteer')
  ]);

  const puppeteer = puppeteerModule.default || puppeteerModule;
  const mermaidBundlePath = await resolveMermaidBundle(projectRoot);
  const mermaidScript = await fs.readFile(mermaidBundlePath, 'utf8');

  const browser = await puppeteer.launch({ headless: 'new' });

  for (const file of mdFiles) {
    console.log(`Processing ${file}...`);
    const sourcePath = path.join(docsDir, file);
    const outputPath = path.join(docsDir, file.replace('.md', '.pdf'));
    const markdown = await fs.readFile(sourcePath, 'utf8');

    const renderer = new marked.Renderer();
    renderer.code = function codeRenderer(code, infostring) {
      const text = typeof code === 'object' && code !== null ? code.text : code;
      const lang = typeof code === 'object' && code !== null ? code.lang : infostring;
      const normalizedLang = String(lang || '').trim().split(/\s+/)[0].toLowerCase();
      if (normalizedLang === 'mermaid') {
        return `<figure class="diagram"><pre class="mermaid">${escapeHtml(text)}</pre></figure>`;
      }
      return `<pre class="code-block"><code class="language-${escapeHtml(normalizedLang)}">${escapeHtml(text)}</code></pre>`;
    };

    marked.setOptions({ renderer, gfm: true, breaks: false, mangle: false, headerIds: false });
    const reportHtml = marked.parse(markdown);

    const academicCss = `
      @page { size: A4; margin: 22mm 18mm 24mm 18mm; }
      body { font-family: "Times New Roman", Times, serif; font-size: 11pt; line-height: 1.5; color: #1a1a1a; }
      h1, h2, h3 { color: #8B0000; font-family: Georgia, serif; }
      h1 { text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 10px; margin-bottom: 30px; }
      h2 { border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 25px; }
      table { width: 100%; border-collapse: collapse; margin: 20px 0; }
      th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
      th { background-color: #f8f8f8; color: #8B0000; }
      .code-block { background: #f4f4f4; padding: 10px; border-left: 5px solid #8B0000; overflow-x: auto; font-family: monospace; }
      blockquote { border-left: 5px solid #8B0000; padding-left: 15px; font-style: italic; color: #555; }
    `;

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>${academicCss}</style>
</head>
<body>
  <main>${reportHtml}</main>
  <script>${mermaidScript}</script>
  <script>
    mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
    window.renderMermaidDiagrams = async function() { await mermaid.run({ querySelector: '.mermaid' }); };
  </script>
</body>
</html>`;

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.evaluate(async () => { await window.renderMermaidDiagrams(); });
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '22mm', right: '18mm', bottom: '24mm', left: '18mm' }
    });
    await page.close();
    console.log(`Saved: ${path.basename(outputPath)}`);
  }

  await browser.close();
  console.log('All reports exported to PDF successfully!');
}

main().catch(console.error);
