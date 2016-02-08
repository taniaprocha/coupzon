var methods;
var userLocation= null;
var userData = null;
var checkIns = [];
var isMobile = false;
var updateCheckins=null;
var successCheckinTimeout=null;
var actualMenu= null;
var contactsList=[];

updateCheckins = setInterval(function(){
  getCheckinList();
}, 60000);

function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    isMobile = true; return isMobile;
  }
 else {
    isMobile = false; return isMobile;
  }
}

detectmob();

console.log(isMobile);

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
  
  $('#view-settings .terms').text(terms);
  $('#view-terms .terms-container .terms').text(terms);
  methods = new storesMethods();

  //./data/texts.json
  var jqxhr = $.get( "data/texts.json", function() {
    console.log( "success" );
  })
    .done(function(data) {
      //console.log( "second success", data );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function(data) {
      //console.log( "finished", data);
      console.log(JSON.parse(data));
      var _data = JSON.parse(data);
      setLabels(_data.pt)
    });
  //window.localStorage.clear();
  userData = JSON.parse(window.localStorage.getItem('user'));
  console.log('--------------', userData);
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
      $('#coupzon-points').text('TEM '+userData.coupzonpoints+' PONTOS COUPZON');
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
    {name: 'Mónica Gonçalves', number: '912224095'},
    {name: 'João Paulo Pereira', number: '966512345'}
  ];
  contactsList = fakeContacts;
  fillContacts(fakeContacts);*/
});

function setLabels(data){
  $('.message-loading').text(data.loader);
  $('.open-message span').text(data.login1.title1);
  $('#container-number .title1').text(data.login1.title2);
  $('#container-number .title2').text(data.login1.title3);
  $('#container-number .check-title').text(data.login1.conditions);
  $('#container-number .error').text(data.login1.error);
  $('#container-number .login-box span').text(data.login1.sendBtn);
  $('#container-number .change-language').text(data.login1.sendBtn);
  $('#container-number .insert-number-input input').attr("placeholder", data.login1.input);
}

function stopLoader(){
  $('#loading').delay(2000).animate({marginTop: '-20rem', opacity: 0}, 150, function(){
    $('.container-view').removeClass('selected');
    $('#view-qrcode').addClass('selected'); setFotterMenu('menu-qrcode');
    $('.footer-menu').addClass('selected');
    $('.menu-container').removeClass('selected'); 
    $('#menu-qrcode').addClass('selected');
  });
}

window.onload = function setDataSource() {
  if (!!window.EventSource) {
    var source = new EventSource("http://api.coupzon.tk/events.php");
    source.addEventListener(("checkIn_"+userData.user.id), function(e) {
      //aqui chamas a api para ir buscar a info do checkin feito
      console.log(e);
      checkInExists((actualMenu === 'qrcode') ? true: false);
    }, false);
    
    source.addEventListener(("prizeReclaim_"+userData.user.id), function(e) {
      //aqui chamas a api para ir buscar a info do prizeReclaim
      console.log(e);
      var awardId = $('#view-award .title').attr('id');
      var award = getAwardById(awardId);
      console.log(awardId, award);
      prizeReclaim((actualMenu === 'awards') ? true : false, award.barCode);
    }, false);
    source.addEventListener("open", function(e) {
      console.log("OPENED");
      //efeitos de log apenas e de controlo de erros
    }, false);

    source.addEventListener("error", function(e) {
      console.log("ERROR");
      //efeitos de log apenas e de controlo de erros
        if(e.readyState == EventSource.CLOSED){
          console.log("CLOSED");
        }
    }, false);
  }else{
    //document.getElementById("notSupported").style.display = "block";
  }
}

var checkLoc=false;
function checkLocation(){
  checkLoc = true;
  if(userLocation !== null){
    getStoresFromAPI(userLocation, true, null);
  }else{
    // remover quando for para o telemovel
    getLocation(function(position){
      console.log('get position ', position);
      userLocation = ( position !== null) ? {lat: position.lat, long: position.lng} : null;
      if(checkLoc === true){
        getStoresFromAPI(userLocation, true, null);
      }
    });
  }
}


document.addEventListener("deviceready", function(){
  $('#select-number-awards').css('display', 'block');
  $('#select-number-store').css('display', 'block');
  getLocation(function(position){
    userLocation = {lat: position.lat, long: position.lng};
    if(checkLoc === true){
      getStoresFromAPI(userLocation, true, null);
    }
  });
  /*var element = document.getElementById('deviceProperties');
  element.innerHTML = 'Device Model: '    + device.model    + '<br />' +
                      'Device Cordova: '  + device.cordova  + '<br />' +
                      'Device Platform: ' + device.platform + '<br />' +
                      'Device UUID: '     + device.uuid     + '<br />' +
                      'Device Version: '  + device.version  + '<br />';
  alert(device.uuid);*/
  getContactList();
}, false); 


