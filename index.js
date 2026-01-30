let demandes = [
  {
    id: 1,
    nom: "El Amrani",
    prenom: "Yassine",
    telephone: "0612345678",
    email: "yassine.elamrani@gmail.com",
    motif: "consultation",
    date: "2022-01-10",
  },
  {
    id: 2,
    nom: "Benali",
    prenom: "Sara",
    telephone: "0623456789",
    email: "sara.benali@gmail.com",
    motif: "controle",
    date: "2022-01-11",
  },
  {
    id: 3,
    nom: "Haddad",
    prenom: "Amine",
    telephone: "0634567890",
    email: "amine.haddad@gmail.com",
    motif: "urgence",
    date: "2023-01-2",
  },
  {
    id: 4,
    nom: "Fassi",
    prenom: "Khadija",
    telephone: "0645678901",
    email: "khadija.fassi@gmail.com",
    motif: "consultation",
    date: "2024-01-02",
  },
  {
    id: 5,
    nom: "Alaoui",
    prenom: "Hamza",
    telephone: "0656789012",
    email: "hamza.alaoui@gmail.com",
    motif: "analyse",
    date: "2003-3-3",
  },
  {
    id: 6,
    nom: "Ziani",
    prenom: "Imane",
    telephone: "0667890123",
    email: "imane.ziani@gmail.com",
    motif: "controle",
    date: "2000-03-10",
  },
  {
    id: 7,
    nom: "Raji",
    prenom: "Mehdi",
    telephone: "0678901234",
    email: "mehdi.raji@gmail.com",
    motif: "consultation",
    date: "2025-10-10",
  },
  {
    id: 8,
    nom: "Tahiri",
    prenom: "Salma",
    telephone: "0689012345",
    email: "salma.tahiri@gmail.com",
    motif: "urgence",
    date: "2000-11-11",
  },
  {
    id: 9,
    nom: "Aliouane",
    prenom: "Oussama",
    telephone: "0643016364",
    email: "aliouaneoussama89@gmail.com",
    motif: "consultation",
    date: "2026-01-14",
  },
  {
    id: 10,
    nom: "Bennani",
    prenom: "Anas",
    telephone: "0690123456",
    email: "anas.bennani@gmail.com",
    motif: "analyse",
    date: "2026-01-15",
  },
];

const motifs = ["consultation", "urgence", "controle"];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telRegex = /^\d{10}$/;
const form = document.querySelector("form");
const tbody = document.querySelector("tbody");

const demandesBtn = document.querySelector(".demandes-btn");
const ajouterDemandeBtn = document.querySelector(".ajouter-demande-btn");

const section1 = document.querySelector(".section--1");
const section2 = document.querySelector(".section--2");

const messagesArea = document.querySelector(".message-area");

let currentPage = 1;
const pageItems = 5;

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let currentID = 1;

let demandesFiltrees = [...demandes];

demandesBtn.addEventListener("click", function () {
  section1.classList.add("hide");
  section2.classList.remove("hide");

  this.classList.add("hide");
  ajouterDemandeBtn.classList.remove("hide");
});

ajouterDemandeBtn.addEventListener("click", function () {
  section1.classList.remove("hide");
  section2.classList.add("hide");

  this.classList.add("hide");
  demandesBtn.classList.remove("hide");
});

function createAndShowMessage(message, type) {
  messagesArea.innerHTML = "";

  const messageElement = document.createElement("p", "message");
  messageElement.textContent = message;

  messageElement.classList.add("message");
  messageElement.classList.add(type);

  messagesArea.append(messageElement);

  setTimeout(() => {
    messagesArea.innerHTML = "";
  }, 2000);
}

