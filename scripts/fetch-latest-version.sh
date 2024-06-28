curl --silent "https://api.github.com/repos/benny123tw/javite/releases/latest" | # Get latest release from GitHub api
  grep '"tag_name":' |                                                           # Get tag line
  sed -E 's/.*"([^"]+)".*/\1/' > latest_version
