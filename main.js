let heroes = [];
let numberOfHeroesInPage = 20
let searchText = ''

fetching();
async function fetching(search = '') {
    if (!heroes.length) {
        try {
            const response = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json");
            heroes = await response.json();
        } catch (err) {
            console.error(err);
        }
    }

    let table = document.getElementsByTagName('table')[0];
    let tbody = document.getElementsByTagName('tbody')[0]
    tbody.remove()
    tbody = document.createElement('tbody')
    table.appendChild(tbody);
    let index = 0
    for (let hero of heroes) {
        console.log(search);

        if (search == '' || hero.name.toLowerCase().includes(search.toLowerCase())) {
            if (index == numberOfHeroesInPage) break
            index++
            let prop = [hero.images.xs, hero.name, hero.biography.fullName, hero.powerstats.intelligence, hero.powerstats.strength,
            hero.powerstats.speed, hero.powerstats.durability, hero.powerstats.power, hero.powerstats.combat,
            hero.appearance.race, hero.appearance.gender, hero.appearance.height[1], hero.appearance.weight[1],
            hero.biography.placeOfBirth, hero.biography.alignment]
            let tr = document.createElement('tr')
            for (let i = 0; i < 15; i++) {
                if (i != 0 && i != 14) {
                    let td = document.createElement('td')
                    td.textContent = prop[i]
                    tr.append(td)
                } else if (i == 14) {
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


}

let select = Array.from(document.getElementsByClassName('selectors'))[0]
select.addEventListener('click', () => {
    numberOfHeroesInPage = +select.value
    fetching()
})

let search = document.getElementsByTagName('input')[0]
search.addEventListener('input', () => {
    fetching(search.value)
    return
})
let sortState = { field: "", direction: "asc" };

window.addEventListener("DOMContentLoaded", () => {
    let sortbutton = Array.from(document.querySelectorAll(".sort"));
    sortbutton.forEach(function (button) {

        button.addEventListener('click', () => {
            console.log("test11");
            let value = button.getAttribute('sort-value')
            sortHeroes(value)
        })

    })



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


        const isValAMissing = valA === null || valA === undefined || valA === "" || valA === "-" || valA === 0;
        const isValBMissing = valB === null || valB === undefined || valB === "" || valB === "-" || valB === 0;

        if (isValAMissing && !isValBMissing) {

            return 1;
        }
        if (!isValAMissing && isValBMissing) {

            return -1;
        }
        if (isValAMissing && isValBMissing) {
            return 0;
        }


        if (typeof valA === "string") {
            return sortState.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
            return sortState.direction === 'asc' ? (valA - valB) : (valB - valA);
        }
    });

    fetching(document.querySelector("input[type='search']").value);
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
