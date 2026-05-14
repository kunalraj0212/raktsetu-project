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
    } catch (_) {
      // Try the next known package layout.
    }
  }

  throw new Error('Unable to locate mermaid/dist/mermaid.min.js. Run: npm install -D puppeteer marked mermaid');
}

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const sourcePath = path.join(projectRoot, 'docs', 'RaktaSetu_EndSem_Report.md');
  const outputPath = path.join(projectRoot, 'docs', 'RaktaSetu_EndSem_Report.pdf');

  const [{ marked }, puppeteerModule] = await Promise.all([
    import('marked'),
    import('puppeteer')
  ]);

  const puppeteer = puppeteerModule.default || puppeteerModule;
  const markdown = await fs.readFile(sourcePath, 'utf8');
  const mermaidBundlePath = await resolveMermaidBundle(projectRoot);
  const mermaidScript = await fs.readFile(mermaidBundlePath, 'utf8');

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

  marked.setOptions({
    renderer,
    gfm: true,
    breaks: false,
    mangle: false,
    headerIds: false
  });

  const reportHtml = marked.parse(markdown);

  const academicCss = `
    @page {
      size: A4;
      margin: 22mm 18mm 24mm 18mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      color: #1f2933;
      background: #ffffff;
      font-family: "Times New Roman", Times, serif;
      font-size: 11.2pt;
      line-height: 1.55;
    }

    main {
      width: 100%;
    }

    h1,
    h2,
    h3 {
      color: #5f0f1a;
      font-family: Georgia, "Times New Roman", serif;
      line-height: 1.2;
      page-break-after: avoid;
    }

    h1 {
      margin: 0 0 18px;
      padding-bottom: 12px;
      border-bottom: 2px solid #5f0f1a;
      font-size: 25pt;
      text-align: center;
      letter-spacing: 0;
    }

    h2 {
      margin: 24px 0 10px;
      padding-bottom: 4px;
      border-bottom: 1px solid #d7b8bd;
      font-size: 16pt;
    }

    h3 {
      margin: 18px 0 8px;
      font-size: 13pt;
    }

    p {
      margin: 0 0 10px;
      text-align: justify;
    }

    table {
      width: 100%;
      margin: 14px 0 18px;
      border-collapse: collapse;
      page-break-inside: avoid;
      font-size: 9.5pt;
    }

    th {
      color: #ffffff;
      background: #5f0f1a;
      font-weight: 700;
    }

    th,
    td {
      border: 1px solid #c9d1d9;
      padding: 7px 8px;
      vertical-align: top;
    }

    tr:nth-child(even) td {
      background: #fbf5f6;
    }

    ul,
    ol {
      margin: 8px 0 14px 20px;
      padding: 0;
    }

    li {
      margin-bottom: 5px;
    }

    code {
      padding: 1px 4px;
      border-radius: 3px;
      color: #5f0f1a;
      background: #f6eef0;
      font-family: "Courier New", Courier, monospace;
      font-size: 9.3pt;
    }

    .code-block {
      margin: 12px 0 16px;
      padding: 12px;
      border: 1px solid #d0d7de;
      border-left: 4px solid #5f0f1a;
      background: #f8fafc;
      white-space: pre-wrap;
      page-break-inside: avoid;
      font-size: 9pt;
    }

    .diagram {
      margin: 18px auto 22px;
      padding: 12px;
      border: 1px solid #d7b8bd;
      background: #fffafa;
      page-break-inside: avoid;
    }

    .mermaid {
      display: flex;
      justify-content: center;
      margin: 0;
      background: transparent;
    }

    .mermaid svg {
      max-width: 100%;
      height: auto;
    }

    strong {
      color: #111827;
    }

    a {
      color: #5f0f1a;
      text-decoration: none;
    }
  `;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>RaktaSetu End-Semester Project Report</title>
  <style>${academicCss}</style>
</head>
<body>
  <main>${reportHtml}</main>
  <script>${mermaidScript}</script>
  <script>
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      themeVariables: {
        primaryColor: '#fff5f5',
        primaryTextColor: '#1f2933',
        primaryBorderColor: '#7f1d1d',
        lineColor: '#7f1d1d',
        secondaryColor: '#f8fafc',
        tertiaryColor: '#ffffff',
        fontFamily: 'Georgia, Times New Roman, serif'
      },
      flowchart: {
        curve: 'basis',
        htmlLabels: true
      }
    });

    window.renderMermaidDiagrams = async function renderMermaidDiagrams() {
      await mermaid.run({ querySelector: '.mermaid' });
    };
  </script>
</body>
</html>`;

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    await window.renderMermaidDiagrams();
  });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    margin: {
      top: '22mm',
      right: '18mm',
      bottom: '24mm',
      left: '18mm'
    },
    headerTemplate: '<div style="width:100%;font-size:8px;color:#6b7280;text-align:center;font-family:Times New Roman,serif;">RaktaSetu End-Semester Project Report</div>',
    footerTemplate: '<div style="width:100%;font-size:8px;color:#6b7280;text-align:center;font-family:Times New Roman,serif;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
  });

  await browser.close();
  console.log(`PDF generated at ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