function getContactList() {
  var contactList = new ContactFindOptions(); 
  contactList.filter=""; 
  contactList.multiple=true;
  var fields = ["*"];  //"*" will return all contact fields
  navigator.contacts.find(fields, getContactFields, onContactsError, contactList );
}

function onContactsError(contactError) {
  alert('onError!');
}

function getContactFields(contacts) {
  contactsList = [];
  for (var i=0; i < contacts.length; i++){
    var numbers =[];
    if(contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0){
      contacts[i].phoneNumbers.forEach(function(number){
        if(number.type === 'mobile' && numbers.indexOf(number.value) === -1){
          numbers.push(number.value);
        }
      });
    }
    numbers.forEach(function(number){
      contactsList.push({name: contacts[i].displayName, number: number});
    });
  } 
  if(contactsList.length > 0){
    $('#select-contact-checkin').css('opacity', '1');
    $('#select-contact-awards').css('opacity', '1');
    fillContacts(contactsList);
  }
}

function fillContacts(contacts){
  $('.search-contacts .contact-container').off();
  $('.search-contacts').empty();
  contacts.forEach(function(contact){
    var contactDiv = $("<div class='contact-container'>"
      +"<div class='contact-text-container'>"
        +"<div class='contact-name'>"+contact.name.toUpperCase()+"</div>"
        +"<div class='contact-number'>"+contact.number+"</div>"
      +"</div>"
      +"<div class='check-container'>"
        +"<div class='table-cell'>"
          +"<span class='coup-radio-redondo-null notchecked'></span>"
          +"<span class='coup-radio-redondo-check checked'></span>"
        +"</div>"
      +"</div>"
    +"</div>");
    $('.search-contacts').append(contactDiv);
  });
  $('.search-contacts .contact-container').on('click', function(){
    $('.search-contacts .contact-container').removeClass('selected');
    $(this).addClass('selected');
    $('.container-view').removeClass('selected');
    if($('#view-contacts .search-contacts').attr('id') === 'awards'){
      $('#share-award-number').val($(this).find($('.contact-number')).text());
      $('#view-award').addClass('selected');
    }else if($('#view-contacts .search-contacts').attr('id') === 'checkin'){
      $('#share-checkins-phone-number').val($(this).find($('.contact-number')).text());
      $('#view-store').addClass('selected');
    }
  });  
}

$('#search-input-contacts').on('input',function(e){
 searchContacts($('#search-input-contacts').val().toLowerCase(), $('.search-contacts'));
});

function searchContacts(searchValue, container){
  var filteredData=[];
  contactsList.forEach(function(contact){
    console.log(contact.name, searchValue);
    if( contact.name.toLowerCase().indexOf(searchValue) !== -1 ){
      filteredData.push(contact);
    }
  });
  console.log(contactsList.length, searchValue, filteredData.length);
  if(filteredData.length > 0){
    fillContacts(filteredData);
  }
}

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

window.onerror = function (errorMsg, url, lineNumber) {
  //alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
}

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
      $('#coupzon-points').text('TEM '+userData.coupzonpoints+' PONTOS COUPZON');
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

