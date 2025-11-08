// ---- Données du magasin ----
const produits = [
  { nom: "Clavier mécanique", prix: 89.99, stock: 25 },
  { nom: "Souris gamer", prix: 45.99, stock: 40 },
  { nom: "Écran 27 pouces", prix: 220.00, stock: 12 },
  { nom: "Casque Bluetooth", prix: 79.50, stock: 33 },
  { nom: "Micro USB", prix: 59.99, stock: 15 }
];

const clients = [
  { nom: "Amina", email: "amina@gmail.com", ville: "Tunis" },
  { nom: "Yassine", email: "yassine@yahoo.com", ville: "Sousse" },
  { nom: "Sarah", email: "sarah@outlook.com", ville: "Nabeul" },
  { nom: "Ali", email: "ali@gmail.com", ville: "Bizerte" }
];

const ventesMensuelles = [1200, 1800, 1700, 2000, 2400, 2800, 3200, 3100, 2900, 3300, 3600, 3900];

// ---- Fonctions d’affichage ----
function remplirTableaux() {
  const tbodyProduits = document.querySelector("#tableProduits tbody");
  produits.forEach(p => {
    tbodyProduits.innerHTML += `
      <tr>
        <td>${p.nom}</td>
        <td>${p.prix.toFixed(2)}</td>
        <td>${p.stock}</td>
      </tr>`;
  });

  const tbodyClients = document.querySelector("#tableClients tbody");
  clients.forEach(c => {
    tbodyClients.innerHTML += `
      <tr>
        <td>${c.nom}</td>
        <td>${c.email}</td>
        <td>${c.ville}</td>
      </tr>`;
  });
}

function afficherStats() {
  document.getElementById("nbProduits").textContent = produits.length;
  document.getElementById("nbClients").textContent = clients.length;
  const totalVentes = ventesMensuelles.reduce((a, b) => a + b, 0);
  document.getElementById("nbVentes").textContent = totalVentes.toLocaleString("fr-FR");
}

// ---- Graphique ----
function afficherGraphique() {
  const ctx = document.getElementById("chartVentes");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
      datasets: [{
        label: 'Ventes mensuelles (€)',
        data: ventesMensuelles,
        backgroundColor: 'rgba(0,120,215,0.6)',
        borderColor: '#005a9e',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// ---- Initialisation ----
window.onload = () => {
  remplirTableaux();
  afficherStats();
  afficherGraphique();
};
