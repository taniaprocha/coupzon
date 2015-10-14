var methods;

$(document).ready(function() {
  var partialW = window.innerWidth;
  var partialH = window.innerHeight;
  $('body').css('height', partialH+'px');
  methods = new storesMethods();
  
  var footerH = $('.footer-menu').height();
  $('#view-qrcode').css({height: (partialH - footerH)+'px' });
  $('#view-stores').css({height: (partialH - footerH)+'px' });
  $('#view-awards').css({height: (partialH - footerH)+'px' });
  $('#view-favorites').css({height: (partialH - footerH)+'px' });
  $('#view-settings').css({height: (partialH - footerH)+'px' });
  $('#view-store').css({height: (partialH - footerH)+'px' });
  $('#view-award').css({height: (partialH - footerH)+'px' });
  $('#loading-view').addClass('selected');

  setTimeout(function(){
    $('#loading-view').removeClass('selected');
    $('#login-phone').addClass('selected');
  }, 1000);
  /*setTimeout(function(){
    window.scrollTo(0,1);
  }, 1000);*/
});

window.onload = function () {
  console.log('onload - requesting full screen')
};

$('.check-terms').on('click', function(){
  if($(this).find($('.checked')).hasClass('selected') ){
    $(this).find($('.checked')).removeClass('selected');
    $(this).find($('.notchecked')).addClass('selected');
  }else{
    $(this).find($('.notchecked')).removeClass('selected');
    $(this).find($('.checked')).addClass('selected');
  }
});

$('#login-number').on('click', function(){
  $('.container-view').removeClass('selected');
  $('#login-password').addClass('selected');
});

$('#login-password').on('click', function(){
  $('.container-view').removeClass('selected');
  $('#view-qrcode').addClass('selected');
  $('.footer-menu').addClass('selected');
});

$('.menu-container').on('click', function(){
  var id= $(this).attr('id');
  $('.menu-container').removeClass('selected')
  $(this).addClass('selected');
  $('.container-view').removeClass('selected');
  switch(id){
    case 'menu-stores':
      $('#view-stores').addClass('selected'); $('#tab').animate({marginLeft: '40%'}, 100);
      methods.showAllBrands($('.stores-container'), 'stores');
      break;
    case 'menu-qrcode':
      $('#view-qrcode').addClass('selected'); $('#tab').animate({marginLeft: '0%'}, 100);
      break;
    case 'menu-awards':
      $('#view-awards').addClass('selected'); $('#tab').animate({marginLeft: '20%'}, 100);
      methods.showAllBrands($('.stores-container'), 'awards');
      break;
    case 'menu-favorites':
      $('#view-favorites').addClass('selected'); $('#tab').animate({marginLeft: '60%'}, 100);
      methods.showAllBrands($('.stores-container'), 'favorites');
      break;
    case 'menu-settings':
      $('#view-settings').addClass('selected'); $('#tab').animate({marginLeft: '80%'}, 100);
      break;
  }
});

$('.view-menu').on('click', function(){
  if($(this).hasClass('selected') && $('.stores-container').hasClass('selected') === false ){ return; }
  $('.view-menu').removeClass('selected');
  $(this).addClass('selected'); $('#stores-filter').hide();
  var filterArea = 0;  
  switch($(this).attr('id')){
    case 'stores-all':
      $('.categories-container').removeClass('selected'); $('.locations-container').removeClass('selected'); $('.stores-container').addClass('selected');
      methods.showAllBrands($('.stores-container'));
      break;
    case 'stores-categories':
      $('.categories-container').addClass('selected'); $('.stores-container').removeClass('selected'); $('.locations-container').removeClass('selected'); 
      methods.showCategories($('.categories-container .list'));
      filterArea = $('.categories-container').height() - $('.categories-container .filter-container').height();
      $('.categories-container .list').css({height: filterArea+'px'});
      break;
    case 'stores-locations':
      $('.locations-container').addClass('selected'); $('.categories-container').removeClass('selected'); $('.stores-container').removeClass('selected'); 
      methods.showLocations($('.locations-container .list'));
      filterArea = $('.locations-container').height() - $('.locations-container .filter-container').height();
      $('.locations-container .list').css({height: filterArea+'px'});
      break;
  }
});

$('#award-share').on('click', function(){
  $('#view-award').find($('.back')).removeClass('back-award');
  $('#view-award').find($('.back')).addClass('back-share');
  $('.body-container-big.body-selected').hide();
  $('.body-container-big.body-share').show();
});

$('#back-award').on('click', function(){
  console.log('back award');
  if($(this).hasClass('back-award') === true){
    $('.container-view').removeClass('selected');
    $('#view-awards').addClass('selected');
  }else if($(this).hasClass('back-share') === true){
    $('.body-container-big.body-share').hide();
    $('.body-container-big.body-selected').show();
    $(this).removeClass('back-share');
    $(this).addClass('back-award');
  }  
});

$('.settings-menu').on('click', function(){
  $('.settings-container').removeClass('selected');
  if($(this).hasClass('menu-profile') === true){ $('.profile-container').addClass('selected');
  }else if($(this).hasClass('menu-contacts') === true){ $('.contacts-container').addClass('selected');
  }else if($(this).hasClass('menu-faq') === true){ $('.faq-container').addClass('selected');
  }else if($(this).hasClass('menu-terms') === true){ $('.terms-container').addClass('selected');
  }else if($(this).hasClass('menu-language') === true){ $('.language-container').addClass('selected'); }
  $('#back-settings').removeClass('disable');
});

$('#back-settings').on('click', function(){
  $('.settings-container').removeClass('selected');
  $('.settings-menu-container').addClass('selected');
  $(this).addClass('disable');
});

$('.stores-filter').on('click', function(){
  var selectedCategories = [];
  var selectedLocation = [];
  var selectedID = '';
  $('.categorie-container').each(function(){
    if($(this).hasClass('selected') === true){
      selectedID = $(this).attr('id'); selectedID = selectedID.substring(selectedID.indexOf('-')+1, selectedID.length); selectedCategories.push(parseInt(selectedID));
    }
  });
  $('.location-container').each(function(){
    if($(this).hasClass('selected') === true){
      selectedID = $(this).attr('id'); selectedID = selectedID.substring(selectedID.indexOf('-')+1, selectedID.length); selectedLocation.push(parseInt(selectedID));
    }
  });
  var allCat = [];
  var allCities = [];
  if(selectedCategories.length <= 0){
    categoriesData.forEach(function(categorie){
      allCat.push(parseInt(categorie.id));
    });
  }
  if(selectedLocation.length <= 0){
    citiesData.forEach(function(city){
      allCities.push(parseInt(city.id));
    });
  }
  methods.showSelectedStores(selectedCategories, selectedLocation, $('.stores-container'), $('#selected-place'), $('#selected-categories'), allCat, allCities);
  $('.locations-container').removeClass('selected');
  $('.categories-container').removeClass('selected');
  $('.stores-container').addClass('selected');
});



