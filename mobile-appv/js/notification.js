window.onload = function setDataSource() {
  if (!!window.EventSource && userData !== null) {
    var source = new EventSource("http://api.coupzon.tk/events.php");
    source.addEventListener(("checkIn_"+userData.user.id), function(e) {
      //aqui chamas a api para ir buscar a info do checkin feito
      console.log(e);
      checkInExists((actualMenu === 'qrcode') ? true: false);
      
    }, false);
    
    source.addEventListener(("prizeReclaim_"+userData.user.id), function(e) {
      //aqui chamas a api para ir buscar a info do prizeReclaim
      console.log(e);
      var awardId = $('#view-award .title').attr('id');
      var award = getAwardById(awardId);
      console.log(awardId, award);
      prizeReclaim((actualMenu === 'awards') ? true : false, award.barCode);
    }, false);

    source.addEventListener(("newactivity_"+userData.user.id), function(e) {
      //aqui chamas a api para ir buscar a info do prizeReclaim
      console.log('newactivity', e);
      showNotification(1, 'menu-settings');
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