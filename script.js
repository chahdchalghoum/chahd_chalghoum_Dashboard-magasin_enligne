/*Table de produits*/
let produits = [
  { nom: "TV Samsung 4K", prix: 1800, stock: 8 },
  { nom: "Machine à laver LG", prix: 1200, stock: 5 },
  { nom: "Laptop HP i5", prix: 2200, stock: 3 },
  { nom: "Climatiseur Samsung", prix: 1500, stock: 4 },
  { nom: "Micro-ondes Toshiba", prix: 350, stock: 10 }
];

/*Table de clients*/
let clients = [
  { nom: "Ahmed Tounsi", email: "Ahmedtounsi56@gmail.com", ville: "Tunis" },
  { nom: "Lina Abdallah", email: "Linaabd04@gmail.com", ville: "Sousse" },
  { nom: "Sami Chawki", email: "Samichawki@gmail.com", ville: "Sfax" }
];

/**/
const tableP = document.querySelector("#tableProduits tbody");
const tableC = document.querySelector("#tableClients tbody");

function majStats() {
  document.getElementById("nbProduits").textContent = produits.length;
  document.getElementById("nbClients").textContent = clients.length;
}

/*Afficher les deux tableaux des clients et produits*/
function afficherProduits() {
  tableP.innerHTML = "";
  produits.forEach((p, i) => {
    tableP.innerHTML += `
      <tr>
        <td>${p.nom}</td>
        <td>${p.prix} dt</td>
        <td>${p.stock}</td>
        <td><button class="delete-btn" onclick="supprimerProduit(${i})">Supprimer</button></td>
      </tr>`;
  });
  majStats();
}

function afficherClients() {
  tableC.innerHTML = "";
  clients.forEach((c, i) => {
    tableC.innerHTML += `
      <tr>
        <td>${c.nom}</td>
        <td>${c.email}</td>
        <td>${c.ville}</td>
        <td><button class="delete-btn" onclick="supprimerClient(${i})">Supprimer</button></td>
      </tr>`;
  });
  majStats();
}

afficherProduits();
afficherClients();

/********************** AJOUT ******************************/
document.getElementById("ajoutproduit").addEventListener("submit", e => {
  e.preventDefault();
  produits.push({
    nom: nomProduit.value,
    prix: prixProduit.value,
    stock: stockProduit.value
  });
  afficherProduits();
  e.target.reset();
});

document.getElementById("ajoutclient").addEventListener("submit", e => {
  e.preventDefault();
  clients.push({
    nom: nomClient.value,
    email: emailClient.value,
    ville: villeClient.value
  });
  afficherClients();
  e.target.reset();
});

/*supprimer un produit ou un client dans un tableau*/
function supprimerProduit(i) {
  produits.splice(i, 1);
  afficherProduits();
}

function supprimerClient(i) {
  clients.splice(i, 1);
  afficherClients();
}

/*graphe d'un chart*/
new Chart(document.getElementById("salesChart"), {
  type: "line",
  data: {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [{
      label: "Ventes (dt)",
      data: [500, 900, 1200, 700, 1600, 1800],
      borderWidth: 3
    }]
  }
});

new Chart(document.getElementById("categoryChart"), {
  type: "pie",
  data: {
    labels: ["Électroménager", "Cuisine", "Électronique", "Informatique"],
    datasets: [{
      data: [40, 25, 20, 15]
    }]
  }
});
