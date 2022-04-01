const root = document.getElementById('root');
// const allEpisodesHeader = document.querySelector('#all-episodes-header');
const allShowsHeader = document.querySelector('#header');
const searchEl = document.getElementById('search') 
const selectShowsEl = document.getElementById('shows') 
let displayNumberEl = document.getElementById('displayNumber')
 



fetchAndRenderAllShows();




async function fetchAndRenderAllShows() {
    const response = await fetch('https://api.tvmaze.com/shows');
    const responseData = await response.json();
    
    const allShows = responseData;
    // allShows[0] = 'All'
    displayNumberEl.textContent = `The total number of display: ${allShows.length}`
    renderAllShows(allShows);
    showEpisodesOfSelectedShow(allShows);
    

}

async function fetchAndRenderAllEpisodesByShowID(id) {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
  const theShowEpisodes = await response.json();
  displayNumberEl.textContent = `The total number of display: ${theShowEpisodes.length}`
  renderAllEpisodesFromAShow(theShowEpisodes)
}

function renderAllEpisodesFromAShow(data) {
  root.innerHTML = ""
  const episodeEl = document.createElement('div')
  const backBtn = document.createElement('button');
  backBtn.innerText = "Go Back"
  episodeEl.appendChild(backBtn);

  backBtn.addEventListener('click', () => {
    episodeEl.classList.add('hide');
    fetchAndRenderAllShows()
  })

    //select option and searchBar in the episodes div
          const header = document.createElement('div');
          header.classList.add('header');
          const selectShowOption = document.createElement('select');
          selectShowOption.name = 'shows';
          selectShowOption.id = 'selectShows';

          header.appendChild(selectShowOption);
          episodeEl.appendChild(header);


      for (let i=0; i<data.length; i++) {
              const showEl = document.querySelector('#shows');
              
              //card div to contain all the information of a movie
              const card = document.createElement('div');
              card.classList.add('card');
              
              // movie title 
              const title = document.createElement('h3');
              const seasonNumber = data[i].season;
              episodeNumber = data[i].number
              
              if (episodeNumber < Number(10)) {
                episodeNumber = '0' + data[i].number
              } else {
                episodeNumber = data[i].number;
              }
              

              title.innerText = `${data[i].name} - SE${seasonNumber}E${episodeNumber}`
              title.classList.add('title')

              //image
              const image = document.createElement('img');
              image.src = `${data[i].image.medium}`
              
              
              //summary of each movie
              const summary = document.createElement('p');
              summary.innerText = `${(data[i].summary).replaceAll('<p>', '').replaceAll('</p>', '')}`
              summary.classList.add('summary')

            
    

              
              
              // add the title, image and summary to each card div
              card.appendChild(title);
              card.appendChild(image)
              card.appendChild(summary);

              episodeEl.appendChild(card);
              // episodeEl.appendChild(header)
              root.appendChild(episodeEl);

             

      }
    
    
}

function renderAllShows(shows) {
  const showEl = document.createElement('div')
  
  for (let i=0; i<shows.length; i++) {
      totalDisplay = shows.length;
      const showCard = document.createElement('div');
      showCard.classList.add('show-card')

      const showName = document.createElement('h1');
      showName.innerText = shows[i].name;
      
      let show_id = shows[i].id
      
      showName.addEventListener('click', () => {
        console.log(show_id)
        fetchAndRenderAllEpisodesByShowID(show_id)
      })
      
      const showImage = document.createElement('img');
      showImage.src = shows[i].image['medium']

      const showDetail = document.createElement('p');
      showDetail.innerText = shows[i].summary.replace('<p><b>', " ").replace('</b>', " ").replace('</p>', '');

      const miniDetailsEl = document.createElement('div');
      const genreEl = document.createElement('h6');
      let genreNames = '';
      shows[i].genres.forEach(genre => genreNames += genre + ' |')
      genreEl.innerText = `Genres: ${genreNames}`;
      const statusEl = document.createElement('h6');
      statusEl.innerText = `Status ${shows[i].status}`;

      const ratingEl = document.createElement('h6');
      ratingEl.innerText = `Rating: ${shows[i].rating.average}` 

      const runtimeEl = document.createElement('h6');
      runtimeEl.innerText = `Runtime: ${shows[i].runtime}`;

      const showOption = document.createElement('option');
      showOption.value = shows[i].name;
      showOption.innerText = shows[i].name;

        //sort all the episodes name in the select bar alphabetically
        shows.sort((showA, showB) => {
          const {name: nameA } = showA;
          const {name: nameB } = showB;

          if (nameA.toLowerCase() < nameB.toLowerCase()) {
            return -1
          } else {
            return 0;
          }
        })

      selectShowsEl.appendChild(showOption)

      
      miniDetailsEl.appendChild(genreEl)
      miniDetailsEl.appendChild(statusEl)
      miniDetailsEl.appendChild(statusEl)
      miniDetailsEl.appendChild(ratingEl)
      miniDetailsEl.appendChild(runtimeEl)

      
      showCard.appendChild(showName)
      showCard.appendChild(showImage)
      showCard.appendChild(showDetail)
      showCard.appendChild(miniDetailsEl)
      

      
      //name, image, summary, genres, status, rating, and runtime.
      showEl.appendChild(showCard)
      root.appendChild(showEl)
      
      searchEl.addEventListener('keypress', (e) => {
      
      if (e.key === 'Enter') {
        root.innerHTML = ' '
        const searchValue = e.target.value;
        const filteredSearch = searchShowByNameGenreOrSummary(shows, searchValue)
        
       
          renderAllShows(filteredSearch)
        
      }  
})
  

  }
}


function searchShowByNameGenreOrSummary(data, searchTerm) {
  const filteredDataArrayForSearchValue = data.filter(show => {
    return show.name.includes(searchTerm) || show.genres.includes(searchTerm) || show.summary.includes(searchTerm)
  })
  
  return filteredDataArrayForSearchValue
}



function showEpisodesOfSelectedShow(data) {
  selectShowsEl.addEventListener('change', (e) => {
    searchedShowName = e.target.value;
    const filteredShows = data.filter(show => {
      return show.name === searchedShowName
    })
    filteredShows.map(filteredShow => {
      show_id = filteredShow.id
    })
    console.log(show_id);
    fetchAndRenderAllEpisodesByShowID(show_id)
    
  }) 
}