function ajouterDemande(event) {
  event.preventDefault();

  const nom = document.querySelector("#nom");
  const prenom = document.querySelector("#prenom");
  const telephone = document.querySelector("#telephone");
  const email = document.querySelector("#email");
  const motif = document.querySelector("#motif");
  const date = document.querySelector(".date");

  nom.style.border = "";
  prenom.style.border = "";
  telephone.style.border = "";
  email.style.border = "";
  motif.style.border = "";
  date.style.border = "";

  const validNom = nom.value;
  const validPrenom = prenom.value;
  const validTele = telRegex.test(telephone.value);
  const validEmail = emailRegex.test(email.value);
  const validDate = date.value;
  const validMotif = motif.value;

  !validNom && (nom.style.border = "1px solid red");
  !validEmail && (email.style.border = "1px solid red");
  !validPrenom && (prenom.style.border = "1px solid red");
  !validMotif && (motif.style.border = "1px solid red");
  !validTele && (telephone.style.border = "1px solid red");
  !validDate && (date.style.border = "1px solid red");

  if (
    !validNom ||
    !validEmail ||
    !validPrenom ||
    !validDate ||
    !validTele ||
    !validEmail ||
    !validMotif
  ) {
    createAndShowMessage("svp entrer les format valide des champs !", "error");
    return;
  }

  const newDemande = {
    id: currentID++,
    nom: nom.value,
    prenom: prenom.value,
    telephone: telephone.value,
    email: email.value,
    motif: validMotif,
    date: validDate,
  };

  demandes.push(newDemande);
  appliquerFiltre();
  createAndShowMessage("la demande a ete ajouter avec success !", "success");
  this.reset();
}

form.addEventListener("submit", ajouterDemande);

const afficherLesDemandes = () => {
  tbody.innerHTML = "";

  next.disabled = false;
  prev.disabled = false;

  const start = (currentPage - 1) * pageItems;
  const end = start + pageItems;

  demandesFiltrees.slice(start, end).forEach((demande) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${demande.nom}</td>
            <td>${demande.prenom}</td>
            <td>${demande.telephone}</td>
            <td>${demande.email}</td>
            <td>${demande.motif}</td>
            <td>${demande.date}</td>
            <td><button class="delete" onClick="deleteDemande(${demande.id})">🗑️</button></td>
        `;
    tbody.append(tr);
  });

  document.querySelector(".counter").innerHTML = `
    <span>${demandesFiltrees.length}</span>
    demandes
  `;

  updatePagination();
};

function deleteDemande(id) {
  demandes = demandes.filter((demande) => demande.id !== id);

  createAndShowMessage("la demande a ete supprimer avec success !", "success");
  appliquerFiltre();
}

function updatePagination() {
  const totalPages = Math.ceil(demandesFiltrees.length / 5);
  if (currentPage === 1) {
    prev.disabled = true;
  }
  if (currentPage === totalPages) {
    next.disabled = true;
  }

  document.querySelector(".pagination-result").innerHTML =
    `<span class="pages">${currentPage}</span><span>/${Math.ceil(
      demandesFiltrees.length / 5,
    )}</span>`;
}

afficherLesDemandes();

next.addEventListener("click", () => {
  currentPage++;
  afficherLesDemandes();
});
prev.addEventListener("click", () => {
  currentPage--;
  afficherLesDemandes();
});

const toggleTheme = document.querySelector(".theme-toggle");

let theme = true;

document.querySelector(".theme").title = "turn off the lights";

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (theme) {
    document.querySelector(".theme").textContent = "🌞";
  } else {
    document.querySelector(".theme").textContent = "🌙";
  }
  document.querySelector(".theme").title = `
      turn ${theme ? "on" : "off"} the lights 
  `;
  theme = !theme;
});

const select = document.querySelector(".filter-select");

const optionTous = document.createElement("option");
optionTous.textContent = "tous";
optionTous.setAttribute("value", "tous");
select.append(optionTous);

motifs.forEach((el) => {
  const option = document.createElement("option");
  option.textContent = el;
  option.setAttribute("value", el);

  select.append(option);
});

function appliquerFiltre() {
  const motifSelectionne = select.value;

  if (motifSelectionne === "tous") {
    demandesFiltrees = [...demandes];
  } else {
    demandesFiltrees = demandes.filter(
      (demande) => demande.motif === motifSelectionne,
    );
  }

  currentPage = 1;
  afficherLesDemandes();
}

select.addEventListener("change", appliquerFiltre);
