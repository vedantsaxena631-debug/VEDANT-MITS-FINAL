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
    
    // Change radii to be sharper (more professional)
    content = content.replace(/rounded-3xl/g, 'rounded-lg');
    content = content.replace(/rounded-2xl/g, 'rounded-md');
    // content = content.replace(/rounded-xl/g, 'rounded-md');
    
    // Clean up pastel backgrounds to sharp grays or white to be more formal
    content = content.replace(/bg-blue-50/g, 'bg-slate-50 border-l-2 border-l-blue-500');
    content = content.replace(/bg-red-50/g, 'bg-slate-50 border-l-2 border-l-red-500');
    content = content.replace(/bg-emerald-50/g, 'bg-slate-50 border-l-2 border-l-emerald-500');
    content = content.replace(/bg-indigo-50/g, 'bg-slate-50 border-l-2 border-l-indigo-500');
    
    content = content.replace(/border-blue-200/g, 'border-slate-200');
    content = content.replace(/border-red-200/g, 'border-slate-200');
    content = content.replace(/border-emerald-200/g, 'border-slate-200');
    content = content.replace(/border-indigo-200/g, 'border-slate-200');
    
    // Replace font-display to font-sans to maintain clean, technical look
    content = content.replace(/font-display/g, 'font-sans font-semibold tracking-tight');
    
    fs.writeFileSync(fp, content, 'utf-8');
  }
});
