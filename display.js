import { heroes, pagination, numberOfHeroesInPage } from "./main.js";

export function renderTable(search = '') {
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
