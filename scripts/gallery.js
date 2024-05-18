document.addEventListener('DOMContentLoaded', function() {
  fetch('https://apa-technology-division.github.io/assets/webinar_gallery.csv')
    .then(response => response.text())
    .then(text => {
      // Parse the CSV text
      const rows = text.split('\n').map(row => row.split(','));

      // Shuffle rows and select first 16
      const shuffledRows = rows.sort(() => 0.5 - Math.random()).slice(0, 16);
      
      const galleryElement = document.getElementById('gallery');

      shuffledRows.forEach(columns => {
        const hoverText = columns[0];
        const imageUrl = columns[1];

        // Create card element
        const card = document.createElement('div');
        card.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';

        // Card HTML structure
        card.innerHTML = `
          <div class="card">
          <img src="https://apa-technology-division.github.io${imageUrl}" class="card-img-top thumbnail" alt="Image" style="object-fit: cover; aspect-ratio: 1 / 1;">
            <div class="card-img-overlay">
              <p class="card-text">${hoverText}</p>
            </div>
          </div>
        `;

        // Append the card to the gallery
        galleryElement.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error reading local CSV file: ', error);
    });
});
