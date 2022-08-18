const axios = require('axios').default;
var tmdbImgPath = 'https://image.tmdb.org/t/p/w500';

function getContentData(type, id) {
    var apiUrl = 'https://api.themoviedb.org/3/' + type + '/' + id + '?api_key=' + process.env.TMDB_KEY + '&language=en-US';
    console.log(apiUrl);
    return axios(apiUrl);
}

function getPopularContent(type) {
    var apiUrl = 'https://api.themoviedb.org/3/' + type + '/popular?api_key=' + process.env.TMDB_KEY + '&language=en-US';
    return axios(apiUrl);
}

function getTopRatedContent(type) {
    var apiUrl = 'https://api.themoviedb.org/3/' + type + '/top_rated?api_key=' + process.env.TMDB_KEY + '&language=en-US';
    return axios(apiUrl);
}

function createContentObj(data, type) {
    let contentObj = {
        id: ((data.id) ? data.id : null),
        type: ((data.title) ? 'movie' : 'tv'),
        title: ((data.title) ? data.title : data.name),
        release: ((data.release_date) ? data.release_date : data.first_air_date),
        popularity: ((data.vote_average) ? data.vote_average : 0),
        overview: ((data.overview) ? data.overview : 'There is no description for this title.'),
        poster: ((data.poster_path) ? (tmdbImgPath + data.poster_path) : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'),
        backdrop: ((data.backdrop_path) ? tmdbImgPath + data.backdrop_path : '')
    }
    if (contentObj.release) {
        let dateString = contentObj.release.split('-');
        contentObj.release = dateString[1] + '/' + dateString[2] + '/' + dateString[0];
    } else {
        contentObj.release = '00/00/0000';
    }
    if (data.genres) {
        let genres = [];
        data.genres.forEach(function (genre) {
            genres.push(genre.name);
        });
        contentObj.genres = genres;
    } else {
        data.genres = ['None'];
    }
    return contentObj;
}

//Search function
function searchContent(query, type) {
    var apiUrl = 'https://api.themoviedb.org/3/search/' + type + '?api_key=' + process.env.TMDB_KEY + '&query=' + query;
    return axios(apiUrl)
}

module.exports = { getContentData, getPopularContent, getTopRatedContent, createContentObj, searchContent };