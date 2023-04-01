'use strict';
import fetchPixabayImages from './pixabay-api';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';


// https://pixabay.com/api/


const formEl = document.querySelector('#search-form');
const inputEl = formEl.querySelector('[name="searchQuery"]');
const submitBtn = formEl.querySelector('button');
let searchData = '';
let page = 1;
let currentHits = 0;

console.log(submitBtn);
console.dir(inputEl);


formEl.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();
    console.dir(e);
    console.log(inputEl.value);
    searchData = inputEl.value;
    if (searchData === '') {
        return Notify.info('Треба щось ввести для пошуку');
    }
    const fetchedData = fetchPixabayImages(searchData, page);
    if (fetchedData.totalHits === 0) {
        Notify.info("Sorry, there are no images matching your search query. Please try again.");
    } 
}

