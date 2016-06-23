$(document).ready(function () {
   document.getElementById("userName").innerText = $.cookieStorage.get('User').name;
   SendRequest();
   $('.toggle-nav').click(function (e) {
      e.stopPropagation();
      toggleNav();
   });
   $('html*, body').click(function (e) {
      var target = $(e.target);
      if (!target.closest('#nav').length && $('#wrapper').hasClass('show-nav')) toggleNav();
   });




});
function preventDefault(e) {
   e = e || window.event;
   if (e.preventDefault)
      e.preventDefault();
   e.returnValue = false;
}
function voltar(){
   window.location.href ='home.html';
}
function Click(servico){

   console.log(servico);
   $.cookieStorage.remove('Schedules');

   $.cookieStorage.set(servico);

   if ($.cookieStorage.isSet('Schedules')) {

      window.location.href = "service_galery_image.html";

   } else {
      generateModalAlert("Erro ao salvar Cookie");
      $('#mymodal').modal('show');
   }
}
var Base64 = {
   _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
   encode: function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = Base64._utf8_encode(input);
      while (i < input.length) {
         chr1 = input.charCodeAt(i++);
         chr2 = input.charCodeAt(i++);
         chr3 = input.charCodeAt(i++);
         enc1 = chr1 >> 2;
         enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
         enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
         enc4 = chr3 & 63;
         if (isNaN(chr2)) {
            enc3 = enc4 = 64;
         } else if (isNaN(chr3)) {
            enc4 = 64;
         }
         output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      }
      return output;
   },
   decode: function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
         enc1 = this._keyStr.indexOf(input.charAt(i++));
         enc2 = this._keyStr.indexOf(input.charAt(i++));
         enc3 = this._keyStr.indexOf(input.charAt(i++));
         enc4 = this._keyStr.indexOf(input.charAt(i++));
         chr1 = (enc1 << 2) | (enc2 >> 4);
         chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
         chr3 = ((enc3 & 3) << 6) | enc4;
         output = output + String.fromCharCode(chr1);
         if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
         }
         if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
         }
      }
      output = Base64._utf8_decode(output);
      return output;
   },
   _utf8_encode: function (string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
         var c = string.charCodeAt(n);
         if (c < 128) {
            utftext += String.fromCharCode(c);
         }
         else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
         }
         else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
         }
      }
      return utftext;
   },
   _utf8_decode: function (utftext) {
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;
      while (i < utftext.length) {
         c = utftext.charCodeAt(i);
         if (c < 128) {
            string += String.fromCharCode(c);
            i++;
         }
         else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
         }
         else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
         }
      }
      return string;
   }
};

function SendRequest(){
   var query = "SELECT*FROM schedules Schedules WHERE user_id =" + $.cookieStorage.get('User').id + " and Schedules.date <= DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%d') and Schedules.status = 0 or user_id =" + $.cookieStorage.get('User').id + "  and Schedules.date = DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%d') and Schedules.status = 1 ORDER BY Schedules.date DESC";

   var conditions = {
      'General': {
            'query':query
      }
   };
   var postData = JSON.stringify(conditions);

   postData = {
      'params': postData
   };
   var url = 'http://'+ip+'/api/General/get/query/' + createToken();

   $.ajax({
      method: "POST",
      url: url,
      data: postData

   }).done(function(result) {

      if(result!="ImE6MDp7fSI="){
      var objReturn = JSON.parse(JSON.stringify(result));
      var decodeObjReturn = Base64.decode(objReturn);
      var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
      var todayDate = new Date;
      var data =   moment(todayDate).format('YYYY-MM-DD');
         var texto = utf8_decode("Não há histórico a ser exibido.");
   for(var i=0;i<convertedReturn.length;i++){
      var servico = convertedReturn[i];
      var datadoservico =  servico.Schedules.date;
      var datadoservicoformatada = moment(datadoservico).format('DD/MM/YYYY');
      var acento = utf8_decode(servico.Schedules.subclasse_name);


            var servicos = JSON.stringify(servico);
            $("#Services_History").append("<div class='col-xs-4 tablecontent'>"+datadoservicoformatada+"</div><div class='col-xs-4 tablecontent' id='service'>"+acento+"</div><div class='col-xs-4 tablecontent' id='img'><img id='fota"+servico.Schedules.service_id+"' src='img/icons/Imagens.png' class='galeryImage' onclick='Click("+servicos+")'></div>");

   }
      }else{

      }
   }).error(function(XMLHttpRequest, textStatus, errorThrown) {
      alert(errorThrown);
   });

}

function createToken() {
   var arraySend = {
      'secureNumbers': Math.floor(new Date().getTime() / 1000)
   };
   var json = JSON.stringify(arraySend);
   return Base64.encode(json);
}
