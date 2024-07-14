curl --silent "https://api.github.com/repos/javite-projects/javite/releases/latest" | # Get latest release from GitHub api
  grep '"tag_name":' |                                                           # Get tag line
  sed -E 's/.*"([^"]+)".*/\1/' > latest_version
