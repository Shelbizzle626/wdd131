const params = new URLSearchParams(window.location.search);

const product = params.get('product');
const rating = params.get('rating');

if (product) {
    document.querySelector('#product-line').textContent =
        `Product: ${product}`;
}
if (rating) {
    document.querySelector('#rating-line').textContent =
        `Your rating: ${rating} star(s)`;
}

let count = Number(localStorage.getItem('reviewCount')) || 0;
count = count + 1;
localStorage.setItem('reviewCount', count);

document.querySelector('#review-count').textContent = count;

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;
