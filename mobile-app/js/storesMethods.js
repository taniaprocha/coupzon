function storesMethods(){

}

storesMethods.prototype.showAllStores = function(container){
  $('.store-container').off(); container.empty();
  brandsData.forEach(function(brand){
    var categoria = getCategorieNameById(brand.categorie).toUpperCase();

    var brandDiv = setStoreDiv(store.name, store.id, store.image, premio, categoria);
    container.append(brandDiv);
  });
  /*storesData.forEach(function(store){
    var categoria = getCategorieNameById(store.categorie).toUpperCase();
    var premio = getAwardByStore(store.id);
    var storeDiv = setStoreDiv(store.name, store.id, store.image, premio, categoria);
    container.append(storeDiv);
  });
  addStoreListeners();*/
};

storesMethods.prototype.showAllAwards = function(container){
  $('.award-container').off(); container.empty();
  awardsData.forEach(function(award){
    var store = getStoreById(award.store);
    var awardDiv = $('<div class="award-container" id="award-'+award.id+'">'
      +'<div class="image" style="background-image: url('+store.image+')"></div>'
      +'<div class="body">'
        +'<section  class="store">'+store.name.toUpperCase()+'</section >'
        +'<section  class="description">'+award.title+'</section >'
      +'</div>'
      +'<div class="arrow"><span class="coup-seta-drt"></span></div>'
    +'</div>');
    container.append(awardDiv);
  });
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
  storesData.forEach(function(store){
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
  }
}

function addStoreListeners(){
  $('.store-container').on('click', function(){
    $('.container-view').removeClass('selected');
    $('#view-store').addClass('selected');
    showStoreDetails($(this).attr('id'));
  });
}

function showStoreDetails(storeId){
  console.log(storeId);
  var id = storeId; id = id.substring(id.indexOf('-')+1, id.length);
  var store = getStoreById(parseInt(id));
  console.log(id.toString(), store);
  if(!store){ return; }
  
  $('#store-name').text(store.name.toUpperCase());
}

function setBrandDiv(name, id, image, categorie){
  var brandDiv = $('<div class="store-container" id="store-'+id+'">'
      +'<div class="image" style="background-image: url('+image+')"></div>'
      +'<div class="body">'
        +'<div class="name">'+name.toUpperCase()+'</div>'
        +'<div class="description">'+premio+'</div>'
        +'<div class="categorie">'+categorie+'</div>'
      +'</div>'
      +'<div class="arrow"><span class="coup-seta-drt"></span></div>'
    +'</div>');
  return brandDiv;
}

function setStoreDiv(name, id, image, premio, categorie){
  var storeDiv = $('<div class="store-container" id="store-'+id+'">'
      +'<div class="image" style="background-image: url('+image+')"></div>'
      +'<div class="body">'
        +'<div class="name">'+name.toUpperCase()+'</div>'
        +'<div class="description">'+premio+'</div>'
        +'<div class="categorie">'+categorie+'</div>'
      +'</div>'
      +'<div class="arrow"><span class="coup-seta-drt"></span></div>'
    +'</div>');
  return storeDiv;
}

function getStoreById(storeId){
  var storeInfo = null;
  storesData.forEach(function(store){
    if(store.id === storeId){
      storeInfo = store; return storeInfo;
    }
  }); 
  return storeInfo;
}

function getAwardByStore(id){
  var title="";
  awardsData.forEach(function(award){
    if(id === award.store){
      title = award.title; return title;
    }
  });
  return title;
}

function getCategorieNameById(id){
  var returnedCat = "";
  categoriesData.forEach(function(categorie){
    if(categorie.id === id){
      returnedCat = categorie.name; return returnedCat;
    }
  });
  return returnedCat;
}

function getLocationNameById(id){
  var returnedLoc = "";
  citiesData.forEach(function(location){
    if(location.id === id){
      returnedLoc = location.name; return returnedLoc;
    }
  });
  return returnedLoc;
}