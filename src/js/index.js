'use strict';
import fetchPixabayImages from './pixabay-api';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const inputEl = formEl.querySelector('[name="searchQuery"]');
const galleryEl = document.querySelector('.gallery');
const endCollectionText = document.querySelector('.end-collection-text');
const scrollToTopBtn = document.querySelector('.scroll-to-top');

let searchData = '';
let page = 1;
let currentHits = 0;

let throttle = require('lodash.throttle');

let lightbox = new SimpleLightbox('.image-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

async function onSubmit(e) {
  e.preventDefault();
  console.dir(e);
  console.log(inputEl.value);
  searchData = inputEl.value;

  if (searchData === '') {
    return Notify.info('Please provide a word or phrase to search');
  }

  const fetchedData = await fetchPixabayImages(searchData, page);
  currentHits = fetchedData.hits.length;

  try {
    if (fetchedData.totalHits > 0) {
      Notify.success(`Hooray! We found ${fetchedData.totalHits} images.`);
      galleryEl.innerHTML = '';
      imageCardMarkup(fetchedData.hits);
      lightbox.refresh();
      endCollectionText.classList.add('is-hidden');
    }

    if (fetchedData.totalHits === 0) {
      galleryEl.innerHTML = '';
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      endCollectionText.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

function imageCardMarkup(fetchedArray) {
  const markup = fetchedArray
    .map(
      item =>
        `<div class='image-card'>
    <div class='image-wrapper'><a href='${item.largeImageURL}'>
      <img src='${item.webformatURL}' alt='${item.tags}' loading='lazy' />
    </a></div>
    <div class='info'>
      <p class='image-info'>
        <b>Likes</b>
        ${item.likes}
      </p>
      <p class='image-info'>
        <b>Views</b>
        ${item.views}
      </p>
      <p class='image-info'>
        <b>Comments</b>
        ${item.comments}
      </p>
      <p class='image-info'>
        <b>Downloads</b>
        ${item.downloads}
      </p>
    </div>
  </div>`
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

async function loadMoreImg(e) {
  page += 1;
  const fetchedData = await fetchPixabayImages(searchData, page);
  await imageCardMarkup(fetchedData.hits);
  lightbox.refresh();
  currentHits += fetchedData.hits.length;
  Notify.info('40 more images loaded');

  if (currentHits === fetchedData.totalHits) {
    Notify.info('There is no more images to load');
    endCollectionText.classList.remove('is-hidden');
  }
}

// Нескінченний скрол
function infiniteScroll() {
  scrollToTopFunction();

  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    loadMoreImg();
  }

  //   Прокручування сторінки

  //   const { height: cardHeight } = document
  //     .querySelector('.gallery')
  //     .firstElementChild.getBoundingClientRect();

  //   window.scrollBy({
  //     top: cardHeight * 2,
  //     behavior: 'smooth',
  //   });
}

function scrollToTopFunction() {
  if (
    document.body.scrollTop > 550 ||
    document.documentElement.scrollTop > 550
  ) {
    scrollToTopBtn.style.display = 'flex';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
}

window.addEventListener('scroll', throttle(infiniteScroll, 500));
formEl.addEventListener('submit', onSubmit);