var awardsData = [
  {id: 1, title: "Vale uma sandes á escolha", brand: 0, store: 1, description: "Na compra de qualquer salada, o Vitaminas ofereçe uma sandes á sua companhia."},
  {id: 2, title: "50% na segunda compra", store: 2, description: "50% a partir do segundo artigo comprado", store: 2},
  {id: 3, title: "5% de desconto nas suas proximas 5 compras", store: 5, description: "Queremos voltar a vê-lo em breve, para isso oferecemos-lhe 5% de desconto nas suas proximas 5 compras."},
  {id: 4, title: "2 dias de 50% de desconto", store: 3, description: "Você escolhe os 2 dias em que vai usufruir do seu desconto."},
  {id: 5, title: "Vale uma refeição para duas pessoas", store: 1, description: "Traga a sua companhia e usufrua desta refeição que lhe estamos a oferecer."},
  {id: 6, title: "Desconto de 30€", store: 2, description: "Desconto de 30€ em qualquer compra superior a 50€. Dispõe de 10 dias para usufruir do seu prémio"},
  {id: 7, title: "Vale 10€", store: 10, description: "Desconto de 10€ em qualquer compra superior a 30€. Dispõe de 10 dias para usufruir do seu prémio"},
  {id: 8, title: "Desconto de 20€", store: 7, description: "Desconto de 20€ em qualquer compra superior a 50€. Dispõe de 10 dias para usufruir do seu prémio"}
];

var brandsData =[
  {id: 1, name: "Vitaminas", categorie: 1, image: "assets/1000345.jpg"},
  {id: 2, name: "Pizza Hut", categorie: 1, image: "assets/pizza-hut.jpg"},
  {id: 3, name: "H3 Hamburger Gourmet", image: "assets/p2_h3_s.jpg"},
  {id: 4, name: "Perfumes & Companhia", categorie: 3, image: "assets/logo_perfumes.jpg"},
  {id: 5, name: "Berska", categorie: 2, image: "assets/bershka-logo.jpg"},
  {id: 5, name: "KIKO", categorie: 3, image: ""},
  {id: 6, name: "Gardénia", categorie: 5, image: ""},
  {id: 7, name: "Urban Beach", categorie: 2, image: ""},
  {id: 8, name: "Pinkie", categorie: 2, image: ""},
  {id: 9, name: "Mr. Blue", categorie: 2, image: ""}
];

var storesData = [
  {id : 1, name: "Vitaminas", local: "Alegro" favorite: false, city: 2, brand: 1, address: "", contacts: ""},
  {id : 2, name: "Vitaminas", local: "Central Park", favorite: false, city: 2, brand: 1, address: "", contacts: ""},
  {id : 3, name: "Vitaminas", local: "Rua Garrett", favorite: false, city: 1, brand: 1, address: "Rua Garrett, n69/71, loja A r/c 1200-203 Lisboa", contacts: ""},
  {id : 4, name: "Gardenia", local: "", favorite: false, city: 5, brand: 0, address: "", contacts: ""},  
  {id : 5, name: "Primark", local: "", categorie: 1, favorite: false, city: 2, brand: 0, address: "", contacts: ""},
  {id : 6, name: "Berska", local: "", favorite: false, city: 5, brand: 5, address: "", contacts: ""},
  {id : 7, name: "H3 Hamburger Gourmet", local: "Dolce Vita Tejo", favorite: false, city: 10, brand: 3, address: "", contacts: ""},
  {id : 8, name: "H3 Hamburger Gourmet", local: "Central Park", categorie: 1, favorite: false, city: 2, brand: 3, address: "", contacts: ""},
  {id : 9, name: "H3 Hamburger Gourmet", local: "Oeiras Parque", categorie: 1, favorite: false, city: 2, brand: 3, address: "", contacts: ""},
  {id : 10, name: "H3 Hamburger Gourmet", local: "CascaiShopping", categorie: 1, favorite: false, city: 3, brand: 3, address: "", contacts: ""},
  {id : 11, name: "Urban Beach", local: "", categorie: 2, favorite: false, city: 6, brand: 7, address: "", contacts: ""},
  {id : 12, name: "Mr. Blue", local: "", categorie: 2, favorite: false, city: 7, brand: 9, address: "", contacts: ""},
  {id : 13, name: "Pizza Hut", local: "", favorite: false, city: 8, brand: 2, address: "", contacts: ""},
  {id : 14, name: "Pinkie", local: "", categorie: 2, favorite: false, city: 9, brand: 8, address: "", contacts: ""},
  {id : 15, name: "Perfumes & Companhia", local: "Alegro", favorite: false, city: 2, brand: 4, address: "", contacts: "+351 210 100 144"},
  {id : 15, name: "Perfumes & Companhia", local: "Oeiras Parque", categorie: 3, favorite: false, city: 2, brand: 4, address: "", contacts: ""}
];

var categoriesData = [
  {id: 1, name: 'Restauração'},
  {id: 2, name: 'Vestuário'},
  {id: 3, name: 'Saúde e Beleza'},
  {id: 4, name: 'Acessórios'},
  {id: 5, name: 'Calçado'}
];

var citiesData = [
  {id: 1, name: 'Lisboa'},
  {id: 2, name: 'Oeiras'},
  {id: 3, name: 'Cascais'},
  {id: 4, name: 'Setúbal'},
  {id: 5, name: 'Leiria'},
  {id: 6, name: 'Viana do Castelo'},
  {id: 7, name: 'Porto'},
  {id: 8, name: 'Figueira da Foz'},
  {id: 9, name: 'Faro'},
  {id: 10, name: 'Amadora'},
  {id: 11, name: 'Braga'},
  {id: 12, name: 'Guimarães'},
  {id: 13, name: 'Coimbra'}
];