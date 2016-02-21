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
  $('#notification .number').text(number);
}

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
  console.log('stop loader');
  $('#loading').delay(2000).animate({marginTop: '-20rem', opacity: 0}, 150, function(){
    $('.container-view').removeClass('selected');
    $('#view-qrcode').addClass('selected'); 
    setFotterMenu('menu-qrcode');
    $('.footer-menu').addClass('selected');
    $('.menu-container').removeClass('selected'); 
    $('#menu-qrcode').addClass('selected');
  });
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

