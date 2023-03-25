'use strict';
import axios from 'axios';
import { Notify } from 'notiflix';
const axios = require('axios').default;

// https://pixabay.com/api/
const PIXABEY_KEY = '12TS2iUidJjx1jUh8gUjyyFFFDbbuZ8MTr';

const formEl = document.querySelector('#search-form');
const inputEl = formEl.querySelector('[name="searchQuery"]');
const submitBtn = formEl.querySelector('button');
const searchData = '';

console.log(submitBtn);
console.dir(formEl);
axios.get(`https://pixabay.com/api/?${PIXABEY_KEY}?q=${searchData}`).then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
})

submitBtn.addEventListener('submit', onSubmit);

function onSubmit(e) {
    searchData = inputEl.value;
    if (!searchData) {
        return Notify.info('Cogito ergo sum');

    }
}