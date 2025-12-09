**Sortable — Project README**

- **Project:** `sortable`
- **Files:** `index.html`, `style.css`, `main.js`

**Description:**
- A small front-end app that fetches superhero data from the public `all.json` dataset and displays the important fields in a table. The UI supports interactive search, page-size selection, and column sorting (both alphabetical and numeric-aware).

**Implemented features**
- **Fetch data:** Uses `fetch()` to load `https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json` and caches in memory.
- **Table display:** Shows columns: Icon, Name, Full Name, Powerstats (INT, STR, SPD, DUR, PWR, CMB), Race, Gender, Height, Weight, Place Of Birth, Alignment.
- **Pagination / Page size:** Select page size with the `<select class="selectors">` control (10, 20 (default), 50, 100, All Results).
- **Interactive search:** Typing in the search input filters rows by `.name` as you type.
- **Sortable columns:** Every column header has a sort button. Clicking toggles ascending/descending. Sorting is type-aware:
  - Numeric-like values (powerstats, parsed height/weight) are sorted numerically.
  - String values (name, race, gender, place, alignment) are sorted alphabetically (case-insensitive).
  - Missing/empty values are always placed last.
- **Sort indicator:** Active column shows ▲ (asc) or ▼ (desc); other headers show ⇌.

**How sorting handles height/weight**
- Height and weight are parsed by extracting the first numeric value from the display string (examples: `"180 cm"` → `180`, `"80 kg"` → `80`). If you want different behavior (e.g., sort by imperial values or full unit-aware conversion), modify the `parseNumberFromMetric()` function in `main.js`.

**Default state**
- On page load the app fetches data and displays the first page (20 rows). If you click any column header, the table will sort by that column. Repeated clicks toggle ascending/descending.

**How to run locally**
1. Open `index.html` in a modern browser (Chrome/Edge/Firefox). No build steps or server required.
2. Use the search box to filter by name.
3. Change the page size from the selector.
4. Click any column's sort button to sort.

**Files changed / key code locations**
- `index.html`: Added `id` attributes to each header button (e.g. `sort-name`, `sort-height`, ...).
- `main.js`: Centralized rendering logic in `renderHeroes(search)`, added typed sorting using `sortAccessors`, and wired controls on `DOMContentLoaded`.

**Possible improvements / next steps**
- Add a detail view: clicking a hero row shows full profile and a larger image.
- Add URL state (query string) to preserve search, page size, sorting, and detail view.
- Improve height/weight parsing to handle unit conversions and multiple values.
- Add fuzzy/advanced search operators (include/exclude/>, <, equals).
- Improve styling and responsive layout in `style.css`.

**Notes**
- This project intentionally avoids JS frameworks; it's plain vanilla JavaScript and CSS.
- If you want me to implement any of the improvements above, tell me which one and I will add it.

---
## Contributors
This project is a **Crossword Game** implemented by the team:

| Member | 

 **Yassine Bourazza**     
**Ilyas Abid**                   
**mohamed hilli** 

Thanks to the team.
