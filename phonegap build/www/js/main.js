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

  $('#view-settings .terms').text(terms);
  setTimeout(function(){
    $('.message-loading').addClass('show');
  }, 300);
  $('#loading').delay(5000).animate({marginTop: '-20rem', opacity: 0}, 150, function(){
    setTimeout(function(){
      $('#loading-view').removeClass('selected');
      $('#login-phone').addClass('selected');
      $('#login-phone').animate({opacity: 1}, 300);
    }, 200);
  });  
});

$('.check-terms').on('click', function(){
  if($(this).find($('.checked')).hasClass('selected') ){
    $(this).find($('.checked')).removeClass('selected');
    $(this).find($('.notchecked')).addClass('selected');
  }else{
    $(this).find($('.notchecked')).removeClass('selected');
    $(this).find($('.checked')).addClass('selected');
  }
});

$('#input-number').on('click', function(){
  $(this).focus();
});

$('#input-password').on('click', function(){
  $(this).focus();
});

$('#login-number').on('click', function(){
  if($('#input-number').val() === '' && $('.check-terms').find($('.checked')).hasClass('selected') === false){
    $('.insert-number-title').addClass('alert'); $('.check-title').addClass('alert'); return;
  }
  if($('#input-number').val() === ''){ $('.insert-number-title.title').addClass('alert'); return; }
  if($('.check-terms').find($('.checked')).hasClass('selected') === false){ $('.check-title').addClass('alert'); return; }
  $('.check-title').removeClass('alert'); $('.insert-number-title').removeClass('alert'); 
  $('.container-view').removeClass('selected'); $('#login-password').addClass('selected');
});

$('#phone-password').on('click', function(){
  if($('#input-password').val() === ''){ $('.insert-password-title').addClass('alert'); return; }
  $('.insert-password-title').removeClass('alert'); 
  $('.container-view').removeClass('selected');
  $('#view-qrcode').addClass('selected');
  $('.footer-menu').addClass('selected');
});

$('#logout').on('click', function(){
  location.reload();
});

$('#view-stores .search-btn').on('click', function(){
  $('#search-input').val(''); $('.search-container.stores').show();
  $('#view-stores .search-container.stores').animate({opacity:1, top: $('.view-menu-container').offset().top+'px'}, 200);
});

$('.close-search-btn').on('click', function(){
  $('.search-container.stores').animate({opacity:0, top: '0px'}, 200, function(){
    $('.search-container.stores').hide();
  });
});

$('#search-input-stores').on('input',function(e){
 searchBrands($('#search-input-stores').val().toLowerCase(), $('#view-stores .stores-container'), 'stores');
});

$('#search-input-awards').on('input',function(e){
  searchBrands($('#search-input-awards').val().toLowerCase(), $('#view-awards .stores-container'), 'awards');
});

