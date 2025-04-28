window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.trending-images');
  const userArtworks = JSON.parse(localStorage.getItem('userArtworks') || '[]');

  const selectedImage = document.getElementById('selectedImage');
  const modal = document.getElementById('commentModal');
  const closeModal = document.getElementById('closeModal');
  const commentsList = document.getElementById('commentsList');
  const submitButton = document.getElementById('submitComment');
  const textarea = document.getElementById('commentInput');
  const deleteButton = document.getElementById('deleteImage');
  const newImage = document.createElement('img');

  const imageComments = new Map();
  let currentImageSrc = ''; 

  let isUserArtwork = false; 

  userArtworks.forEach((art, index) => {
    const img = document.createElement('img');
    img.src = art.imageSrc;
    img.alt = art.title || 'User artwork';
    img.className = 'imgCustom' + index;
    img.dataset.userUploaded = "true";
    container.appendChild(img);

    img.addEventListener('click', () => {
      selectedImage.src = img.src;
      currentImageSrc = img.src;
      isUserArtwork = true;
      modal.style.display = 'flex';
      deleteButton.style.display = 'block';
      textarea.value = '';
      loadComments(img.src);
    });
  });

  const existingImages = document.querySelectorAll('.trending-images img:not([data-user-uploaded])');

  existingImages.forEach(img => {
    img.addEventListener('click', () => {
      selectedImage.src = img.src;
      currentImageSrc = img.src;
      isUserArtwork = false;
      modal.style.display = 'flex';
      deleteButton.style.display = 'none';
      textarea.value = '';
      loadComments(img.src);
      const fileName = img.src.split('/').pop(); 
const details = imageDetails.get(fileName);

if (details) {
  document.getElementById('artworkTitle').textContent = details.title;
  document.getElementById('artworkInfo').textContent = details.info;
} else {
  document.getElementById('artworkTitle').textContent = 'Titlu';
  document.getElementById('artworkInfo').textContent = 'Informație despre lucrare...';
}
    });
  });

  function loadComments(imageSrc) {
    commentsList.innerHTML = '';
    const comments = imageComments.get(imageSrc) || [];
    comments.forEach(comment => {
      const p = document.createElement('p');
      p.textContent = comment;
      commentsList.appendChild(p);
    });
  }

  submitButton.addEventListener('click', () => {
    const comment = textarea.value.trim();
    if (comment === '') {
      alert('Comentariul nu poate fi gol.');
    } else {
      const imgSrc = selectedImage.src;
      if (!imageComments.has(imgSrc)) {
        imageComments.set(imgSrc, []);
      }
      imageComments.get(imgSrc).push(comment);
      textarea.value = '';
      loadComments(imgSrc);
    }
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  deleteButton.addEventListener('click', () => {
    if (!currentImageSrc || !isUserArtwork) return;

    if (confirm('Ești sigur că vrei să ștergi această lucrare?')) {
      let artworks = JSON.parse(localStorage.getItem('userArtworks') || '[]');
      artworks = artworks.filter(art => art.imageSrc !== currentImageSrc);
      localStorage.setItem('userArtworks', JSON.stringify(artworks));
      modal.style.display = 'none';
      window.location.reload();
    }
  });

  const navToggle = document.querySelector('.nav-toggle');
  navToggle.onclick = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('open');
  };
});


submitUpload.onclick = () => {
  const title = document.getElementById('artTitle').value;
  const fileInput = document.getElementById('artImage');
  const description = document.getElementById('artDescription').value;

  if (!title || !fileInput.files[0]) {
    alert('Completează toate câmpurile și selectează o imagine.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const artwork = {
      title: title,
      description: description,
      imageSrc: e.target.result
    };

    const savedArtworks = JSON.parse(localStorage.getItem('userArtworks') || '[]');
    savedArtworks.push(artwork);
    localStorage.setItem('userArtworks', JSON.stringify(savedArtworks));

    uploadModal.style.display = 'none';
    alert('Lucrarea ta a fost publicată! Verifică în pagina "Latest".');

    // --- Dacă vrei să o adaugi direct și în pagină imediat:
    const newArt = document.createElement('div');
    newArt.classList.add('artwork');

    const img = document.createElement('img');
    img.src = e.target.result;
    img.classList.add('img21'); // --- AICI adaugi clasa img21 pentru stil

    const titleEl = document.createElement('h4');
    titleEl.textContent = title;

    const descEl = document.createElement('p');
    descEl.textContent = description;

    newArt.appendChild(img);
    newArt.appendChild(titleEl);
    newArt.appendChild(descEl);

    document.getElementById('latestContainer')?.appendChild(newArt); 
    // asigură-te că există un container cu id="latestContainer" pe latest.html
  };
  reader.readAsDataURL(fileInput.files[0]);
};
