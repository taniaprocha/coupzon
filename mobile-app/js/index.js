var methods;

$(document).ready(function() {
  var partialW = window.innerWidth;
  var partialH = window.innerHeight;
  $('body').css('height', partialH+'px');
  methods = new storesMethods();
  $('#login-phone').addClass('selected');
  var footerH = $('.footer-menu').height();
  $('#view-qrcode').css({height: (partialH - footerH)+'px' });
  $('#view-stores').css({height: (partialH - footerH)+'px' });
  $('#view-awards').css({height: (partialH - footerH)+'px' });
  $('#view-favorites').css({height: (partialH - footerH)+'px' });
  $('#view-settings').css({height: (partialH - footerH)+'px' });
  setTimeout(function(){
    window.scrollTo(0,1);
  }, 1000);
});

window.onload = function () {
  console.log('onload - requesting full screen')
};

$('#login-number').on('click', function(){
  $('.container-view').removeClass('selected');
  $('#login-password').addClass('selected');
});

$('#login-password').on('click', function(){
  $('.container-view').removeClass('selected');
  $('#view-qrcode').show();
  $('.footer-menu').addClass('selected');
});

$('.menu-container').on('click', function(){
  var id= $(this).attr('id');
  $('.menu-container').removeClass('selected')
  $(this).addClass('selected');
  $('.container-view').hide();
  console.log(id);
  switch(id){
    case 'menu-stores':
      $('#view-stores').show(); $('#tab').animate({marginLeft: '40%'}, 100);
      methods.showAllStores(storesData, $('.stores-container'), categoriesData, awardsData);
      break;
    case 'menu-qrcode':
      $('#view-qrcode').show(); $('#tab').animate({marginLeft: '0%'}, 100);
      break;
    case 'menu-awards':
      $('#view-awards').show(); $('#tab').animate({marginLeft: '20%'}, 100);
      methods.showAllAwards(awardsData, storesData, $('.awards-container'));
      break;
    case 'menu-favorites':
      $('#view-favorites').show(); $('#tab').animate({marginLeft: '60%'}, 100);
      break;
    case 'menu-settings':
      $('#view-settings').show(); $('#tab').animate({marginLeft: '80%'}, 100);
      break;
  }
});

$('.view-menu').on('click', function(){
  if($(this).hasClass('selected')){ return; }
  $('.view-menu').removeClass('selected');
  $(this).addClass('selected');
  switch($(this).attr('id')){
    case 'stores-all':
      $('.categories-container').removeClass('selected'); $('.locations-container').removeClass('selected'); $('.stores-container').addClass('selected');
      methods.showAllStores(storesData, $('.stores-container'), categoriesData, awardsData);
      break;
    case 'stores-categories':
      $('.stores-container').removeClass('selected'); $('.locations-container').removeClass('selected'); $('.categories-container').addClass('selected');
      methods.showCategories(categoriesData, $('.categories-container'));
      break;
    case 'stores-locations':
      $('.categories-container').removeClass('selected'); $('.stores-container').removeClass('selected'); $('.locations-container').addClass('selected');
      methods.showLocations(locationsData, $('.locations-container'));
      break;
  }
});

var awardsData = [
  {id: 1, title: "Vale uma sandes á escolha", description: "Na compra de qualquer salada, o Vitaminas ofereçe uma sandes á sua companhia.", store: 1},
  {id: 2, title: "50% na segunda compra", description: "50% a partir do segundo artigo comprado", store: 2},
  {id: 3, title: "2 dias de 50% de desconto", description: "Você escolhe os 2 dias em que vai usufruir do seu desconto.", store: 3},
  {id: 4, title: "Vale uma refeição para duas pessoas", description: "Traga a sua companhia e usufrua desta refeição que lhe estamos a oferecer.", store: 1},
  {id: 5, title: "5% de desconto nas suas proximas 5 compras", description: "Queremos voltar a vê-lo em breve, para isso oferecemos-lhe 5% de desconto nas suas proximas 5 compras.", store: 5},
  {id: 6, title: "Desconto de 30€", description: "Desconto de 30€ em qualquer compra superior a 50€. Dispõe de 10 dias para usufruir do seu prémio", store: 2},
  {id: 7, title: "Vale 10€", description: "Desconto de 10€ em qualquer compra superior a 30€. Dispõe de 10 dias para usufruir do seu prémio", store: 10},
  {id: 8, title: "Desconto de 20€", description: "Desconto de 20€ em qualquer compra superior a 50€. Dispõe de 10 dias para usufruir do seu prémio", store: 7}
];

var storesData = [
  {id : 1, name: "Vitaminas", categorie: 1, favorite: false, localidade: 1, image: "assets/vitaminas.jpg"},
  {id : 2, name: "Primark", categorie: 1, favorite: false, localidade: 2, image: "assets/vitaminas.jpg"},
  {id : 3, name: "Berska", categorie: 2, favorite: false, localidade: 5, image: "assets/vitaminas.jpg"},
  {id : 4, name: "H3", categorie: 1, favorite: false, localidade: 4, image: "assets/vitaminas.jpg"},
  {id : 5, name: "Gardenia", categorie: 5, favorite: false, localidade: 5, image: "assets/vitaminas.jpg"},
  {id : 6, name: "Urban Beach", categorie: 2, favorite: false, localidade: 6, image: "assets/vitaminas.jpg"},
  {id : 7, name: "Mr. Blue", categorie: 2, favorite: false, localidade: 7, image: "assets/vitaminas.jpg"},
  {id : 8, name: "Pizza Hut", categorie: 1, favorite: false, localidade: 8, image: "assets/vitaminas.jpg"},
  {id : 9, name: "Pinkie", categorie: 2, favorite: false, localidade: 9, image: "assets/vitaminas.jpg"},
  {id : 10, name: "Perfumes & Companhia", categorie: 3, favorite: false, localidade: 9, image: "assets/vitaminas.jpg"}
];

var categoriesData = [
  {id: 1, name: 'Restauração'},
  {id: 2, name: 'Vestuário'},
  {id: 3, name: 'Perfumaria'},
  {id: 4, name: 'Acessórios'},
  {id: 5, name: 'Sapatarias'}
];

var locationsData = [
  {id: 1, name: 'Lisboa'},
  {id: 2, name: 'Oeiras'},
  {id: 3, name: 'Cascais'},
  {id: 4, name: 'Setúbal'},
  {id: 5, name: 'Leiria'},
  {id: 6, name: 'Viana do Castelo'},
  {id: 7, name: 'Porto'},
  {id: 8, name: 'Vila do Conde'},
  {id: 9, name: 'Régua'}
];
