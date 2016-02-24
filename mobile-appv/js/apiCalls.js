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
  $.ajax({ type: 'POST', url: apiUrl+"/newPassword.html", data: data, cache: false})
  .done(function(data){ 
    $('.message-sended').show(); $('.message-not-received').hide(); 
    setTimeout(function(){ $('.message-sended').hide(); $('.message-not-received').show(); }, 2000);
    console.log("second success", data ); 
  })
  .fail(function(){ console.log("Some error occurred. Try later"); });
});

function createNewUser(number, callback){
  var data = {tlmv: number, checkVal: '-'};
  phoneNumber = number;
  $.ajax({ type: 'POST', url: apiUrl+"/createNewUser.html", data: data, cache: false})
  .done(function(data) {
    console.log("createNewUser second success", data ); 
    if(data.code === undefined){ data = data = eval("(function(){return " + data + ";})()"); }
    if(parseInt(data.code) === 201){ callback();
    }else if(parseInt(data.code) === 409){ callback(); }
  })
  .fail(function() {
    console.log("Some error occurred. Try later"); 
    $('#container-number .error').css('opacity', 1);
  });
}

function loginUser(password, md5, number, callback){
  var md5 = (md5 === true) ?  md5converter(password) : password;
  var data = {tlmv: number, checkVal: '-', pass: md5};
  $.ajax({ type: 'POST', url: apiUrl+"/loginUser.html", data: data, cache: false})
  .done(function(data) {
    console.log("login user second success", data );
    if(data.code === undefined){ data = data = eval("(function(){return " + data + ";})()"); }
    if(data.code === 403){ callback(false);
    }else if(data.code === 200){
      data.data.coupzonpoints = data.coupzonpoints;
      saveOnLocalStorage(data.data);
      callback(true, data.data.user.barId);
    }
  })
  .fail(function() { console.log("error"); callback(false); });
}

