window.onload = function setDataSource() {
  if (!!window.EventSource && userData !== null) {
    var source = new EventSource("http://api.coupzon.tk/events.php");
    /*source.addEventListener(("checkIn_"+userData.user.id), function(e) {
      //aqui chamas a api para ir buscar a info do checkin feito
      console.log('new checkin ', e);
      checkInExists((actualMenu === 'qrcode') ? true: false);
    }, false);*/
    
    /*source.addEventListener(("prizeReclaim_"+userData.user.id), function(e) {
      //aqui chamas a api para ir buscar a info do prizeReclaim
      console.log('prize reclaim ',e);
      
      if(actualMenu === 'awards'){
        var awardId = $('#view-award .title').attr('id');
        var award = getAwardById(awardId);
        console.log(awardId, award);
        prizeReclaim(award.barCode);
      }else{
        prizeReclaim(null);
      }
    }, false);*/

    source.addEventListener(("newActivity_"+userData.user.id), function(e) {
      //aqui chamas a api para ir buscar a info do prizeReclaim
      console.log('newactivity ', e.data);
      var type = e.data;
      switch(type){
        case 'newActivity_checkin':
          if(actualMenu !== 'qrcode'){
            showNotification(null, 'menu-settings');
          }
          checkInExists((actualMenu === 'qrcode') ? true: false);
          break;
        case 'prizeGain':
          showNotification(null, 'menu-settings');
          getPricesFromAPI(null, 'update'); 
          break;
        case 'sharePrize':
          showNotification(null, 'menu-settings');
          getPricesFromAPI(null, 'update');  
          break;
        case 'shareCheckins':
          break;
        case 'prizeRedeem':
          if(actualMenu === 'awards'){
            var awardId = $('#view-award .title').attr('id');
            var award = getAwardById(awardId);
            console.log(awardId, award);
            prizeReclaim(award.barCode);
          }else{
            showNotification(null, 'menu-settings');
            getPricesFromAPI(null, 'update'); 
          }
          break;

      }
      
      activityList();
    }, false);

    source.addEventListener("open", function(e) {
      console.log("OPENED");
      //efeitos de log apenas e de controlo de erros
    }, false);

    source.addEventListener("error", function(e) {
      console.log("ERROR");
      //efeitos de log apenas e de controlo de erros
        if(e.readyState == EventSource.CLOSED){
          console.log("CLOSED");
        }
    }, false);

  }else{
    //document.getElementById("notSupported").style.display = "block";
  }
}