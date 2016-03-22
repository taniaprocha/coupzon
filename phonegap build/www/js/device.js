var checkLoc=false;

document.addEventListener("deviceready", function(){
  $('#select-number-awards').css('display', 'block');
  $('#select-number-store').css('display', 'block');
  console.log('device ready');
  //alert('device ready');
  getLocation(function(position){
    userLocation = {lat: position.lat, long: position.lng};
    if(checkLoc === true){
      getStoresFromAPI(userLocation, true);
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


function checkLocation(){
  checkLoc = true;
  if(userLocation !== null){
    getStoresFromAPI(userLocation, true);
  }else{
    // remover quando for para o telemovel
    getLocation(function(position){
      console.log('get position ', position);
      userLocation = ( position !== null) ? {lat: position.lat, long: position.lng} : null;
      if(checkLoc === true){
        getStoresFromAPI(userLocation, true);
      }
    });
  }
}

function getLocation(callback){
  // Try HTML5 geolocation.
  var timeout = null;
  if (navigator.geolocation){
    timeout = setTimeout(function(){
      callback(null);
    }, 8000);
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('getCurrentPosition');
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      clearTimeout(timeout); callback(pos);
    }, function() {
      console.log('error 1'); 
      clearTimeout(timeout); callback(null);
    }, {
      maximumAge:60000, 
      timeout:5000, 
      enableHighAccuracy:true
    });
  }else{
    // Browser doesn't support Geolocation
    console.log('error 2'); 
    clearTimeout(timeout); callback(null);
  }
}

function getContactList() {
  var contactList = new ContactFindOptions(); 
  contactList.filter=""; 
  contactList.multiple=true;
  var fields = ["*"];  //"*" will return all contact fields
  console.log('getContactList');
  navigator.contacts.find(fields, getContactFields, onContactsError, contactList );
}

function onContactsError(contactError) {
  console.log('onError!');
  //alert('contacts onError!');
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
  console.log('find contacts: '+contactsList.length);
  //alert('find contacts: '+contactsList.length);
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
      var number = ($(this).find($('.contact-number')).text()).toString();
      $('#share-award-number').val(number);
      $('#view-award').addClass('selected');
    }else if($('#view-contacts .search-contacts').attr('id') === 'checkin'){
      var number = ($(this).find($('.contact-number')).text()).toString();
      $('#share-checkins-phone-number').val(number);
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