function getStoresFromAPI(location, getPrizes){
  var data = { lat: (location && location.lat) ? location.lat : '0', long: (location && location.long) ? location.long : '0', category: -1, city: -1, checkVal: '-', radius: 30, id_user: userData.user.id };
  $.ajax({ type: 'POST', url: apiUrl+"/getCloseStores.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log("get stores second success", data ); 
    if(data.code === 201){
      checkBrandPrizes(data.data.stores, data.data.brands, getPrizes);
    }else{
      console.log("Error", data.error );
    }
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
  getCategoriesFromAPI();
  getLocationsFromAPI();
  activityCount(); 
  activityList();
}

function checkBrandPrizes(stores, brands, getPrizes){
  storesData = []; storesData = stores;
  brandsData = []; brandsData = brands;
  brands.forEach(function(brand){
    if(brand.title_prize !== undefined){
      var stores = getStoresByBrand(brand.id);
      stores.forEach(function(store){
        if(store.title_prize === undefined && store.description_prize === undefined){
          store.title_prize = brand.title_prize;
          store.description_prize = brand.description_prize;
        }
      });
    }
  });
  console.log(storesData);
  if(getPrizes === true){
    getPricesFromAPI();
  }
  
}

function getCategoriesFromAPI(){
  var data = {checkVal: '-'};
  $.ajax({ type: 'POST', url: apiUrl+"/getCategories.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log("get categories second success", data );
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
  $.ajax({ type: 'POST', url: apiUrl+"/getLocations.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log("get locations second success", data ); 
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

function getPricesFromAPI(callback){
  var data = {checkVal: '-', id_user: userData.user.id};
  $.ajax({ type: 'POST', url: apiUrl+"/getUserPrizes.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log("get prices second success", data );
    if(data.code === 201){
      checkAwards(data.data.prizes, callback);
    }else{
      console.log("Error", data.error );
    }
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later");
  });
}

function setStoreFavorite(storeId, value){
  var data = {checkVal: '-', id_user: userData.user.id, idStore: storeId, value: value};
  $.ajax({ type: 'POST', url: apiUrl+"/setFavorite.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log("set favorites second success", data );
    storesData.forEach(function(store){
      if(store.id === storeId){
        store.favorite = value;
      }
    });
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
}

function checkAwards(awards, callback){
  /*var storesFromBrand = [];
  awards.forEach(function(award, index){
    if(award.store === 'null' || award.store === null){
      storesData.forEach(function(store){
        if(store.brand === award.brand){
          awards.push({
            brand: award.brand, description: award.description,
            id: award.id, store: store.id, title: award.title,
            validity: award.validity, barCode: award.barCode
          });
        }
      });
      awards.splice(index, 1);
    }
  });*/
  awardsData = [];
  awardsData = awards;
  console.log('awards', awardsData);
  
  if(callback){
    callback();
  }else{
    stopLoader();
  }
}

function sharePrize(idPrize, number){
  var data = {checkVal: '-', id_user: userData.user.id, idPrize: idPrize, tlmv: number};
  console.log('share prize ', data);
  $.ajax({ type: 'POST', url: apiUrl+"/sharePrize.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log("share prize second success", data ); 
    if(data.code === 301){
      alert('Utilizador não existe');
    }else if(data.code === 200){
      getPricesFromAPI(function(){
        $('.body-container-big.awards.body-share').hide();
        $('.body-container-big.body-selected').show();
        $('.container-view').removeClass('selected');
        $('#view-awards').addClass('selected');
        methods.showAllBrands($('#view-awards .stores-container'), 'awards');
      });
    }
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
}

function shareCheckIn(idStore, number, checkins){
  var data = {checkVal: '-', id_user: userData.user.id, idStore: idStore, nCheckins: checkins, tlmv: number};
  console.log('share checkin ', data);
  $.ajax({ type: 'POST', url: apiUrl+"/shareCheckIn.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log("share checkin second success", data ); 
    if(data.code === 301){
      alert('Utilizador não existe');
    }else if(data.code === 200){
      checkIns = [];
      checkIns = data.data; 
      $('#back-store').removeClass('share');
      $('.body-container-store').show(); 
      $('.body-container-big.store.body-share').hide();
      $('#view-stores').addClass('selected');
    }
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
}

function setProfileInfo(name, email, nif){
  var data = {checkVal: '-', id_user: userData.user.id, name: name, email: email, nif: nif};
  console.log('set profile info ', data);
  $.ajax({ type: 'POST', url: apiUrl+"/setProfileInfo.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log("set profile info second success", data ); 
    if(data !== undefined && data.user !== undefined){
      saveOnLocalStorage(data);
      setUserInfo(data.user);
    }
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
}

function changePassword(oldPassword, newPassword){
  var data = {checkVal: '-', id_user: userData.user.id, pass: md5converter(newPassword), previous_pass: md5converter(oldPassword)};
  console.log('change password : old: ', oldPassword ,' new: ', newPassword, data);
  $.ajax({ type: 'POST', url: apiUrl+"/changePassword.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log("success change password", data ); 
    if(data !== undefined && data.user !== undefined && data.user !== null){
      saveOnLocalStorage(data);
      setUserInfo(data.user);
    }
    $('.settings-container').removeClass('selected');
    $('.settings-container.profile-container').addClass('selected');
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
}

function checkInExists(redirect){
  var data = {checkVal: '-', id_user: userData.user.id};
  console.log('check in exists ', data);
  $.ajax({ type: 'POST', url: apiUrl+"/checkInExists.html", data: data, cache: false})
  .done(function(data){
    data = eval("(function(){return " + data + ";})()");
    console.log("success check in exists ", data ); 
    if(data.code === 200 && data.data !== undefined ){
      if(data.data.user === userData.user.id){
        getCheckinList();
        if(redirect === true){
          showSuccessCheckin(data.data.brand, data.data.store);
        }else{
          showNotification(1, 'menu-settings');
        }
      }
    }
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
}

function getCheckinList(){
  var data = {checkVal: '-', id_user: userData.user.id};
  $.ajax({ type: 'POST', url: apiUrl+"/getCheckinList.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    //console.log("checkin list ", data ); 
    if(data.code === 200){
      checkIns = []; checkIns = data.data;
      userData.coupzonpoints = data.coupzonpoints;
    }
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later");
  });
}

function prizeReclaim(redirect, prizeCode){
  var data = {checkVal: '-', id_user: userData.user.id, prizeCode: prizeCode};
  //console.log('prize reclaim ', prizeCode);
  $.ajax({ type: 'POST', url: apiUrl+"/prizeReclaim.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    
    if(data.code === 200){
      console.log("success prize reclaim ", data ); 
      $('#view-award .award-detail').removeClass('selected');
      $('#view-award .award-validated').addClass('selected');

      // pedir lista de premios atualizada e voltar pra view da lista de premios
      getPricesFromAPI(function(){
        if(redirect === true){
          reclaimTimeout = setTimeout(function(){
            $('.container-view').removeClass('selected');
            $('#view-awards').addClass('selected');
            $('#view-award .award-detail').addClass('selected');
            $('#view-award .award-validated').removeClass('selected');
            clearTimeout(reclaimTimeout); reclaimTimeout = null;
            methods.showAwards($('#view-awards .stores-container'), 'awards');
          }, 2000); 
        }else{
          showNotification(1, 'menu-settings');
        } 
      });
    }
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
}

function activityCount(){
  var data = {checkVal: '-', id_user: userData.user.id};
  console.log('activity count ');
  $.ajax({ type: 'POST', url: apiUrl+"/activityCount.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    if(data.code === 200){
      var activities = data.data; 
      if(activities > 0){
        showNotification(activities, 'menu-settings');
      }
      console.log('activities ', activities);
    }
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
}

function activityList(){
  var data = {checkVal: '-', id_user: userData.user.id};
  console.log('activity list ');
  $.ajax({ type: 'POST', url: apiUrl+"/activityList.html", data: data, cache: false})
  .done(function(data){ 
    data = eval("(function(){return " + data + ";})()");
    console.log('activity list ', data);
    if(data.code === 200){
      var list = data.data;
      fillActivity(list);
    }
  })
  .fail(function(){ 
    console.log("Some error occurred. Try later"); 
  });
}

function fillActivity(activityList){
  if(activityList.length > 0){
    $('#view-settings .list-container .list-scroll').iscroll();
    $('#view-settings .list-container .list-scroll').empty();
    for(var i = 0 ; i < activityList.length; i++){
      var element =  activityList[i];
      activityList[i].description = '';
      var date = new Date(element.dt);
      activityList[i].timestamp = date.getTime();
      if(element.descr.toLowerCase() === 'checkin'){
        var lojas = getStoresByBrand(element.brand);
        var brand = getBrandById(element.brand);
        if(brand !== undefined){
          if(lojas.length > 1){
            var loja = getStoreById(element.store);
            if(loja !== null){
              activityList[i].description = 'Checkin efectuado na loja '+brand.name+' ('+loja.local+')';
            }
          }else{
            activityList[i].description = 'Checkin efectuado na loja '+brand.name;
          }
        }
      }else if(element.descr.toLowerCase() === 'prize redeemed'){
        var lojas = getStoresByBrand(element.brand);
        var brand = getBrandById(element.brand);
        if(brand !== undefined){
          if(lojas.length > 1){
            var loja = getStoreById(element.store);
            if(loja !== null){
              activityList[i].description = 'Prémio redimido na loja '+brand.name+' ('+loja.local+')';
            }
          }else{
            activityList[i].description = 'Prémio redimido na loja '+brand.name;
          }
        }
      }else if(element.descr.toLowerCase() === 'prize gain'){
        var brand = getBrandById(element.brand);
        //console.log('prize gain ', element);
        activityList[i].description = 'Ganhou um prémio na loja '+((brand !== undefined) ? brand.name : '');
      }else if(element.descr.toLowerCase() === 'shareprize'){
        //console.log('shareprize ', element);
        activityList[i].description = element.phone+' partilhou um prémio consigo';
      }else if(element.descr.toLowerCase() === 'sharecheckins'){
        //console.log('sharecheckins', element);
        activityList[i].description = element.phone+' partilhou um checkin consigo';
      }else{
        activityList[i].description = element.descr;
      }
    }
    activityList.sort(function(obj1, obj2) {
      return obj1.timestamp - obj2.timestamp;
    });
    activityList.reverse();
    for(var i = 0 ; i < activityList.length; i++){
      if(activityList[i].description !== ''){
        var div = $('<div class="actitvity-element">'
          +'<div class="actitvity-title"><span>'+activityList[i].description+'</span></div>'
          +'<div class="actitvity-date"><span>'+activityList[i].dt+'</span></div>'
        +'</div>');
        $('#view-settings .list-container .list-scroll').append(div);             
      }

    }
    if($('#view-settings .activity-container').hasClass('selected') === true){
      $('#view-settings .list-container .list-scroll .actitvity-element').each(function(index){
        var height = $(this).find($('.actitvity-title')).height() + $(this).find($('.actitvity-date')).height();
        if(index === ($('#view-settings .list-container .list-scroll .actitvity-element').length - 1) ){
          $(this).css('height', (height*1.5)+'px');
        }else{ $(this).css('height', (height*1.1)+'px');}
      });
    }
  }
}
