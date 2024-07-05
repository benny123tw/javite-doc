import colors from "picocolors";
import fs from "fs";

const colorUrl = (url) =>
  colors.cyan(url.replace(/:(\d+)\//, (_, port) => `:${colors.bold(port)}/`))

const ansi = `
  ${colors.green(`${colors.bold('VITE')} v5.1.2`)}  ${colors.dim("ready in")} ${colors.reset(colors.bold("95"))} ms

  ${colors.green('➜')}  ${colors.bold('Local')}:   ${colorUrl('http://localhost:5137/')}
  ${colors.dim(colors.green('➜'))}${colors.dim('  press ')}${colors.bold('h + enter')}${colors.dim(' to show help')}

  ${colors.red('JAVA')}  ${colors.dim('plugin')} ${colors.reset(colors.bold('v0.0.1'))}
`;

console.log(ansi);
fs.writeFileSync('snippets/init.ansi', ansi)
