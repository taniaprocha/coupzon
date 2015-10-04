var awardsData = [
  {id: 1,  store: 1,  brand: 1,  validity: 1444867200,  title: "Vale uma sandes á escolha Vale uma sandes á escolha", description: "Na compra de qualquer salada, o Vitaminas ofereçe uma sandes á sua companhia."},
  {id: 2,  store: 3,  brand: 1,  validity: 1445558400,  title: "50% na segunda compra", description: "50% a partir do segundo artigo comprado", store: 2},
  {id: 3,  store: 5,  brand: 10, validity: 1444003200,  title: "5% de desconto nas suas proximas 5 compras", description: "Queremos voltar a vê-lo em breve, para isso oferecemos-lhe 5% de desconto nas suas proximas 5 compras."},
  {id: 4,  store: 7,  brand: 3,  validity: 1444003200,  title: "2 dias de 50% de desconto", description: "Você escolhe os 2 dias em que vai usufruir do seu desconto."},
  {id: 5,  store: 8,  brand: 3,  validity: 1445558400,  title: "Vale uma refeição para duas pessoas", description: "Traga a sua companhia e usufrua desta refeição que lhe estamos a oferecer."},
  {id: 6,  store: 15, brand: 4,  validity: 1445558400,  title: "Desconto de 30€", description: "Desconto de 30€ em qualquer compra superior a 50€. Dispõe de 10 dias para usufruir do seu prémio"},
  {id: 7,  store: 10, brand: 3,  validity: 1445558400,  title: "Vale 10€", description: "Desconto de 10€ em qualquer compra superior a 30€. Dispõe de 10 dias para usufruir do seu prémio"},
  {id: 8,  store: 12, brand: 9,  validity: 1444003200,  title: "Desconto de 60€", description: "Desconto de 60€ em qualquer compra superior a 50€. Dispõe de 4 dias para usufruir do seu prémio"},
  {id: 9,  store: 13, brand: 2,  validity: 1445558400,  title: "Desconto de 40€", description: "Desconto de 40€ em qualquer compra superior a 50€. Dispõe de 10 dias para usufruir do seu prémio"},
  {id: 10, store: 14, brand: 8,  validity: 1444867200,  title: "Desconto de 10€", description: "Desconto de 10€ em qualquer compra superior a 50€. Dispõe de 7 dias para usufruir do seu prémio"},
  {id: 11, store: 9,  brand: 3,  validity: 1444867200,  title: "Desconto de 20€", description: "Desconto de 20€ em qualquer compra superior a 50€. Dispõe de 10 dias para usufruir do seu prémio"}

];

var brandsData =[
  {id: 1, name: "Vitaminas",            categorie: 1, image: "assets/1000345.jpg"},
  {id: 2, name: "Pizza Hut",            categorie: 1, image: "assets/pizza-hut.jpg"},
  {id: 3, name: "H3 Hamburger Gourmet", categorie: 1, image: "assets/p2_h3_s.jpg"},
  {id: 4, name: "Perfumes & Companhia", categorie: 3, image: "assets/logo_perfumes.jpg"},
  {id: 5, name: "Berska",               categorie: 2, image: "assets/bershka-logo.jpg"},
  {id: 5, name: "KIKO",                 categorie: 3, image: ""},
  {id: 6, name: "Gardénia",             categorie: 5, image: "assets/logo.png"},
  {id: 7, name: "Urban Beach",          categorie: 2, image: "assets/k-urban-beach-lisboa.jpg"},
  {id: 8, name: "Pinkie",               categorie: 2, image: "assets/pimkie-logo.jpg"},
  {id: 9, name: "Mr. Blue",             categorie: 2, image: "assets/mr_blue_porto_airport_may2011_1.jpg"},
  {id: 10, name: "Primark",             categorie: 2, image: "assets/primark-emprego.jpeg"}
];

var storesData = [
  {id : 1, city: 2, brand: 1, name: "Vitaminas",             local: "Alegro",          favorite: false, description: "", address: "", contacts: ""},
  {id : 2, city: 2, brand: 1, name: "Vitaminas",             local: "Central Park",    favorite: false, description: "", address: "", contacts: ""},
  {id : 3, city: 1, brand: 1, name: "Vitaminas",             local: "Rua Garrett",     favorite: false, description: "", address: "Rua Garrett, n69/71, loja A r/c 1200-203 Lisboa", contacts: ""},
  {id : 4, city: 5, brand: 6, name: "Gardenia",              local: "Alegro",          favorite: false, description: "", address: "", contacts: ""},  
  {id : 5, city: 2, brand: 0, name: "Primark",               local: "Colombo",         favorite: false, description: "", address: "", contacts: ""},
  {id : 6, city: 5, brand: 5, name: "Berska",                local: "Alegro",          favorite: false, description: "", address: "", contacts: ""},
  {id : 7, city: 10, brand: 3, name: "H3 Hamburger Gourmet", local: "Dolce Vita Tejo", favorite: false, description: "", address: "", contacts: ""},
  {id : 8, city: 2, brand: 3, name: "H3 Hamburger Gourmet",  local: "Central Park",    favorite: false, description: "", address: "", contacts: ""},
  {id : 9, city: 2, brand: 3, name: "H3 Hamburger Gourmet",  local: "Oeiras Parque",   favorite: false, description: "", address: "", contacts: ""},
  {id : 10, city: 3, brand: 3, name: "H3 Hamburger Gourmet", local: "CascaiShopping",  favorite: false, description: "", address: "", contacts: ""},
  {id : 11, city: 6, brand: 7, name: "Urban Beach",          local: "",                favorite: false, description: "", address: "", contacts: ""},
  {id : 12, city: 7, brand: 9, name: "Mr. Blue",             local: "",                favorite: false, description: "", address: "", contacts: ""},
  {id : 13, city: 8, brand: 2, name: "Pizza Hut",            local: "",                favorite: false, description: "", address: "", contacts: ""},
  {id : 14, city: 9, brand: 8, name: "Pinkie",               local: "",                favorite: false, description: "", address: "", contacts: ""},
  {id : 15, city: 2, brand: 4, name: "Perfumes & Companhia", local: "Alegro",          favorite: false, description: "", address: "", contacts: "+351 210 100 144"},
  {id : 16, city: 2, brand: 4, name: "Perfumes & Companhia", local: "Oeiras Parque",   favorite: false, description: "", address: "", contacts: ""}
];

var categoriesData = [
  {id: 1, name: 'Restauração'},
  {id: 2, name: 'Vestuário'},
  {id: 3, name: 'Saúde e Beleza'},
  {id: 4, name: 'Acessórios'},
  {id: 5, name: 'Calçado'}
];

var citiesData = [
  {id: 1, name: 'Viana do Castelo'},
  {id: 2, name: 'Braga'},
  {id: 3, name: 'Vila Real'},
  {id: 4, name: 'Bragança'},
  {id: 5, name: 'Porto'},
  {id: 6, name: 'Aveiro'},
  {id: 7, name: 'Viseu'},
  {id: 8, name: 'Guarda'},
  {id: 9, name: 'Coimbra'},
  {id: 10, name: 'Castelo Branco'},
  {id: 11, name: 'Leiria'},
  {id: 12, name: 'Santarém'},
  {id: 13, name: 'Portalegre'},
  {id: 14, name: 'Lisboa'},
  {id: 15, name: 'Évora'},
  {id: 16, name: 'Setúbal'},
  {id: 17, name: 'Beja'},
  {id: 18, name: 'Faro'}
];