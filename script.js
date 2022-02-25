const root = document.getElementById('root');
const allEpisodes = getAllEpisodes();
const episodesSelectEl = document.getElementById('episodes')
let episodeNumber;
let searchValue = '';
const singleEpisode = getOneEpisode()
const searchInput = document.getElementById('search');
const movieNumberPara = document.getElementById('number-of-display');



loadTheMovies(allEpisodes)

// function load all episodes as individual movie card with title, image, summary and the values of the seclect option
function loadTheMovies(movieList) {
  root.innerHTML = " "
  for (let i=0; i<movieList.length; i++) {
    //card div to contain all the information of a movie
    const card = document.createElement('div');
    card.classList.add('card');
    
    // movie title 
    const title = document.createElement('h3');
    const seasonNumber = movieList[i].season;
    episodeNumber = movieList[i].number
    
    if (episodeNumber < Number(10)) {
      episodeNumber = '0' + movieList[i].number
    } else {
      episodeNumber = movieList[i].number;
    }
    

    title.innerText = `${movieList[i].name} - S0${seasonNumber}E${episodeNumber}`
    title.classList.add('title')

    //image
    const image = document.createElement('img');
    image.src = `${movieList[i].image['medium']}`
    
    
    //summary of each movie
    const summary = document.createElement('p');
    summary.innerText = `${(movieList[i].summary).replace('<p>', '').replace('</p>', '')}`
    summary.classList.add('summary')
    
    // add the title, image and summary to each card div
    card.appendChild(title);
    card.appendChild(image)
    card.appendChild(summary);


    const option = document.createElement('option');
    option.value = title.innerText;
    option.innerText = title.innerText;
    episodesSelectEl.appendChild(option);

    movieNumberPara.innerText = `${movieList.length}/${allEpisodes.length}`
      
    
    //add individual card to the main root element
    root.appendChild(card);
  }  
}


  
// apply this function to search on keyup event below
function filterMovieCardOnSearch(str) {
  
  return  allEpisodes.filter(episode => {
    return episode = (episode['name'].toLowerCase()).includes(str.toLowerCase()) || (episode['summary'].toLocaleLowerCase()).includes(str.toLowerCase())
  })
  
}


//key event for the searchbox
searchInput.addEventListener('keyup', () => {
  searchValue = searchInput.value;
  let filteredMovies = filterMovieCardOnSearch(searchValue);
  console.log(filteredMovies)
  loadTheMovies(filteredMovies)
  
});

function filterMovieCardOnSelect(str) {
  
  return  allEpisodes.filter(episode => {
    let seasonNumber = episode.season;
    let episodeNumber = episode.number
    
    if (episodeNumber < Number(10)) {
      episodeNumber = '0' + episode.number
    } else {
      episodeNumber = episode.number;
    }
    

    let searchStr = ` - S0${seasonNumber}E${episodeNumber}`;
    str = str.replace(searchStr, '');
    console.log(str.length)
    episode['name'].length
    return (episode['name']).includes(str)
  })
  
}



episodesSelectEl.addEventListener('change', (e) => {
  
  searchValue = e.target.value;
  let filteredMoviesOnSelect = filterMovieCardOnSelect(searchValue)
  
  loadTheMovies(filteredMoviesOnSelect)
})

  





  








