var limitarcaracteres = 16;
var agora = moment(new Date());
agora  = agora.year()+"-"+((agora.month()/1)+1)+"-"+agora.date() + " " + agora.hour()+":"+agora.minutes()+":00";

$(document).ready(function () {

    var query = 'UPDATE users SET last_update = "'+agora+'" WHERE id = ' + $.cookieStorage.get('User').id;

    var conditions = {
        'General':{
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

      

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

    if($.cookieStorage.isSet('notifications')){
        if($.cookieStorage.get('notifications')!=0){
            $('#notify').html("<img src='img/icons/Sino.png' class='menu' id='UserLink' /><span class='badge' id='notify'>"+$.cookieStorage.get('notifications')+"</span>");
        }else {
            $('#notify').html("<img src='img/icons/Sino.png' class='menu' id='UserLink'/>");
        }
    }else{
        $('#notify').html("<img src='img/icons/Sino.png' class='menu' id='UserLink'/>");
    }

    $('#notify').click(function (){
        window.location.href = 'notifications.html';
    });
    $("#userName").click(function (){
        window.location.href = 'my_profile.html';
    });
    $("#calendarDisplayLink").click(function (){
       $.dialog({
            title: '',
            content: '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><button class="btn" onclick="NovoAgendamento();">Novo Agendamento</button></br></br><button class="btn" onclick="AgendamentosExistentes();" >Agendamentos Existentes</button></br></br><button class="btn" onclick="AgendamentoComVoucher();">Agendar com Voucher</button>',
            animation: 'zoom',
            closeIcon:false,
            closeAnimation: 'scale',
            animationBounce: 1.5,
            backgroundDismiss:true,
            theme: 'supervan',
            keyboardEnabled: true

     });

    });


    $("#servicesHistoryLink").click(function (){
        window.location.href = "vouchers_list.html";
    });
    
    $("#homeCardDivIcon").click(function (){
        window.location.href = "offer_history.html";
    });

    $("#offerIconDisplay").click(function (){
        window.location.href = "services_history.html";
    });

    $("#userOptonsIcon").click(function (){
        window.location.href = "my_profile.html";
    });
    $("#feedLink").click(function (){
        window.location.href = "news.html";
    });
    $("#AGENDA").click(function (){
        window.location.href = "agenda-views.html";
    });
    $("#offerDisplayLink").click(function (){
        window.location.href = "offer_display.html";
    });
    $("#plusIcon").click(function (){
        window.location.href = "business_follow.html";
    });

});

function utf8_decode (str_data) {
    //  discuss at: http://phpjs.org/functions/utf8_decode/
    // original by: Webtoolkit.info (http://www.webtoolkit.info/)
    //    input by: Aman Gupta
    //    input by: Brett Zamir (http://brett-zamir.me)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Norman "zEh" Fuchs
    // bugfixed by: hitwork
    // bugfixed by: Onno Marsman
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: kirilloid
    // bugfixed by: w35l3y (http://www.wesley.eti.br)
    //   example 1: utf8_decode('Kevin van Zonneveld');
    //   returns 1: 'Kevin van Zonneveld'

    var tmp_arr = [],
        i = 0,
        c1 = 0,
        seqlen = 0

    str_data += ''

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i) & 0xFF
        seqlen = 0

        // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
        if (c1 <= 0xBF) {
            c1 = (c1 & 0x7F)
            seqlen = 1
        } else if (c1 <= 0xDF) {
            c1 = (c1 & 0x1F)
            seqlen = 2
        } else if (c1 <= 0xEF) {
            c1 = (c1 & 0x0F)
            seqlen = 3
        } else {
            c1 = (c1 & 0x07)
            seqlen = 4
        }

        for (var ai = 1; ai < seqlen; ++ai) {
            c1 = ((c1 << 0x06) | (str_data.charCodeAt(ai + i) & 0x3F))
        }

        if (seqlen == 4) {
            c1 -= 0x10000
            tmp_arr.push(String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF)), String.fromCharCode(0xDC00 | (c1 & 0x3FF)))
        } else {
            tmp_arr.push(String.fromCharCode(c1))
        }

        i += seqlen
    }

    return tmp_arr.join('')
}

