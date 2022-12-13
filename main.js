const input = document.getElementById('input')
const boton = document.getElementById('boton')
const error = document.getElementById('error')
const form = document.getElementById('form')
const container = document.getElementById('pokemon__container')

const showError = (mensaje) => {
    error.classList.add('error')
    error.textContent = mensaje
}

const clearError = () => {
    error.classList.remove('error')
    error.textContent = ''
}

const clearSearch = () => {
    input.value = ''
}

const clearContainer = () => {
    container.textContent = ''
    container.classList = '' 
}

const renderPokemon = (name, id, weight, height, type, img) => {
    let weightDiv = weight/10
    let heightDiv = height/10
    container.classList = 'pokemon__container' 
    container.innerHTML = `
        <div class="img__container">
            <h3 class="nombre__pokemon">${name}</h3>
            <img class="pokemon__img" src="${img}" alt="">
        </div>
        <div class="pokemon">   
            <div class="pokemon__info">
                <div class="dato">
                    <p class="type">Tipo</p>
                    <p>${type}</p>
                </div>

                <div class="dato">
                    <p class="weight">Peso</p>
                    <p>${weightDiv} Kg</p>
                </div>

                <div class="dato">
                    <p class="height">Altura</p>
                    <p>${heightDiv} m</p>
                </div>

                <div class="dato">
                    <p class="id">ID</p>
                    <p>${id}</p>
                </div>
            </div>     
        </div>
        
    `
}

const getPokemon = async (id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data  = await response.json()
        console.log(data);
        renderPokemon(data.name, data.id, data.weight, data.height, data.types[0].type.name, data.sprites.other.dream_world.front_default)
    } catch (error) {
        console.log(error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const idValue = input.value
    const idPoke = parseInt(idValue)
    if (!idPoke) {
        showError('no ingreso valor')
        clearSearch()
        clearContainer()
        return
    } else if (idPoke < 1 || idPoke > 905) {
        showError('El id del pokemon no existe')
        clearSearch()
        clearContainer()
        return
    } else {
        getPokemon(idPoke)
        clearError()
        clearSearch()
    }
})
    



