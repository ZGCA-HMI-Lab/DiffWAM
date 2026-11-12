const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const copyButton = document.querySelector('#copy-bibtex');
const bibtexCode = document.querySelector('#bibtex-code');

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(bibtexCode.textContent.trim());
    copyButton.textContent = 'Copied';
    window.setTimeout(() => { copyButton.textContent = 'Copy'; }, 1600);
  } catch {
    copyButton.textContent = 'Select text';
  }
});


// All three experiment recordings are embedded directly in the page.
const videos = [...document.querySelectorAll('video')];
const playbackSpeed = 2;
function applySpeed() {
  videos.forEach(video => {
    video.defaultPlaybackRate = playbackSpeed;
    video.playbackRate = playbackSpeed;
  });

}
videos.forEach(video => {
  const status = video.closest('.robot-video-card')?.querySelector('[data-playback-status]');
  const setStatus = text => { if (status) status.textContent = text; };
  video.muted = true;
  video.addEventListener('loadedmetadata', applySpeed);
  video.addEventListener('playing', () => setStatus('Playing · real robot footage'));
  video.addEventListener('pause', () => setStatus('Paused · press play to continue'));
  video.addEventListener('waiting', () => setStatus('Buffering…'));
  video.addEventListener('error', () => setStatus('Unable to load · use Open video'));
  video.addEventListener('ratechange', () => {
    if (video.playbackRate === playbackSpeed) return;
    applySpeed();
  });
  video.play().catch(() => setStatus('Press play to watch'));
});
applySpeed();
