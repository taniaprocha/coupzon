
$('.back-from-contacts').on('click', function(){
  $('.container-view').removeClass('selected');
  if($('#view-contacts .search-contacts').attr('id') === 'awards'){
    $('#view-award').addClass('selected');
  }else if($('#view-contacts .search-contacts').attr('id') === 'checkin'){
    $('#view-store').addClass('selected');
  }
});

$('#select-contact-awards').on('click', function(){
  if(contactsList.length <= 0){ return; }
  $('.container-view').removeClass('selected'); 
  $('#view-contacts').addClass('selected');
  $('#view-contacts .search-contacts').attr('id', 'awards');
});

$('#select-contact-checkin').on('click', function(){
  if(contactsList.length <= 0){ return; }
  $('.container-view').removeClass('selected'); 
  $('#view-contacts').addClass('selected');
  $('#view-contacts .search-contacts').attr('id', 'checkin');
});

$('#check-terms-title').on('click', function(){
  $('.container-view').removeClass('selected'); $('#view-terms').addClass('selected');
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
  $('.insert-password-alert').css('opacity', 0);
});

$('#input-number').on('input', function(){
  if( $('#input-number').val().length > 8){
    $(this).blur();
  }
});  

$('#input-password').keypress(function(e) {
  if (e.which == 13) {
    $(this).blur();
  }
});

var phoneNumber = '';
$('#login-number').on('click', function(){
  var alert = false;
  if( $('.check-terms').find($('.checked')).hasClass('selected') === false ){
    $('.check-title').addClass('alert'); alert = true;
  }
  if($('#input-number').val().length < 9 || $('#input-number').val().length > 12){ 
    $('.insert-number-title.title').addClass('alert'); alert = true;
  }
  if(alert === true){ return; }
  createNewUser($('#input-number').val(), function(){
    $('.check-title').removeClass('alert'); $('.insert-number-title').removeClass('alert'); 
    $('.container-view').removeClass('selected'); $('#login-password').addClass('selected');
    $('#input-number').val('');
  });
});

$('#phone-password').on('click', function(){
  if($('#input-password').val() === ''){ $('.insert-password-title').addClass('alert'); return; }
  var login = loginUser($('#input-password').val(), true, phoneNumber, function(success, barcodeId){
    if(success === true){
      userData = JSON.parse(window.localStorage.getItem('user'));
      setUserInfo(userData.user);
      checkIns = []; checkIns = userData.checkins;
      showUserQrCode(barcodeId);
      if(language === 'pt'){
        $('#coupzon-points').text('TEM '+userData.coupzonpoints+' PONTOS COUPZON');
      }else{
        $('#coupzon-points').text('HAVE '+userData.coupzonpoints+' COUPZON POINTS');
      }
      $('.insert-password-alert').css('opacity', 0); $('.message-not-received').removeClass('alert');
      $('.insert-password-title').removeClass('alert'); 
      $('.container-view').removeClass('selected');
      $('#loading-view').addClass('selected'); 
      $('#input-password').val('');
      checkLocation();
    }else{
      $('.insert-password-alert').css('opacity', 1); //$('.message-not-received').addClass('alert');
    }
  });
});

$('#logout').on('click', function(){
  $('.container-view').removeClass('selected'); 
  $('#login-phone').addClass('selected'); 
  $('.footer-menu').removeClass('selected');
  window.localStorage.clear();
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
  setFotterMenu(id);
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
      showAllStores('stores');
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
  if(parseFloat($('.share-checkin-button').css('opacity')) === 1){
    $('#back-store').addClass('share');
    $('.body-container-store').hide();
    $('.body-container-big.store.body-share').show();
    var number = $('#store-check-ins').text();
    var check = (number < 2) ? 'CHECK-IN' : 'CHECK-INS';
    if(language === 'pt'){
      $('.share-checkins-number .title .check').text('TEM '+number+' '+check+' ACUMULADOS.');
    }else{
      $('.share-checkins-number .title .check').text('HAVE '+number+' ACCUMULATED '+check+'.');
    }
  }
});

$('#back-terms').on('click', function(){
  $('.container-view').removeClass('selected'); $('#login-phone').addClass('selected');
});

