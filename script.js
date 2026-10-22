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
