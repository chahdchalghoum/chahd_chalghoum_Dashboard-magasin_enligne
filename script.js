// ===== Tableaux initiaux =====
let produits = [
  { nom: "TV Samsung 4K", prix: 1800, stock: 8 },
  { nom: "Machine à laver LG", prix: 1200, stock: 5 },
  { nom: "Laptop HP i5", prix: 2200, stock: 3 },
  { nom: "Climatiseur Samsung", prix: 1500, stock: 4 },
  { nom: "Micro-ondes Toshiba", prix: 350, stock: 10 }
];

let clients = [
  { nom: "Ahmed Tounsi", email: "Ahmedtounsi56@gmail.com", ville: "Tunis" },
  { nom: "Lina Abdallah", email: "Linaabd04@gmail.com", ville: "Sousse" },
  { nom: "Sami Chawki", email: "Samichawki@gmail.com", ville: "Sfax" }
];

const tableP = document.querySelector("#tableProduits tbody");
const tableC = document.querySelector("#tableClients tbody");

// ===== Stats =====
function majStats() {
  document.getElementById("nbProduits").textContent = produits.length;
  document.getElementById("nbClients").textContent = clients.length;
}

// ===== Affichage Produits =====
function afficherProduits() {
  tableP.innerHTML = "";
  produits.forEach((p, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.nom}</td>
      <td>${p.prix}</td>
      <td>${p.stock}</td>
      <td>
        <button class="edit-btn">Modifier</button>
        <button class="delete-btn">Supprimer</button>
      </td>
    `;
    //---Modifier les infos dans le tableau des produits
    const editBtn = tr.querySelector(".edit-btn");
    let isEditing = false;

    editBtn.addEventListener("click", () => {
      const tds = tr.querySelectorAll("td");
      if (!isEditing) {
        tds[0].contentEditable = true;
        tds[1].contentEditable = true;
        tds[2].contentEditable = true;
        tr.style.backgroundColor = "#334155";
        editBtn.textContent = "Enregistrer";
        isEditing = true;
      } else {
        produits[i].nom = tds[0].textContent;
        produits[i].prix = parseFloat(tds[1].textContent);
        produits[i].stoczsk = parseInt(tds[2].textContent);
        tds[0].contentEditable = false;
        tds[1].contentEditable = false;
        tds[2].contentEditable = false;
        tr.style.backgroundColor = "";
        editBtn.textContent = "Modifier";
        isEditing = false;
      }
    });

    tr.querySelector(".delete-btn").addEventListener("click", () => {
      produits.splice(i, 1);
      afficherProduits();
      updateSalesChart();
    });

    tableP.appendChild(tr);
  });
  majStats();
}

// ===== Affichage Clients =====
function afficherClients() {
  tableC.innerHTML = "";
  clients.forEach((c, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.nom}</td>
      <td>${c.email}</td>
      <td>${c.ville}</td>
      <td>
        <button class="edit-btn">Modifier</button>
        <button class="delete-btn">Supprimer</button>
      </td>
    `;
    //---modifier les infos dans le tableau des clients---
    const editBtn = tr.querySelector(".edit-btn");
    let isEditing = false;

    editBtn.addEventListener("click", () => {
      const tds = tr.querySelectorAll("td");
      if (!isEditing) {
        tds[0].contentEditable = true;
        tds[1].contentEditable = true;
        tds[2].contentEditable = true;
        tr.style.backgroundColor = "#334155";
        editBtn.textContent = "Enregistrer";
        isEditing = true;
      } else {
        clients[i].nom = tds[0].textContent;
        clients[i].email = tds[1].textContent;
        clients[i].ville = tds[2].textContent;
        tds[0].contentEditable = false;
        tds[1].contentEditable = false;
        tds[2].contentEditable = false;
        tr.style.backgroundColor = "";
        editBtn.textContent = "Modifier";
        isEditing = false;
      }
    });

    tr.querySelector(".delete-btn").addEventListener("click", () => {
      clients.splice(i, 1);
      afficherClients();
    });

    tableC.appendChild(tr);
  });
  majStats();
}

// ===== Ajout Produit =====
document.getElementById("ajoutproduit").addEventListener("submit", e => {
  e.preventDefault();
  produits.push({
    nom: document.getElementById("nomProduit").value,
    prix: parseFloat(document.getElementById("prixProduit").value),
    stock: parseInt(document.getElementById("stockProduit").value)
  });
  afficherProduits();
  updateSalesChart();
  e.target.reset();
});

// ===== Ajout Client =====
document.getElementById("ajoutclient").addEventListener("submit", e => {
  e.preventDefault();
  clients.push({
    nom: document.getElementById("nomClient").value,
    email: document.getElementById("emailClient").value,
    ville: document.getElementById("villeClient").value
  });
  afficherClients();
  e.target.reset();
});

// ===== Recherche d'un Produit =====
document.getElementById("rechercheproduit").addEventListener("input", e => {
  const search = e.target.value.toLowerCase();
  tableP.querySelectorAll("tr").forEach(tr => {
    const nom = tr.cells[0].textContent.toLowerCase();
    const prix = tr.cells[1].textContent.toLowerCase();
    const stock = tr.cells[2].textContent.toLowerCase();
    tr.style.display = nom.includes(search) || prix.includes(search) || stock.includes(search) ? "" : "none";
  });
});

// ===== Recherche d'un Client =====
document.getElementById("rechercheclients").addEventListener("input", e => {
  const search = e.target.value.toLowerCase();
  tableC.querySelectorAll("tr").forEach(tr => {
    const nom = tr.cells[0].textContent.toLowerCase();
    const email = tr.cells[1].textContent.toLowerCase();
    const ville = tr.cells[2].textContent.toLowerCase();
    tr.style.display = nom.includes(search) || email.includes(search) || ville.includes(search) ? "" : "none";
  });
});

// ===== Charts =====
// Ventes mensuelles
const salesChartCtx = document.getElementById("salesChart").getContext("2d");
let salesChart = new Chart(salesChartCtx, {
  type: "line",
  data: {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [{
      label: "Ventes (dt)",
      data: [500, 900, 1200, 700, 1600, 1800],
      borderWidth: 3,
      borderColor: "#38bdf8",
      backgroundColor: "rgba(56, 189, 248,0.2)",
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: true } }
  }
});

function updateSalesChart() {
  salesChart.data.datasets[0].data = produits.map(p => p.prix); // exemple simple : prix des produits
  salesChart.update();
}

// Répartition des catégories
const categoryChartCtx = document.getElementById("categoryChart").getContext("2d");
new Chart(categoryChartCtx, {
  type: "pie",
  data: {
    labels: ["Électroménager", "Cuisine", "Électronique", "Informatique"],
    datasets: [{
      data: [40, 25, 20, 15],
      backgroundColor: ["#38bdf8", "#a9f1c4ff", "#ef4444", "#facc15"]
    }]
  },
  options: {
    responsive: true,
    plugins: { 
      legend: {
         position: "bottom" ,
         labels: {
          color: "#f6f7fbff", 
          font: {
            size: 11,
            weight: "bold"
          }
        }
        } 
      }

    
  }
});

// ===== Initialisation =====
afficherProduits();
afficherClients();
