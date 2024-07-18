import { getData } from './dataService.js'
import { renderCharacter, getPagination } from './uiServices.js'
import { searchCharacter } from './search.js'

// virables
const URL = 'https://rickandmortyapi.com/api/character'

async function onPageLoad(URL) {
	try {
		const data = await getData(URL)
		renderCharacter(data)
		getPagination(data.info.next, data.info.prev, onPageLoad)
	} catch (error) {
		console.log(error)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	onPageLoad(URL)
	searchCharacter(URL, onPageLoad)
})
