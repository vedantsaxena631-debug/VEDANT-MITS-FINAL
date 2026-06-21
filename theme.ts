import fs from 'fs';
import path from 'path';

function walk(dir: string, callback: (fp: string) => void) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      walk(fp, callback);
    } else {
      callback(fp);
    }
  }
}

walk('./src', (fp) => {
  if (fp.endsWith('.tsx') || fp.endsWith('.ts') || fp.endsWith('.css')) {
    let content = fs.readFileSync(fp, 'utf-8');
    // Swap warmer palette for a crisp professional palette
    content = content.replace(/stone/g, 'slate');
    content = content.replace(/amber/g, 'blue');
    content = content.replace(/orange/g, 'indigo');
    content = content.replace(/green/g, 'emerald'); // Emerald looks more professional than standard green
    content = content.replace(/rose/g, 'red'); // standard red
    fs.writeFileSync(fp, content, 'utf-8');
  }
});
