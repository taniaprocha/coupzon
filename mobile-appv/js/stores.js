
var awardsData = [
  {id: 1,   store: 1,  validity: 1444867200,  title: "Vale uma sandes á escolha Vale uma sandes á escolha Vale uma sandes á escolha", description: "Na compra de qualquer salada, o Vitaminas ofereçe uma sandes á sua companhia."},
  {id: 2,   store: 3,  validity: 1445558400,  title: "50% na segunda compra", description: "50% a partir do segundo artigo comprado", store: 2},
  {id: 3,   store: 5,  validity: 1444003200,  title: "5% de desconto nas suas proximas 5 compras", description: "Queremos voltar a vê-lo em breve, para isso oferecemos-lhe 5% de desconto nas suas proximas 5 compras."},
  {id: 4,   store: 11, validity: 1444003200,  title: "2 dias de 50% de desconto", description: "Você escolhe os 2 dias em que vai usufruir do seu desconto."}/*,
  {id: 5,   store: 12, validity: 1445558400,  title: "Vale uma refeição para duas pessoas", description: "Traga a sua companhia e usufrua desta refeição que lhe estamos a oferecer."},
  {id: 6,   store: 19, validity: 1445558400,  title: "Desconto de 30€", description: "Desconto de 30€ em qualquer compra superior a 50€. Dispõe de 10 dias para usufruir do seu prémio"},
  {id: 7,   store: 13, validity: 1445558400,  title: "Vale 10€", description: "Desconto de 10€ em qualquer compra superior a 30€. Dispõe de 10 dias para usufruir do seu prémio"},
  {id: 8,   store: 16, validity: 1444003200,  title: "Desconto de 60€", description: "Desconto de 60€ em qualquer compra superior a 50€. Dispõe de 4 dias para usufruir do seu prémio"},
  {id: 9,   store: 13, validity: 1445558400,  title: "Desconto de 40€", description: "Desconto de 40€ em qualquer compra superior a 50€. Dispõe de 10 dias para usufruir do seu prémio"},
  {id: 10,  store: 18, validity: 1444867200,  title: "Desconto de 10€", description: "Desconto de 10€ em qualquer compra superior a 50€. Dispõe de 7 dias para usufruir do seu prémio"},
  {id: 11,  store: 14, validity: 1444867200,  title: "Desconto de 20€", description: "Desconto de 20€ em qualquer compra superior a 50€. Dispõe de 10 dias para usufruir do seu prémio"},
  {id: 12,  store: 10, validity: 1444003200,  title: "2 dias de 50% de desconto", description: "Você escolhe os 2 dias em que vai usufruir do seu desconto."},
  {id: 13,  store: 20, validity: 1445558400,  title: "Desconto de 30€", description: "Desconto de 30€ em qualquer compra superior a 50€. Dispõe de 10 dias para usufruir do seu prémio"},
  {id: 12,  store: 15, validity: 1444003200,  title: "2 dias de 50% de desconto", description: "Você escolhe os 2 dias em que vai usufruir do seu desconto."},
  {id: 13,  store: 21, validity: 1444003200,  title: "Oferta de um verniz numa compra superior a 10€", description: "Oferta de um verniz numa compra superior a 10€."},
  {id: 14,  store: 8,  validity: 1444003200,  title: "Oferta de um verniz numa compra superior a 10€", description: "Oferta de um verniz numa compra superior a 10€."}*/
];

