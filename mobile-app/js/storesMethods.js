function storesMethods(){

}

storesMethods.prototype.showAllBrands = function(container){
  $('.brand-container').off(); $('.store-container').off(); container.empty();
  showFilteredBrands(brandsData, container);
};

function showFilteredBrands(brands, container){
  brands.forEach(function(brand){
    var categoria = getCategorieNameById(brand.categorie).toUpperCase();
    var brandDiv = setBrandDiv(brand.name, brand.id, brand.image, categoria);
    var stores = getStoresByBrand(brand.id);
    if(stores !== null && stores.length > 1){
      stores.forEach(function(store){
        var premio = getAwardByStore(store.id);
        brandDiv.append(setStoreDiv(store.name, store.id, premio, store.local));
      });
    }
    container.append(brandDiv);
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
  console.log(award);
  $('#award-title').text(' '+award.title.toUpperCase());
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

storesMethods.prototype.showSelectedStores = function(selectedCategories, selectedLocation, container, selectedPlace, selectedCat){
  $('.store-container').off(); container.empty();
  if(selectedCategories.length > 0){
    if(selectedCategories.length == 1){
      selectedCat.text(getCategorieNameById(selectedCategories[0]).toUpperCase());
    }else{
      selectedCat.text(selectedCategories.length +' CATEGORIAS');
    }
  }else{
    selectedCat.text('--');
  }
  if(selectedLocation.length > 0){
    selectedPlace.text(getLocationNameById(selectedLocation[0]).toUpperCase());
  }else{
    selectedPlace.text('--');
  }
  var results = 0;
  /*storesData.forEach(function(store){
    if( ((selectedLocation.length <= 0) || selectedLocation.indexOf(store.city)) !== -1 && ( (selectedCategories.length <= 0) || selectedCategories.indexOf(store.categorie) !== -1) ){
        console.log(store.categorie, store.city, store);
        var categoria = getCategorieNameById(store.categorie).toUpperCase();
        var premio = getAwardByStore(store.id);
        var storeDiv = setStoreDiv(store.name, store.id, store.image, premio, categoria);
        container.append(storeDiv); results ++;
    }
  });
  addStoreListeners();
  if(results === 0){
    container.append('<div class="no-stores-filtered">Não existem lojas para essa Categoria ou Localidade seleccionada.</div>');
  }*/
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
  });
}

function showStoreDetails(storeId){
  var id = storeId; id = id.substring(id.indexOf('-')+1, id.length);
  var store = getStoreById(parseInt(id));
  console.log(id.toString(), store);
  if(!store){ return; }
  
  $('#store-name').text(store.name.toUpperCase());
}

function setBrandDiv(name, id, image, categorie){
  var brandDiv = $('<li class="brand-container stores" id="brand-'+id+'">'
      +'<div class="image" style="background-image: url('+image+')"></div>'
      +'<div class="body">'
        +'<div class="name">'+name.toUpperCase()+'</div>'
        +'<div class="categorie">'+categorie+'</div>'
      +'</div>'
    +'</li>');
  return brandDiv;
}

function setStoreDiv(name, id, premio,local){
  var storeDiv = $('<li class="store-container" id="store-'+id+'" style="display: none">'
      +'<div class="body">'
        +'<div class="name">'+name.toUpperCase()+'</div>'
        +'<div class="description">'+premio+'</div>'
        +'<div class="description">'+local+'</div>'
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