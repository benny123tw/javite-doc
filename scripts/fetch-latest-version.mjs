;(async () => {
  const fs = await import('node:fs')
  const regex = /"tag_name":"(v.+?)"/
  const response = await fetch('https://api.github.com/repos/javite-projects/javite/releases/latest')
  const text = await response.text()
  const version = regex.exec(text)?.[1]

  fs.writeFileSync('latest_version', version)
})()