var brandsData =[
  {id: 1, name: "Vitaminas",            categorie: 1, image: "assets/1000345.jpg", description: "O nosso menu oferece-lhe os alimentos mais saudáveis que pode encontrar num restaurante: vegetais, fruta, queijos, massas, carnes brancas, peixes e cereais de excelente qualidade. E na forma mais simples e rápida de satisfazer o seu prazer: saladas, sandes e sumos. Esperamos por si, sabemos que vai voltar."},
  {id: 2, name: "Pizza Hut",            categorie: 1, image: "assets/pizza-hut.jpg", description: "Em 1958, o conceito de pizzaria era ainda relativamente novo para a maioria dos americanos. Frank e Dan Carney, então estudantes universitários, aceitaram o desafio de um amigo da família e iniciaram a Pizza Hut com um pequeno empréstimo de 600 dólares cortesia da mãe."},
  {id: 3, name: "H3 Hamburger Gourmet", categorie: 1, image: "assets/p2_h3_s.jpg", description: "Porque o calor começa a apertar, lançámos um novo hambúrguer com espinafres frescos, molho de iogurte e hortelã, tomate e cebola roxa. Não deixe de provar antes que acabe, porque o h3 Verão é uma edição limitada."},
  {id: 4, name: "Perfumes & Companhia", categorie: 3, image: "assets/logo_perfumes.jpg", description: "The P&C – Perfumes & Companhia, SA is currently the largest chain of Selective Perfumeries in Portugal, having asserted itself in the Portuguese market as the most dynamic and complete reference in this sector. It is a 100% Portuguese family company, in the market since 1981."},
  {id: 5, name: "Berska",               categorie: 2, image: "assets/bershka-logo.jpg", description: "Bershka é uma companhia de lojas de roupas que pertence ao grupo Inditex, ao qual pertence também a Zara. Esta companhia foi criada em Abril de 1998 com o objectivo de cativar o mercado jovem e juvenil."},
  {id: 6, name: "KIKO",                 categorie: 3, image: "assets/transferir.png", description: "KIKO MILANO, marca italiana de cosméticos de maquilhagem e de cuidados para a pele. Produtos de beleza e tratamentos para o rosto e para o corpo de elevada qualidade, seguros e eficazes, criados para satisfazer os desejos de beleza das mulheres de todas as idades."},
  {id: 7, name: "Gardénia",             categorie: 5, image: "assets/logo.png", description: "As Lojas GARDENIA são um ícone da moda em Lisboa, desde 1988. Cada uma das suas lojas é um espaço único, com identidade própria, combinando o clássico com o moderno, o glamour com o urbano casual. O atendimento, sendo muito cordial e personalizado, cada cliente é tratado como especial e único. A loja mais antiga é um local a não perder, Casa centenária, classificada como património arquitectónico, da autoria do arquitecto Raúl Lino – 1917, no Chiado – Rua Garrett, 54. Recheada com marcas de referência como XUZ, DNKY, HUNTER, UGG, FLY LONDON, DKODE, DYSFUNCTIONAL, SAHOCO, GUESS, CUBANAS, PARIS HILTON, ELEVEN PARIS, LEMON JELLY entre outras."},
  {id: 8, name: "Starbucks",            categorie: 1, image: "assets/Starbucks.png", description: "Starbucks Corporation, doing business as Starbucks Coffee, is an American coffee company and coffeehouse chain based in Seattle, Washington. Starbucks is the largest coffeehouse company in the world, with 22,766 stores in 65 countries and territories, including 12,802 in the United States, 1,930 in China, 1,409 in Canada, 1,121 in Japan and 825 in the United Kingdom."},
  {id: 9, name: "Pinkie",               categorie: 2, image: "assets/pimkie-logo.jpg", description: "Marca francesa de vestuário e acessórios de mulher. As lojas Pimkie em Portugal estão localizadas em centros comerciais."},
  {id: 10, name: "Mr. Blue",            categorie: 2, image: "assets/mr_blue_porto_airport_may2011_1.jpg", description: "A Mr. Blue é uma marca europeia para quem gosta de viver com estilo. A roupa tem um design intemporal, tecidos cuidadosamente escolhidos, confecionados com elevada qualidade e com preços acessíveis. Na Mr. Blue encontra uma enorme variedade de produtos para as mais variadas ocasiões, um fim-de-semana em familia, uma importante reunião de negócios, uma festa de empresa ou para um jantar descontraido entre amigos. "},
  {id: 11, name: "Primark",             categorie: 2, image: "assets/primark-emprego.jpeg", description: "Adorada pelos fãs da moda e por quem procura valor, a Primark está fortemente estabelecida como a loja de opção para quem pretende acompanhar as tendências mais atuais de forma acessível."}
];

