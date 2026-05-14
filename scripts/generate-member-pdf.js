#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const inputArg = process.argv[2] || 'docs/Kunal_Raj_EndSem_Report.md';
  const outputArg = process.argv[3] || inputArg.replace(/\.md$/i, '.pdf');

  const inputPath = path.resolve(projectRoot, inputArg);
  const outputPath = path.resolve(projectRoot, outputArg);

  const [{ marked }, puppeteerModule] = await Promise.all([
    import('marked'),
    import('puppeteer')
  ]);

  const puppeteer = puppeteerModule.default || puppeteerModule;
  const markdown = await fs.readFile(inputPath, 'utf8');

  const renderer = new marked.Renderer();
  renderer.code = function codeRenderer(code, infostring) {
    const text = typeof code === 'object' && code !== null ? code.text : code;
    const lang = typeof code === 'object' && code !== null ? code.lang : infostring;
    const normalizedLang = String(lang || '').trim().split(/\s+/)[0].toLowerCase();

    if (normalizedLang === 'mermaid') {
      return `<figure class="diagram"><pre class="mermaid">${escapeHtml(text)}</pre></figure>`;
    }

    return `<pre class="code-block"><code>${escapeHtml(text)}</code></pre>`;
  };

  marked.setOptions({
    renderer,
    gfm: true,
    breaks: false
  });

  let mermaidScript = '';
  try {
    const mermaidPath = require.resolve('mermaid/dist/mermaid.min.js', {
      paths: [projectRoot]
    });
    mermaidScript = await fs.readFile(mermaidPath, 'utf8');
  } catch (_) {
    mermaidScript = '';
  }

  const reportHtml = marked.parse(markdown);
  const css = `
    @page {
      size: A4;
      margin: 20mm 18mm 22mm 18mm;
    }

    body {
      margin: 0;
      color: #1f2933;
      background: #ffffff;
      font-family: "Times New Roman", Times, serif;
      font-size: 11.2pt;
      line-height: 1.55;
    }

    h1,
    h2,
    h3 {
      color: #6f1020;
      font-family: Georgia, "Times New Roman", serif;
      page-break-after: avoid;
      letter-spacing: 0;
    }

    h1 {
      margin: 0 0 16px;
      padding-bottom: 10px;
      border-bottom: 2px solid #6f1020;
      font-size: 24pt;
      text-align: center;
    }

    h2 {
      margin: 22px 0 9px;
      padding-bottom: 4px;
      border-bottom: 1px solid #dfb6bd;
      font-size: 15.5pt;
    }

    h3 {
      margin: 16px 0 8px;
      font-size: 12.8pt;
    }

    p {
      margin: 0 0 10px;
      text-align: justify;
    }

    table {
      width: 100%;
      margin: 12px 0 16px;
      border-collapse: collapse;
      page-break-inside: avoid;
      font-size: 9.6pt;
    }

    th,
    td {
      border: 1px solid #c9d1d9;
      padding: 7px 8px;
      vertical-align: top;
    }

    th {
      color: #ffffff;
      background: #6f1020;
      font-weight: 700;
    }

    tr:nth-child(even) td {
      background: #fff6f7;
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
      color: #6f1020;
      background: #f7eef0;
      font-family: "Courier New", Courier, monospace;
      font-size: 9.2pt;
    }

    .code-block {
      margin: 12px 0 16px;
      padding: 12px;
      border: 1px solid #d0d7de;
      border-left: 4px solid #6f1020;
      background: #f8fafc;
      white-space: pre-wrap;
      page-break-inside: avoid;
      font-size: 9pt;
    }

    .diagram {
      margin: 16px auto 20px;
      padding: 10px;
      border: 1px solid #dfb6bd;
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
  `;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Individual End-Semester Report</title>
  <style>${css}</style>
</head>
<body>
  <main>${reportHtml}</main>
  ${mermaidScript ? `<script>${mermaidScript}</script>
  <script>
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      themeVariables: {
        primaryColor: '#fff6f7',
        primaryTextColor: '#1f2933',
        primaryBorderColor: '#6f1020',
        lineColor: '#6f1020',
        secondaryColor: '#f8fafc',
        tertiaryColor: '#ffffff',
        fontFamily: 'Georgia, Times New Roman, serif'
      }
    });
    window.renderMermaidDiagrams = async () => mermaid.run({ querySelector: '.mermaid' });
  </script>` : ''}
</body>
</html>`;

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  if (mermaidScript) {
    await page.evaluate(async () => {
      await window.renderMermaidDiagrams();
    });
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    margin: {
      top: '20mm',
      right: '18mm',
      bottom: '22mm',
      left: '18mm'
    },
    headerTemplate: '<div style="width:100%;font-size:8px;color:#6b7280;text-align:center;font-family:Times New Roman,serif;">RaktaSetu Individual End-Semester Report</div>',
    footerTemplate: '<div style="width:100%;font-size:8px;color:#6b7280;text-align:center;font-family:Times New Roman,serif;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
  });

  await browser.close();
  console.log(`PDF generated at ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
