import { renderCharacter, getPagination } from './uiServices.js'
import { getData } from './dataService.js'

export function searchCharacter(url, onPageLoad) {
	const search__button = document.querySelector('.search__button')
	search__button.addEventListener('click', async e => {
		e.preventDefault()
		if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
			window.location.href = 'index.html'
			return
		}
		const searchText = document
			.querySelector('.search__input')
			.value.trim()
			.toLowerCase()
		const urlSerach = `${url}?name=${searchText}`
		console.log(urlSerach)

		try {
			const data = await getData(urlSerach)
			renderCharacter(data)
			getPagination(data.info.next, data.info.prev, onPageLoad)
		} catch (error) {
			console.log(error)
		}
	})
}
