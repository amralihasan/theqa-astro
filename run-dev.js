const { spawn } = require('child_process');

console.log('Starting Astro dev server...');

const dev = spawn('npm', ['run', 'dev'], {
  cwd: '/Users/amrmegahed/amr/test/theqa_blog/theqa-blog',
  stdio: 'inherit'
});

dev.on('close', (code) => {
  console.log(`Dev server exited with code ${code}`);
});

dev.on('error', (err) => {
  console.error('Failed to start dev server:', err);
});