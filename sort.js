 import { heroes } from "./main.js";
import { renderTable } from "./display.js";
 let sortState = { field: "", direction: "asc" };
 
 export function sortHeroes(field) {
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