$('#back-store').on('click', function(){
  if($('#back-store').hasClass('share') === true){
    showAllStores('stores');
    $('#back-store').removeClass('share');
    $('.body-container-store').show(); $('.body-container-big.store.body-share').hide(); return;
  }else if($('#back-store').hasClass('stores') === true){
    showAllStores('stores');
    $('#view-store').removeClass('selected'); $('#view-stores').addClass('selected');
  }else if($('#back-store').hasClass('favorites') === true){
    showAllStores('favorites');
    $('#view-store').removeClass('selected'); $('#view-favorites').addClass('selected');
  }
});

$('#store-favorite').on('click', function(){
  var storeId = $('.store-title').attr('id');
  var store = getStoreById(storeId);
  console.log(store.favorite);
  if(store.favorite === true){ 
    $('#store-favorite').removeClass('favorite');
  }else{ 
    $('#store-favorite').addClass('favorite'); 
  }
  setStoreFavorite(storeId, !store.favorite);
});

$('#share-checkins').on('click', function(){
  var phoneNumber = $('#share-checkins-phone-number').val();
  var checkinsNumber = $('#share-checkins-number').val(); checkinsNumber = parseInt(checkinsNumber);
  var storeId = $('.store-title').attr('id');
  $('#share-checkins-phone-number').val('');
  $('#share-checkins-number').val('');
  if(phoneNumber.length !== 9 && checkinsNumber <= 0){
    return alert('Por favor coloque um numero correcto e o numero de check-ins a partilhar');
  }else if(phoneNumber.length !== 9){
    return alert('Por favor coloque um numero correcto');
  }else if(checkinsNumber <= 0){
    return alert('Por favor coloque o numero de check-ins a partilhar');
  }
  shareCheckIn(storeId, phoneNumber, checkinsNumber);
});

