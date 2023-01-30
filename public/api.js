// Get the media files from the API and render them in the HTML
fetch("/")
  .then((res) => res.text())
  .then((html) => {
    document.innerHTML = html;
  });
