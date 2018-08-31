const youTubeURL = 'https://www.googleapis.com/youtube/v3/search';
const key = '';

function getDataFromApi(searchTerm, callback) {
    const settings = {
      url: youTubeURL,
      data: {
        part: 'snippet',
        key: key,
        q: searchTerm,
        maxResults: 20
      },
      dataType: 'json',
      type: 'GET',
      success: callback
    };
  
    $.ajax(settings);
  }

  function renderResult(item) {
    const snippet = item.snippet;
    console.log(snippet);
    return `
      <div class="box">
        <h3>${snippet.title}</h3>
        <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank"><img src="${snippet.thumbnails.high.url}" alt="${snippet.title}"></a>
      </div>
    `
  }

  function displaySearchData(data) {
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);
  }

  function watchSubmit() {
    $('.js-search-form').submit(e => {
      e.preventDefault();
      const queryTarget = $(e.currentTarget).find('.js-query');
      const query = queryTarget.val();
      // clear out the input
      queryTarget.val('');
      $('h2').html(`Search results for "${query}"`);
      getDataFromApi(query, displaySearchData);
    });
  }
  
  $(watchSubmit);
