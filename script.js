// === Données ===
let produits = [];
let clients = [];
let totalVentes = 0;

// === Sélecteurs ===
const tableProduits = document.querySelector("#tableProduits tbody");
const tableClients = document.querySelector("#tableClients tbody");
const nbProduits = document.getElementById("nbProduits");
const nbClients = document.getElementById("nbClients");
const nbVentes = document.getElementById("nbVentes");
const rechercheClient = document.getElementById("rechercheClient");

// === Graphique Chart.js ===
const ctx = document.getElementById("chartVentes").getContext("2d");
let chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [{
      label: "Ventes (€)",
      data: [1200, 1900, 3000, 2500, 2200, 2700],
      backgroundColor: "#0078D7"
    }]
  },
  options: {
    scales: { y: { beginAtZero: true } }
  }
});

// === FORMULAIRE PRODUIT ===
document.getElementById("formProduit").addEventListener("submit", (e) => {
  e.preventDefault();
  const nom = nomProduit.value.trim();
  const prix = parseFloat(prixProduit.value);
  const stock = parseInt(stockProduit.value);

  produits.push({ nom, prix, stock });
  nomProduit.value = prixProduit.value = stockProduit.value = "";
  majProduits();
});

// === FORMULAIRE CLIENT ===
document.getElementById("formClient").addEventListener("submit", (e) => {
  e.preventDefault();
  const nom = nomClient.value.trim();
  const email = emailClient.value.trim();
  const ville = villeClient.value.trim();

  clients.push({ nom, email, ville });
  nomClient.value = emailClient.value = villeClient.value = "";
  majClients();
});

// === Supprimer un produit ===
function supprimerProduit(i) {
  produits.splice(i, 1);
  majProduits();
}

// === Supprimer un client ===
function supprimerClient(i) {
  clients.splice(i, 1);
  majClients();
}

// === Acheter un produit ===
function acheterProduit(i) {
  if (produits[i].stock > 0) {
    produits[i].stock--;
    totalVentes += produits[i].prix;
    nbVentes.textContent = totalVentes.toFixed(2);
    majProduits();
    majGraphique();
  } else {
    alert("Stock épuisé !");
  }
}

// === Mise à jour des tableaux ===
function majProduits() {
  tableProduits.innerHTML = "";
  produits.forEach((p, i) => {
    tableProduits.innerHTML += `
      <tr>
        <td>${p.nom}</td>
        <td>${p.prix.toFixed(2)} €</td>
        <td>${p.stock}</td>
        <td>
          <button onclick="acheterProduit(${i})">Acheter</button>
          <button onclick="supprimerProduit(${i})">Supprimer</button>
        </td>
      </tr>`;
  });
  nbProduits.textContent = produits.length;
}

function majClients() {
  tableClients.innerHTML = "";
  clients.forEach((c, i) => {
    tableClients.innerHTML += `
      <tr>
        <td>${c.nom}</td>
        <td>${c.email}</td>
        <td>${c.ville}</td>
        <td><button onclick="supprimerClient(${i})">Supprimer</button></td>
      </tr>`;
  });
  nbClients.textContent = clients.length;
}

// === Recherche client ===
rechercheClient.addEventListener("input", () => {
  const val = rechercheClient.value.toLowerCase();
  const lignes = tableClients.querySelectorAll("tr");
  lignes.forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(val) ? "" : "none";
  });
});

// === Mettre à jour le graphique ===
function majGraphique() {
  chart.data.datasets[0].data.push(totalVentes);
  if (chart.data.datasets[0].data.length > 6) chart.data.datasets[0].data.shift();
  chart.update();
}
