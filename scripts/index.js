'use strict';

const API_KEY = 'AIzaSyBVLPcIuJcvy3Z690ya4qpXQo_4Fv_t1GM';

/*
  We want our store to hold a `videos` array of "decorated" objects - i.e. objects that
  have been transformed into just the necessary data to display on our page, compared to the large
  dataset Youtube will deliver to us.  Example object:

  {
    id: '98ds8fbsdy67',
    title: 'Cats dancing the Macarena',
    thumbnail: 'https://img.youtube.com/some/thumbnail.jpg'
  }

*/
const store = {
  videos: []
};

// TASK: Add the Youtube Search API Base URL here: https://www.googleapis.com/youtube/v3/search
// Documentation is here: https://developers.google.com/youtube/v3/docs/search/list#usage
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

// TASK:
// 1. Create a `fetchVideos` function that receives a `searchTerm` and `callback`
// 2. Use `searchTerm` to construct the right query object based on the Youtube API docs
// 3. Make a getJSON call using the query object and sending the provided callback in as the last argument
// TEST IT! Execute this function and console log the results inside the callback.
const fetchVideos = function(searchTerm, callback) {
 $.getJSON(BASE_URL,
    {
      q: searchTerm,
      key: API_KEY,
      part: 'snippet'
    },
    callback
  );
};


// TASK:
// 1. Create a `decorateResponse` function that receives the Youtube API response
// 2. Map through the response object's `items` array
// 3. Return an array of objects, where each object contains the keys `id`, `title`,
// `thumbnail` which each hold the appropriate values from the API item object. You
// WILL have to dig into several nested properties!
// TEST IT! Grab an example API response and send it into the function - make sure
// you get back the object you want.
const decorateResponse = function(response) {
  return response.items.map(function(item) {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url
    };
  });
};




// TASK:
// 1. Create a `generateVideoItemHtml` function that receives the decorated object
// 2. Using the object, return an HTML string containing all the expected data
// TEST IT!
const generateVideoItemHtml = function(video) {
  //console.log(video.id);
  //const htmlItem = `<p>${video.id}</p>`

  //$('.results').html(htmlItem);

  return `<li>${video.title}</li>
  <li>${video.id}<li>
  <img src=${video.thumbnail}><img>`;


};


// TASK:
// 1. Create a `addVideosToStore` function that receives an array of decorated video
// objects and sets the array as the value held in store.videos
// TEST IT!
const addVideosToStore = function(videos) {
  store.videos = videos;
  console.log(store.videos);
};


// TASK:
// 1. Create a `render` function
// 2. Map through `store.videos`, sending each `video` through your `generateVideoItemHtml`
// 3. Add your array of DOM elements to the appropriate DOM element
// TEST IT!
const render = function() {
  console.log(store.videos);
  let videoHtmlArray = store.videos.map(function(video) {
    return generateVideoItemHtml(video);
  });
  console.log(videoHtmlArray);
  const videoHtmlString = videoHtmlArray.join('');
  console.log(videoHtmlString);
  $('.results').html(videoHtmlString);
};


// TASK:
// 1. Create a `handleFormSubmit` function that adds an event listener to the form
// 2. The listener should:
//   a) Prevent default event
//   b) Retrieve the search input from the DOM
//   c) Clear the search input field
//   d) Invoke the `fetchVideos` function, sending in the search value
//   e) Inside the callback, send the API response through the `decorateResponse` function
//   f) Inside the callback, add the decorated response into your store using the `addVideosToStore` function
//   g) Inside the callback, run the `render` function
// TEST IT!
const handleFormSubmit = function() {
  $('form').submit(function(event) {
    event.preventDefault();
    const searchTerm = $(event.currentTarget)
      .parent()
      .find('#search-term')
      .val();
    $(event.currentTarget).parent().find('#search-term').val('');
    fetchVideos(searchTerm, function(response) {
      console.log(response);
      let decoratedResponse = decorateResponse(response);
      console.log(decoratedResponse);
      addVideosToStore(decoratedResponse);
      render();
    });
  });
};

// When DOM is ready:
$(function () {
  handleFormSubmit();
});
