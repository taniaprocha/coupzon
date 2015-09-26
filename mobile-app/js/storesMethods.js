function storesMethods(){

}

storesMethods.prototype.showAllStores = function(data, container, categoriesData, awardsData){
  container.empty();
  data.forEach(function(store){
    var categoria = getCategorieNameById(store.categorie, categoriesData).toUpperCase();
    var premio = getAwardByStore(store.id, awardsData);
    var storeDiv = $('<div class="store-container" id="store-'+store.id+'">'
      +'<div class="image" style="background-image: url('+store.image+')"></div>'
      +'<div class="body">'
        +'<div class="table-cell">'
          +'<div class="name">'+store.name.toUpperCase()+'</div>'
          +'<div class="description">'+premio+'</div>'
          +'<div class="categorie">'+categoria+'</div>'
        +'</div>'
      +'</div>'
      +'<div class="arrow"><span></span></div>'
    +'</div>');
    container.append(storeDiv);
  });
};

storesMethods.prototype.showAllAwards = function(data, stores, container){
  container.empty();
  data.forEach(function(award){
    var store = getStoreById(award.store, stores);
    var awardDiv = $('<div class="award-container" id="award-'+award.id+'">'
      +'<div class="image" style="background-image: url('+store.image+')"></div>'
      +'<div class="body">'
        +'<div class="table-cell">'
          +'<div class="store">'+store.name.toUpperCase()+'</div>'
          +'<div class="description">'+award.title+'</div>'
        +'</div>'
      +'</div>'
      +'<div class="arrow"><span></span></div>'
    +'</div>');
    container.append(awardDiv);
  });
}

function getStoreById(storeId, data){
  var storeInfo = null;
  data.forEach(function(store){
    if(store.id === storeId){
      storeInfo = store; return storeInfo;
    }
  }); 
  return storeInfo;
}

function getAwardByStore(id, awardsData){
  var title="";
  awardsData.forEach(function(award){
    if(id === award.store){
      title = award.title; return title;
    }
  });
  return title;
}

function getCategorieNameById(id, categoriesData){
  var returnedCat = "";
  categoriesData.forEach(function(categorie){
    if(categorie.id === id){
      returnedCat = categorie.name; return returnedCat;
    }
  });
  return returnedCat;
}

storesMethods.prototype.showCategories = function(data, container){
  container.empty();
  data.forEach(function(categorie){
    var categorieDiv = $('<div class="categorie-container" id="categorie-'+categorie.id+'">'
        +'<div class="name"><div class="table-cell">'+categorie.name.toUpperCase()+'</div></div>'
        +'<div class="check-cat">'
          +'<div class="table-cell">'
            +'<div class="not-check"></div>'
            +'<div class="check"></div>'
          +'</div>'
        +'</div>'
      +'</div>');
    container.append(categorieDiv);
  });
};

storesMethods.prototype.showLocations = function(data, container){
  container.empty();
  data.forEach(function(location){
    var locationDiv = $('<div class="location-container" id="location-'+location.id+'">'
        +'<div class="name"><div class="table-cell">'+location.name.toUpperCase()+'</div></div>'
        +'<div class="check-loc">'
          +'<div class="table-cell">'
            +'<div class="not-check"></div>'
            +'<div class="check"></div>'
          +'</div>'
        +'</div>'
      +'</div>');
    console.log(locationDiv);
    container.append(locationDiv);
  });
};