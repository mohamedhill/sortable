import { sortHeroes } from "./sort.js";
import { renderTable } from "./display.js";
fetching();
export let heroes = [];
export let numberOfHeroesInPage = 20;
export let pagination = 0;
// let searchText = '';

async function fetching() {
  try {
    const response = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json");
    heroes = await response.json();
  } catch (err) {
    console.error(err);
  }
  renderTable();
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
    select.value = 'All'
    numberOfHeroesInPage = heroes.length;
    p.textContent = `Page ${pagination + 1} of ${Math.ceil(heroes.length / numberOfHeroesInPage)}`;

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



window.addEventListener("DOMContentLoaded", () => {
  let sortbutton = Array.from(document.querySelectorAll(".sort"));
  sortbutton.forEach(function (button) {
    button.addEventListener('click', () => {
      let value = button.getAttribute('sort-value');
      sortHeroes(value);
    });
  });
});


