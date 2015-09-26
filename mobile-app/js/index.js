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
      $('#view-stores').show();
      methods.showAllStores(storesData, $('.stores-container'), categoriesData);
      break;
    case 'menu-qrcode':
      $('#view-qrcode').show();
      break;
    case 'menu-awards':
      $('#view-awards').show();
      break;
    case 'menu-favorites':
      $('#view-favorites').show();
      break;
    case 'menu-settings':
      $('#view-settings').show();
      break;
  }
});

$('.view-menu').on('click', function(){
  if($(this).hasClass('selected')){ return; }
  $('.view-menu').removeClass('selected');
  $(this).addClass('selected');
  switch($(this).attr('id')){
    case 'stores-all':
      $('.categories-container').removeClass('selected'); $('.stores-container').addClass('selected');
      methods.showAllStores(storesData, $('.stores-container'), categoriesData);
      break;
    case 'stores-categories':
      $('.stores-container').removeClass('selected'); $('.categories-container').addClass('selected');
      methods.showCategories(categoriesData, $('.categories-container'));
      break;
  }
});

var categoriesData = [
  {id: '1', name: 'Restauração'},
  {id: '2', name: 'Vestuário'},
  {id: '3', name: 'Perfumaria'},
  {id: '4', name: 'Acessórios'},
  {id: '5', name: 'Sapatarias'}
];

var storesData = {
  "stores": [
    {"id" : "1", name: "Vitaminas", categorie: "1", favorite: false, image: "assets/vitaminas.jpg", decription: "Descrição breve da oferta"},
    {"id" : "2", name: "Primark", categorie: "1", favorite: false, image: "assets/vitaminas.jpg", decription: "Descrição breve da oferta"},
    {"id" : "3", name: "Berska", categorie: "2", favorite: false, image: "assets/vitaminas.jpg", decription: "Descrição breve da oferta"},
    {"id" : "4", name: "H3", categorie: "1", favorite: false, image: "assets/vitaminas.jpg", decription: "Descrição breve da oferta"},
    {"id" : "5", name: "Gardenia", categorie: "5", favorite: false, image: "assets/vitaminas.jpg", decription: "Descrição breve da oferta"},
    {"id" : "6", name: "Urban Beach", categorie: "2", favorite: false, image: "assets/vitaminas.jpg", decription: "Descrição breve da oferta"},
    {"id" : "7", name: "Mr. Blue", categorie: "2", favorite: false, image: "assets/vitaminas.jpg", decription: "Descrição breve da oferta"},
    {"id" : "8", name: "Pizza Hut", categorie: "1", favorite: false, image: "assets/vitaminas.jpg", decription: "Descrição breve da oferta"},
    {"id" : "9", name: "Pinkie", categorie: "2", favorite: false, image: "assets/vitaminas.jpg", decription: "Descrição breve da oferta"},
    {"id" : "10", name: "Perfumes & Companhia", categorie: "3", favorite: false, image: "assets/vitaminas.jpg", decription: "Descrição breve da oferta"}
  ]
};