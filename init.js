import DoublyLinkedList from './modules/DoublyLinkedList.js'
import { handleDragStart, handleDragOver, handleDrop, handleDragEnter } from './handlers/index.js'
import { parseName } from './utils/index.js'

/** 
 * TODO: load script that: 
 * - solution approach with matrix on hold, DLL meets is the MVP
 * - fn to print ALL DLL
 */

export const scrollContent = document.querySelector('.scroll-content')

// create data structures for each tier

const TIERS = 'SABCD'
let S_Tier, A_Tier, B_Tier, C_tier, D_tier
const colors = ['#ff7f7f','#ffbf7f', '#ffdf7f', '#ffff7f', '#bfff7f']
export const tiers = [S_Tier, A_Tier, B_Tier, C_tier, D_tier]

for (let i = 0; i < TIERS.length; i++) {
  let tierEl = document.getElementById(TIERS[i])
  tiers[i] = [new DoublyLinkedList(tierEl.id), colors[i]]
  window[`${tierEl.id}_tier`] = tiers[i][0]
}
// logging for console
console.log('Initializing tiers data structures...')
tiers.forEach((el, i) => console.log(`%c${tiers[i][0].name} done`, `background: #111113; color: ${tiers[i][1]}`))
console.log('Completed.')


// loading flag
let isLoading = true

const containerOptionsEl = document.querySelector('.container-options')
const spinner = document.createElement('div')
spinner.classList.add('spinner')

containerOptionsEl.classList.add('loader')
containerOptionsEl.appendChild(spinner)

// API call
const shinobis = []
try {
  await fetch('https://naruto-api.herokuapp.com/api/v1/characters')
    .then((response) => response.json())
    .then((data) => data.forEach(el => {
      shinobis.push({images: el.images, name: el.name})
    }))
    console.log('Data fetch from API OK')
} catch (error) {
   console.error(`Oops, something wrong happened while fetching the data from the API: ${error}`)
}


// create API & default imgs
const assets = [
  './public/img/Naruto_Uzumaki.jpeg',
  './public/img/Sasuke_Uchiha.webp',
  './public/img/Sakura_Haruno.jpeg'
]

function createImgElements() {
  let element
  if (shinobis.length) {
    // this is done to make elements fit correctly in container
    shinobis.shift()
    for (let shinobi of shinobis) {
      if (shinobi.images[0] || shinobi.images[1]) {
        element = document.createElement('img')
        element.setAttribute('src', shinobi.images[1] || shinobi.images[0]|| './public/placeholder.png')
        element.setAttribute('alt', shinobi.name || 'Nameless shinobi')
        element.setAttribute('name', shinobi.name || 'Nameless shinobi')
        element.setAttribute('class', 'container-item')
        element.setAttribute('draggable', true)
        document.querySelector('.container-options').appendChild(element) 
      }
    }
  }
  for (let img of assets) {
    element = document.createElement('img')
        element.setAttribute('src', img)
        element.setAttribute('alt', parseName(img))
        element.setAttribute('name', parseName(img))
        element.setAttribute('class', 'container-item')
        element.setAttribute('draggable', true)
        document.querySelector('.container-options').appendChild(element)  
  }

  isLoading = false

}

createImgElements()

if(!isLoading) {
  containerOptionsEl.removeChild(spinner)
  containerOptionsEl.classList.remove('loader')
}

document.addEventListener('dragenter', handleDragEnter)
document.addEventListener('dragstart', handleDragStart)
document.addEventListener('dragover', handleDragOver)
document.addEventListener('drop', handleDrop)