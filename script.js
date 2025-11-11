let produits = [];
let clients = [];

document.getElementById(produits).addEventListener("submit",function(ajout){
  let nom=document.getElementById("nomProduit").value;
  let prix=document.getElementById("prixProduit").value;
  let stock=document.getElementById("stockProduit").value;
  produits.push({nom,prix,stock})
  afficherProduits()
})