$('#send-award').on('click', function(){
  var number = $('#share-award-number').val();
  var prizeId = $('#view-award .title').attr('id');
  $('#share-award-number').val('');
  if(number.length !== 9){
    return alert('Por favor coloque um numero correcto');
  }
  sharePrize(prizeId, number);
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

$('#send-profile-info').on('click', function(){
  var name = $('#user-name').val();
  var email = $('#user-email').val();
  var nif = $('#user-nif').val();
  $('#user-name').blur();
  $('#user-email').blur();
  $('#user-nif').blur();
  setProfileInfo(name, email, nif);
});

$('#change-password').on('click', function(){
  $('.settings-container').removeClass('selected'); 
  $('.settings-container.change-password-container').addClass('selected');
});

$('#send-change-password').on('click', function(){
  var oldPassword = $('#actual-pass-input').val();
  var newPassword = $('#new-pass-input').val();
  if($('#new-pass-confim-input').val() !== newPassword){
    $('#actual-pass-input').val(''); $('#new-pass-confim-input').val('');
    return alert('Passwords não coincidem');
  }
  if(newPassword !== ''){
    changePassword(oldPassword, newPassword);
  }
});

$('.settings-menu').on('click', function(){
  $('.settings-container').removeClass('selected');
  if($(this).hasClass('menu-profile') === true){ 
    $('.profile-container').addClass('selected');
  }else if($(this).hasClass('menu-contacts') === true){ 
    $('.contacts-container').addClass('selected');
  }else if($(this).hasClass('menu-faq') === true){ 
    $('.faq-container').addClass('selected');
  }else if($(this).hasClass('menu-terms') === true){ 
    $('.terms-container').addClass('selected');
  }else if($(this).hasClass('menu-language') === true){ 
    $('.language-container').addClass('selected'); 
  }else if($(this).hasClass('menu-activity') === true){ 
    $('.activity-container').addClass('selected'); 
    hideNotification();
  }
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

$(document).ready(function() {
  var partialW = window.innerWidth;
  var partialH = window.innerHeight;
  $('body').css('height', partialH+'px');
  
  //$('#loading-view .loading-code').css('width', partialW+'px');
  var footerH = $('.footer-menu').height();
  $('#loading-view').css({height: partialH+'px' });
  $('#view-qrcode').css({height: (partialH - footerH)+'px' });
  $('#view-stores').css({height: (partialH - footerH)+'px' });
  $('#view-awards').css({height: (partialH - footerH)+'px' });
  $('#view-favorites').css({height: (partialH - footerH)+'px' });
  $('#view-settings').css({height: (partialH - footerH)+'px' });
  $('#view-store').css({height: (partialH - footerH)+'px' });
  $('#view-award').css({height: (partialH - footerH)+'px' });
  $('#view-contacts').css({height: (partialH - footerH)+'px' });
  
  //$('#view-settings .terms').text(terms);
  $('#view-terms .terms-container .terms').text(terms);
  methods = new storesMethods();
  //window.localStorage.clear();
  
  userData = JSON.parse(window.localStorage.getItem('user'));
  setTimeout(function(){
    $('.message-loading').addClass('show');
  }, 300);

  if(userData !== null && userData.user === undefined){
    window.localStorage.clear();
  }

  if(userData === null){
    setTimeout(function(){
      $('.container-view').removeClass('selected');
      $('#login-phone').addClass('selected');
      $('#login-phone').animate({opacity: 1}, 300);
    }, 1000);
    
  }else{
    checkIns = userData.checkins; 
    setUserInfo(userData.user);

    loginUser(userData.user.password, false, userData.user.phone, function(){
      showUserQrCode(userData.user.barId);
      if(language === 'pt'){
        $('#coupzon-points').text('TEM '+userData.coupzonpoints+' PONTOS COUPZON');
      }else{
        $('#coupzon-points').text('HAVE '+userData.coupzonpoints+' COUPZON POINTS');
      }
      checkLocation();
    });
  }
  
  /*var fakeContacts = [
    {name: 'Tânia Rocha', number: '924414095'},
    {name: 'Maria Inês', number: '966514444'},
    {name: 'Teresa de Jesus Cerqueira Pereira', number: '966514095'},
    {name: 'Julio de Matos e Silva', number: '344343434'},
    {name: 'António Carvalho da Rocha', number: '966514095'},
    {name: 'Margarida Matos', number: '966344495'},
    {name: 'Ana Sofia Silva', number: '964444095'},
    {name: 'Isabel Castro de Aguiar', number: '966514095'},
    {name: 'Mónica Gonçalves', number: '*912224095'},
    {name: 'João Paulo Pereira', number: '966512345'},
    {name: 'Maria Inês', number: '966514444'},
    {name: 'Teresa de Jesus Cerqueira Pereira', number: '966514095'},
    {name: 'Julio de Matos e Silva', number: '344343434'},
    {name: 'António Carvalho da Rocha', number: '966514095'},
    {name: 'Margarida Matos', number: '966344495'},
    {name: 'Ana Sofia Silva', number: '964444095'},
    {name: 'Isabel Castro de Aguiar', number: '966514095'},
    {name: 'Mónica Gonçalves', number: '912224095'},
    {name: 'João Paulo Pereira', number: '966512345'}
  ];
  contactsList = fakeContacts;
  fillContacts(fakeContacts);*/
  console.log(languageJson);
  setLabels(languageJson.pt);
  $('.language-line.line-portuguese .language-icon span').removeClass();
  if(language === 'pt'){
    $('.language-line.line-portuguese').addClass('selected');
    $('.language-line.line-portuguese .language-icon span').addClass('coup-radio-redondo-check');
  }else{
    $('.language-line.line-english').addClass('selected');
    $('.language-line.line-english .language-icon span').addClass('coup-radio-redondo-check');
  }
  
});

$('.language-line').on('click', function(){
  $('.language-line').removeClass('selected');
  $('.language-line .language-icon span').removeClass();
  $(this).addClass('selected');
  if(language === 'pt'){
    language = 'en';
    $('.language-line.line-portuguese .language-icon span').addClass('coup-radio-redondo-null');
    $('.language-line.line-english .language-icon span').addClass('coup-radio-redondo-check');
    setLabels(languageJson.en);

  }else{
    language = 'pt';
    $('.language-line.line-english .language-icon span').addClass('coup-radio-redondo-null');
    $('.language-line.line-portuguese .language-icon span').addClass('coup-radio-redondo-check');
    setLabels(languageJson.pt);
  }
});

$("#change-language-btn").on('click', function(){
  if(language === 'pt'){
    language = 'en';
    setLabels(languageJson.en); 
  }else{
    language = 'pt';
    setLabels(languageJson.pt); 
  }
});

