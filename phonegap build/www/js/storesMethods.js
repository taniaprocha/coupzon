function storesMethods(){

}

storesMethods.prototype.showFilteredBrands = function(container, menu, brands){
  $('.brand-container').off(); $('.store-container').off(); container.empty();
  container.addClass('selected'); container.animate({opacity: 1}, 300); 
  showFilteredBrands(brands, container, menu);
};

storesMethods.prototype.showAllBrands = function(container, menu){
  $('.brand-container').off(); $('.store-container').off(); container.empty();
  container.addClass('selected'); container.animate({opacity: 1}, 300);
  showFilteredBrands(brandsData, container, menu);
};

storesMethods.prototype.showSelectedStores = function(selectedCategories, selectedLocation, container, selectedPlace, selectedCat, allCat, allCities){
  $('.store-container').off(); container.empty();
  if(selectedCategories.length > 0){
    if(selectedCategories.length == 1){
      selectedCat.text(getCategorieNameById(selectedCategories[0]).toUpperCase());
    }else{
      selectedCat.text(selectedCategories.length +' CATEGORIAS');
    }
  }else{ 
    selectedCategories = allCat;
    selectedCat.text('--'); 
  }
  if(selectedLocation.length > 0){
    selectedPlace.text(getLocationNameById(selectedLocation[0]).toUpperCase());
  }else{ selectedLocation = allCities; selectedPlace.text('--'); }
  var results = 0;  
  
  brandsData.forEach(function(brand){
    if( selectedCategories.indexOf(parseInt(brand.categorie)) !== -1 ){
      var categoria = getCategorieNameById(brand.categorie).toUpperCase();
      var brandDiv = setBrandDiv(brand.name, brand.id, brand.image, categoria);
      var stores = getStoresByBrandAndCities(brand.id, selectedLocation);
      if(stores !== null && stores.length > 0){
        if(stores.length > 1){
          brandDiv = setBrandDiv(brand.name, brand.id, brand.image, categoria);
          stores.forEach(function(store){
            appendStore(store, brandDiv, 1, [], brand); results++;
          });
          container.append(brandDiv);
        }else{
          appendStore(stores[0], container, 2, [], brand); results++;
        }
      }
    }
  });
  function appendStore(store, container, type, storesWidthAward, brand) {
    if(storesWidthAward.length > 0 && storesWidthAward[store.id] === undefined){ return; }
    var categoria = getCategorieNameById(brand.categorie).toUpperCase();
    if(type === 1){
      container.append(setStoreDiv1(store.id, store.title_prize, store.local, store.address, null));
    }else{
      container.append(setStoreDiv2(brand.name, store.id, categoria, brand.image, store.title_prize, null));
    }
  }
  if(results === 0){
    container.append('<div class="no-stores-filtered">Não existem lojas para essa Categoria ou Localidade seleccionada.</div>');
  }else{
    addBrandListener();
    addStoreListeners();
  }
}