$('.menu-container').on('click', function(){
  var id= $(this).attr('id');
  var totalH = 0;
  $('.menu-container').removeClass('selected'); $(this).addClass('selected');
  $('.container-view').removeClass('selected'); $('.search-container.stores').css({opacity:0, top: '0px'});
  $('.stores-container').css({opacity:0});
  switch(id){
    case 'menu-stores':
      $('#view-stores').addClass('selected'); $('#tab').animate({marginLeft: '40%'}, 100);
      if($('#back-store').hasClass('stores') === false){ $('#back-store').addClass('stores'); } $('#back-store').removeClass('favorites');
      $('.search-container.stores').css({height: $('.view-menu-container').height()+'px'});
      showAllStores();
      break;
    case 'menu-qrcode':
      $('#view-qrcode').addClass('selected'); $('#tab').animate({marginLeft: '0%'}, 100);
      break;
    case 'menu-awards':
      $('#view-awards').addClass('selected'); $('#tab').animate({marginLeft: '20%'}, 100);
      methods.showAllBrands($('#view-awards .stores-container'), 'awards');
      break;
    case 'menu-favorites':
      $('#view-favorites').addClass('selected'); $('#tab').animate({marginLeft: '60%'}, 100);
      if($('#back-store').hasClass('favorites') === false){ $('#back-store').addClass('favorites'); } $('#back-store').removeClass('stores');
      methods.showAllBrands($('#view-favorites .stores-container'), 'favorites');
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
  $('.categories-container').css({marginLeft: -$('.categories-container').width(), opacity: 0}); $('.categories-container').removeClass('selected'); 
  $('.locations-container').css({marginLeft: $('.locations-container').width(), opacity: 0}); $('.locations-container').removeClass('selected');
  $('.stores-container').css({opacity: 0}); $('.stores-container').removeClass('selected');

  switch($(this).attr('id')){
    case 'stores-all':
      showAllStores();
      break;
    case 'stores-categories':
      $('.categories-container').addClass('selected'); $('.categories-container').animate({marginLeft: 0, opacity: 1}, 300);
      methods.showCategories($('.categories-container .list'));
      filterArea = $('.categories-container').height() - $('.categories-container .filter-container').height();
      $('.categories-container .list').css({height: filterArea+'px'});
      break;
    case 'stores-locations':
      $('.locations-container').addClass('selected'); $('.locations-container').animate({marginLeft: 0, opacity: 1}, 300);
      methods.showLocations($('.locations-container .list'));
      filterArea = $('.locations-container').height() - $('.locations-container .filter-container').height();
      $('.locations-container .list').css({height: filterArea+'px'});
      break;
  }
});

$('.share-checkin-button').on('click', function(){
  $('#back-store').addClass('share');
  $('.body-container-store').hide();
  $('.body-container-big.store.body-share').show();
});

$('#back-store').on('click', function(){
  showAllStores();
  if($('#back-store').hasClass('share') === true){
    $('#back-store').removeClass('share');
    $('.body-container-store').show(); $('.body-container-big.store.body-share').hide(); return;
  }else if($('#back-store').hasClass('stores') === true){
    $('#view-store').removeClass('selected'); $('#view-stores').addClass('selected');
  }else if($('#back-store').hasClass('favorites') === true){
    $('#view-store').removeClass('selected'); $('#view-favorites').addClass('selected');
  }
});

$('#store-favorite').on('click', function(){
  if($('#store-favorite').hasClass('favorite')){ $('#store-favorite').removeClass('favorite');
  }else{ $('#store-favorite').addClass('favorite'); }
});

$('#award-share').on('click', function(){
  $('#view-award').find($('.back')).removeClass('back-award');
  $('#view-award').find($('.back')).addClass('back-share');
  $('.body-container-big.body-selected').hide();
  $('.body-container-big.awards.body-share').show();
});

$('#back-award').on('click', function(){
  $('#search-input-awards').val('');
  if($(this).hasClass('back-award') === true){
    $('.container-view').removeClass('selected');
    $('#view-awards').addClass('selected');
  }else if($(this).hasClass('back-share') === true){
    $('.body-container-big.body-share').hide();
    $('.body-container-big.body-selected').show();
    $(this).removeClass('back-share');
    $(this).addClass('back-award');
  }else if($(this).hasClass('back-store') === true){
    $('.container-view').removeClass('selected');
    $('#view-store').addClass('selected');
    $(this).removeClass('back-store');
  }    
});

$('.available-awards').on('click', function(){
  var awards = parseInt($('#store-available-awards').text());
  var id = $('.store-title').attr('id');
  $('#view-award').find($('.back')).addClass('back-store');
  if( awards === 1){
    var store = getStoreById(id);
    showAwardDetail(getAwardByStoreId(id), store);
  }else if( awards > 1){

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
  $('.stores-container').addClass('selected'); $('.stores-container').animate({opacity: 1}, 300);
});

function searchBrands(searchValue, container, type){
  var filteredData=[];
  brandsData.forEach(function(brand){
    if( brand.name.toLowerCase().indexOf(searchValue) !== -1){
      filteredData.push(brand);
    }
  });
  if(filteredData.length > 0){
    methods.showFilteredBrands(container, type, filteredData);
  }
}

function showAllStores(){
  $('.categorie-container').removeClass('selected'); $('.location-container').removeClass('selected'); 
  $('#selected-place').text(''); $('#selected-categories').text('');
  $('.view-menu').removeClass('selected'); $('.all-menu').addClass('selected');
  $('#search-input-stores').val(''); 
  methods.showAllBrands($('.stores-container'), 'stores');
}

