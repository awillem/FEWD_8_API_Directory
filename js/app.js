const people = [];
let currentPeople = [];
const peopleUrl = "https://randomuser.me/api/?results=12&nat=us";
const directory = document.querySelector(".directory");
const cards = document.getElementsByClassName("card");
const modal = document.querySelector(".modal-container");
const searchInput = document.querySelector("#search");
let currentIndex = 0;

/* Fetches people from RandomUser.me
 *  Then creates creates employee cards and
 *  attaches the html to the directory div.
 */

fetchPeople(peopleUrl).then(data => {
  data.map(person => {
    people.push(person);
    currentPeople.push(person);
  });
  generateCards(people);
  console.log(people);
});

/*******************
 * Event Listener
 ******************/
directory.addEventListener("click", e => {
  if (
    e.target.closest(".card") &&
    e.target.className !== "next" &&
    e.target.className !== "prev"
  ) {
    const targetPerson = e.target.closest(".card").children;
    const name = targetPerson[1].children[0].innerText;
    currentPeople.forEach((person, index) => {
      if (name === `${person.name.first} ${person.name.last}`) {
        modal.firstElementChild.innerHTML = generateModal(person);
        currentIndex = index;
      }
    });
    // modal.firstElementChild.innerHTML = generateModal(people[0]);
    modal.classList.add("open");
    modal.classList.remove("closed");
  }
});

modal.addEventListener("click", e => {
  if (
    e.target.className.includes("close") ||
    e.target.className === "modal-container open"
  ) {
    closeModal();
  }
});

document.addEventListener("keyup", e => {
  if (e.key === "Escape") {
    closeModal();
  }
});

modal.addEventListener("click", e => {
  if (e.target.className === "prev") {
    if (currentIndex === 0) {
      currentIndex = currentPeople.length - 1;
    } else {
      currentIndex--;
    }
  } else if (e.target.className === "next") {
    if (currentIndex === currentPeople.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
  }
  modal.firstElementChild.innerHTML = generateModal(
    currentPeople[currentIndex]
  );
});

searchInput.addEventListener("keyup", e => {
  search(e.target.value);
});

/*******************
 * Helper Functions
 ******************/
async function fetchPeople(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json.results;
  // json.results.map(person => people.push(person));
}

function generateCards(employeeList) {
  let html = "";
  employeeList.forEach(employee => {
    html += `
        <div class="card">
          <div class="img"><img src="${employee.picture.large}" alt="${employee.name.first}'s picture"></div>
          <div class="info">
            <h3>${employee.name.first} ${employee.name.last}</h3>
            <p>${employee.email}</p>
            <p>${employee.location.city}</p>
          </div>
        </div>
        `;
  });
  directory.innerHTML = html;
}

function generateModal(person) {
  let date = new Date(person.dob.date);
  const year = date
    .getFullYear()
    .toString()
    .substr(-2);
  const birthday = `${date.getMonth()}/${date.getDate()}/${year}`;
  const state = getStateAbb(person.location.state);
  let html = `
    <div class="modal-nav">
    <a class="prev">prev</a>
    <i class="far fa-times-circle close"></i>
    <a class="next">next</a>
</div>
<div class="employee-info">
  <div class="employee">
    <img src="${person.picture.large}" alt="${person.name.first}'s image">
    <h3>${person.name.first} ${person.name.last}</h3>
      <p>${person.email}</p>
      <p>${person.location.city}</p>
      <p><span>Username: </span>${person.login.username}
  </div>
  <div class="location">
    <p class="phone">${person.cell}</p>
    <p class="address"> <span class="street">${person.location.street.number} ${person.location.street.name} </span> <span class="city">${person.location.city}</span> <span class="state">${state}</span> <span class="code">${person.location.postcode}</span></p>
    <p class="birthday">${birthday}</p>
  </div>
    `;
  return html;
}

function closeModal() {
  modal.classList.add("closed");
  modal.classList.remove("open");
}

/**********
 * Search
 *********/

function search(searchTerm) {
  currentPeople.length = 0;
  if (searchTerm === "") {
    currentPeople = [...people];
  } else {
    people.forEach(person => {
      const name = `${person.name.first} ${person.name.last}`;
      if (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.login.username.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        currentPeople.push(person);
      }
    });
  }

  if (searchTerm.length > 0 && currentPeople.length === 0) {
    console.log("no");
    directory.innerHTML = `<h3>No Results. Try Again</h3>`;
  } else {
    generateCards(currentPeople);
  }
}

/* State Abbreviations */
const states = {
  AL: "Alabama",
  AK: "Alaska",
  AS: "American Samoa",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FM: "Federated States Of Micronesia",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MH: "Marshall Islands",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  MP: "Northern Mariana Islands",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PW: "Palau",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VI: "Virgin Islands",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming"
};

function getStateAbb(stateToChange) {
  let stateAbb = "";
  for (state in states) {
    if (stateToChange === states[state]) {
      stateAbb = state;
    }
  }
  if (stateAbb === "") {
    return stateToChange;
  } else {
    return stateAbb;
  }
}
