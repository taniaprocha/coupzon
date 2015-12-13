
var awardsData = [
  {id: 1, store: 1, validity: 1444867200, title: "2€ Desconto", description: "Compra superior a 20€ ganha um prémio de 2€"},
  {id: 2, store: 2, validity: 1445558400, title: "5€ Desconto", description: "Cada 3 Check-ins, 5€. 1 Check-in = 30€"},
  {id: 3, store: 3, validity: 1444003200, title: "1 Refeição Grátis", description: "Cada 10 Check-ins, 1 Refeição Grátis. Check-in = 1 Refeição"},
  {id: 4, store: 4, validity: 1444003200, title: "10€ de Desconto", description: "Compra superior a 50€ ganha prémio de 10€."},
  {id: 5, store: 5, validity: 1444003200, title: "1 Bolo de Anos", description: "Cada 5 Check-ins, 1 Bolo de Anos. Check-in = 10€"},
  {id: 6, store: 6, validity: 1444003200, title: "10€ de Desconto", description: "Compra superior a 50€ ganha prémio de 10€."},
  {id: 7, store: 7, validity: 1444003200, title: "1 Refeição Grátis", description: "Cada 10 Check-ins, 1 Refeição Grátis. Check-in = 1 Refeição"},
  {id: 8, store: 8, validity: 1444003200, title: "1 Refeição Grátis", description: "Cada 10 Check-ins, 1 Refeição Grátis. Check-in = 1 Refeição"},
  {id: 9, store: 9, validity: 1444867200, title: "2€ Desconto", description: "Compra superior a 20€ ganha um prémio de 2€"}
];

var brandsData =[];
/*var brandsData =[
  {id: 1, name: "Sapatos e Sapatos",  categorie: 5, checkins: 1,  image: "assets/img4.jpg", description: "A Sapatos e Sapatos produz os melhores Sapatos da Peninsula Ibérica. Neste momento tem 28 Lojas em Portugal e 10 em Espanha."},
  {id: 2, name: "Chapéus Delas",      categorie: 1, checkins: 10, image: "assets/img1.jpg", description: "A Chapéu Delas existe em Portugal desde 1967. Produz os chapéus mais bonitos para as mulheres mais bonitas, todas!"},
  {id: 3, name: "Le Food",            categorie: 1, checkins: 8,  image: "assets/img2.jpg", description: "Le Food oferece a melhor comida saudável. Desde uma salada a um batido, saudável é na Le Food."},
  {id: 4, name: "Aneis e Companhia",  categorie: 4, checkins: 8,  image: "assets/img3.jpg", description: "Somos os melhores de amigos dos homens e das mulheres, pois sabemos o que elas merecem e o que eles lhe devem oferecer."},
  {id: 5, name: "Festanças",          categorie: 1, checkins: 8,  image: "assets/img5.jpg", description: "Bolos e festas é na Festanças! Todos os artigos para as suas festas desde 1645! "}
];*/

var storesData = [];
/*var storesData = [
  {id : 1,  city: 14, brand: 1,  local: "Alegro Alfragide",    favorite: false, address: "Alegro Alfragide, Av. Dos Cavaleiros - Outorela - Carnaxide 2790-045 Carnaxide", email: '', phone: '218166590'},
  {id : 2,  city: 14, brand: 2,  local: "Cais da Viscondessa", favorite: false, address: "GARRETT, 54 - CHIADO 1200 - 204 LISBOA", email: 'mailto:info.online@gardenia.com.pt', phone: '93 451 31 58'},
  {id : 3,  city: 14, brand: 3,  local: "Rua Garrett",         favorite: true,  address: "Rua Garrett, n69/71 1200-203 Lisboa", email: '', phone: '218166590'},
  {id : 4,  city: 14, brand: 1,  local: "Odivelas Parque",     favorite: true,  address: "Estrada da Paiã – Casal do Troca 2675-626 Odivelas", email: '', phone: '218166590'},
  {id : 5,  city: 14, brand: 1,  local: "CascaiShopping",      favorite: true,  address: "Estrada Nacional 9, 2645-543 Alcabideche, Cascais", email: '', phone: '218166590'},
  {id : 6,  city: 14, brand: 4,  local: "Forum Sintra",        favorite: false, address: "RuIC 19 - Alto do Forte 2635-018 Sintra", email: '', phone: '218166590'},
  {id : 7,  city: 2,  brand: 3,  local: "Braga Parque",        favorite: true, address: "Quinta dos Congregados 4710-427 Braga", email: '', phone: '218166590'},
  {id : 8,  city: 1,  brand: 3,  local: "Estação Viana Shopping",    favorite: false, address: "Cc Estação Viana Shopping 4900-317 VIANA, Portugal", email: '', phone: '218166590'},
  {id : 9,  city: 18,  brand: 5,  local: "PORTIMAO - Aqua Portimão", favorite: true, address: "Cc Aqua Portimão 8500-282 PORTIMAO, Portugal", email: '', phone: '218166590'}
];*/

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

var terms = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tempor quam. Praesent suscipit erat vel dolor sodales pharetra. Morbi quis ipsum vulputate, placerat purus viverra, facilisis sem. Vestibulum imperdiet ac risus vel cursus. Curabitur interdum elementum vehicula. Curabitur fermentum, urna eu aliquet ultrices, sem lectus pretium urna, vel rhoncus nunc arcu quis justo. Mauris massa turpis, vulputate sit amet feugiat ut, cursus ut quam. Pellentesque vel nisl in lectus pretium lacinia in ut massa. Sed augue felis, tristique viverra imperdiet ac, sollicitudin nec elit. Curabitur a odio quis lacus tincidunt suscipit ut eu sapien. Vivamus eget nisl et lacus posuere pretium sit amet vel orci. Quisque eu dapibus dui, lacinia ornare neque.';