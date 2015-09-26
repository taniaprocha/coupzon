function storesMethods(){

}

storesMethods.prototype.showAllStores = function(data, container, categoriesData){
  var stores = data.stores;
  container.empty();
  stores.forEach(function(store){
    var storeDiv = $('<div class="store-container" id="store-'+store.id+'">'
      +'<div class="image" style="background-image: url('+store.image+')"></div>'
      +'<div class="body">'
        +'<div class="table-cell">'
          +'<div class="name">'+store.name.toUpperCase()+'</div>'
          +'<div class="description">'+store.decription+'</div>'
          +'<div class="categorie">'+getCategorieNameById(store.id, categoriesData).toUpperCase()+'</div>'
        +'</div>'
      +'</div>'
      +'<div class="arrow"><span></span></div>'
      +'</div>');
    container.append(storeDiv);
  });
};

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
    var categorieDiv = $('<div class="categorie-container" id="categorie-'+categorie.id+'"><span>'+categorie.name+'</span></div>');
    container.append(categorieDiv);
  });
};