function setFotterMenu(id){
  $('.menu-container').removeClass('selected'); $(this).addClass('selected');
  $('.container-view').removeClass('selected'); $('.search-container.stores').css({opacity:0, top: '0px'});
  $('.stores-container').css({opacity:0});
  if(successCheckinTimeout !== null){ clearTimeout(successCheckinTimeout); successCheckinTimeout = null; }
  switch(id){
    case 'menu-stores':
      $('#view-stores').addClass('selected'); $('#tab').animate({marginLeft: '40%'}, 100);
      if($('#back-store').hasClass('stores') === false){ $('#back-store').addClass('stores'); } $('#back-store').removeClass('favorites');
      $('.search-container.stores').css({height: $('.view-menu-container').height()+'px'});
      showAllStores('stores');
      actualMenu = 'stores';
      break;
    case 'menu-qrcode':
      $('#view-qrcode').addClass('selected'); $('#tab').animate({marginLeft: '0%'}, 100);
      actualMenu = 'qrcode';
      break;
    case 'menu-awards':
      $('#view-awards').addClass('selected'); $('#tab').animate({marginLeft: '20%'}, 100);
      methods.showAwards($('#view-awards .stores-container'), 'awards');
      var newH = $('.body-container-big.awards').height() - $('.search-container.awards').height();
      $('#view-awards .awards-list').css('height', newH+'px');
      actualMenu = 'awards';
      break;
    case 'menu-favorites':
      $('#view-favorites').addClass('selected'); $('#tab').animate({marginLeft: '60%'}, 100);
      if($('#back-store').hasClass('favorites') === false){ $('#back-store').addClass('favorites'); } $('#back-store').removeClass('stores');
      methods.showAllBrands($('#view-favorites .stores-container'), 'favorites');
      actualMenu = 'favorites';
      break;
    case 'menu-settings':
      $('#view-settings').addClass('selected'); $('#tab').animate({marginLeft: '80%'}, 100);
      actualMenu = 'settings';
      break;
  }
}

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
    $('.share-checkins-number .title .check').text('TEM '+number+' CHECK-IN ACUMULADOS.');
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
  if($(this).hasClass('menu-profile') === true){ $('.profile-container').addClass('selected');
  }else if($(this).hasClass('menu-contacts') === true){ $('.contacts-container').addClass('selected');
  }else if($(this).hasClass('menu-faq') === true){ $('.faq-container').addClass('selected');
  }else if($(this).hasClass('menu-terms') === true){ $('.terms-container').addClass('selected');
  }else if($(this).hasClass('menu-language') === true){ $('.language-container').addClass('selected'); }
  $('#back-settings').removeClass('disable');
});


function setUserInfo(data){
  console.log('set user info --->', data);
  if(data.name !== ''){ $('#user-name').val(data.name); }
  if(data.phone !== ''){ $('#user-phone').text(data.phone); }
  if(data.email !== ''){ $('#user-email').val(data.email); }
  if(data.nif !== ''){ $('#user-nif').val(data.nif); }
}

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

function showAllStores(menu){
  $('.categorie-container').removeClass('selected'); $('.location-container').removeClass('selected'); 
  $('#selected-place').text(''); $('#selected-categories').text('');
  $('.view-menu').removeClass('selected'); $('.all-menu').addClass('selected');
  $('#search-input-stores').val(''); 
  methods.showAllBrands($('.stores-container'), menu);
}

function saveOnLocalStorage(data){
  if(userData !== null){ window.localStorage.clear(); }
  var dataToStore = JSON.stringify(data);
  window.localStorage.setItem('user', dataToStore);
  //console.log(window.localStorage);
}

function showUserQrCode(barId){
  //var data = {"id":"19","name":"","phone":"351927955308","email":"","nif":"","barId":"3519526108192","password":"b3e139ee7838261437948b303472347f"};
  var codeH = ($("#view-qrcode").height()*.88)*.3;
  var _width = (codeH*.02);
  var _height = codeH*.8;
  console.log(barId, _height, _width, codeH);
  
  $("#user-qrcode").barcode(barId, "ean13", {
    barWidth: _width+'px', 
    barHeight:_height+'px', 
    fontSize: codeH*.2+'px'
  });
  $("#user-qrcode").css('margin-left',(-($("#user-qrcode").width()*.05))+'px');
  $(".qrcode-middle").css('width',  ($("#user-qrcode").width())+'px');
}

function getLocation(callback){
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      callback(pos);
    }, function() {
      console.log('error'); callback(null);
    });
  } else {
    // Browser doesn't support Geolocation
    console.log('error'); callback(null);
  }

}

function showSuccessCheckin(brand, store){
  $('#view-qrcode .qrcode-body').removeClass('selected');
  $('#view-qrcode .qrcode-body-success').addClass('selected');
  successCheckinTimeout = setTimeout(function gotoStore(){
    $('#view-qrcode .qrcode-body').addClass('selected');
    $('#view-qrcode .qrcode-body-success').removeClass('selected');
    setFotterMenu('menu-stores');
    $('.container-view').removeClass('selected');
    $('#view-store').addClass('selected');
    showStoreDetails(store, 'stores');
    clearTimeout(successCheckinTimeout); successCheckinTimeout = null;
  }, 3000);
  
}


/*
 * Fix for footer when the keyboard is displayed
 */

/*if(isMobile === true){
  $(document).on('focus', 'input, textarea', function(){
    $('.footer-menu').hide();
  });

  $(document).on('blur', 'input, textarea', function(){
    $('.footer-menu').show();
  });
}*/

