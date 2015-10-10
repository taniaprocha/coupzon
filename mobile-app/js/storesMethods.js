function storesMethods(){

}

storesMethods.prototype.showAllBrands = function(container){
  $('.brand-container').off(); $('.store-container').off(); container.empty();
  showFilteredBrands(brandsData, container);
};

function showFilteredBrands(brands, container){
  brands.forEach(function(brand){
    var categoria = getCategorieNameById(brand.categorie).toUpperCase();
    var brandDiv;
    var stores = getStoresByBrand(brand.id);
    if(stores !== null && stores.length > 0){
      if(stores.length > 1){
        brandDiv = setBrandDiv(brand.name, brand.id, brand.image, categoria);
        stores.forEach(function(store){
          var premio = getAwardByStoreId(store.id); 
          brandDiv.append(setStoreDiv1(store.id, premio, store.local));
        });
        container.append(brandDiv);
      }else{
        var premio = getAwardByStoreId(stores[0].id); 
        container.append(setStoreDiv2(brand.name, stores[0].id, categoria, brand.image, premio));
      }
    }
  });
  addBrandListener();
  addStoreListeners();
}

function getStoresByBrand(id){
  var stores = [];
  storesData.forEach(function(store){
    if(id === store.brand){ stores.push(store);}
  });
  return stores;
}

storesMethods.prototype.showAllAwards = function(container){
  $('.award-container').off(); container.empty();
  var awardsByBrand = [];
  awardsData.forEach(function(award){
    if(!awardsByBrand[award.brand]){ awardsByBrand[award.brand] = []; }
    awardsByBrand[award.brand].push(award);   
  });
  brandsData.forEach(function(brand){
    if(awardsByBrand[brand.id] !== undefined){
      var _brand = getBrandById(brand.id);
      var awards = awardsByBrand[brand.id];
      var description = '';
      if(awards.length > 1){ description = 'Vários prémios';
      }else{ description = awards[0].title; }
      var brandDiv = $('<li class="brand-container awards" id="brand-'+_brand.id+'">'
        +'<div class="image" style="background-image: url('+_brand.image+')"></div>'
        +'<div class="body">'
          +'<div class="name">'+_brand.name.toUpperCase()+'</div>'
          +'<div class="award">'+description+'</div>'
        +'</div>'
        +'<div class="arrow"><span class="coup-seta-drt"></span></div>'
      +'</li>');
      container.append(brandDiv);
    }
  });
  $('.brand-container.awards').on('click', function(){
    $('.body-awards').hide();
    $('.body-selected-brand').show();
    var id = $(this).attr('id'); id = id.substring(id.indexOf('-')+1, id.length);
    var brand = getBrandById(id);
    $('#brand-title span').text(brand.name.toUpperCase());
    $('#brand-image').css({backgroundImage: 'url('+brand.image+')'});
    showAward(awardsByBrand[id]);
  });
}

function showAward(awardsList){
  var body = $('.body-container-big.awards.body-selected-brand').height() - ($('#brand-title').height() + $('#brand-image').height());
  $('.awards-list').css({height: body+'px'});
  $('.awards-detail').css({height: body+'px'});
  if(awardsList.length === 1){
    $('.awards-list').hide(); $('.award-detail').show();
    showAwardDetail(awardsList[0].id);
  }else{
    $('.awards-list').show(); $('.award-detail').hide();
    awardsList.forEach(function(award){
      var _validity = moment(award.validity*1000).format('YYYY-MM-DD');
      var div = $('<li class="award-brand-container" id="award-'+award.id+'">'
        +'<div class="body">'
          +'<div class="title">'+award.title.toUpperCase()+'</div>'
          +'<div class="validy">Válido até '+_validity+'</div>'
        +'</div>'
        +'<div class="arrow"><span class="coup-seta-drt"></span></div>'
      +'</li>');
      $('.awards-list').append(div);
    });
    $('.award-brand-container').on('click', function(){
      var id = $(this).attr('id'); id = id.substring(id.indexOf('-')+1, id.length);
      showAwardDetail(id);
    });
  }
}

function showAwardDetail(id){
  $('.awards-list').hide(); $('.award-detail').show();
  var award = getAwardById(id);
  $('#award-title').text(' '+award.title.toUpperCase());
  console.log(award.validity, moment(award.validity*1000).format('YYYY-MM-DD'));
  $('#award-validity').text(moment(award.validity*1000).format('YYYY-MM-DD'));
}

storesMethods.prototype.showCategories = function(container){
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
};

