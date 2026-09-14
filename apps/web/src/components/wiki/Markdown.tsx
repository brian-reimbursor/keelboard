function render(md: string) {
  const escaped = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const withCode = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
  const lines = withCode.split('\n');
  const html: string[] = [];
  let inTable = false;
  for (const line of lines) {
    if (line.startsWith('|') && line.endsWith('|')) {
      if (line.includes('---')) continue;
      if (!inTable) {
        html.push('<table>');
        inTable = true;
      }
      const cells = line
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());
      const tag = html.at(-1) === '<table>' ? 'th' : 'td';
      html.push('<tr>' + cells.map((c) => `<${tag}>${c}</${tag}>`).join('') + '</tr>');
      continue;
    }
    if (inTable) {
      html.push('</table>');
      inTable = false;
    }
    if (line.startsWith('# ')) html.push(`<h1>${line.slice(2)}</h1>`);
    else if (line.startsWith('## ')) html.push(`<h2>${line.slice(3)}</h2>`);
    else if (line.startsWith('- ')) html.push(`<li>${line.slice(2)}</li>`);
    else if (/^\d+\. /.test(line)) html.push(`<li>${line.replace(/^\d+\. /, '')}</li>`);
    else if (line.trim() === '') html.push('<p></p>');
    else html.push(`<p>${line}</p>`);
  }
  if (inTable) html.push('</table>');
  return html.join('\n');
}

export function Markdown({ body }: { body: string }) {
  return <div className="md" dangerouslySetInnerHTML={{ __html: render(body) }} />;
}
