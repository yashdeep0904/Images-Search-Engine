// Replace with your actual free Unsplash API Access Key
const UNSPLASH_API_KEY = 'CtaSjw0i9q6fLFMOROUe0imElX18qB9VpxgWFibPPdA'; 

const searchInput = document.getElementById('search-input');
const imageGrid = document.getElementById('image-grid');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const loadMoreBtn = document.getElementById('load-more');
const filterBtns = document.querySelectorAll('.filter-btn');

const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-img');
const modalCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close-btn');
const downloadBtn = document.getElementById('download-btn');

let currentPage = 1;
let currentQuery = '';
let currentDownloadUrl = '';

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Fetch images handling both new searches and pagination
async function fetchImages(query, isNewSearch = true) {
    if (!query.trim()) {
        imageGrid.innerHTML = '';
        loadMoreBtn.classList.add('hidden');
        return;
    }

    if (isNewSearch) {
        currentPage = 1;
        currentQuery = query;
        imageGrid.innerHTML = '';
    }

    loading.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    loadMoreBtn.classList.add('hidden');

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${currentPage}&per_page=12&query=${encodeURIComponent(query)}&client_id=${UNSPLASH_API_KEY}`);
        
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        
        const data = await response.json();
        renderImages(data.results, isNewSearch);
        
        if (data.total_pages > currentPage) {
            loadMoreBtn.classList.remove('hidden');
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        errorMessage.textContent = 'Failed to load images. Please check your API key.';
        errorMessage.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

function renderImages(images, isNewSearch) {
    if (images.length === 0 && isNewSearch) {
        errorMessage.textContent = 'No results found.';
        errorMessage.classList.remove('hidden');
        return;
    }

    images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img.urls.small;
        imgElement.alt = img.alt_description || 'Search result image';
        
        // Pass the required download_location endpoint for API tracking
        imgElement.addEventListener('click', () => {
            openLightbox(img.urls.regular, img.alt_description, img.links.download_location);
        });
        
        imageGrid.appendChild(imgElement);
    });
}

// Satisfies Unsplash API requirements by hitting their tracking endpoint before initiating download
async function triggerDownload() {
    downloadBtn.textContent = "Downloading...";
    downloadBtn.disabled = true;
    
    try {
        const trackResponse = await fetch(`${currentDownloadUrl}&client_id=${UNSPLASH_API_KEY}`);
        const trackData = await trackResponse.json();
        
        // Fetch the blob to force the browser to prompt a file download
        const imageResponse = await fetch(trackData.url);
        const blob = await imageResponse.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `unsplash-image.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Download failed:", error);
        alert("Direct download blocked by browser. Opening in a new tab instead.");
        window.open(currentDownloadUrl, '_blank');
    } finally {
        downloadBtn.textContent = "Download High-Res";
        downloadBtn.disabled = false;
    }
}

function openLightbox(highResUrl, description, downloadUrl) {
    modalImg.src = highResUrl;
    modalCaption.textContent = description || 'Untitled Image';
    currentDownloadUrl = downloadUrl;
    modal.classList.remove('hidden');
}

function closeLightbox() {
    modal.classList.add('hidden');
    modalImg.src = '';
}

// Event Listeners
searchInput.addEventListener('input', debounce((e) => {
    fetchImages(e.target.value, true);
}, 600));

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    fetchImages(currentQuery, false);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        searchInput.value = e.target.textContent;
        fetchImages(e.target.textContent, true);
    });
});

downloadBtn.addEventListener('click', triggerDownload);
closeBtn.addEventListener('click', closeLightbox);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeLightbox();
    }
});