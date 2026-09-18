// Tiny markdown -> HTML for the game description field.
// Handles #, ##, ###, - lists, **bold**, *italic*, `code`.
export function renderMarkdown(md = '') {
  const inline = (s) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')

  let html = ''
  let inList = false
  const closeList = () => {
    if (inList) {
      html += '</ul>'
      inList = false
    }
  }

  for (const rawLine of md.split('\n')) {
    const line = rawLine.trim()
    if (!line) {
      closeList()
      continue
    }
    if (line.startsWith('### ')) {
      closeList()
      html += `<h3>${inline(line.slice(4))}</h3>`
    } else if (line.startsWith('## ')) {
      closeList()
      html += `<h2>${inline(line.slice(3))}</h2>`
    } else if (line.startsWith('# ')) {
      closeList()
      html += `<h2>${inline(line.slice(2))}</h2>`
    } else if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul>'
        inList = true
      }
      html += `<li>${inline(line.slice(2))}</li>`
    } else {
      closeList()
      html += `<p>${inline(line)}</p>`
    }
  }
  closeList()
  return html
}
