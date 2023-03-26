'use strict';
import {fetchPixabayImages} from './pixabay-api';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import cardTemplate from '../template/cardTemplate.hbs';

// https://pixabay.com/api/


const formEl = document.querySelector('#search-form');
const inputEl = formEl.querySelector('[name="searchQuery"]');
const submitBtn = formEl.querySelector('button');
let searchData = '';

console.log(submitBtn);
console.dir(inputEl);


formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    console.dir(e);
    console.log(inputEl.value);
    searchData = inputEl.value;
    if (searchData === '') {
        return Notify.info('Cogito ergo sum');

    }

    pixabayApi('water');
}