function showFilteredBrands(brands, container, menu){
  var storesWidthAward = [];
  if(menu === 'awards'){
    awardsData.forEach(function(award){
      if(storesWidthAward[award.store] === undefined){
        storesWidthAward[award.store] = {awards: []};
      }
      storesWidthAward[award.store].awards.push(award.id);
    });
    console.log(storesWidthAward);
  }
  var totalPrices = 0;
  var totalFavorites = 0;
  brands.forEach(function(brand){
    var categoria = getCategorieNameById(brand.categorie).toUpperCase();
    var brandDiv;
    var stores = getStoresByBrand(brand.id);
    if(stores !== null && stores.length > 0){
      var favoritesCount = 0;
      var pricesCount = 0;
      if(stores.length > 1){
        brandDiv = setBrandDiv(brand.name, brand.id, brand.image, categoria);
        stores.forEach(function(store){
          if(menu === 'awards'){
            if(storesWidthAward[store.id] !== undefined){
              appendStore(store, brandDiv, 1, storesWidthAward, brand); pricesCount++;
            }
          }else if(menu === 'favorites'){
            if(store.favorite === true){ 
              appendStore(store, brandDiv, 1, storesWidthAward, brand); favoritesCount++;
            }
          }else{
            appendStore(store, brandDiv, 1, storesWidthAward, brand);
          }
        });
        if(menu === 'favorites'){
          if(favoritesCount > 0){
            container.append(brandDiv);
          }
        }else if(menu === 'awards'){ 
          if(pricesCount > 0){ 
            container.append(brandDiv);
          }
        }else{ 
          container.append(brandDiv);
        }
      }else{
        if(menu === 'awards'){
          if(storesWidthAward[stores[0].id] !== undefined){
            appendStore(stores[0], container, 2, storesWidthAward, brand); pricesCount++;
          }
        }else if(menu === 'favorites'){
          if(stores[0].favorite === true){
            appendStore(stores[0], container, 2, storesWidthAward, brand); favoritesCount++;
          }
        }else{
          appendStore(stores[0], container, 2, storesWidthAward, brand);
        }
      }
    }
    totalPrices = totalPrices + pricesCount;
    totalFavorites = totalFavorites + favoritesCount;
  });
  //console.log('total prices', totalPrices);
  if(menu === 'awards' && totalPrices <= 0){ 
    container.append('<div class="no-stores-filtered">Não existem prémios para mostrar.</div>');
  }
  if(menu === 'favorites' && totalFavorites <= 0){ 
    container.append('<div class="no-stores-filtered">Não existem favoritos para mostrar.</div>');
  }

  function appendStore(store, container, type, storesWidthAward, brand) {
    if(storesWidthAward.length > 0 && storesWidthAward[store.id] === undefined){ return; }
    var categoria = getCategorieNameById(brand.categorie).toUpperCase();
    if(menu === 'awards'){
      storesWidthAward[store.id].awards.forEach(function(award){
        if(type === 1){
          container.append(setStoreDiv1(store.id, store.title_prize, store.local, store.address, award));
        }else{
          container.append(setStoreDiv2(brand.name, store.id, categoria, brand.image, store.title_prize, award));
        }
      });
    }else{
      if(type === 1){
        container.append(setStoreDiv1(store.id, store.title_prize, store.local, store.address, null));
      }else{
        container.append(setStoreDiv2(brand.name, store.id, categoria, brand.image, store.title_prize, null));
      }   
    }
    
  }
  
  addBrandListener();
  if(menu === 'stores' || menu === 'favorites'){
    addStoreListeners(menu);
  }else if(menu === 'awards'){
    addAwardListeners(menu);
  }
}

function showAwardDetail(award, store){
  $('.container-view').removeClass('selected');
  $('#view-award').addClass('selected');
  console.log(award.id, award.barCode);
  var brand = getBrandByStoreId(store.id);
  var imageUrl = (siteUrl+brand.image).toString();
  $('#view-award .title').attr('id', award.id);
  $('#brand-title').text(brand.name.toUpperCase());
  $('#brand-local').text(store.local);
  $('#brand-image').css({backgroundImage: 'url('+imageUrl+')'});
  $('#award-title').text(' '+award.title.toUpperCase());
  $('#award-validity').text(moment(award.validity*1000).format('YYYY-MM-DD'));
  var codeH = $("#award-qrcode").height();
  $("#award-qrcode").barcode(award.barCode, "ean13", {barWidth: (codeH*.02), barHeight:codeH*.8+'px', fontSize: codeH*.2+'px'});
  if(award.barCode !== undefined && award.barCode !== ''){
    startAwardTimeout(award.barCode);
  }
}

storesMethods.prototype.showCategories = function(container){
  if($('.categorie-container').length <= 0){
    $('.categorie-container').off(); container.empty();
    categoriesData.forEach(function(categorie){
      var categorieDiv = $('<div class="categorie-container" id="categorie-'+categorie.id+'">'
          +'<div class="name"><div class="table-cell">'+categorie.name.toUpperCase()+'</div></div>'
          +'<div class="check-cat">'
            +'<div class="table-cell">'
              +'<span class="coup-radio-redondo-null notchecked"></span>'
              +'<span class="coup-radio-redondo-check checked"></span>'
            +'</div>'
          +'</div>'
        +'</div>');
      container.append(categorieDiv);
    });
    $('.categorie-container').on('click', function(){
      if($(this).hasClass('selected') === true){
        $(this).removeClass('selected');
      }else{
        $(this).addClass('selected');
      }
    });
  }
};

storesMethods.prototype.showLocations = function(container){
  if($('.location-container').length <= 0){
    $('.location-container').off(); container.empty();
      citiesData.forEach(function(location){
      var locationDiv = $('<div class="location-container" id="location-'+location.id+'">'
          +'<div class="name"><div class="table-cell">'+location.name.toUpperCase()+'</div></div>'
          +'<div class="check-loc">'
            +'<div class="table-cell">'
              +'<span class="coup-radio-redondo-null notchecked"></span>'
              +'<span class="coup-radio-redondo-check checked"></span>'
            +'</div>'
          +'</div>'
        +'</div>');
      container.append(locationDiv);
    });
    $('.location-container').on('click', function(){
      $('.location-container').removeClass('selected');
      $(this).addClass('selected');
    });
  }
};

