;(async () => {
  const fs = await import ('node:fs')
  const { glob } = await import ('glob')

  const VERSION_FILE = 'latest_version'
  const regexPatterns = [
    /implementation\s+'com\.javite:javite-[\w-]+:([^']+)'/g, // Groovy
    /implementation\("com\.javite:javite-[\w-]+:([^"]+)"\)/g, // Kotlin DSL
    /<dependency>\s*<groupId>com\.javite<\/groupId>\s*<artifactId>javite-[\w-]+<\/artifactId>\s*<version>([^<]+)<\/version>/g, // Maven XML
  ]

  try {
    const rawVersion = (fs.readFileSync(VERSION_FILE, 'utf8')).trim();
    const version = rawVersion.startsWith('v') ? rawVersion.slice(1) : rawVersion;

    const markdowns = await glob('**/*.md', { ignore: ['node_modules/**'] })
    const modifiedFiles = []

    for (const markdown of markdowns) {
      let content = fs.readFileSync(markdown, 'utf8');
      const shouldReplace = regexPatterns.some((pattern) => pattern.test(content))

      if (!shouldReplace) {
        continue
      }

      for (const pattern of regexPatterns) {
        content = content.replace(pattern, (_, group) => {
          return _.replace(group, version);
        });
      }

      fs.writeFileSync(markdown, content, 'utf8');
      modifiedFiles.push(markdown)
    }

    console.log(`Updated versions to ${version} in all markdown files.`);
    console.log(`Modified files: ${modifiedFiles.join(', ')}`)
  } catch (error) {
    console.error('Error updating versions:', error);
  }
})()