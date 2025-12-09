fetching();
let heroes = [];
let numberOfHeroesInPage = 20
let pagination = 0
let searchText = ''

async function fetching() {
  try {
    const response = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json");
    heroes = await response.json();
  } catch (err) {
    console.error(err);
  }
  renderTable()
}

function renderTable(search='') {

  let table = document.getElementsByTagName('table')[0];
  let tbody = document.getElementsByTagName('tbody')[0]
  tbody.remove()
  tbody = document.createElement('tbody')
  table.appendChild(tbody);
  let index = 0
  for (let hero = pagination*numberOfHeroesInPage ; hero < heroes.length;hero++) {    
    if (search =='' ||  heroes[hero].name.toLowerCase().includes(search.toLowerCase())) {
        if (index==numberOfHeroesInPage) break
        index++
          let prop = [
            heroes[hero].images.xs,
            heroes[hero].name,
            heroes[hero].biography.fullName,
            heroes[hero].powerstats.intelligence,
            heroes[hero].powerstats.strength,
            heroes[hero].powerstats.speed,
            heroes[hero].powerstats.durability,
            heroes[hero].powerstats.power,
            heroes[hero].powerstats.combat, 
            heroes[hero].appearance.race,
            heroes[hero].appearance.gender,
            heroes[hero].appearance.height[1],
            heroes[hero].appearance.weight[1],
            heroes[hero].biography.placeOfBirth,
            heroes[hero].biography.alignment]
        let tr = document.createElement('tr')
        for (let i=0 ; i <15;i++) {
            if (i!= 0 && i!=14) {
                let td = document.createElement('td')
                td.textContent = prop[i]
                tr.append(td)
                td.style.fontWeight = 700
            } else if (i==14) {
                let div = document.createElement('div')
                div.className = 'alignment'
                let td = document.createElement('td')
                div.textContent = prop[i]
                td.style.fontWeight = 700
                if (prop[i] == 'good') {
                    div.style.backgroundColor = '#befdc2ff'
                    td.style.color = '#02b10bff'
                } else if (prop[i] == 'bad') {
                    div.style.backgroundColor = '#ffc8c8ff'
                    td.style.color = '#ff2252ff'
                } else {
                    div.style.backgroundColor = '#dadadaff'
                    td.style.color = '#333333ff'
                }
                td.append(div)
                tr.append(td)
            } else {
                let td = document.createElement('td')
                let img = document.createElement('img')
                img.setAttribute('src', prop[i])
                img.style.borderRadius = '20px'
                img.style.width = "40px"
                img.style.height = "40px"
                td.append(img)
                tr.append(td)
            }
        }
        tbody.append(tr)
        
      }
    }
  
  
}

let select = Array.from(document.getElementsByClassName('selectors'))[0]
    select.addEventListener('click', ()=> {
        numberOfHeroesInPage = +select.value
         pagination = 0
         let p = document.getElementById('para')
         let div = document.getElementById('pagination')       
         if (Number.isNaN(numberOfHeroesInPage)) {
            numberOfHeroesInPage = heroes.length
            div.style.display = 'none'
        } else {
            div.style.display = 'flex'
            p.textContent = `Page ${pagination+1} of ${Math.ceil(heroes.length/numberOfHeroesInPage)}`
        }
         renderTable()
})

let search = document.getElementsByTagName('input')[0]
    search.addEventListener('input', ()=> {
        let div = document.getElementById('pagination') 
        if (search.value!=='') {
            div.style.display = 'none'
            numberOfHeroesInPage = heroes.length
        } else {      
            numberOfHeroesInPage = 20      
            div.style.display = 'flex'
        }
        renderTable(search.value)
            
})

document.getElementById('next').addEventListener('click', () => {
    if (pagination+1 < Math.ceil(heroes.length/numberOfHeroesInPage)) {
        pagination++
           let p = document.getElementById('para')
        p.textContent = `Page ${pagination+1} of ${Math.ceil(heroes.length/numberOfHeroesInPage)}`
            renderTable()
    }
})

document.getElementById('prev').addEventListener('click', () => {
    if (pagination >0) {
        pagination--
        let p = document.getElementById('para')
        p.textContent = `Page ${pagination+1} of ${Math.ceil(heroes.length/numberOfHeroesInPage)}`
        renderTable()
    } 
})