function NovoAgendamento(){
    window.location.href = "company_selection.html";
}
function AgendamentosExistentes(){
    window.location.href = "schedules_display.html";
}
function AgendamentoComVoucher(){
    window.location.href = "vouchers_list.html";
}
function meuLog(msg) {
    div = document.body;
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

function removePhoto(){

}
function clickOffer(offer){ //setando cookie com id da oferta clicada
    var query = 'SELECT * FROM offers_statistics WHERE offer_id = ' + offer;

    var conditions = {
        'General':{
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
        if(result != "ImE6MDp7fSI=") {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
            for (var i = 0; i < convertedReturn.length; i++) {


                var cliques = (convertedReturn[i].offers_statistics.details_click) / 1 + 1;

                var query2 = 'UPDATE offers_statistics SET details_click = ' + cliques + ' WHERE offer_id = ' + offer;

                var conditions2 = {
                    'General': {
                        'query': query2
                    }
                };

                var postData2 = JSON.stringify(conditions2);

                postData2 = {
                    'params': postData2
                };
                var url2 = 'http://' + ip + '/api/General/get/query/' + createToken();


                $.ajax({
                    method: "POST",
                    url: url2,
                    data: postData2
                }).done(function (result) {
                    if (result == "ImE6MDp7fSI=") {
                        var query2 = 'SELECT * FROM offers Offer WHERE id = ' + offer;

                        var conditions2 = {
                            'User': {
                                'query': query2
                            }
                        };

                        var postData2 = JSON.stringify(conditions2);

                        postData2 = {
                            'params': postData2
                        };
                        var url2 = 'http://' + ip + '/api/users/get/query/' + createToken();


                        $.ajax({
                            method: "POST",
                            url: url2,
                            data: postData2
                        }).done(function (result) {
                            if (result != "") {
                                var objReturn = JSON.parse(JSON.stringify(result));
                                var decodeObjReturn = Base64.decode(objReturn);
                                var convertedReturn = (JSON.parse(decodeObjReturn));
                                for (var i = 0; i < convertedReturn.length; i++) {
                                    var oferta = convertedReturn[i];

                                    $.cookieStorage.remove('Offer');

                                    $.cookieStorage.set(oferta);

                                    if ($.cookieStorage.isSet('Offer')) {
                                        window.location.href = "offer_product_detail.html";
                                    } else {
                                        generateModalAlert("Erro ao salvar Cookie");
                                        $('#mymodal').modal('show');
                                    }
                                }

                            }

                        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        });

                    }

                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });
            }
        }
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });

}

function Sair(){
    $.cookieStorage.remove('User');
    $.removeAllStorages();
    window.location.href = 'http://'+ip+'/jezzy-mobile/public_html/index.html';
}

function sendRequest() {
    var companyid = 0;
    var conditionsCompaniesUsers = {
        'General': {
            'query' :'SELECT * FROM companies_users WHERE user_id =' + $.cookieStorage.get('User').id + ' and status = "ACTIVE";'
        }
    };

    var postDataCompaniesUsers = JSON.stringify(conditionsCompaniesUsers);

    postDataCompaniesUsers = {
        'params': postDataCompaniesUsers
    };
    var urlCompaniesUsers = 'http://'+ip+'/api/General/get/query/' + createToken();


    $.ajax({
        method: "POST",
        url: urlCompaniesUsers,
        data: postDataCompaniesUsers
    }).done(function(result) {

        if(result!='ImE6MDp7fSI='){
        var objReturn = JSON.parse(JSON.stringify(result));
        var decodeObjReturn = Base64.decode(objReturn);
        var convertedReturn = unserialize(JSON.parse(decodeObjReturn));

            var query = 'SELECT DISTINCT Offer.id, Offer.title, Offer.photo, Offer.value, Offer.percentage_discount FROM offers Offer LEFT OUTER JOIN offers_filters ON offers_filters.offer_id INNER JOIN facebook_profiles ON facebook_profiles.user_id WHERE facebook_profiles.user_id = '+$.cookieStorage.get("User").id+' and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.public = "INACTIVE"  and offers_filters.gender = facebook_profiles.gender and offers_filters.religion = facebook_profiles.religion and offers_filters.political = facebook_profiles.political and offers_filters.location = facebook_profiles.location and offers_filters.relationship_status = facebook_profiles.relationship_status and company_id = 99999 or Offer.status = "ACTIVE" and Offer.public = "ACTIVE" and company_id = 99999 or Offer.status = "ACTIVE" and Offer.public = "ACTIVE" and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and company_id = ';

            for(var n=0;n<convertedReturn.length;n++){
                companyid = convertedReturn[n];

                if((n)!= convertedReturn.length){
                    query  += ' ' + companyid.companies_users.company_id + ' or Offer.status = "ACTIVE" and Offer.public = "ACTIVE" and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.company_id = '+ companyid.companies_users.company_id + ' or facebook_profiles.user_id = '+$.cookieStorage.get("User").id+' and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.public = "INACTIVE"  and offers_filters.gender = facebook_profiles.gender and offers_filters.religion = facebook_profiles.religion and offers_filters.political = facebook_profiles.political and offers_filters.location = facebook_profiles.location and offers_filters.relationship_status = facebook_profiles.relationship_status and Offer.company_id = ';
                }

            }
            query += ' ' + companyid.companies_users.company_id + ' ORDER BY Offer.id DESC;';

                var conditions = {
                    'User': {
                        'query': query
                    }
                };
                console.log(query);
                var postData = JSON.stringify(conditions);

                postData = {
                    'params': postData
                };
                var url = 'http://'+ip+'/api/users/get/query/' + createToken();

                $.ajax({
                    method: "POST",
                    url: url,
                    data: postData
                }).done(function (result) {

                    if (result != "") {
                        var decodeObjReturn = Base64.decode(result);

                        var convertedReturn = (JSON.parse(decodeObjReturn));
                        if(convertedReturn.length>1){
                            var foto;
                            var foto2;
                            for (var i = 0; i < 2; i++) {
                                for (var n = 0; n < 2; n++) {
                                    var aleatorio = Math.floor(Math.random() * convertedReturn.length);
                                    var aleatorio2 = Math.floor(Math.random() * convertedReturn.length);

                                    while (aleatorio == aleatorio2) {
                                        aleatorio2 = Math.floor(Math.random() * convertedReturn.length);
                                    }
                                }

                                var exibirRetorno = convertedReturn[aleatorio];
                                var exibirRetorno2 = convertedReturn[aleatorio2];

                                if(exibirRetorno.Offer.photo!= "") {
                                    foto = exibirRetorno.Offer.photo;

                                }else{
                                    foto ='../../jezzy-mobile/public_html/img/icons/ImagemIndisponivel2.png';
                                }
                                if(exibirRetorno2.Offer.photo!= "") {
                                    foto2 = exibirRetorno2.Offer.photo;

                                }else{
                                    foto2 ='../../jezzy-mobile/public_html/img/icons/ImagemIndisponivel2.png';
                                }


                                var cookie = JSON.stringify(exibirRetorno.Offer.id);
                                var cookie2 = JSON.stringify(exibirRetorno2.Offer.id);
                                var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);
                                var valorComDesconto2 = (exibirRetorno2.Offer.value / 100) * (100 - exibirRetorno2.Offer.percentage_discount);
                                var arredondado = valorComDesconto.toFixed(2);
                                var arredondado2 = valorComDesconto2.toFixed(2);
                                var linha = monetary(arredondado);
                                var linha2 = monetary(arredondado2);


                            }

                            var price = monetary(exibirRetorno.Offer.value);
                            var price2 = monetary(exibirRetorno2.Offer.value);
                            var offertitle = (exibirRetorno.Offer.title);
                            var offertitle2 = (exibirRetorno2.Offer.title);

                            if (offertitle.length > limitarcaracteres) {
                                offertitle = (offertitle.substring(0, limitarcaracteres)) + "...";
                            }
                            if (offertitle2.length > limitarcaracteres) {
                                offertitle2 = (offertitle2.substring(0, limitarcaracteres)) + "...";
                            }
                            var oferta1 = '';
                            var oferta2 = '';





                            if (exibirRetorno.Offer.percentage_discount != 0) {
                                oferta1 = " <img src=" + foto + " class='imagem' id='foto' onclick='clickOffer(" + cookie + ")' id='imageServiceHome2'><div id='value' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle'>" + offertitle + "</div><div class='oferta1olderprice'> De " + price + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + cookie + ")'> <span class='offerprice'><sup>Por</sup></span> " + linha + "</div></div>";

                                $("#imageServiceHomeId2").append(oferta1);

                            } else {
                                oferta1 = " <img src=" + foto + " class='imagem' id='foto' onclick='clickOffer(" + cookie + ")' id='imageServiceHome2'><div id='value' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle'>" + offertitle + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + cookie + ")'> <span class='offerprice'><sup>Por</sup></span> " + linha + "</div></div>";

                                $("#imageServiceHomeId2").append(oferta1);

                            }




                            if (exibirRetorno2.Offer.percentage_discount != 0) {
                                oferta2 = "<img src=" + foto2 + " class='imagem' id='foto2' onclick='clickOffer(" + cookie2 + ")' id='imageServiceHome2'><div id='value2' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle'>" + offertitle2 + "</div><div class='oferta1olderprice'> De " + price2 + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + cookie2 + ")'> <span class='offerprice'><sup>Por</sup></span> " + linha2 + "</div></div>";

                                $("#imageServiceHomeId").append(oferta2);
                            } else {

                                oferta2 = "<img src=" + foto2 + " class='imagem' id='foto2' onclick='clickOffer(" + cookie2 + ")' id='imageServiceHome2'><div id='value2' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle'>" + offertitle2 + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + cookie2 + ")'> <span class='offerprice'><sup>Por</sup></span> " + linha2 + "</div></div>";
                                $("#imageServiceHomeId").append(oferta2);

                            }
                        }else{
                            var foto;




                                var exibirRetorno = convertedReturn[0];


                                if(exibirRetorno.Offer.photo!= "") {
                                    foto = exibirRetorno.Offer.photo;

                                }else{
                                    foto ='../../jezzy-mobile/public_html/img/icons/ImagemIndisponivel2.png';
                                }



                                var cookie = JSON.stringify(exibirRetorno.Offer.id);

                                var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);

                                var arredondado = valorComDesconto.toFixed(2);

                                var linha = monetary(arredondado);





                            var price = monetary(exibirRetorno.Offer.value);

                            var offertitle = (exibirRetorno.Offer.title);

                            if (offertitle.length > limitarcaracteres) {
                                offertitle = (offertitle.substring(0, limitarcaracteres)) + "...";
                            }

                            var oferta1 = '';






                            if (exibirRetorno.Offer.percentage_discount != 0) {
                                oferta1 = " <img src=" + foto + " class='imagem' id='foto' onclick='clickOffer(" + cookie + ")' id='imageServiceHome2'><div id='value' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle'>" + offertitle + "</div><div class='oferta1olderprice'> De " + price + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + cookie + ")'> <span class='offerprice'><sup>Por</sup></span> " + linha + "</div></div>";

                                $("#imageServiceHomeId2").append(oferta1);

                            } else {
                                oferta1 = " <img src=" + foto + " class='imagem' id='foto' onclick='clickOffer(" + cookie + ")' id='imageServiceHome2'><div id='value' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle'>" + offertitle + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + cookie + ")'> <span class='offerprice'><sup>Por</sup></span> " + linha + "</div></div>";

                                $("#imageServiceHomeId2").append(oferta1);

                            }

                        }






                    }
                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });

    }else{

        var query = 'SELECT * FROM offers Offer WHERE company_id = 99999 and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and status = "ACTIVE" ORDER BY begins_at DESC';
        var conditions = {
            'User': {
                'query' :query
            }
        };

        var postData = JSON.stringify(conditions);

        postData = {
            'params': postData
        };
        var url = 'http://'+ip+'/api/users/get/query/' + createToken();


        $.ajax({
            method: "POST",
            url: url,
            data: postData
        }).done(function(result) {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = (JSON.parse(decodeObjReturn));


            var textoHtml = " ";
            var textoHtml2 = " ";
            for (var i = 0; i < convertedReturn.length; i++) {
                var exibirRetorno = convertedReturn[i];
                var cookie = JSON.stringify(exibirRetorno);
                var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);
                var arredondado = valorComDesconto.toFixed(2);
                var linha = arredondado.replace(".", ",");
                var linhaparcels = monetary(arredondado/12);
                meuLog(linha);
                var id = exibirRetorno.Offer.id;
                var discount = exibirRetorno.Offer.percentage_discount;
                var title = exibirRetorno.Offer.title;
                if (title.length > limitarcaracteres) {
                    title = (title.substring(0, limitarcaracteres)) + "...";
                }
                if (title.length > limitarcaracteres) {
                    title = (title.substring(0, limitarcaracteres)) + "...";
                }
                var photo='';
                if(exibirRetorno.Offer.photo != ""){
                    photo = exibirRetorno.Offer.photo;
                }
                else{
                    photo ="../../jezzy-mobile/public_html/img/icons/ImagemIndisponivel2.png";
                }
                var value =  exibirRetorno.Offer.value;

                if(discount == 0){
                    textoHtml += "<div id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer("+cookie+")' src='" + photo + "'/></div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckout' onclick='clickOffer("+cookie+")'/>  </div>";
                    textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer("+cookie+")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'></span><div class='offerParcelsdetail'>" + 'em até '+exibirRetorno.Offer.parcels_quantity+'x no cartão de crédito' + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer("+cookie+")'/></div></div>";
                    // textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer("+cookie+")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'> à vista</span><div class='offerParcelsdetail'>" + 'ou em até 12x de ' + linhaparcels + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer("+cookie+")'/> <button  class='compartilhardouradodetail fb-share-button' data-href='http://www.'+ip+'/jezzy-mobile/public_html/' data-layout='link'/></div></div>";
                } else {
                    textoHtml += "<div id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer("+cookie+")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%'+ "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckout' onclick='clickOffer("+cookie+")'/>  </div>";
                    textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer("+cookie+")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value+ "</div><div id='circle' class='offer_circledetail'>" + discount + '%'+ "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'></span><div class='offerParcelsdetail'>" + 'em até '+exibirRetorno.Offer.parcels_quantity+'x no cartão de crédito'+"</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer("+cookie+")'/></div></div>";
                    //textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer("+cookie+")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value+ "</div><div id='circle' class='offer_circledetail'>" + discount + '%'+ "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'> à vista</span><div class='offerParcelsdetail'>" + 'ou em até 12x de ' + linhaparcels + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer("+cookie+")'/> <button  class='compartilhardouradodetail fb-share-button' data-href='http://www.'+ip+'/jezzy-mobile/public_html/' data-file-upload-preview='http://192.168.1.200/Ariany_F.png' data-layout='link'/></div></div>";
                }

            }

            $("#offerDisplay").append(textoHtml);

            $("#normal").click(function(){
                $("#offerDisplay").html(textoHtml);
            });

            $("#detail").click(function(){
                $("#offerDisplay").html(textoHtml2);
            });


        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });
    }





    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
    var query = "SELECT * FROM companies_users WHERE user_id  = "+$.cookieStorage.get('User').id +" and status = 'ACTIVE'";
    console.log(query);
    var conditionsD = {
        'General': {
            'query' : query
        }
    };

    var postDataD = JSON.stringify(conditionsD);
    postDataD = {
        'params': postDataD
    };

    var urlD = 'http://'+ip+'/api/General/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: urlD,
        data: postDataD
    }).done(function (result) {

        if (result == "ImE6MDp7fSI=") {
            window.location.href = "bussiness_list.html";
        } else {
            var objReturnss = JSON.parse(JSON.stringify(result));
            var decodeObjReturnss = Base64.decode(objReturnss);
            var convertedReturnss = unserialize(JSON.parse(decodeObjReturnss));
            for (var i = 0; i < convertedReturnss.length; i++) {
                idcompanie = convertedReturnss[i];
                idcompanielast = idcompanie.companies_users.company_id;
            }
    var query = "SELECT * FROM favorites_companies WHERE  user_id  = "+$.cookieStorage.get('User').id + ";" ;

    var conditionsD = {
        'General': {
            'query' : query
        }
    };

    var postDataD = JSON.stringify(conditionsD);
    postDataD = {
        'params': postDataD
    };

    var urlD = 'http://'+ip+'/api/General/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: urlD,
        data: postDataD
    }).done(function (result) {

        if (result == "ImE6MDp7fSI=") {
            var conditionsCompany = {
                'Company': {
                    'conditions': {
                        'Company.id': idcompanielast
                    }
                }
            };

            var postDataCompany = JSON.stringify(conditionsCompany);

            postDataCompany = {
                'params': postDataCompany
            };

            var urlCompany = 'http://' + ip + '/api/companies/get/first/' + createToken();

            $.ajax({
                method: "POST",
                url: urlCompany,
                data: postDataCompany
            }).done(function (result) {

                var objReturnCompany = JSON.parse(JSON.stringify(result));
                var decodeObjReturnCompany = Base64.decode(objReturnCompany);
                var convertedReturnCompany = (JSON.parse(decodeObjReturnCompany));

                if (convertedReturnCompany.Company.status != 'INACTIVE') {
                    var logo = convertedReturnCompany.Company.logo;
                    var infoCompany;
                    var abertura = (convertedReturnCompany.Company.open_hour).split(":");
                    var fechamento = (convertedReturnCompany.Company.close_hour).split(":");
                    var diasabertura = convertedReturnCompany.Company.work_days;
                    if (diasabertura == "seg,ter,qua,qui,sex") {
                        diasabertura = "Seg a Sex";
                    } else if (diasabertura == "ter,qua,qui,sex,sab,dom") {
                        diasabertura = "Ter a Dom";
                    } else if (diasabertura == "seg,ter,qua,qui,sex,sab,dom") {
                        diasabertura = "Todos os Dias";
                    } else if (diasabertura == "ter,qua,qui,sex,sab") {
                        diasabertura = "Ter a Sab";
                    } else if (diasabertura == "qua,qui,sex,sab,dom") {
                        diasabertura = "Qua a Dom";
                    } else if (diasabertura == "qui,sex,sab,dom") {
                        diasabertura = "Qui a Dom";
                    } else if (diasabertura == "sex,sab,dom") {
                        diasabertura = "Sex a Dom";
                    } else if (diasabertura == "sab,dom") {
                        diasabertura = "Sab e Dom";
                    } else if (diasabertura == "seg,ter,qua") {
                        diasabertura = "Seg a Qua";
                    }
                    else if (diasabertura == "seg,ter,qua") {
                        diasabertura = "Seg a Qua";
                    } else if (diasabertura == "seg,ter,qua") {
                        diasabertura = "Seg a Qua";
                    }

                    infoCompany = "<div onclick=Click(\'" + convertedReturnCompany.Company.id + "\')><div class='companyname'>" + convertedReturnCompany.Company.fancy_name + "</div>" + convertedReturnCompany.Company.phone + "</br>" + convertedReturnCompany.Company.address + ", " + convertedReturnCompany.Company.number + "<br>" + convertedReturnCompany.Company.city + " - " + convertedReturnCompany.Company.state + "<br>" + diasabertura + " <br>" + abertura[0] + ":" + abertura[1] + "h - " + fechamento[0] + ":" + fechamento[1] + "h" + "</div>";
                    $("#endSchedule").append(infoCompany);

                } else {
                    generateModalAlert("Salão favorito atualmente inativo no jezzy!");
                    $('#mymodal').modal('show');
                    window.location.href = "business_follow.html";
                }


            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
        } else {

            var objReturns = JSON.parse(JSON.stringify(result));
            var decodeObjReturns = Base64.decode(objReturns);
            var convertedReturns = unserialize(JSON.parse(decodeObjReturns));

            var idcompanie = 0;

            console.log(convertedReturns);
            for (var i = 0; i < convertedReturns.length; i++) {
                idcompanie = convertedReturns[i];

                idcompanielastss = idcompanie.favorites_companies.company_id;
            }
            var j = '';

            for(var g=0; g<convertedReturnss.length;g++){
                console.log(convertedReturnss);
                j +=" " + convertedReturnss[g].companies_users.company_id;
            }
            var ko = j.split(" ");
           if(ko.indexOf(idcompanielastss)!=-1){
               var conditionsCompany = {
                   'Company': {
                       'conditions': {
                           'Company.id': idcompanielastss
                       }
                   }
               };

               var postDataCompany = JSON.stringify(conditionsCompany);

               postDataCompany = {
                   'params': postDataCompany
               };

               var urlCompany = 'http://' + ip + '/api/companies/get/first/' + createToken();

               $.ajax({
                   method: "POST",
                   url: urlCompany,
                   data: postDataCompany
               }).done(function (result) {

                   var objReturnCompany = JSON.parse(JSON.stringify(result));
                   var decodeObjReturnCompany = Base64.decode(objReturnCompany);
                   var convertedReturnCompany = (JSON.parse(decodeObjReturnCompany));

                   if (convertedReturnCompany.Company.status != 'INACTIVE') {
                       var logo = convertedReturnCompany.Company.logo;
                       var infoCompany;
                       var abertura = (convertedReturnCompany.Company.open_hour).split(":");
                       var fechamento = (convertedReturnCompany.Company.close_hour).split(":");
                       var diasabertura = convertedReturnCompany.Company.work_days;
                       if (diasabertura == "seg,ter,qua,qui,sex") {
                           diasabertura = "Seg a Sex";
                       } else if (diasabertura == "ter,qua,qui,sex,sab,dom") {
                           diasabertura = "Ter a Dom";
                       } else if (diasabertura == "seg,ter,qua,qui,sex,sab,dom") {
                           diasabertura = "Todos os Dias";
                       } else if (diasabertura == "ter,qua,qui,sex,sab") {
                           diasabertura = "Ter a Sab";
                       } else if (diasabertura == "qua,qui,sex,sab,dom") {
                           diasabertura = "Qua a Dom";
                       } else if (diasabertura == "qui,sex,sab,dom") {
                           diasabertura = "Qui a Dom";
                       } else if (diasabertura == "sex,sab,dom") {
                           diasabertura = "Sex a Dom";
                       } else if (diasabertura == "sab,dom") {
                           diasabertura = "Sab e Dom";
                       } else if (diasabertura == "seg,ter,qua") {
                           diasabertura = "Seg a Qua";
                       }
                       else if (diasabertura == "seg,ter,qua") {
                           diasabertura = "Seg a Qua";
                       } else if (diasabertura == "seg,ter,qua") {
                           diasabertura = "Seg a Qua";
                       }

                       infoCompany = "<div onclick=Click(\'" + convertedReturnCompany.Company.id + "\')><div class='companyname'>" + convertedReturnCompany.Company.fancy_name + "</div>" + convertedReturnCompany.Company.phone + "</br>" + convertedReturnCompany.Company.address + ", " + convertedReturnCompany.Company.number + "<br>" + convertedReturnCompany.Company.city + " - " + convertedReturnCompany.Company.state + "<br>" + diasabertura + " <br>" + abertura[0] + ":" + abertura[1] + "h - " + fechamento[0] + ":" + fechamento[1] + "h" + "</div>";
                       $("#endSchedule").append(infoCompany);

                   } else {
                       generateModalAlert("Salão favorito atualmente inativo no jezzy!");
                       $('#mymodal').modal('show');
                       window.location.href = "business_follow.html";
                   }
               }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                   alert(errorThrown);
               });
           }else{
               var conditionsCompany = {
                   'Company': {
                       'conditions': {
                           'Company.id': idcompanielast
                       }
                   }
               };

               var postDataCompany = JSON.stringify(conditionsCompany);

               postDataCompany = {
                   'params': postDataCompany
               };

               var urlCompany = 'http://' + ip + '/api/companies/get/first/' + createToken();

               $.ajax({
                   method: "POST",
                   url: urlCompany,
                   data: postDataCompany
               }).done(function (result) {

                   var objReturnCompany = JSON.parse(JSON.stringify(result));
                   var decodeObjReturnCompany = Base64.decode(objReturnCompany);
                   var convertedReturnCompany = (JSON.parse(decodeObjReturnCompany));

                   if (convertedReturnCompany.Company.status != 'INACTIVE') {
                       var logo = convertedReturnCompany.Company.logo;
                       var infoCompany;
                       var abertura = (convertedReturnCompany.Company.open_hour).split(":");
                       var fechamento = (convertedReturnCompany.Company.close_hour).split(":");
                       var diasabertura = convertedReturnCompany.Company.work_days;
                       if (diasabertura == "seg,ter,qua,qui,sex") {
                           diasabertura = "Seg a Sex";
                       } else if (diasabertura == "ter,qua,qui,sex,sab,dom") {
                           diasabertura = "Ter a Dom";
                       } else if (diasabertura == "seg,ter,qua,qui,sex,sab,dom") {
                           diasabertura = "Todos os Dias";
                       } else if (diasabertura == "ter,qua,qui,sex,sab") {
                           diasabertura = "Ter a Sab";
                       } else if (diasabertura == "qua,qui,sex,sab,dom") {
                           diasabertura = "Qua a Dom";
                       } else if (diasabertura == "qui,sex,sab,dom") {
                           diasabertura = "Qui a Dom";
                       } else if (diasabertura == "sex,sab,dom") {
                           diasabertura = "Sex a Dom";
                       } else if (diasabertura == "sab,dom") {
                           diasabertura = "Sab e Dom";
                       } else if (diasabertura == "seg,ter,qua") {
                           diasabertura = "Seg a Qua";
                       }
                       else if (diasabertura == "seg,ter,qua") {
                           diasabertura = "Seg a Qua";
                       } else if (diasabertura == "seg,ter,qua") {
                           diasabertura = "Seg a Qua";
                       }

                       infoCompany = "<div onclick=Click(\'" + convertedReturnCompany.Company.id + "\')><div class='companyname'>" + convertedReturnCompany.Company.fancy_name + "</div>" + convertedReturnCompany.Company.phone + "</br>" + convertedReturnCompany.Company.address + ", " + convertedReturnCompany.Company.number + "<br>" + convertedReturnCompany.Company.city + " - " + convertedReturnCompany.Company.state + "<br>" + diasabertura + " <br>" + abertura[0] + ":" + abertura[1] + "h - " + fechamento[0] + ":" + fechamento[1] + "h" + "</div>";
                       $("#endSchedule").append(infoCompany);

                   } else {
                       generateModalAlert("Salão favorito atualmente inativo no jezzy!");
                       $('#mymodal').modal('show');
                       window.location.href = "business_follow.html";
                   }


               }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                   alert(errorThrown);
               });
           }





        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
    }
function monetary(value){
    return 'R$ ' +  parseFloat(value).toFixed(2).replace('.',',');
}
function Click(id){

    var conditions = {
        'Company': {
            'conditions':{
                'Company.id':id
            }

        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'http://'+ip+'/api/companies/get/first/' + createToken();


    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if(result!= ""){
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = (JSON.parse(decodeObjReturn));

            $.cookieStorage.remove('Company');

            $.cookieStorage.set(convertedReturn);

            if ($.cookieStorage.isSet('Company')) {
                window.location.href = "bussiness_detail.html";
            } else {
                generateModalAlert("Erro ao salvar Cookie");
                $('#mymodal').modal('show');
            }
        }


    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });








}
function unserialize (data) {
    //  discuss at: http://phpjs.org/functions/unserialize/
    // original by: Arpad Ray (mailto:arpad@php.net)
    // improved by: Pedro Tainha (http://www.pedrotainha.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Chris
    // improved by: James
    // improved by: Le Torbi
    // improved by: Eli Skeggs
    // bugfixed by: dptr1988
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //  revised by: d3x
    //    input by: Brett Zamir (http://brett-zamir.me)
    //    input by: Martin (http://www.erlenwiese.de/)
    //    input by: kilops
    //    input by: Jaroslaw Czarniak
    //        note: We feel the main purpose of this function should be to ease the transport of data between php & js
    //        note: Aiming for PHP-compatibility, we have to translate objects to arrays
    //   example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
    //   returns 1: ['Kevin', 'van', 'Zonneveld']
    //   example 2: unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
    //   returns 2: {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}

    var that = this,
        utf8Overhead = function (chr) {
            // http://phpjs.org/functions/unserialize:571#comment_95906
            var code = chr.charCodeAt(0)
            if (code < 0x0080 || 0x00A0 <= code && code <= 0x00FF || [338, 339, 352, 353, 376, 402, 8211, 8212, 8216, 8217,
                    8218, 8220, 8221, 8222, 8224, 8225, 8226, 8230, 8240, 8364, 8482
                ].indexOf(code) != -1) {
                return 0
            }
            if (code < 0x0800) {
                return 1
            }
            return 2
        }
    error = function (type, msg, filename, line) {
        throw new that.window[type](msg, filename, line)
    }
    read_until = function (data, offset, stopchr) {
        var i = 2,
            buf = [],
            chr = data.slice(offset, offset + 1)

        while (chr != stopchr) {
            if ((i + offset) > data.length) {
                error('Error', 'Invalid')
            }
            buf.push(chr)
            chr = data.slice(offset + (i - 1), offset + i)
            i += 1
        }
        return [buf.length, buf.join('')]
    }
    read_chrs = function (data, offset, length) {
        var i, chr, buf

        buf = []
        for (i = 0; i < length; i++) {
            chr = data.slice(offset + (i - 1), offset + i)
            buf.push(chr)
            length -= utf8Overhead(chr)
        }
        return [buf.length, buf.join('')]
    }
    _unserialize = function (data, offset) {
        var dtype, dataoffset, keyandchrs, keys, contig,
            length, array, readdata, readData, ccount,
            stringlength, i, key, kprops, kchrs, vprops,
            vchrs, value, chrs = 0,
            typeconvert = function (x) {
                return x
            }

        if (!offset) {
            offset = 0
        }
        dtype = (data.slice(offset, offset + 1))
            .toLowerCase()

        dataoffset = offset + 2

        switch (dtype) {
            case 'i':
                typeconvert = function (x) {
                    return parseInt(x, 10)
                }
                readData = read_until(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'b':
                typeconvert = function (x) {
                    return parseInt(x, 10) !== 0
                }
                readData = read_until(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'd':
                typeconvert = function (x) {
                    return parseFloat(x)
                }
                readData = read_until(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'n':
                readdata = null
                break
            case 's':
                ccount = read_until(data, dataoffset, ':')
                chrs = ccount[0]
                stringlength = ccount[1]
                dataoffset += chrs + 2

                readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10))
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 2
                if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
                    error('SyntaxError', 'String length mismatch')
                }
                break
            case 'a':
                readdata = {}

                keyandchrs = read_until(data, dataoffset, ':')
                chrs = keyandchrs[0]
                keys = keyandchrs[1]
                dataoffset += chrs + 2

                length = parseInt(keys, 10)
                contig = true

                for (i = 0; i < length; i++) {
                    kprops = _unserialize(data, dataoffset)
                    kchrs = kprops[1]
                    key = kprops[2]
                    dataoffset += kchrs

                    vprops = _unserialize(data, dataoffset)
                    vchrs = vprops[1]
                    value = vprops[2]
                    dataoffset += vchrs

                    if (key !== i)
                        contig = false

                    readdata[key] = value
                }

                if (contig) {
                    array = new Array(length)
                    for (i = 0; i < length; i++)
                        array[i] = readdata[i]
                    readdata = array
                }

                dataoffset += 1
                break
            default:
                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype)
                break
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)]
    }

    return _unserialize((data + ''), 0)[2]
}


function Schedules() {

    var query = "SELECT * FROM schedules WHERE user_id = " + $.cookieStorage.get('User').id + " and status= 1 and schedules.date >= DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%d')  ORDER BY schedules.id DESC";

    var conditions = {
        'General': {
            'query': query
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

    }).done(function (result) {

        if(result == 'ImE6MDp7fSI=') {
            document.getElementById("date").innerHTML = "";
        } else {
            var objReturns = JSON.parse(JSON.stringify(result));
            var decodeObjReturns = Base64.decode(objReturns);
            var convertedReturns = unserialize(JSON.parse(decodeObjReturns));

            var datamaisprox = new moment();
            var dataano  = datamaisprox.get('year');
            var datames = datamaisprox.get('month');
            var datadia = datamaisprox.get('date');
            for(var i=0;i<convertedReturns.length;i++){
                var data = new Date(convertedReturns[i].schedules.date);
                var hours = convertedReturns[i].schedules.time_begin;
                data =  moment(data).add(1, 'days');
                data =  moment(data).add(1, 'month');

                var ano = data.get('year');
                    var mes = data.get('month');
                        var dia = data.get('date');



                if(ano>=dataano){
                   if(mes>=datames){
                       if(dia+1>=datadia) {
                            datamaisprox[i] = data;
                        }
                    }
                }else {
                    datamaisprox = " ";
                }

                if(datamaisprox[i] != undefined && datamaisprox[i] != " "){
                    if(datamaisprox[i]>datamaisprox[i-1]){

                    }else {
                        var meses = datamaisprox[i].get('month');
                        str_month = new String(meses);
                        if (str_month.length < 2)
                            str_month = 0 + str_month;
                        var minutos = (hours.split(":"))[1];
                        var hour = (hours.split(":"))[0];
                        var dias = datamaisprox[i].get('date');
                        dias = dias;
                        str_minutos = new String(minutos);
                        if (str_minutos.length < 2)
                            str_minutos = 0 + str_minutos;
                        document.getElementById("date").innerHTML = "<div onclick= \'window.location.href=\"schedules_display.html\"\'>"+dias + "/" + str_month + "<br>" + hour +':' + str_minutos ;
                    }
                } else{

                    document.getElementById("date").innerHTML = "";
                }
            }


        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}




$(document).ready(function() {
    document.getElementById("userName").innerText = $.cookieStorage.get('User').name;
    $.cookieStorage.remove("Company");
    $.cookieStorage.remove("Offer");
    $.cookieStorage.remove("subclasses");
    $.cookieStorage.remove("classes");
    $.cookieStorage.remove("SchedulesSolicitation");
    $.cookieStorage.remove("parcels");
    $.cookieStorage.remove("shipping_value");
    $.cookieStorage.remove('paginaanterior');
    $.cookieStorage.remove('address');
    $.cookieStorage.remove('city');
    $.cookieStorage.remove('complement');
    $.cookieStorage.remove('district');
    $.cookieStorage.remove('metrics');
    $.cookieStorage.remove('number');
    $.cookieStorage.remove('quantidade');
    $.cookieStorage.remove('shipping_days');
    $.cookieStorage.remove('shipping_type');
    $.cookieStorage.remove('state');
    $.cookieStorage.remove('total_value');
    $.cookieStorage.remove('usuario');
    $.cookieStorage.remove('zip_code');
    $.cookieStorage.remove("Checkout");
    $.cookieStorage.remove("Schedules");
    $.cookieStorage.remove("Vouchers");
    $.cookieStorage.remove("companies");
    $.cookieStorage.remove("secondary_users");
    $.cookieStorage.remove("service_secondary_users");
    $.cookieStorage.remove("services");
    Schedules();


});
function TrocaFrase(){

    var textos = [  "Confira as novidades</br>do seu salão!",
                    "Compre pelo app e</br>receba na sua casa!",
                    "Produtos recomendados</br>para você!"];


    var aleatorio = Math.floor(Math.random() * textos.length);
    document.getElementsByClassName("offerServiceTexts")[0].innerHTML= (textos[aleatorio]);



}
function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}

function generateModalAlert(mensagem) {
    if ($("#mymodal").length) {
        $("#messageModelGoesHere").html(mensagem);
    } else {
        $modalHtml =
            '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="mymodal">'
            + '<div class="modal-dialog modal-sm">'
            + '<div class="modal-content" id="messageModelGoesHere">'
            + mensagem
            + '</div>'
            + '</div>'
            + '</div>';
        $("body").append($modalHtml);
    }
}
