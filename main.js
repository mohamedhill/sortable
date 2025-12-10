fetching();
let heroes = [];
let numberOfHeroesInPage = 20;
let pagination = 0;
let searchText = '';

async function fetching() {
  try {
    const response = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json");
    heroes = await response.json();
  } catch (err) {
    console.error(err);
  }
  renderTable();
}

function renderTable(search = '') {
  let table = document.getElementsByTagName('table')[0];
  let tbody = document.getElementsByTagName('tbody')[0];
  if (tbody) tbody.remove();
  tbody = document.createElement('tbody');
  table.appendChild(tbody);

  let index = 0;
  for (let hero = pagination * numberOfHeroesInPage; hero < heroes.length; hero++) {
    if (search == '' || heroes[hero].name.toLowerCase().includes(search.toLowerCase())) {
      if (index == numberOfHeroesInPage) break;
      index++;

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
        heroes[hero].biography.alignment
      ];

      let tr = document.createElement('tr');
      for (let i = 0; i < 15; i++) {
        if (i != 0 && i != 14) {
          let td = document.createElement('td');
          td.textContent = prop[i];
          tr.append(td);
          td.style.fontWeight = 700;
        } else if (i == 14) {
          let div = document.createElement('div');
          div.className = 'alignment';
          let td = document.createElement('td');
          div.textContent = prop[i];
          td.style.fontWeight = 700;
          if (prop[i] == 'good') {
            div.style.backgroundColor = '#befdc2ff';
            td.style.color = '#02b10bff';
          } else if (prop[i] == 'bad') {
            div.style.backgroundColor = '#ffc8c8ff';
            td.style.color = '#ff2252ff';
          } else {
            div.style.backgroundColor = '#dadadaff';
            td.style.color = '#333333ff';
          }
          td.append(div);
          tr.append(td);
        } else {
          let td = document.createElement('td');
          let img = document.createElement('img');
          img.setAttribute('src', prop[i]);
          img.style.borderRadius = '20px';
          img.style.width = "40px";
          img.style.height = "40px";
          td.append(img);
          tr.append(td);
        }
      }
      tbody.append(tr);
    }
  }
}

let select = Array.from(document.getElementsByClassName('selectors'))[0];
select.addEventListener('click', () => {

  if (select.value === "All") numberOfHeroesInPage = +heroes.length

  else numberOfHeroesInPage = +select.value;
  pagination = 0;
  let p = document.getElementById('para');
  let div = document.getElementById('pagination');
  let search = document.getElementsByTagName('input')[0];
  search.value = ''

  if (Number.isNaN(numberOfHeroesInPage)) {
    numberOfHeroesInPage = heroes.length;
  } else {
    div.style.display = 'flex';
    p.textContent = `Page ${pagination + 1} of ${Math.ceil(heroes.length / numberOfHeroesInPage)}`;
  }
  renderTable();
});

let search = document.getElementsByTagName('input')[0];
search.addEventListener('input', () => {
  let div = document.getElementById('pagination');
  let p = document.getElementById('para');
  pagination = 0
  if (search.value !== '') {
    console.log("tetdh");
    select.value = 'All'
    numberOfHeroesInPage = heroes.length;
    p.textContent = `Page ${pagination + 1} of ${Math.ceil(heroes.length / numberOfHeroesInPage)}`;
    console.log(numberOfHeroesInPage);

  } else {
    select.value = '20'
    numberOfHeroesInPage = 20;
    p.textContent = `Page ${pagination + 1} of ${Math.ceil(heroes.length / numberOfHeroesInPage)}`;
    div.style.display = 'flex';

  }
  renderTable(search.value);
});

document.getElementById('next').addEventListener('click', () => {
  if (pagination + 1 < Math.ceil(heroes.length / numberOfHeroesInPage)) {
    pagination++;
    let p = document.getElementById('para');
    p.textContent = `Page ${pagination + 1} of ${Math.ceil(heroes.length / numberOfHeroesInPage)}`;
    renderTable();
  }
});

document.getElementById('prev').addEventListener('click', () => {
  if (pagination > 0) {
    pagination--;
    let p = document.getElementById('para');
    p.textContent = `Page ${pagination + 1} of ${Math.ceil(heroes.length / numberOfHeroesInPage)}`;
    renderTable();
  }
});

let sortState = { field: "", direction: "asc" };

window.addEventListener("DOMContentLoaded", () => {
  let sortbutton = Array.from(document.querySelectorAll(".sort"));
  sortbutton.forEach(function (button) {
    button.addEventListener('click', () => {
      let value = button.getAttribute('sort-value');
      sortHeroes(value);
    });
  });
});

function sortHeroes(field) {
  if (sortState.field === field) {
    sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
  } else {
    sortState.field = field;
    sortState.direction = "asc";
  }

  heroes.sort((a, b) => {
    let valA = "", valB = "";
    switch (field) {
      case "name":
        valA = a.name;
        valB = b.name;
        break;
      case "fullName":
        valA = a.biography.fullName || "";
        valB = b.biography.fullName || "";
        break;
      case "intelligence":
      case "strength":
      case "speed":
      case "durability":
      case "power":
      case "combat":
        valA = a.powerstats[field];
        valB = b.powerstats[field];
        break;
      case "race":
        valA = a.appearance.race || "";
        valB = b.appearance.race || "";
        break;
      case "gender":
        valA = a.appearance.gender || "";
        valB = b.appearance.gender || "";
        break;
      case "height":
        valA = parseHeight(a.appearance.height[1]);
        valB = parseHeight(b.appearance.height[1]);
        break;
      case "weight":
        valA = parseWeight(a.appearance.weight[1]);
        valB = parseWeight(b.appearance.weight[1]);
        break;
      case "birth":
        valA = a.biography.placeOfBirth || "";
        valB = b.biography.placeOfBirth || "";
        break;
      case "alignment":
        valA = a.biography.alignment || "";
        valB = b.biography.alignment || "";
        break;
    }
    if (typeof valA === 'string')valA = valA.replace(/^[^a-zA-Z]+/, '').trim().toLowerCase()
    
    if (typeof valB === 'string') valB = valB.replace(/^[^a-zA-Z]+/, '').trim().toLowerCase()

    const isValAMissing = valA === null || valA === undefined || valA === "" || valA === "-";
    const isValBMissing = valB === null || valB === undefined || valB === "" || valB === "-";

    if (isValAMissing && !isValBMissing) return 1;
    if (!isValAMissing && isValBMissing) return -1;
    if (isValAMissing && isValBMissing) return 0;

    if (typeof valA === "string") {
      return sortState.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    } else {
      return sortState.direction === 'asc' ? (valA - valB) : (valB - valA);
    }
  });


  renderTable(document.querySelector("input[type='search']").value);
}

function parseHeight(h) {
  if (!h || h === "-" || h === "0") return 0;
  h = h.replace(/,/g, "");
  if (h.includes("cm")) return parseInt(h);
  if (h.includes("m")) return parseFloat(h) * 100;
  return 0;
}

function parseWeight(w) {
  if (!w || w === "-" || w === "0") return 0;
  w = w.replace(/,/g, "");
  if (w.includes("kg")) return parseFloat(w);
  if (w.includes("ton")) return parseFloat(w) * 1000;
  return 0;
}