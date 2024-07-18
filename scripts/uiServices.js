export function renderCharacter(data) {
	const character_box = document.querySelector('.character__box')
	character_box.innerHTML = ''

	data.results.forEach(character => {
		console.log(character)
		const character_element = document.createElement('div')
		character_element.classList.add('character')
		character_element.innerHTML = `

        <figure class="card card--normal">
            <div class="card__image-container">
                <img src="${character.image}" alt="Eevee"
                    class="card__image">
            </div>

            <figcaption class="card__caption">
                <h1 class="card__name">${character.name}</h1>

                <h3 class="card__type">
				${character.status}
                </h3>

                <table class="card__stats">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>${character.id}</td>
                        </tr>
                        <tr>
                            <th>Species</th>
                            <td>${character.species}</td>
                        </tr>

                        <tr>
                            <th>type</th>
                            <td>${character.type}</td>
                        </tr>

                        <tr>
                            <th>status</th>
                            <td>${character.status}</td>
                        </tr>
                        <tr>
                            <th>location</th>
                            <td>${character.location.name}</td>
                        </tr>
                        <tr>
                            <th>gender</th>
                            <td>${character.gender}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="card__abilities">
                    <h4 class="card__ability">
                        <span class="card__label">Ability</span>
                        Run Away
                    </h4>
                    <h4 class="card__ability">
                        <span class="card__label">Hidden Ability</span>
                        Anticipation
                    </h4>
                </div>
            </figcaption>
        </figure>
                `
		character_box.appendChild(character_element)
	})

	const characterReadMore = document.querySelectorAll('.card')
	characterReadMore.forEach((readMore, index) => {
		readMore.addEventListener('click', () => {
			renderSingleCharacter(data.results[index].id)
		})
	})
}

function renderSingleCharacter(characterId) {
	window.location.href = `characterDetail.html?id=${characterId}`
}

export function getPagination(next, prev, onPageChange) {
	const characterMain = document.querySelector('.character__main')
	if (!characterMain) {
		throw new Error('No character main found')
	}
	let pagination = document.querySelector('.pagination')
	if (!pagination) {
		pagination = document.createElement('div')
		pagination.classList.add('pagination')
		pagination.innerHTML = `
            <button class="prev btn">Previous</button>
            <button class="next btn">Next</button>
        `

		characterMain.appendChild(pagination)
	}

	const nextBtn = document.querySelector('.next')
	const prevBtn = document.querySelector('.prev')

	nextBtn.style.display = next ? 'block' : 'none'
	prevBtn.style.display = prev ? 'block' : 'none'

	nextBtn.onclick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		onPageChange(next)
	}
	prevBtn.onclick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		onPageChange(prev)
	}
}