storesMethods.prototype.showLocations = function(container){
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
    if( selectedCategories.indexOf(brand.categorie) !== -1 ){
      var categoria = getCategorieNameById(brand.categorie).toUpperCase();
      var brandDiv = setBrandDiv(brand.name, brand.id, brand.image, categoria);
      var stores = getStoresByBrand(brand.id);
      if(stores !== null && stores.length > 0){
        if(stores.length > 1){ 
          stores.forEach(function(store){
            if( selectedLocation.indexOf(store.city) !== -1 ){
              if(brandDiv.length < 0){ container.append(brandDiv); }
              brandDiv.append(setStoreDiv1(store.id, getAwardByStoreId(store.id), store.local)); results ++;
            }
          });
        }else{
          if( selectedLocation.indexOf(stores[0].city) !== -1 ){
            results ++; container.append(setStoreDiv2(brand.name, stores[0].id, categoria, brand.image, getAwardByStoreId(stores[0].id)));
          }
          
        }
      }
    }
  });
  console.log(results);
  if(results === 0){
    container.append('<div class="no-stores-filtered">Não existem lojas para essa Categoria ou Localidade seleccionada.</div>');
  }else{
    addBrandListener();
    addStoreListeners();
  }
}

function addStoreListeners(){
  $('.store-container').on('click', function(){
    $('.container-view').removeClass('selected');
    $('#view-store').addClass('selected');
    showStoreDetails($(this).attr('id'));
  });
}

function addBrandListener(){
  $('.brand-container.stores').on('click', function(e){
    e.preventDefault(); $(this).find($('li')).toggle();
    console.log($(this).find($('li')).is(':visible')); 
    if($(this).find($('li')).is(':visible') === true){
      $(this).find($('.coup-seta-cima')).hide();
      $(this).find($('.coup-seta-baixo')).css('display', 'table-cell');
    }else{
      $(this).find($('.coup-seta-cima')).css('display', 'table-cell');
      $(this).find($('.coup-seta-baixo')).hide();
    }
  });
}

function showStoreDetails(storeId){
  var id = storeId; id = id.substring(id.indexOf('-')+1, id.length);
  var store = getStoreById(parseInt(id));
  if(!store){ return; }
  var brand = getBrandById(store.brand.toString());
  if(!brand){ return; }
  var award = getAwardByStoreId(store.id);
  $('#store-image').css({backgroundImage: 'url('+brand.image+')'});
  $('#store-name').text(brand.name.toUpperCase());
  $('#store-local').text(store.local);
  var validity = (award !== null) ? validity = moment(award.validity*1000).format('YYYY-MM-DD') : validity = '';
  console.log(moment(award.validity*1000).format('YYYY-MM-DD'), validity);
  $('#store-award-validity').text('Validade até: '+validity);
  $('#store-award-description').text((award !== null) ? award.title.toUpperCase() : '');
  $('#store-description').text(brand.description);
  if(store.favorite === true){ $('#store-favorite').addClass('favorite'); }
  $('#store-address').text(store.address);
  $('#store-phone').text(store.phone);
  $('#store-email').text(store.email);
  (store.address !== '') ? $('.address').show() : $('.address').hide();
  (store.phone !== '') ? $('.phone').show() : $('.phone').hide();
  (store.email !== '') ? $('.email').show() : $('.email').hide();
}

function setBrandDiv(name, id, image, categorie){
  var brandDiv = $('<li class="brand-container stores" id="brand-'+id+'">'
      +'<div class="brand">'
        +'<div class="image" style="background-image: url('+image+')"></div>'
        +'<div class="body">'
          +'<div class="name">'+name.toUpperCase()+'</div>'
          +'<div class="categorie">'+categorie+'</div>'
        +'</div>'
        +'<div class="arrow"><span class="coup-seta-baixo"></span><span class="coup-seta-cima"></span></div>'
      +'</div>'
    +'</li>');
  return brandDiv;
}

function setStoreDiv1(id, premio, local){
  var storeDiv = $('<li class="store-container store1" id="store-'+id+'"></li>');
    var _validity, title = '';
    (premio !== null) ? _validity = moment(premio.validity*1000).format('YYYY-MM-DD') : _validity = '';
    (premio !== null) ? title = premio.title : title = '';
    storeDiv.append($('<div class="body">'
      +'<div class="local">'+local+'</div>'
      +'<div class="description">'+title+'</div>'
      +'<div class="validity">Válido até '+_validity+'</div>'
    +'</div>'
    +'<div class="arrow"><span class="coup-seta-drt"></span></div>'));
  return storeDiv;
}

function setStoreDiv2(name, id, categorie, image, premio){
  var title = '';
  (premio !== null) ? title = premio.title : title = '';
  var storeDiv = $('<li class="store-container store2" id="store-'+id+'">'
        +'<div class="image" style="background-image: url('+image+')"></div>'
        +'<div class="body">'
          +'<div class="name">'+name.toUpperCase()+'</div>'
          +'<div class="categorie">'+categorie+'</div>'
          +'<div class="award">'+title+'</div>'
        +'</div>'
      +'<div class="arrow"><span class="coup-seta-drt"></span></div>'
    +'</li>');
  return storeDiv;
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

function getAwardByStoreId(id){
  var _award=null;
  awardsData.forEach(function(award){
    if(id.toString() === award.store.toString()){
      _award = award; return _award;
    }
  });
  return _award;
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