var limitarcaracteres = 32;
function clickOffer(offer){


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
            for(var i=0; i<convertedReturn.length;i++){


                var cliques = (convertedReturn[i].offers_statistics.details_click)/1 + 1;

                var query2 = 'UPDATE offers_statistics SET details_click = '+cliques+' WHERE offer_id = ' + offer;

                var conditions2 = {
                    'General':{
                        'query':query2
                    }
                };

                var postData2 = JSON.stringify(conditions2);

                postData2 = {
                    'params': postData2
                };
                var url2 = 'http://'+ip+'/api/General/get/query/' + createToken();


                $.ajax({
                    method: "POST",
                    url: url2,
                    data: postData2
                }).done(function(result) {
                    if(result == "ImE6MDp7fSI=") {
                        var query2 = 'SELECT * FROM offers Offer WHERE id = ' + offer;

                        var conditions2 = {
                            'General':{
                                'query':query2
                            }
                        };

                        var postData2 = JSON.stringify(conditions2);

                        postData2 = {
                            'params': postData2
                        };
                        var url2 = 'http://'+ip+'/api/General/get/query/' + createToken();


                        $.ajax({
                            method: "POST",
                            url: url2,
                            data: postData2
                        }).done(function(result) {
                            if(result != "ImE6MDp7fSI=") {
                                var objReturn = JSON.parse(JSON.stringify(result));
                                var decodeObjReturn = Base64.decode(objReturn);
                                var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
                                for(var i=0; i<convertedReturn.length;i++) {
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

                        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        });

                    }

                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });
            }
        }else{
            var query2 = 'INSERT INTO offers_statistics (details_click, offer_id) VALUES (1, '+offer+')';

            var conditions2 = {
                'General':{
                    'query':query2
                }
            };

            var postData2 = JSON.stringify(conditions2);

            postData2 = {
                'params': postData2
            };
            var url2 = 'http://'+ip+'/api/General/get/query/' + createToken();


            $.ajax({
                method: "POST",
                url: url2,
                data: postData2
            }).done(function(result) {
                if(result == "ImE6MDp7fSI=") {
                    var query2 = 'SELECT * FROM offers Offer WHERE id = ' + offer;

                    var conditions2 = {
                        'General':{
                            'query':query2
                        }
                    };

                    var postData2 = JSON.stringify(conditions2);

                    postData2 = {
                        'params': postData2
                    };
                    var url2 = 'http://'+ip+'/api/General/get/query/' + createToken();


                    $.ajax({
                        method: "POST",
                        url: url2,
                        data: postData2
                    }).done(function(result) {
                        if(result != "ImE6MDp7fSI=") {
                            var objReturn = JSON.parse(JSON.stringify(result));
                            var decodeObjReturn = Base64.decode(objReturn);
                            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
                            for(var i=0; i<convertedReturn.length;i++) {
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

                    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });



                }
            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
        }

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });



}


$(document).ready(function() {
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
    sendRequest();
    $("#userName").click(function (){
        window.location.href = 'my_profile.html';
    });
    [].forEach.call( document.querySelectorAll('.hide-radio'), function(element) {
        element.style.display = 'none';
    });
    document.getElementById("userName").innerText = $.cookieStorage.get('User').name;


});
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

function voltar(){
    window.history.go(-1);
}




function sendRequest() {
    var companyid = 0;

    var conditionss = {
        'General': {
            'query' :'SELECT * FROM companies_users WHERE user_id =' + $.cookieStorage.get('User').id + ' and status = "ACTIVE";'
        }
    };
    var postDatas = JSON.stringify(conditionss);

    postDatas = {
        'params': postDatas
    };
    var urls = 'http://'+ip+'/api/General/get/query/' + createToken();


    $.ajax({
        method: "POST",
        url: urls,
        data: postDatas
    }).done(function(result) {
        if(result != "ImE6MDp7fSI="){
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));

            var query = 'SELECT DISTINCT Offer.id, Offer.parcels_quantity, Offer.parcels, Offer.title, Offer.photo, Offer.value, Offer.percentage_discount FROM offers Offer LEFT OUTER JOIN offers_filters ON offers_filters.offer_id LEFT OUTER JOIN facebook_profiles ON facebook_profiles.user_id WHERE facebook_profiles.user_id = '+$.cookieStorage.get("User").id+' and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.public = "INACTIVE"  and offers_filters.gender = facebook_profiles.gender and offers_filters.religion = facebook_profiles.religion and offers_filters.political = facebook_profiles.political and offers_filters.location = facebook_profiles.location and offers_filters.relationship_status = facebook_profiles.relationship_status and Offer.company_id = 99999 or Offer.status = "ACTIVE" and Offer.public = "ACTIVE" and company_id = 99999 or Offer.status = "ACTIVE" and Offer.public = "ACTIVE" and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.company_id = ';

            for(var n=0;n<convertedReturn.length;n++){
                companyid = convertedReturn[n];

                if((n)!= convertedReturn.length){
                    query  += ' ' + companyid.companies_users.company_id + ' or Offer.status = "ACTIVE" and Offer.public = "ACTIVE" and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.company_id = '+ companyid.companies_users.company_id + ' or facebook_profiles.user_id = '+$.cookieStorage.get("User").id+' and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.public = "INACTIVE"  and offers_filters.gender = facebook_profiles.gender and offers_filters.religion = facebook_profiles.religion and offers_filters.political = facebook_profiles.political and offers_filters.location = facebook_profiles.location and offers_filters.relationship_status = facebook_profiles.relationship_status and Offer.company_id = ';
                }

            }
            query += ' ' + companyid.companies_users.company_id + ' ORDER BY Offer.id DESC;';
            var conditions = {
                'General': {
                    'query' :query
                }
            };
            console.log(query);
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

                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturn = unserialize(JSON.parse(decodeObjReturn));

                var textoHtml = " ";
                var textoHtml2 = " ";
                var textoHtmlb = " ";
                var textoHtml2b = " ";
                for (var i = 0; i < convertedReturn.length; i++) {
                    var exibirRetorno = convertedReturn[i];


                        var cookie = JSON.stringify(exibirRetorno.Offer.id);
                        var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);

                        var arredondado = valorComDesconto.toFixed(2);

                        var linha = arredondado.replace(".", ",");


                        meuLog(linha);

                        var id = exibirRetorno.Offer.id;
                        var discount = Math.round(exibirRetorno.Offer.percentage_discount);
                        var title = (exibirRetorno.Offer.title);
                        var photo='';
                        if(exibirRetorno.Offer.photo != ""){
                            photo = exibirRetorno.Offer.photo;
                        }
                        else{
                            photo ="../../jezzy-mobile/public_html/img/icons/ImagemIndisponivel2.png";
                        }
                        var value = exibirRetorno.Offer.value;

                        var avista =  (' ');

                        if(exibirRetorno.Offer.parcels != 'INACTIVE'){

                            var quantidadeparcels = exibirRetorno.Offer.parcels_quantity;
                            var linhaparcels = monetary(arredondado / quantidadeparcels);

                            if (discount == 0) {
                                textoHtml += "<div id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/>  </div>";
                                textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito'  + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";

                            } else {
                                textoHtml += "<div id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/>  </div>";
                                textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";

                            }
                        }else{
                            if (discount == 0) {
                                textoHtml += "<div id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/>  </div>";
                                textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";

                            } else {
                                textoHtml += "<div id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/>  </div>";
                                textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";

                            }
                        }



                        $("#offerDisplay").html(textoHtml);

                        $("#normal").click(function(){
                            $("#offerDisplay").html(textoHtml);
                        });

                        $("#detail").click(function(){
                            $("#offerDisplay").html(textoHtml2);
                        });


                }



            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });

        } else{
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

                    var avista =  ('à vista');
                    if(exibirRetorno.Offer.parcels != 'INACTIVE') {

                        var quantidadeparcels = exibirRetorno.Offer.parcels_quantity;
                        var linhaparcels = monetary(arredondado / quantidadeparcels);

                        if (discount == 0) {
                            textoHtml += "<div id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/>  </div>";
                            textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>" + avista + "</span><div class='offerParcelsdetail'>" + 'ou em até '+quantidadeparcels+'x de ' + linhaparcels + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";
                            // textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer("+cookie+")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'> à vista</span><div class='offerParcelsdetail'>" + 'ou em até 12x de ' + linhaparcels + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer("+cookie+")'/> <button  class='compartilhardouradodetail fb-share-button' data-href='http://www.'+ip+'/jezzy-mobile/public_html/' data-layout='link'/></div></div>";
                        } else {
                            textoHtml += "<div id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/>  </div>";
                            textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>" + avista + "</span><div class='offerParcelsdetail'>" + 'ou em até '+quantidadeparcels+'x de ' + linhaparcels + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";
                            //textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer("+cookie+")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value+ "</div><div id='circle' class='offer_circledetail'>" + discount + '%'+ "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'> à vista</span><div class='offerParcelsdetail'>" + 'ou em até 12x de ' + linhaparcels + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer("+cookie+")'/> <button  class='compartilhardouradodetail fb-share-button' data-href='http://www.'+ip+'/jezzy-mobile/public_html/' data-file-upload-preview='http://192.168.1.200/Ariany_F.png' data-layout='link'/></div></div>";
                        }
                    }else{
                        if (discount == 0) {
                            textoHtml += "<div id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/>  </div>";
                            textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>" + avista + "</span><div class='offerParcelsdetail'>" + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";
                            // textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer("+cookie+")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'> à vista</span><div class='offerParcelsdetail'>" + 'ou em até 12x de ' + linhaparcels + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer("+cookie+")'/> <button  class='compartilhardouradodetail fb-share-button' data-href='http://www.'+ip+'/jezzy-mobile/public_html/' data-layout='link'/></div></div>";
                        } else {
                            textoHtml += "<div id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/>  </div>";
                            textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>" + avista + "</span><div class='offerParcelsdetail'>" + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";
                            //textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer("+cookie+")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value+ "</div><div id='circle' class='offer_circledetail'>" + discount + '%'+ "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'> à vista</span><div class='offerParcelsdetail'>" + 'ou em até 12x de ' + linhaparcels + "</div><img src='../../jezzy-mobile/public_html/img/icons/card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer("+cookie+")'/> <button  class='compartilhardouradodetail fb-share-button' data-href='http://www.'+ip+'/jezzy-mobile/public_html/' data-file-upload-preview='http://192.168.1.200/Ariany_F.png' data-layout='link'/></div></div>";
                        }
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



}

function convertToUnicodeCharacterSet(value) {
    if(value == "à")
        return "\u00E1";
}

function meuLog(msg) {
    div = document.body;

}
function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
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
