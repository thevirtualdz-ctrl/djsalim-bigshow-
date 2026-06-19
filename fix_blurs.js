const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walkDir(srcDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Remplacer blur-[120px] etc par hidden md:block blur-[120px] s'il ne contient pas déjà hidden
    // On cible les div décoratives qui ont absolute, bg-, blur-
    content = content.replace(/className="(absolute[^"]+blur-\[\d+px\][^"]*)"/g, (match, p1) => {
        if (!p1.includes('hidden')) {
            return `className="hidden md:block ${p1}"`;
        }
        return match;
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

console.log("Done updating heavy blur elements.");
