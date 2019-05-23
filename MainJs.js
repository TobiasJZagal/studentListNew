window.addEventListener("DOMContentLoaded", init);

const Students = {
  firstName: "-student-first-name-",
  lastName: "-student-last-name-",
  house: "-student-house-",
  image: "-student-image-"
};
let filter = "alle";
let allStudents = [];

function init() {
  loadJSON();

  console.log("init");
}

function loadJSON() {
  console.log("loadJSON");
  fetch("http://petlatkea.dk/2019/hogwarts/students.json")
    .then(response => response.json())
    .then(myJson => prepareObjects(myJson));
  prepareButtons();
  console.log("myJson");
}

function prepareButtons() {
  document.querySelectorAll(".chanceFilter").forEach(knap => {
    knap.addEventListener("click", setFilter);
  });

  document.querySelector(".firstName").addEventListener("click", () => {
    let sorted = allStudents.sort(sortFirstName);
    document.querySelector("#container").textContent = "";
    sorted.forEach(displayList);
  });

  document.querySelector(".lastName").addEventListener("click", () => {
    let sorted = allStudents.sort(sortLastName);
    document.querySelector("#container").textContent = "";
    sorted.forEach(displayList);
  });
  document.querySelector(".house").addEventListener("click", () => {
    let sorted = allStudents.sort(sortHouse);
    document.querySelector("#container").textContent = "";
    sorted.forEach(displayList);
  });
}

function setFilter() {
  filter = this.getAttribute("data-type");
  document.querySelector("#container").textContent = "";
  allStudents.forEach(displayList);
}

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    console.log("henlo");
    const students = Object.create(Students);

    const parts = jsonObject.fullname.split(" ");
    students.firstName = parts[0];
    students.lastName = parts[1];
    students.house = jsonObject.house;
    firstLetterLastName = getFirstLetter(parts[0]);
    LastNameLowerCase = toLowerCaseFunc(parts[1]);
    students.image = `images/${LastNameLowerCase}_${firstLetterLastName}.png`;

    allStudents.push(students);
  });
  allStudents.forEach(displayList);
}

function toLowerCaseFunc(Name) {
  let lowerCaseName = Name.toLowerCase();
  return lowerCaseName;
}

function getFirstLetter(Name) {
  let firstLetter = Name.substring(0, 1).toLowerCase();

  return firstLetter;
}

function sortFirstName(a, b) {
  if (a.firstName < b.firstName) {
    return -1;
  } else {
    return 1;
  }
}

function sortHouse(a, b) {
  if (a.house < b.house) {
    return -1;
  } else {
    return 1;
  }
}

function sortLastName(a, b) {
  if (a.lastName < b.lastName) {
    return -1;
  } else {
    return 1;
  }
}

function displayList(student) {
  let dest = document.querySelector("#container");
  let temp = document.querySelector("#template");
  let clone = temp.cloneNode(true).content;
  let filteredList = filterList(student);

  if (filteredList || filter == "alle") {
    clone.querySelector("#studentName").textContent = `${student.firstName} ${
      student.lastName
    }`;
    clone.querySelector("#studentHouse").textContent = student.house;
    clone.querySelector("#studentImage").src = student.image;

    dest.appendChild(clone);
  }
  console.log(filteredList);
}

function filterList(student) {
  return student.house === filter;
}

function displayAnimal() {
  console.log(Students);
}