var storesData = [
  {id : 1,  city: 2,  brand: 1,  local: "Alegro Alfragide",             favorite: false, address: "Alegro Alfragide, Av. Dos Cavaleiros - Outorela - Carnaxide 2790-045 Carnaxide", email: '', phone: '218166590'},
  {id : 2,  city: 2,  brand: 1,  local: "Dolce Vita Central Park",      favorite: false, address: "Dolce Vita Tejo, loja 1117 Av. Cruzeiro Seixas, nº 5 e 7 2650-504 Amadora", email: '', phone: '218166590'},
  {id : 3,  city: 14, brand: 1,  local: "Rua Garrett",                  favorite: true,  address: "Rua Garrett, n69/71 1200-203 Lisboa", email: '', phone: '218166590'},
  {id : 4,  city: 14, brand: 1,  local: "Forum Sintra",                 favorite: false, address: "RuIC 19 - Alto do Forte 2635-018 Sintra", email: '', phone: '218166590'},
  {id : 5,  city: 2,  brand: 1,  local: "Braga Parque",                 favorite: false, address: "Quinta dos Congregados 4710-427 Braga", email: '', phone: '218166590'},
  {id : 6,  city: 14, brand: 1,  local: "Odivelas Parque",              favorite: false, address: "Estrada da Paiã – Casal do Troca 2675-626 Odivelas", email: '', phone: '218166590'},
  {id : 7,  city: 18, brand: 1,  local: "Forum Algarve",                favorite: false, address: "E.N. 125 8009-126 Faro", email: '', phone: '218166590'}, 
  {id : 8,  city: 5,  brand: 6,  local: "CARNAXIDE - Alegro Alfragide", favorite: true,  address: "Avenida dos Cavaleiros 2790 CARNAXIDE, Portugal", email: '', phone: '+351 214180621'}, 
  {id : 9,  city: 2,  brand: 10, local: "Centro Comercial Colombo",     favorite: false, address: "", email: '', phone: ''},
  {id : 10, city: 5,  brand: 5,  local: "Alegro Alfragide",             favorite: false, address: "", email: '', phone: ''},
  {id : 11, city: 10, brand: 3,  local: "Dolce Vita Tejo",              favorite: false, address: "Avenida dos Cavaleiros 60, 2790-045 Carnaxide", email: 'geral@h3.com', phone: '+351 96 505 44 01'},
  {id : 12, city: 2,  brand: 3,  local: "Dolce Vita Central Park",      favorite: true,  address: "Avenida 25 de Abril, 2795-195 Oeiras", email: 'geral@h3.com', phone: '+351 92 635 18 62'},
  {id : 13, city: 2,  brand: 3,  local: "Oeiras Parque",                favorite: false, address: "Av. António Bernardo Cabral de Macedo, 2770-219 Oeiras", email: 'geral@h3.com', phone: ' +351 96 969 66 51'},
  {id : 14, city: 3,  brand: 3,  local: "CascaiShopping",               favorite: false, address: "Estrada Nacional 9, 2645-543 Alcabideche, Cascais", email: 'geral@h3.com', phone: '+351 92 560 10 23'},
  {id : 15, city: 6,  brand: 7,  local: "Cais da Viscondessa",          favorite: false, address: "GARRETT, 54 - CHIADO 1200 - 204 LISBOA", email: 'mailto:info.online@gardenia.com.pt', phone: '93 451 31 58'},
  {id : 16, city: 7,  brand: 9,  local: "Centro Comercial Colombo",     favorite: false, address: "Av. Lusíada, Loja 0 1500-392 Lisboa", email: '', phone: '21 716 65 62'},
  {id : 17, city: 8,  brand: 2,  local: "Pizza Hut Carnaxide",          favorite: false, address: "Av. De Portugal, Lote 6, Loja 3 Centro Cívico de Carnaxide 2790-161 CARNAXIDE", email: '', phone: '222 444 222'},
  {id : 18, city: 9,  brand: 8,  local: "Centro Comercial Colombo",     favorite: true,  address: "", email: '', phone: ''},
  {id : 19, city: 2,  brand: 4,  local: "Alegro Alfragide",             favorite: false, address: "", email: '', phone: '+351 210 100 144'},
  {id : 20, city: 2,  brand: 4,  local: "Oeiras Parque",                favorite: false, address: "", email: '', phone: ''},
  {id : 21, city: 1,  brand: 6,  local: "Estação Viana Shopping",       favorite: true,  address: "", email: '', phone: ''},
  {id : 22, city: 2,  brand: 6,  local: "VIANA - Estação",              favorite: false, address: "Cc Estação Viana Shopping 4900-317 VIANA, Portugal", email: 'www.kikocosmetics.com', phone: '+351 258847779'}, 
  {id : 23, city: 2,  brand: 6,  local: "BRAGA - Parque",               favorite: false, address: "Cc Braga Parque 4700 BRAGA, Portugal", email: 'www.kikocosmetics.com', phone: '+351 253253540'}, 
  {id : 24, city: 7,  brand: 6,  local: "VISEU - Forum",                favorite: false, address: "Cc Forum - Rua D.José Da Cruz 3510-078 VISEU, Portugal", email: 'www.kikocosmetics.com', phone: '+351 232483238'}, 
  {id : 25, city: 18, brand: 6,  local: "PORTIMAO - Aqua Portimão",     favorite: false, address: "Cc Aqua Portimão 8500-282 PORTIMAO, Portugal", email: 'www.kikocosmetics.com', phone: '+351 282424625'} 
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