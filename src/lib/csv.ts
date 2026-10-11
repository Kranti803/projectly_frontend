export type CsvCell = string | number

function escapeCell(cell: CsvCell) {
  let text = String(cell)

  // Spreadsheets run text that starts with = + - @ as a formula. Task titles are user input,
  // so a leading quote makes them plain text. Numbers are left alone (negatives stay valid).
  if (typeof cell === "string" && /^[=+\-@]/.test(text)) text = `'${text}`

  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv(rows: CsvCell[][]) {
  return rows.map((row) => row.map(escapeCell).join(",")).join("\n")
}

// Self-contained on purpose. If your utils/download-file.ts already does this, use it instead.
export function downloadCsv(filename: string, csv: string) {
  // The BOM makes Excel read the file as UTF-8.
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}