function addAwardListeners(menu){
  $('.store-container').on('click', function(){
    $('#view-award').find($('.back')).removeClass('back-share');
    $('#view-award').find($('.back')).addClass('back-award');
    var storeId = $(this).attr('id'); 
    storeId = storeId.substring(storeId.indexOf('store-')+6, storeId.indexOf('-award'));
    var awardId = $(this).attr('id'); 
    awardId = awardId.substring(awardId.indexOf('award-')+6, awardId.length);
    var store = getStoreById(storeId);
    console.log($(this).attr('id'),' :: store id :: ', storeId,' :: award id :: ',awardId);
    var _award = null;
    for(var i=0; i<awardsData.length; i++){
      if(awardsData[i].id === awardId){
        return showAwardDetail(awardsData[i], store);
      }
    }
  });
}

function addStoreListeners(menu){
  $('.store-container').on('click', function(){
    $('.container-view').removeClass('selected');
    $('#view-store').addClass('selected');
    var storeId = $(this).attr('id'); 
    showStoreDetails(storeId, menu);
  });
}

function addBrandListener(){
  $('.brand-container.stores').on('click', function(e){
    e.preventDefault(); 
    $(this).find($('li')).toggle();
    if($(this).find($('li')).is(':visible') === false){
      $(this).find($('.coup-seta-cima')).hide();
      $(this).find($('.coup-seta-baixo')).css('display', 'table-cell');
    }else{
      $(this).find($('.coup-seta-cima')).css('display', 'table-cell');
      $(this).find($('.coup-seta-baixo')).hide();
    }
  });
}

function showStoreDetails(storeId, menu){
  methods.showAllBrands($('.stores-container'), menu);
  $('.body-container-big.store.body-share').hide();
  var id = storeId; id = id = id.substring(id.indexOf('-')+1, id.length);
  console.log(storeId, id);
  var store = getStoreById(parseInt(id));
  if(!store){ return; }
  var brand = getBrandById(store.brand.toString());
  if(!brand){ return; }
  var awards = getAwardsByStoreId(store.id);
  $('.store-title').attr('id', store.id);
  var imageUrl = (siteUrl+brand.image).toString();
  console.log(imageUrl);
  $('#store-image').css({backgroundImage: 'url('+imageUrl+')'});
  $('#store-name').text(brand.name.toUpperCase());
  $('#store-local').text((store.local !== null) ? store.local : store.address);
  $('#store-available-awards').text(awards.length);
  
  var checkins = getAvailableCheckinsByStore(id);
  console.log('checkins', checkins, 'store ', id);
  if(brand.has_checkin === true){
    $('.available-check-ins').css('display', 'table');
    $('#store-check-ins').text(checkins);
    $(".share-checkin-button").css('display', 'table');
    if(checkins <= 0){ $(".share-checkin-button").css("opacity", .3);
    }else{ $(".share-checkin-button").css("opacity", 1); }
  }else{
    $('.available-check-ins').css('display', 'none');
    $(".share-checkin-button").css('display', 'none');
  }
  
  //var validity = (award !== null) ? validity = 'Validade até: '+moment(award.validity*1000).format('YYYY-MM-DD') : validity = '';
  $('#store-award-validity').text('Validade até: Falta validade');
  $('#store-award-description').text((store.description_prize !== undefined) ? store.description_prize.toUpperCase() : '');
  $('#store-description').text(brand.description);
  if(store.favorite === true){ store.favorite = true; $('#store-favorite').addClass('favorite'); }
  $('#store-address').text(store.address);
  $('#store-phone').text(store.phone);
  $('#store-email').text(store.email);
  (store.address !== null && store.address !== '') ? $('.address').show() : $('.address').hide();
  (store.phone !== null && store.phone !== '') ? $('.phone').show() : $('.phone').hide();
  (store.email !== null && store.email !== '') ? $('.email').show() : $('.email').hide();
}

function getAvailableCheckinsByStore(idStore){
  var value = 0;
  checkIns.forEach(function(checkin){
    if(checkin.id_store === idStore){
      value = (checkin.total !== undefined) ? checkin.total : 1;
    }
  });
  return value;
}

