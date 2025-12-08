let heroes = [];
let numberOfHeroesInPage = 20
let searchText = ''

fetching();
async function fetching() {
  try {
    const response = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json");
    heroes = await response.json();
  } catch (err) {
    console.error(err);
  }
  let table = document.getElementsByTagName('table')[0];
  let tbody = document.getElementsByTagName('tbody')[0]
  tbody.remove()
  tbody = document.createElement('tbody')
  table.appendChild(tbody);
  let index = 0
  for (let hero of heroes) {
    console.log(index);
    if (index==numberOfHeroesInPage) break
    index++
      let prop = [hero.images.xs , hero.name , hero.biography.fullName ,hero.powerstats.intelligence, hero.powerstats.strength,
                 hero.powerstats.speed,hero.powerstats.durability,hero.powerstats.power,hero.powerstats.combat , 
                 hero.appearance.race , hero.appearance.gender ,hero.appearance.height[1] , hero.appearance.weight[1] ,
                  hero.biography.placeOfBirth , hero.biography.alignment]
    let tr = document.createElement('tr')
    for (let i=0 ; i <15;i++) {
        if (i!= 0 && i!=14) {
            let td = document.createElement('td')
            td.textContent = prop[i]
            tr.append(td)
        } else if (i==14) {
            let td = document.createElement('td')
            td.textContent = prop[i]
            if (prop[i] == 'good') {
                td.style.color = '#02b10bff'
                td.style.fontWeight = 700
            } else if (prop[i] == 'bad') {
                td.style.color = '#ff2252ff'
                td.style.fontWeight = 700
            } else {
                td.style.color = '#333333ff'
                td.style.fontWeight = 700
            }
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

let select = Array.from(document.getElementsByClassName('selectors'))[0]
    select.addEventListener('click', ()=> {
        numberOfHeroesInPage = +select.value
        fetching()
})

let search = document.getElementsByTagName('input')[0]
    search.addEventListener('input', ()=> {        
        if (search.value === '') {
            fetching()
            return
        }
    let table = document.getElementsByTagName('table')[0];
  let tbody = document.getElementsByTagName('tbody')[0]
  tbody.remove()
  tbody = document.createElement('tbody')
  table.appendChild(tbody);
        
        for (let hero of heroes) {
            if (hero.name.toLowerCase().includes(search.value.toLowerCase())) {
                  let prop = [hero.images.xs , hero.name , hero.biography.fullName ,hero.powerstats.intelligence, hero.powerstats.strength,
                 hero.powerstats.speed,hero.powerstats.durability,hero.powerstats.power,hero.powerstats.combat , 
                 hero.appearance.race , hero.appearance.gender ,hero.appearance.height[1] , hero.appearance.weight[1] ,
                  hero.biography.placeOfBirth , hero.biography.alignment]
    let tr = document.createElement('tr')
    for (let i=0 ; i <15;i++) {
        if (i!= 0 && i!=14) {
            let td = document.createElement('td')
            td.textContent = prop[i]
            tr.append(td)
        } else if (i==14) {
            let td = document.createElement('td')
            td.textContent = prop[i]
            if (prop[i] == 'good') {
                td.style.color = '#00eb3bff'
            } else if (prop[i] == 'bad') {
                td.style.color = '#eb0033ff'
            } else {
                td.style.color = '#333333ff'
            }
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
        
    })