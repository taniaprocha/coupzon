
var md5converter = function(value) {
  return CryptoJS.MD5(value).toString();
}

$('.message-not-received').on('click', function(){
  var data = {tlmv: phoneNumber, checkVal: '-'};
  console.log(data);
  var newPassword = $.post( "http://api.coupzon.tk/newPassword.html", data, function() {
    console.log("success");
  })
  .done(function(data){ 
    $('.message-sended').show(); $('.message-not-received').hide(); 
    setTimeout(function(){ $('.message-sended').hide(); $('.message-not-received').show(); }, 2000);
    console.log("second success", data ); 
  })
  .fail(function(){ console.log("Some error occurred. Try later"); });
});

function createNewUser(number, callback){
  var data = {tlmv: number, checkVal: '-'};
  console.log(data);
  phoneNumber = number;
  var createUser = $.post( "http://api.coupzon.tk/createNewUser.html", data, function() {
    console.log("success");
  })
  .done(function(data) {
    console.log("second success", data ); 
    if(data.code === undefined){ data = data = eval("(function(){return " + data + ";})()"); }
    if(parseInt(data.code) === 201){ callback();
    }else if(parseInt(data.code) === 409){ callback(); }
  })
  .fail(function() {
    console.log("Some error occurred. Try later"); 
    $('#container-number .error').css('opacity', 1);
  });
}

function loginUser(password, number, callback){
  var md5 = md5converter(password);
  var data = {tlmv: number, checkVal: '-', pass: md5};
  console.log(password, data);
  var login = $.post( "http://api.coupzon.tk/loginUser.html", data, function() {
    console.log("success");
  })
  .done(function(data) {
    console.log("second success", data );
    if(data.code === undefined){ data = data = eval("(function(){return " + data + ";})()"); }
    if(data.code === 403){ callback(false);
    }else if(data.code === 200){
      saveOnLocalStorage(data.data);
      callback(true, data.data.barId);
    }
  })
  .fail(function() { console.log("error"); callback(false); });
}

function getStoresFromAPI(location){
  var data = {lat: location.lat, long: location.long, categorie: [], city: '', checkVal: '-'};
  console.log(data);
  var stores = $.post( "http://api.coupzon.tk/getCloseStores.html", data, function() {
    console.log("success");
  })
  .done(function(data){ console.log("second success", data ); })
  .fail(function(){ console.log("Some error occurred. Try later"); });
  getCategoriesFromAPI();
  getLocationsFromAPI();
}

function getCategoriesFromAPI(){
  var data = {checkVal: '-'};
  var stores = $.post( "http://api.coupzon.tk/getCategories.html", data, function() {
    console.log("success");
  })
  .done(function(data){ console.log("second success", data ); })
  .fail(function(){ console.log("Some error occurred. Try later"); });
}

function getLocationsFromAPI(){
  var data = {checkVal: '-'};
  var stores = $.post( "http://api.coupzon.tk/getLocations.html", data, function() {
    console.log("success");
  })
  .done(function(data){ console.log("second success", data ); })
  .fail(function(){ console.log("Some error occurred. Try later"); });
}