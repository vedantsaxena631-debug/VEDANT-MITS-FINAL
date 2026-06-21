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
    
    content = content.replace(/5000/g, '500');
    content = content.replace(/border-l-2 border-l-red-500/g, 'border-l-red-500');
    content = content.replace(/border-l-red-500/g, 'bg-red-500'); // the dot should be a solid color, not a border
    
    // In getEventDot we want a solid background
    // Original was `bg-red-500`. 
    // Wait, my replacement for `bg-red-50` messed up `bg-red-500` because it just matched `bg-red-50`.
    // Let's fix that!
    
    fs.writeFileSync(fp, content, 'utf-8');
  }
});