function setBrandDiv(name, id, image, categorie){
  var imageUrl = (siteUrl+image).toString();
  var brandDiv = $('<li class="brand-container stores" id="brand-'+id+'">'
      +'<div class="brand">'
        +'<div class="image" style="background-image: url('+imageUrl+')"></div>'
        +'<div class="body">'
          +'<div class="name">'+name.toUpperCase()+'</div>'
          +'<div class="categorie">'+categorie+'</div>'
        +'</div>'
        +'<div class="arrow"><span class="coup-seta-baixo"></span><span class="coup-seta-cima"></span></div>'
      +'</div>'
    +'</li>');
  return brandDiv;
}

function setStoreDiv1(id, premio, local, address, premioId){
  var storeDiv;
  if(premioId !== null){
    storeDiv = $('<li class="store-container store1" id="store-'+id+'-award-'+premioId+'"></li>');
  }else{
    storeDiv = $('<li class="store-container store1" id="store-'+id+'"></li>');
  }
  var _validity = 'Sem validade definida';
  //(premio !== null) ? _validity = 'Válido até '+moment(premio.validity*1000).format('YYYY-MM-DD') : _validity = '';
  var title = (premio !== undefined) ? premio : 'Sem prémio';
  storeDiv.append($('<div class="body">'
    +'<div class="local">'+((local !== null) ? local : address)+'</div>'
    +'<div class="description">'+title+'</div>'
    +'<div class="validity">'+_validity+'</div>'
  +'</div>'
  +'<div class="arrow"><span class="coup-seta-drt"></span></div>'));
  return storeDiv;
}

function setStoreDiv2(name, id, categorie, image, titlePremio, premioId){
  var title = '';
  title = (titlePremio !== undefined) ? titlePremio : 'Sem prémio';
  var imageUrl = (siteUrl+image).toString();
  var storeDiv;
  if(premioId !== null){
    storeDiv = $('<li class="store-container store2" id="store-'+id+'-award-'+premioId+'"></li>');
  }else{
    storeDiv = $('<li class="store-container store2" id="store-'+id+'"></li>');
  }
  storeDiv.append($('<div class="image" style="background-image: url('+imageUrl+')"></div>'
        +'<div class="body">'
          +'<div class="name">'+name.toUpperCase()+'</div>'
          +'<div class="categorie">'+categorie+'</div>'
          +'<div class="award">'+title+'</div>'
        +'</div>'
      +'<div class="arrow"><span class="coup-seta-drt"></span></div>'));
  return storeDiv;
}

function getStoresByBrandAndCities(brand, cities){
  var stores = [];
  storesData.forEach(function(store){
    if(brand === store.brand && cities.indexOf(parseInt(store.city)) !== -1){ 
      stores.push(store);
    }
  });
  return stores;
}

function getStoresByBrand(id){
  var stores = [];
  storesData.forEach(function(store){
    if(id === store.brand){ stores.push(store);}
  });
  return stores;
}

function getStoreById(storeId){
  var storeInfo = null;
  storesData.forEach(function(store){
    if(store.id.toString() === storeId.toString()){
      storeInfo = store; return storeInfo;
    }
  }); 
  return storeInfo;
}

function getAwardById(id){
  var _award=null;
  awardsData.forEach(function(award){
    if(id.toString() === award.id.toString()){
      _award = award; return _award;
    }
  });
  return _award;
}

function getAwardsByStoreId(id){
  var _awards=[];
  awardsData.forEach(function(award){
    if(id.toString() === award.store.toString()){
      _awards.push(award); return _awards;
    }
  });
  return _awards;
}

function getAwardByStore(storeId){
  var title="";
  awardsData.forEach(function(award){
    if(storeId.toString() === award.store.toString()){
      title = award.title; return title;
    }
  });
  return title;
}

function getCategorieNameById(id){
  var returnedCat = "";
  categoriesData.forEach(function(categorie){
    if(categorie.id === id ){
      returnedCat = categorie.name; return returnedCat;
    }
  });
  return returnedCat;
}

function getLocationNameById(id){
  var returnedLoc = "";
  citiesData.forEach(function(location){
    if(location.id.toString() === id.toString()){
      returnedLoc = location.name; return returnedLoc;
    }
  });
  return returnedLoc;
}

function getBrandById(id){
  var returnedBrand = "";
  brandsData.forEach(function(brand){
    if(brand.id.toString() === id.toString()){
      returnedBrand = brand; return returnedBrand;
    }
  });
  return returnedBrand;
}

function getBrandByStoreId(id){
  var returnedBrand = null;
  storesData.forEach(function(store){
    if(store.id.toString() === id.toString()){
      returnedBrand = getBrandById(store.brand); 
      return returnedBrand;
    }
  });
  return returnedBrand;
}