var methods;
var userLocation= null;
var userData = null;
var checkIns = [];
var isMobile = false;
var updateCheckins=null;
var successCheckinTimeout=null;
var actualMenu= null;
var contactsList=[];
var language = 'pt';

/*updateCheckins = setInterval(function(){
  getCheckinList();
}, 60000);*/

function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    isMobile = true; /*alert('mobile '+isMobile);*/ return isMobile;
  }
 else {
    isMobile = false; /*alert('mobile '+isMobile);*/ return isMobile;
  }
}

detectmob();

function isRunningStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches);
}
//alert('standalone '+isRunningStandalone());
console.log(isMobile);

function showNotification(number, menu){
  $('#notification').removeClass('menu-qrcode menu-awards menu-stores menu-favorites menu-settings');
  $('#notification').addClass(menu);
  var nNumber = 0;
  var newNr = 0;
  if(number !== null){
    nNumber = number;
    newNr = nNumber;
  }else{
    nNumber = $('#notification .number').text(); nNumber = Number(nNumber);
    newNr = nNumber + 1;
  } 
  console.log('notification ', nNumber, newNr);
  $('#notification .number').text(newNr);
}

function hideNotification(){
  $('#notification').removeClass('menu-qrcode menu-awards menu-stores menu-favorites menu-settings');
  $('#notification .number').text(0);
}

function stopLoader(){
  console.log('stop loader');
  /*$('#loading').delay(2000).animate({marginTop: '-20rem', opacity: 0}, 150, function(){
    $('.container-view').removeClass('selected');
    $('#view-qrcode').addClass('selected'); 
    setFotterMenu('menu-qrcode');
    $('.footer-menu').addClass('selected');
    $('.menu-container').removeClass('selected'); 
    $('#menu-qrcode').addClass('selected');
    $('#loading').css({marginTop: '45%', opacity: 1});
  });*/
  setTimeout(function(){
    $('.container-view').removeClass('selected');
    $('#view-qrcode').addClass('selected'); 
    setFotterMenu('menu-qrcode');
    $('.footer-menu').addClass('selected');
    $('.menu-container').removeClass('selected'); 
    $('#menu-qrcode').addClass('selected');
  }, 3000);
}

window.onerror = function (errorMsg, url, lineNumber) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
}

function setFotterMenu(id){
  $('.menu-container').removeClass('selected'); $(this).addClass('selected');
  $('.container-view').removeClass('selected'); $('.search-container.stores').css({opacity:0, top: '0px'});
  $('.stores-container').css({opacity:0});
  if(successCheckinTimeout !== null){ clearTimeout(successCheckinTimeout); successCheckinTimeout = null; }
  switch(id){
    case 'menu-stores':
      $('#view-stores').addClass('selected'); 
      $('#tab').animate({marginLeft: '40%'}, 100);
      if($('#back-store').hasClass('stores') === false){ $('#back-store').addClass('stores'); } $('#back-store').removeClass('favorites');
      $('.search-container.stores').css({height: $('.view-menu-container').height()+'px'});
      showAllStores('stores');
      actualMenu = 'stores';
      break;
    case 'menu-qrcode':
      $('#view-qrcode').addClass('selected');
      $('#tab').animate({marginLeft: '0%'}, 100);
      actualMenu = 'qrcode';
      break;
    case 'menu-awards':
      $('#view-awards').addClass('selected'); 
      $('#tab').animate({marginLeft: '20%'}, 100);
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
      $('.settings-container').removeClass('selected');
      $('.settings-menu-container').addClass('selected');
      $('#back-settings').addClass('disable');
      actualMenu = 'settings';
      break;
  }
}

function setUserInfo(data){
  console.log('set user info --->', data);
  if(data.name !== ''){ $('#user-name').val(data.name); }
  if(data.phone !== ''){ $('#user-phone').text(data.phone); }
  if(data.email !== ''){ $('#user-email').val(data.email); }
  if(data.nif !== ''){ $('#user-nif').val(data.nif); }
}

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
  $("#user-qrcode div:first-child").css('margin-left',(-($("#user-qrcode").width()*.03))+'px');
  $(".qrcode-middle").css('width',  ($("#user-qrcode").width())+'px');
}

