import { getData } from './dataService.js'

export async function loadCharacterDetail() {
	const params = new URLSearchParams(window.location.search)
	const characterId = params.get('id')
	console.log(characterId)
	if (characterId) {
		try {
			const character = await getData(`https://rickandmortyapi.com/api/character/${characterId}`)
			console.log(character)
			renderCharacterDetail(character)
		} catch (error) {
			console.log(error)
		}
	}
}

async function getLocation(locationUrl) {
	const location = await getData(locationUrl)
	console.log(location)
	const locationContainer = document.querySelector('.location')
	locationContainer.innerHTML = `
        <h3>Location</h3>
        <p><strong>Name:</strong> ${location.name}</p>
        <p><strong></strong>Type:</strong> ${location.type}</p>`
}

async function getEpisodeLayout(episodeUrl) {
	const episode = await getData(episodeUrl)
	return episode.name
}

export async function renderCharacterDetail(character) {
	const episodeNames = await Promise.all(character.episode.map(episode => getEpisodeLayout(episode)))

	const characterDetailContainer = document.querySelector('.character__detail')
	characterDetailContainer.innerHTML = `
        <div class="character-detail--box">
            <img src="${character.image}" alt="${character.name}">
            <div class="character-detail-info">
                <h2>${character.name}</h2>
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Species:</strong> ${character.species}</p>
                <p><strong>Gender:</strong> ${character.gender}</p>
                <div class="location"></div>
                <div class="episodes"><h3>Episodes</h3> <div></strong>${episodeNames.join(', ')} </div></div>
               
            </div>
            
        </div>
    `
	backToHome()
	getLocation(character.location.url)
}

function backToHome() {
	console.log('back to home')
	const backBtn = document.querySelector('.back__button')
	backBtn.addEventListener('click', () => {
		window.location.href = 'index.html'
	})
}

document.addEventListener('DOMContentLoaded', loadCharacterDetail)
