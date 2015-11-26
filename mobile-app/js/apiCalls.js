var apiUrl = 'http://api.coupzon.tk';
var siteUrl = 'http://www.coupzon.tk';
var terms = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tempor quam. Praesent suscipit erat vel dolor sodales pharetra. Morbi quis ipsum vulputate, placerat purus viverra, facilisis sem. Vestibulum imperdiet ac risus vel cursus. Curabitur interdum elementum vehicula. Curabitur fermentum, urna eu aliquet ultrices, sem lectus pretium urna, vel rhoncus nunc arcu quis justo. Mauris massa turpis, vulputate sit amet feugiat ut, cursus ut quam. Pellentesque vel nisl in lectus pretium lacinia in ut massa. Sed augue felis, tristique viverra imperdiet ac, sollicitudin nec elit. Curabitur a odio quis lacus tincidunt suscipit ut eu sapien. Vivamus eget nisl et lacus posuere pretium sit amet vel orci. Quisque eu dapibus dui, lacinia ornare neque.';
var brandsData =[];
var storesData = [];
var awardsData = [];
var categoriesData = [];
var citiesData = [];

var md5converter = function(value) {
  return CryptoJS.MD5(value).toString();
}

$('.message-not-received').on('click', function(){
  var data = {tlmv: phoneNumber, checkVal: '-'};
  console.log(data);
  var newPassword = $.post( apiUrl+"/newPassword.html", data, function() {
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
  var createUser = $.post( apiUrl+"/createNewUser.html", data, function() {
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
  var login = $.post( apiUrl+"/loginUser.html", data, function() {
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
  var data = {
    lat: location.lat, 
    long: location.long, 
    category: -1, 
    city: -1, 
    checkVal: '-', 
    radius: 30,
    id_user: userData.id
  };
  console.log(data);
  var stores = $.post( apiUrl+"/getCloseStores.html", data, function() {
    console.log("success");
  })
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log("second success", data ); 
    if(data.code === 201){
      storesData = data.data.stores;
      brandsData = data.data.brands;
    }else{
      console.log("Error", data.error );
    }
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
  getCategoriesFromAPI();
  getLocationsFromAPI();
}

function getCategoriesFromAPI(){
  var data = {checkVal: '-'};
  console.log('get categories ', data);
  var stores = $.post( apiUrl+"/getCategories.html", data, function() {
    console.log("success");
  })
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log("second success", data );
    if(data.code === 201){
      categoriesData = data.data.categories;
    }else{
      console.log("Error", data.error );
    } 
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
}

function getLocationsFromAPI(){
  var data = {checkVal: '-'};
  console.log('get locations ', data);
  var stores = $.post( apiUrl+"/getLocations.html", data, function() {
    console.log("success");
  })
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log("second success", data ); 
    if(data.code === 201){
      citiesData = data.data.cities;
    }else{
      console.log("Error", data.error );
    }
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
}