'use strict';
import axios from 'axios';

export default async function fetchPixabayImages(searchData, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const PIXABEY_KEY = '10379430-832318120c737863729cf9e40';
  const filter = `?key=${PIXABEY_KEY}&q=${searchData}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  return await axios
    .get(`${BASE_URL}${filter}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error.toJSON());
    });
  
}
