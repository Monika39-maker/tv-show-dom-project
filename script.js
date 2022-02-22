const root = document.getElementById('root')
const allEpisodeList = getAllEpisodes();
let episodeNumber;
// console.log(allEpisodeList)
for (let i=0; i<allEpisodeList.length; i++) {
  const card = document.createElement('div');
  card.classList.add('card');
  const title = document.createElement('h3');

  const seasonNumber = allEpisodeList[i].season;
  episodeNumber = allEpisodeList[i].number
  
  
  
  if (episodeNumber < Number(10)) {
    episodeNumber = '0' + allEpisodeList[i].number
  } else {
    episodeNumber = allEpisodeList[i].number;
  }
  console.log(episodeNumber)

  title.innerText = `${allEpisodeList[i].name} - S0${seasonNumber}E${episodeNumber}`
  
  const image = document.createElement('img');
  image.src = `${allEpisodeList[i].image['medium']}`
  
  
  
  const summary = document.createElement('div');
  summary.innerHTML = `${(allEpisodeList[i].summary)}`
  
  card.appendChild(title);
  card.appendChild(image)
  
  
  card.appendChild(summary);
  
 
  root.appendChild(card)

}