function showSuccessCheckin(brand, store){
  var _brand = getBrandById(brand);
  //console.log(brand, _brand, _brand.name);
  var success = (language === 'pt') ? 'CHECKIN NA LOJA '+(_brand.name).toUpperCase()+'\nEFECTUADO COM SUCESSO' : 'SUCCESSFUL CHECKIN AT THE \n'+(_brand.name).toUpperCase()+' STORE ';
  $('#success-checkin').html(success);
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


function setLabels(data){
  $('#loading-view .message-loading').text(data.loader);
  $('#login-phone .open-message span').text(data.login1.title1);
  $('#login-phone .title1').text(data.login1.title2);
  $('#login-phone .title2').text(data.login1.title3);
  $('#login-phone .check-title').text(data.login1.conditions);
  $('#login-phone .error').text(data.login1.error);
  $('#login-phone .login-box span').text(data.login1.sendBtn);
  $('#login-phone .change-language').text(data.login1.language);
  $('#login-phone .insert-number-input input').attr("placeholder", data.login1.input);

  $('#login-password .services-message span').html(data.login2.title1);
  $('#login-password .insert-password-title').text(data.login2.title2);
  $('#login-password .insert-password-alert').text(data.login2.error);
  $('#login-password #phone-password span').text(data.login2.sendBtn);
  $('#login-password .message-not-received').html(data.login2.title3);
  $('#login-password .message-sended').text(data.login2.title4);

  $('#qrcode-m span').text(data.menu[0]); $('#awards-m span').text(data.menu[1]); $('#stores-m span').text(data.menu[2]);
  $('#favorites-m span').text(data.menu[3]); $('#settings-m span').text(data.menu[4]);

  $('#view-qrcode .qrcode-text-1 span').html(data.qrcode.title1);
  $('#view-qrcode .qrcode-text-2 .title').html(data.qrcode.title2);
  if(userData !== null){
    if(language === 'pt'){ $('#coupzon-points').text('TEM '+userData.coupzonpoints+' PONTOS COUPZON');
    }else{ $('#coupzon-points').text('HAVE '+userData.coupzonpoints+' COUPZON POINTS'); }
  }
  $("#view-awards .search-input-container input").attr('placeholder', data.prizes.search);

  $('#view-award .validity-title').text(data.prizes.validity);
  $('#view-award .award-share .share').text(data.prizes.share);
  $('#view-award .award-validated').text(data.prizes.validated);
  $('#view-award .share-title .blue-title').text(data.prizes.share);
  $('#view-award .share-title .grey-title').html(data.prizes.shareTitle);
  $('#view-award .select-from-contacts').text(data.prizes.contacts);
  $('#view-award .share-input .title').text(data.prizes.insert);
  $('#view-award .share-input input').attr('placeholder', data.prizes.input);
  $('#view-award .send-award').text(data.prizes.send);

  $('#view-stores .categories-menu .table-cell').text(data.stores.category);
  $('#view-stores .all-menu .table-cell').text(data.stores.all);
  $('#view-stores .locations-menu .table-cell').text(data.stores.local);
  $('#view-stores .search-input-container input').attr('placeholder', data.stores.search);
  $('#view-stores .categories-container .stores-filter').text(data.stores.filter);
  $('#view-stores .locations-container .stores-filter').text(data.stores.filter);
  $('#view-store .available-check-ins .title').text(data.stores.checkinTitle);
  $('#view-store .available-awards .title').text(data.stores.availablePrizes);
  $('#view-store .favorite-button .title').text(data.stores.favorites);
  $('#view-store .share-checkin-button .title').text(data.stores.shareCheckIns);
  $('#view-store .contacts-button .title').text(data.stores.contactsAddress);
  $('#view-store .share-title .blue-title').text(data.stores.shareCheckIns);
  $('#view-store .share-title .grey-title').html(data.stores.shareTitle);
  $('#view-store .select-from-contacts').text(data.stores.contacts);
  $('#view-store .share-input .title').text(data.stores.insert);
  $('#view-store .share-input input').attr('placeholder', data.stores.input);
  $('#view-store .share-checkins-number .many').text(data.stores.howMany);
  $('#view-store .share-checkins-number .checkins-input input').attr('placeholder', data.stores.toShare);
  $('#view-store .share-checkins-btn').text(data.stores.shareCheckIns);

  $('#view-settings .settings-menu.menu-profile .title span').text(data.manager.menus[0]);
  $('#view-settings .settings-menu.menu-activity .title span').text(data.manager.menus[1]);
  $('#view-settings .settings-menu.menu-contacts .title span').text(data.manager.menus[2]);
  $('#view-settings .settings-menu.menu-faq .title span').text(data.manager.menus[3]);
  $('#view-settings .settings-menu.menu-terms .title span').text(data.manager.menus[4]);
  $('#view-settings .settings-menu.menu-language .title span').text(data.manager.menus[5]);

  $('#view-settings .profile-container .title .name span').text(data.manager.menus[0]);
  $('#view-settings .activity-container .title .name span').text(data.manager.menus[1]);
  $('#view-settings .contacts-container .title .name span').text(data.manager.menus[2]);
  $('#view-settings .faq-container .title .name span').text(data.manager.menus[3]);
  $('#view-settings .terms-container .title .name span').text(data.manager.menus[4]);
  $('#view-settings .language-container .title .name span').text(data.manager.menus[5]);

  $('#view-settings .profile-container .profile-title.name').text(data.manager.profile.name);
  $('#view-settings .profile-container #user-name').attr('placeholder', data.manager.profile.nameInput);
  $('#view-settings .profile-container .profile-title.phone').text(data.manager.profile.number);
  $('#view-settings .profile-container #user-email').text(data.manager.profile.emailInput);
  $('#view-settings .profile-container .profile-title.password .title').text(data.manager.profile.password);
  $('#view-settings .profile-container .profile-title.password .change').text(data.manager.profile.change);
  $('#view-settings .profile-container .profile-title.email').text(data.manager.profile.email);
  $('#view-settings .profile-container .profile-title.nif').text(data.manager.profile.nif);
  $('#view-settings .profile-container #user-nif').text(data.manager.profile.nifInput);
  $('#view-settings .profile-container .profile-info-btn').text(data.manager.profile.update);

  $('#view-settings .change-password-container .pass-line.atual .pass-title').text(data.manager.profile.actualPassword);
  $('#view-settings .change-password-container .pass-line .pass-alert').text(data.manager.profile.alert);
  $('#view-settings .change-password-container .pass-line .pass-forget').text(data.manager.profile.forget);
  $('#view-settings .change-password-container .actual-pass input').attr('placeholder', data.manager.profile.actualPasswordInput);
  $('#view-settings .change-password-container .new-pass input').attr('placeholder', data.manager.profile.newPasswordInput);
  $('#view-settings .change-password-container .new-pass-confim input').attr('placeholder', data.manager.profile.newPasswordInput);
  $('#view-settings .change-password-container .change-password-btn').text(data.manager.profile.confirm);

  $('#view-settings .contacts-container .contact-title.numero').text(data.manager.contacts.title1);
  $('#view-settings .contacts-container .contact-title.email').text(data.manager.contacts.title2);
  $('#view-settings .contacts-container .contact-title.address').text(data.manager.contacts.title3);
  
  fillActivity(_activityList);
  
  $('.terms-container .terms .introduction').html(data.terms.introduction);

  $('.terms-container .terms .title.1').text(data.terms.title1);
  $('.terms-container .terms .description.11').text(data.terms.description11);
  $('.terms-container .terms .description.12').text(data.terms.description12);
  $('.terms-container .terms .title.2').text(data.terms.title2);
  $('.terms-container .terms .description.21').text(data.terms.description21);
  $('.terms-container .terms .description.22').text(data.terms.description22);
  $('.terms-container .terms .description.23').text(data.terms.description23);
  $('.terms-container .terms .title.3').text(data.terms.title3);
  $('.terms-container .terms .description.31').text(data.terms.description31);
  $('.terms-container .terms .description.32').text(data.terms.description32);
  $('.terms-container .terms .title.4').text(data.terms.title4);
  $('.terms-container .terms .description.41').text(data.terms.description41);
  $('.terms-container .terms .description.42').text(data.terms.description42);
  $('.terms-container .terms .item.41').text(data.terms.item41);
  $('.terms-container .terms .item.42').text(data.terms.item42);
  $('.terms-container .terms .item.43').text(data.terms.item43);
  $('.terms-container .terms .item.44').text(data.terms.item44);
  $('.terms-container .terms .title.6').text(data.terms.title6);
  $('.terms-container .terms .description.61').text(data.terms.description61);
  $('.terms-container .terms .description.62').text(data.terms.description62);
  $('.terms-container .terms .description.63').text(data.terms.description63);
  $('.terms-container .terms .title.7').text(data.terms.title7);
  $('.terms-container .terms .description.71').text(data.terms.description71);
  $('.terms-container .terms .description.72').text(data.terms.description72);
  $('.terms-container .terms .title.9').text(data.terms.title9);
  $('.terms-container .terms .description.91').text(data.terms.description91);
  $('.terms-container .terms .description.92').text(data.terms.description92);
  $('.terms-container .terms .title.10').text(data.terms.title10);
  $('.terms-container .terms .description.10').html(data.terms.description10);
  $('.terms-container .terms .title.11').text(data.terms.title11);
  $('.terms-container .terms .description.11').html(data.terms.description11);
  $('.terms-container .terms .title.12').text(data.terms.title12);
  $('.terms-container .terms .description.12').html(data.terms.description12);
  $('.terms-container .terms .title.13').text(data.terms.title13);
  $('.terms-container .terms .description.13').html(data.terms.description13);
  $('.terms-container .terms .title.14').text(data.terms.title14);
  $('.terms-container .terms .description.14').html(data.terms.description14);
  $('.terms-container .terms .title.15').text(data.terms.title15);
  $('.terms-container .terms .description.15').html(data.terms.description15);
  $('.terms-container .terms .title.16').text(data.terms.title16);
  $('.terms-container .terms .description.16').html(data.terms.description16);
  $('.terms-container .terms .title.17').text(data.terms.title17);
  $('.terms-container .terms .description.17').html(data.terms.description17);
  $('.terms-container .terms .title.18').text(data.terms.title18);
  $('.terms-container .terms .description.18').html(data.terms.description18);
  $('.terms-container .terms .title.19').text(data.terms.title19);
  $('.terms-container .terms .description.19').html(data.terms.description19);
  $('.terms-container .terms .title.20').text(data.terms.title20);
  $('.terms-container .terms .description.20').html(data.terms.description20);
  $('.terms-container .terms .title.21').text(data.terms.title21);
  $('.terms-container .terms .description.21').html(data.terms.description21);
  $('.terms-container .terms .title.22').text(data.terms.title22);
  $('.terms-container .terms .description.22').html(data.terms.description22);
  $('.terms-container .terms .title.23').text(data.terms.title23);
  $('.terms-container .terms .description.23').html(data.terms.description23);
  $('.terms-container .terms .title.24').text(data.terms.title24);
  $('.terms-container .terms .description.24').html(data.terms.description24);
  $('.terms-container .terms .title.25').text(data.terms.title25);
  $('.terms-container .terms .description.25').html(data.terms.description25);
  $('.terms-container .terms .title.26').text(data.terms.title26);
  $('.terms-container .terms .description.26').html(data.terms.description26);
  $('.terms-container .terms .description.27').html(data.terms.description27);
}
