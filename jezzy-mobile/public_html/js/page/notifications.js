var datadehoje = new Date();
var month = datadehoje.getMonth();
var mes = '';
switch (month){
    case 0:
        mes = '01';
        break;
    case 1:
        mes = '02';
        break;
    case 2:
        mes = '03';
        break;
    case 3:
        mes = '04';
        break;
    case 4:
        mes = '05';
        break;
    case 5:
        mes = '06';
        break;
    case 6:
        mes = '07';
        break;
    case 7:
        mes = '08';
        break;
    case 8:
        mes = '09';
        break;
    case 9:
        mes = '10';
        break;
    case 10:
        mes = '11';
        break;
    case 11:
        mes = '12';
        break;
}

var dataformatada = datadehoje.getFullYear()+"-"+mes+"-"+datadehoje.getDate();
function ApagarNotificacao(id) {
    var query_schedules_solicitation = "SELECT * FROM notifications_company NotificationsCompany WHERE id = "+ id;

    var conditions_schedules_solicitation = {
        'General': {
            'query': query_schedules_solicitation
        }
    };
    var postData_schedules_solicitation = JSON.stringify(conditions_schedules_solicitation);

    postData_schedules_solicitation = {
        'params': postData_schedules_solicitation
    };
    var url_schedules_solicitation = 'http://'+ip+'/api/General/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: url_schedules_solicitation,
        data: postData_schedules_solicitation

    }).done(function (result) {

        if (result != "ImE6MDp7fSI=") {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
            var evento2 = '';
            for (var j = 0; j < convertedReturn.length; j++) {
                evento2 = convertedReturn[j];
                var query_delete = "UPDATE notifications_company NotificationsCompany SET status = 2 WHERE id = "+ id ;

                var conditions = {
                    'General': {
                        'query': query_delete
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
                    if (result == "ImE6MDp7fSI=") {
                        generateModalAlert("Notificação Excluída!");
                        $('#mymodal').modal('show');


                        var query = "SELECT * FROM notifications_company INNER JOIN companies ON notifications_company.company_id WHERE companies.id = notifications_company.company_id and notifications_company.user_id =" +$.cookieStorage.get('User').id + " and notifications_company.status = 1 ORDER BY notifications_company.peso  DESC;";

                        var conditions = {
                            'User': {
                                'query':query
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
                            if(result == ""){
                                generateModalAlert("Sem novas notificações!");
                                $('#mymodal').modal('show');
                            } else {
                                var objReturn = JSON.parse(JSON.stringify(result));
                                var decodeObjReturn = Base64.decode(objReturn);
                                var convertedReturn = (JSON.parse(decodeObjReturn));
                                var notifications = convertedReturn.length;
                                $.cookieStorage.remove("notifications");

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

function CancelarSugestedScheduling(id) {
    var query_schedules_solicitation = "SELECT * FROM notifications_company NotificationsCompany WHERE id = "+ id;

    var conditions_schedules_solicitation = {
        'General': {
            'query': query_schedules_solicitation
        }
    };
    var postData_schedules_solicitation = JSON.stringify(conditions_schedules_solicitation);

    postData_schedules_solicitation = {
        'params': postData_schedules_solicitation
    };
    var url_schedules_solicitation = 'http://'+ip+'/api/General/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: url_schedules_solicitation,
        data: postData_schedules_solicitation

    }).done(function (result) {
        if (result != "ImE6MDp7fSI=") {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
            var evento2 = '';
            for (var j = 0; j < convertedReturn.length; j++) {
                evento2 = convertedReturn[j];
                var query_delete = "UPDATE notifications_company NotificationsCompany SET status = 2 WHERE id = "+ id ;

                var conditions = {
                    'General': {
                        'query': query_delete
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
                    if (result == "ImE6MDp7fSI=") {
                        generateModalAlert("Agendamento não efetuado!");
                        $('#mymodal').modal('show');


                        var query = "SELECT * FROM notifications_company INNER JOIN companies ON notifications_company.company_id WHERE companies.id = notifications_company.company_id and notifications_company.user_id =" +$.cookieStorage.get('User').id + " and notifications_company.status = 1 ORDER BY notifications_company.peso  DESC;";

                        var conditions = {
                            'User': {
                                'query':query
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
                            if(result == ""){
                                generateModalAlert("Sem novas notificações!");
                                $('#mymodal').modal('show');
                                window.location.href = "notifications.html";
                            } else {
                                var objReturn = JSON.parse(JSON.stringify(result));
                                var decodeObjReturn = Base64.decode(objReturn);
                                var convertedReturn = (JSON.parse(decodeObjReturn));
                                var notifications = convertedReturn.length;
                                $.cookieStorage.remove("notifications");
                                window.location.href = "notifications.html";


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

function AceitarSugestedScheduling(id){
    var query_schedules_solicitation = "SELECT * FROM notifications_company NotificationsCompany WHERE id = "+ id;

    var conditions_schedules_solicitation = {
        'General': {
            'query': query_schedules_solicitation
        }
    };
    var postData_schedules_solicitation = JSON.stringify(conditions_schedules_solicitation);

    postData_schedules_solicitation = {
        'params': postData_schedules_solicitation
    };
    var url_schedules_solicitation = 'http://'+ip+'/api/General/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: url_schedules_solicitation,
        data: postData_schedules_solicitation

    }).done(function (result) {
        if (result != "ImE6MDp7fSI=") {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
            var evento = '';
            for (var j = 0; j < convertedReturn.length; j++) {
                evento = convertedReturn[j];
                var query_delete = "UPDATE notifications_company NotificationsCompany SET status = 3 WHERE id = "+ id ;

                var conditions = {
                    'General': {
                        'query': query_delete
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
                    if (result == "ImE6MDp7fSI=") {

                            idservice = evento.NotificationsCompany.offer_id;

                            var query_service = "SELECT * FROM services INNER JOIN subclasses ON services.subclasse_id INNER JOIN classes ON subclasses.classe_id INNER JOIN service_secondary_users ON service_secondary_users.service_id INNER JOIN secondary_users ON service_secondary_users.secondary_user_id WHERE service_secondary_users.service_id = services.id and service_secondary_users.secondary_user_id = secondary_users.id and services.id =  "+idservice+"  and services.subclasse_id = subclasses.id and subclasses.classe_id = classes.id;";

                            var conditions = {
                                'General': {
                                    'query': query_service
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
                                if (result != "ImE6MDp7fSI=") {
                                    var objReturn = JSON.parse(JSON.stringify(result));
                                    var decodeObjReturn = Base64.decode(objReturn);
                                    var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
                                    for(var j=0;j<convertedReturn.length;j++) {
                                        evento2 = convertedReturn[j];
                                    }
                                    var timetotal = evento2.services.time;
                                    var timebegin = evento.NotificationsCompany.horario;
                                    var timesplit = timebegin.split(":");
                                    var minutesofhours = timesplit[0]*60;

                                    var horaseminutessoma = minutesofhours + ( timesplit[1] / 1);
                                    console.log(horaseminutessoma);
                                    var minutostotais = (horaseminutessoma / 1) + (timetotal / 1);
                                    console.log(minutostotais +" tempo do serviço mais minutos totais");
                                    var horastempo = Math.floor(minutostotais / 60);
                                    console.log(horastempo +" tempo total dividido por 60");
                                    var minutostempo = ((minutostotais % 60));
                                    console.log(minutostempo +" tempo total resto de 60");
                                    var str_minutos = minutostempo;
                                    console.log(str_minutos +" resto vezes 60");
                                    if (str_minutos=='0') {
                                        str_minutos ='00';
                                    }
                                    console.log(str_minutos);
                                    var endtimeevent = (horastempo + ":" + str_minutos);
                                    console.log(endtimeevent);

                                    var timeend = endtimeevent + ":" + "00";

                                    var query_service = "SELECT * FROM schedules_solicitation WHERE schedules_solicitation.id = "+evento.NotificationsCompany.solicitation_id;

                                    var conditions = {
                                        'General': {
                                            'query': query_service
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
                                        console.log(result);
                                        var objReturn = JSON.parse(JSON.stringify(result));
                                        var decodeObjReturn = Base64.decode(objReturn);
                                        var convertedReturnN = unserialize(JSON.parse(decodeObjReturn));

                                    var query_schedules = "INSERT INTO schedules (classe_name, subclasse_name, date, service_id, time_begin, time_end, client_name, client_phone,status, valor, user_id, companie_id, secondary_user_id, voucher_id) VALUES ('"+evento2.classes.name+"','"+evento2.subclasses.name+"','"+evento.NotificationsCompany.data+"', "+idservice+", '"+evento.NotificationsCompany.horario+"','"+timeend+"', '"+$.cookieStorage.get('User').name+"','"+$.cookieStorage.get('User').phone+"', 1, "+evento2.services.value+","+$.cookieStorage.get('User').id+","+evento.NotificationsCompany.company_id+", "+evento.NotificationsCompany.secondary_user_id+", "+convertedReturnN[0].schedules_solicitation.voucher_id+");";

                                    var conditions = {
                                        'General': {
                                            'query': query_schedules
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
                                        if (result != "ImE6MDp7fSI=") {



                                            var query = "SELECT * FROM notifications_company INNER JOIN companies ON notifications_company.company_id WHERE companies.id = notifications_company.company_id and notifications_company.user_id =" +$.cookieStorage.get('User').id + " and notifications_company.status = 1 ORDER BY notifications_company.peso  DESC;";

                                            var conditions = {
                                                'User': {
                                                    'query':query
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
                                                if(result == ""){
                                                    generateModalAlert("Sem novas notificações!");
                                                    $('#mymodal').modal('show');

                                                } else {
                                                    var objReturn = JSON.parse(JSON.stringify(result));
                                                    var decodeObjReturn = Base64.decode(objReturn);
                                                    var convertedReturn = (JSON.parse(decodeObjReturn));
                                                    var notifications = convertedReturn.length;


                                                }
                                            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                                alert(errorThrown);
                                            });
                                        }else{
                                            generateModalAlert("Agendamento efetuado com Sucesso!");
                                            $('#mymodal').modal('show');
                                            window.location.href = "notifications.html";
                                        }
                                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                        alert(errorThrown);
                                    });
                                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                        alert(errorThrown);
                                    });
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

$(document).ready(function () {
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


    // verifica as notificaçoes
    var query = "SELECT * FROM notifications_company INNER JOIN companies ON notifications_company.company_id WHERE companies.id = notifications_company.company_id and notifications_company.user_id =" +$.cookieStorage.get('User').id + " and notifications_company.status = 1 and notifications_company.data >= DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%d') or companies.id = notifications_company.company_id and notifications_company.user_id =" +$.cookieStorage.get('User').id + " and notifications_company.status = 4 and notifications_company.data >= DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%d') or companies.id = notifications_company.company_id and notifications_company.user_id =" +$.cookieStorage.get('User').id + " and notifications_company.status = 1 and notifications_company.data = '00:00:00' or companies.id = notifications_company.company_id and notifications_company.user_id =" +$.cookieStorage.get('User').id + " and notifications_company.status = 4 and notifications_company.data = '00:00:00' ORDER BY notifications_company.peso  DESC, notifications_company.data DESC;";
    console.log(query);
    var conditions = {
        'User': {
            'query':query
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
        if(result == ""){
            generateModalAlert("Sem novas notificações!");
            $('#mymodal').modal('show');
        } else{
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = (JSON.parse(decodeObjReturn));
            var notifications = convertedReturn.length;
            var notify = 0;

            $.cookieStorage.remove("notifications");
            for (var l = 0; l < notifications; l++) {
                if(convertedReturn[l].notifications_company.status!=4){
                    notify++;
                }
                console.log(notify);
                $.cookieStorage.set("notifications", notify);

            }
            var status = '';

            if(notifications>10){
            for(var n = 0; n<10;n++){

                status = convertedReturn[n].notifications_company.status;

                var classe1 = convertedReturn[n];

                var objReturn1 = JSON.stringify(classe1);
                var HTML = "";
                var HTML1 = "";
                var icone = '';
                var classe = '';
                var horario = '';
                var data = '';
                var notification_title = classe1.notifications_company.description;

                if(notification_title == 'SUGESTAO DE NOVO HORARIO'){
                    icone =   'img/icons/NotificacoesHorario1-01.png';
                    classe = 'tablecontentnew';
                    horario = classe1.notifications_company.horario;
                    var horario1 = horario.split(":");
                    horario = horario1[0]+":"+horario1[1];
                    data = classe1.notifications_company.date_notification;
                    var datanotification =  data;
                    var datanotificationformatada = moment(datanotification).format('DD/MM/YYYY');
                }else if(notification_title == 'AGENDAMENTO ACEITO PELA EMPRESA'){
                    var negrito = '<span style="font-weight:600">CONFIRMADO</span>';
                    notification_title = 'AGENDAMENTO '+negrito+'';
                    icone ='img/icons/NotificacoesDataagendada-01.png';
                    classe = 'tablecontentaccept';
                    horario = classe1.notifications_company.horario;
                    var horario1 = horario.split(":");
                    horario = horario1[0]+":"+horario1[1];
                    data = classe1.notifications_company.date_notification;
                    var datanotification =  data;
                    var datanotificationformatada = moment(datanotification).format('DD/MM/YYYY');
                }else if(notification_title == 'AGENDAMENTO NAO ACEITO PELA EMPRESA'){
                    var negrito = '<span style="font-weight:600">NÃO ACEITO</span>';
                    notification_title = 'AGENDAMENTO '+negrito+'';
                    icone ='img/icons/NotificacoesDatacancelada.png';
                    classe = 'tablecontentcancel';
                    horario = classe1.notifications_company.horario;
                    var horario1 = horario.split(":");
                    horario = horario1[0]+":"+horario1[1];
                    data = classe1.notifications_company.date_notification;
                    var datanotification =  data;
                    var datanotificationformatada = moment(datanotification).format('DD/MM/YYYY');
                }else if(notification_title == 'NOVA OFERTA ADICIONADA'){
                    icone ='img/icons/NotificacoesOfertas-01.png';
                    classe = 'tablecontentofferadd';

                    var query = "SELECT * FROM offers Offer WHERE id = " +classe1.notifications_company.offer_id;

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
                        if(result != "ImE6MDp7fSI="){
                            var objReturn = JSON.parse(JSON.stringify(result));
                            var decodeObjReturn = Base64.decode(objReturn);
                            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));

                            for(var i=0;i<convertedReturn.length;i++) {
                                horario = convertedReturn[i].Offer.title;
                                data =  convertedReturn[i].Offer.value;


                            if(status!=1){

                                if(classe1.notifications_company.horario != '00:00:00' && notification_title == 'SUGESTAO DE NOVO HORARIO'){
                                    HTML1 ="<div class='service_class tablecontenttitle "+classe+"' id='"+classe1.notifications_company.id+"'><img class='icones' src="+icone+">"+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div> <table class='table' width=100%> <tr><td align='center'>"+horario+"</td><td align='center'>"+data+"</td><td align='right' class='tdnotification'>"+classe1.companies.corporate_name+"</td></tr><tr><td align='center'><i class='glyphicon glyphicon-ok' onclick='AceitarSugestedScheduling("+classe1.notifications_company.id+");'></i>SIM</td><td align='center'><i class='glyphicon glyphicon-remove' onclick='CancelarSugestedScheduling("+classe1.notifications_company.id+");'></i>NÃO</td><td align='right' class='tdnotification'>"+datanotificationformatada+"</td></tr></table> <div class='bottomLine3'></div> ";
                                }else if(classe1.notifications_company.offer_id == null && classe1.notifications_company.horario == '00:00:00'){
                                    HTML1 ="<div class='service_class tablecontenttitle "+classe+"'><img class='icones' src="+icone+"> "+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div> <div class='tablecontentbottom' >"+classe1.companies.corporate_name+"</div><div class='date "+classe+"'>"+datanotificationformatada+"</div></div> <div class='bottomLine2'></div> ";
                                }else{
                                    HTML1 ="<div class='service_class tablecontenttitle "+classe+"' onclick='Click("+objReturn1+",\""+notification_title+"\")'><img class='icones' src="+icone+"> "+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div><table class='table' width=100%> <tr><td align='center'>"+horario+"</td><td align='center'>"+data+"</td><td align='right'>"+classe1.companies.corporate_name+"</td></tr><tr><td></td><td></td><td align='right' class='tdnotification'>"+datanotificationformatada+"</td></tr></table> <div class='bottomLine3'></div> ";
                                }
                            }else{

                                if(classe1.notifications_company.horario != '00:00:00' && notification_title == 'SUGESTAO DE NOVO HORARIO'){

                                    HTML1 ="<div class='service_class tablecontenttitle "+classe+"' id='"+classe1.notifications_company.id+"'><span class='glyphicon glyphicon-exclamation-sign'></span><img class='icones' src="+icone+">"+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div> <table class='table' width=100%> <tr><td align='center'>"+horario+"</td><td align='center'>"+data+"</td><td align='right' class='tdnotification'>"+classe1.companies.corporate_name+"</td></tr><tr><td align='center'><i class='glyphicon glyphicon-ok' onclick='AceitarSugestedScheduling("+classe1.notifications_company.id+");'></i>SIM</td><td align='center'><i class='glyphicon glyphicon-remove' onclick='CancelarSugestedScheduling("+classe1.notifications_company.id+");'></i>NÃO</td><td align='right' class='tdnotification'>"+datanotificationformatada+"</td></tr></table> <div class='bottomLine3'></div> ";
                                }else if(classe1.notifications_company.offer_id == null && classe1.notifications_company.horario == '00:00:00'){
                                    HTML1 ="<div class='service_class tablecontenttitle "+classe+"'><span class='glyphicon glyphicon-exclamation-sign'></span><img class='icones' src="+icone+"> "+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div> <div class='tablecontentbottom' >"+classe1.companies.corporate_name+"</div><div class='date "+classe+"'>"+datanotificationformatada+"</div></div> <div class='bottomLine2'></div> ";
                                }else{
                                    HTML1 ="<div class='service_class tablecontenttitle "+classe+"' onclick='Click("+objReturn1+",\""+notification_title+"\")'><span class='glyphicon glyphicon-exclamation-sign'></span><img class='icones' src="+icone+"> "+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div><table class='table' width=100%> <tr><td align='center'>"+horario+"</td><td align='center'>"+data+"</td><td align='right'>"+classe1.companies.corporate_name+"</td></tr><tr><td></td><td></td><td align='right' class='tdnotification'>"+datanotificationformatada+"</td></tr></table> <div class='bottomLine3'></div> ";
                                }
                            }


                            $("#conteudo").append(HTML1);

                        }
                        }

                    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });
                    }
        if(notification_title != 'NOVA OFERTA ADICIONADA'){
           var datainfo =classe1.notifications_company.data;
            var datainfoformat = moment(datainfo).format('DD/MM/YYYY');

            if(status!=1) {

                if (classe1.notifications_company.horario!= '00:00:00' && notification_title == 'SUGESTAO DE NOVO HORARIO') {

                    HTML = "<div class='service_class tablecontenttitle " + classe + "' id='" + classe1.notifications_company.id + "'><img class='icones' src=" + icone + ">" + notification_title + "<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao(" + classe1.notifications_company.id + ");'></div> <table class='table' width=100%> <tr><td align='center'>" + horario + "</td><td align='center'>" + datainfoformat + "</td><td align='right'>" + classe1.companies.corporate_name + "</td></tr><tr><td align='center'><i class='glyphicon glyphicon-ok' onclick='AceitarSugestedScheduling(" + classe1.notifications_company.id + ");'></i>SIM</td><td align='center'><i class='glyphicon glyphicon-remove' onclick='CancelarSugestedScheduling(" + classe1.notifications_company.id + ");'></i>NÃO</td><td align='right' class='tdnotification'>" + datanotificationformatada + "</td></tr></table> <div class='bottomLine3'></div> ";
                } else if (classe1.notifications_company.offer_id == null && classe1.notifications_company.horario == '00:00:00') {
                    HTML = "<div class='service_class tablecontenttitle " + classe + "'><img class='icones' src=" + icone + "> " + notification_title + "<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao(" + classe1.notifications_company.id + ");'></div> <div class='tablecontentbottom' >" + classe1.companies.corporate_name + "</div><div class='date " + classe + "'>" + datanotificationformatada + "</div></div> <div class='bottomLine2'></div> ";
                } else {
                    HTML = "<div class='service_class tablecontenttitle " + classe + "' onclick='Click(" + objReturn1 + ",\"" + notification_title + "\")'><img class='icones' src=" + icone + "> " + notification_title + "<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao(" + classe1.notifications_company.id + ");'></div><table class='table' width=100%> <tr><td align='center'>" + horario + "</td><td align='center'>" + datainfoformat + "</td><td align='right'>" + classe1.companies.corporate_name + "</td></tr><tr><td></td><td></td><td align='right' class='tdnotification'>" + datanotificationformatada + "</td></tr></table> <div class='bottomLine3'></div> ";
                }
            }else {

                if (classe1.notifications_company.horario != '00:00:00' && notification_title == 'SUGESTAO DE NOVO HORARIO') {
                    HTML = "<div class='service_class tablecontenttitle " + classe + "' id='" + classe1.notifications_company.id + "'><span class='glyphicon glyphicon-exclamation-sign'></span><img class='icones' src=" + icone + ">" + notification_title + "<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao(" + classe1.notifications_company.id + ");'></div> <table class='table' width=100%> <tr><td align='center'>" + horario + "</td><td align='center'>" + datainfoformat + "</td><td align='right'>" + classe1.companies.corporate_name + "</td></tr><tr><td align='center'><i class='glyphicon glyphicon-ok' onclick='AceitarSugestedScheduling(" + classe1.notifications_company.id + ");'></i>SIM</td><td align='center'><i class='glyphicon glyphicon-remove' onclick='CancelarSugestedScheduling(" + classe1.notifications_company.id + ");'></i>NÃO</td><td align='right' class='tdnotification'>" + datanotificationformatada + "</td></tr></table> <div class='bottomLine3'></div> ";
                } else if (classe1.notifications_company.offer_id == null && classe1.notifications_company.horario == '00:00:00') {
                    HTML = "<div class='service_class tablecontenttitle " + classe + "'><span class='glyphicon glyphicon-exclamation-sign'></span><img class='icones' src=" + icone + "> " + notification_title + "<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao(" + classe1.notifications_company.id + ");'></div> <div class='tablecontentbottom' >" + classe1.companies.corporate_name + "</div><div class='date " + classe + "'>" + datanotificationformatada + "</div></div> <div class='bottomLine2'></div> ";
                } else {
                    HTML = "<div class='service_class tablecontenttitle " + classe + "' onclick='Click(" + objReturn1 + ",\"" + notification_title + "\")'><span class='glyphicon glyphicon-exclamation-sign'></span><img class='icones' src=" + icone + "> " + notification_title + "<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao(" + classe1.notifications_company.id + ");'></div><table class='table' width=100%> <tr><td align='center'>" + horario + "</td><td align='center'>" + datainfoformat + "</td><td align='right'>" + classe1.companies.corporate_name + "</td></tr><tr><td></td><td></td><td align='right' class='tdnotification'>" + datanotificationformatada + "</td></tr></table> <div class='bottomLine3'></div> ";
                }

            }
                $("#conteudo").append(HTML);
}
            }
            }else{
                for(var n = 0; n<notifications;n++){
                    status = convertedReturn[n].notifications_company.status;
                    var classe1 = convertedReturn[n];

                    var objReturn1 = JSON.stringify(classe1);
                    var HTML = "";
                    var HTML1 = "";
                    var icone = '';
                    var classe = '';
                    var horario = '';
                    var data = '';
                    var notification_title = classe1.notifications_company.description;
                    if(notification_title == 'SUGESTAO DE NOVO HORARIO'){
                        icone =   'img/icons/NotificacoesHorario1-01.png';
                        classe = 'tablecontentnew';
                        horario = classe1.notifications_company.horario;
                        var horario1 = horario.split(":");
                        horario = horario1[0]+":"+horario1[1];
                        data = classe1.notifications_company.date_notification;
                        var datanotification =  data;
                        var datanotificationformatada = moment(datanotification).format('DD/MM/YYYY');
                    }else if(notification_title == 'AGENDAMENTO ACEITO PELA EMPRESA'){
                        var negrito = '<span style="font-weight:600">CONFIRMADO</span>';
                        notification_title = 'AGENDAMENTO '+negrito+'';
                        icone ='img/icons/NotificacoesDataagendada-01.png';
                        classe = 'tablecontentaccept';
                        horario = classe1.notifications_company.horario;
                        var horario1 = horario.split(":");
                        horario = horario1[0]+":"+horario1[1];
                        data = classe1.notifications_company.date_notification;
                        var datanotification =  data;
                        var datanotificationformatada = moment(datanotification).format('DD/MM/YYYY');
                    }else if(notification_title == 'AGENDAMENTO NAO ACEITO PELA EMPRESA'){
                        var negrito = '<span style="font-weight:600">NÃO ACEITO</span>';
                        notification_title = 'AGENDAMENTO '+negrito+'';
                        icone ='img/icons/NotificacoesDatacancelada.png';
                        classe = 'tablecontentcancel';
                        horario = classe1.notifications_company.horario;
                        var horario1 = horario.split(":");
                        horario = horario1[0]+":"+horario1[1];
                        data = classe1.notifications_company.date_notification;
                        var datanotification =  data;
                        var datanotificationformatada = moment(datanotification).format('DD/MM/YYYY');
                    }else if(notification_title == 'NOVA OFERTA ADICIONADA'){
                        icone ='img/icons/NotificacoesOfertas-01.png';
                        classe = 'tablecontentofferadd';

                        var query = "SELECT * FROM offers Offer WHERE id = " +classe1.notifications_company.offer_id;

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
                            if(result != "ImE6MDp7fSI="){
                                var objReturn = JSON.parse(JSON.stringify(result));
                                var decodeObjReturn = Base64.decode(objReturn);
                                var convertedReturn = unserialize(JSON.parse(decodeObjReturn));

                                for(var i=0;i<convertedReturn.length;i++) {
                                    horario = convertedReturn[i].Offer.title;
                                    data =  convertedReturn[i].Offer.value;


                                    if(status!=1){
                                    if(classe1.notifications_company.horario != '00:00:00' && notification_title == 'SUGESTAO DE NOVO HORARIO'){
                                        HTML1 ="<div class='service_class tablecontenttitle "+classe+"' id='"+classe1.notifications_company.id+"'><img class='icones' src="+icone+">"+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div> <table class='table' width=100%> <tr><td align='center'>"+horario+"</td><td align='center'>"+data+"</td><td align='right' class='tdnotification'>"+classe1.companies.corporate_name+"</td></tr><tr><td align='center'><i class='glyphicon glyphicon-ok' onclick='AceitarSugestedScheduling("+classe1.notifications_company.id+");'></i>SIM</td><td align='center'><i class='glyphicon glyphicon-remove' onclick='CancelarSugestedScheduling("+classe1.notifications_company.id+");'></i>NÃO</td><td align='right' class='tdnotification'>"+datanotificationformatada+"</td></tr></table> <div class='bottomLine3'></div> ";
                                    }else if(classe1.notifications_company.offer_id == null && classe1.notifications_company.horario == '00:00:00'){
                                        HTML1 ="<div class='service_class tablecontenttitle "+classe+"'><img class='icones' src="+icone+"> "+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div> <div class='tablecontentbottom' >"+classe1.companies.corporate_name+"</div><div class='date "+classe+"'>"+datanotificationformatada+"</div></div> <div class='bottomLine2'></div> ";
                                    }else{
                                        HTML1 ="<div class='service_class tablecontenttitle "+classe+"' onclick='Click("+objReturn1+",\""+notification_title+"\")'><img class='icones' src="+icone+"> "+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div><table class='table' width=100%> <tr><td align='center'>"+horario+"</td><td align='center'>"+data+"</td><td align='right'>"+classe1.companies.corporate_name+"</td></tr><tr><td></td><td></td><td align='right' class='tdnotification'>"+datanotificationformatada+"</td></tr></table> <div class='bottomLine3'></div> ";
                                    }
                                    }else{
                                        if(classe1.notifications_company.horario != '00:00:00' && notification_title == 'SUGESTAO DE NOVO HORARIO'){
                                            HTML1 ="<div class='service_class tablecontenttitle "+classe+"' id='"+classe1.notifications_company.id+"'><span class='glyphicon glyphicon-exclamation-sign'></span><img class='icones' src="+icone+">"+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div> <table class='table' width=100%> <tr><td align='center'>"+horario+"</td><td align='center'>"+data+"</td><td align='right' class='tdnotification'>"+classe1.companies.corporate_name+"</td></tr><tr><td align='center'><i class='glyphicon glyphicon-ok' onclick='AceitarSugestedScheduling("+classe1.notifications_company.id+");'></i>SIM</td><td align='center'><i class='glyphicon glyphicon-remove' onclick='CancelarSugestedScheduling("+classe1.notifications_company.id+");'></i>NÃO</td><td align='right' class='tdnotification'>"+datanotificationformatada+"</td></tr></table> <div class='bottomLine3'></div> ";
                                        }else if(classe1.notifications_company.offer_id == null && classe1.notifications_company.horario == '00:00:00'){
                                            HTML1 ="<div class='service_class tablecontenttitle "+classe+"'><span class='glyphicon glyphicon-exclamation-sign'></span><img class='icones' src="+icone+"> "+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div> <div class='tablecontentbottom' >"+classe1.companies.corporate_name+"</div><div class='date "+classe+"'>"+datanotificationformatada+"</div></div> <div class='bottomLine2'></div> ";
                                        }else{
                                            HTML1 ="<div class='service_class tablecontenttitle "+classe+"' onclick='Click("+objReturn1+",\""+notification_title+"\")'><span class='glyphicon glyphicon-exclamation-sign'></span><img class='icones' src="+icone+"> "+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div><table class='table' width=100%> <tr><td align='center'>"+horario+"</td><td align='center'>"+data+"</td><td align='right'>"+classe1.companies.corporate_name+"</td></tr><tr><td></td><td></td><td align='right' class='tdnotification'>"+datanotificationformatada+"</td></tr></table> <div class='bottomLine3'></div> ";
                                        }
                                    }
                                    $("#conteudo").append(HTML1);

                                }
                            }

                        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        });
                    }
                    if(notification_title != 'NOVA OFERTA ADICIONADA'){
                        var datainfo =classe1.notifications_company.data;
                        var datainfoformat = moment(datainfo).format('DD/MM/YYYY');

                        if(status!=1){

                            if(classe1.notifications_company.horario != '00:00:00' && notification_title == 'SUGESTAO DE NOVO HORARIO'){
                                HTML ="<div class='service_class tablecontenttitle "+classe+"' id='"+classe1.notifications_company.id+"'><img class='icones' src="+icone+">"+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div> <table class='table' width=100%> <tr><td align='center'>"+horario+"</td><td align='center'>"+datainfoformat+"</td><td align='right'>"+classe1.companies.corporate_name+"</td></tr><tr><td align='center'><i class='glyphicon glyphicon-ok' onclick='AceitarSugestedScheduling("+classe1.notifications_company.id+");'></i>SIM</td><td align='center'><i class='glyphicon glyphicon-remove' onclick='CancelarSugestedScheduling("+classe1.notifications_company.id+");'></i>NÃO</td><td align='right' class='tdnotification'>"+datanotificationformatada+"</td></tr></table> <div class='bottomLine3'></div> ";
                            }else if(classe1.notifications_company.offer_id == null && classe1.notifications_company.horario == '00:00:00'){
                                HTML ="<div class='service_class tablecontenttitle "+classe+"'><img class='icones' src="+icone+"> "+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div> <div class='tablecontentbottom' >"+classe1.companies.corporate_name+"</div><div class='date "+classe+"'>"+datanotificationformatada+"</div></div> <div class='bottomLine2'></div> ";
                            }else{
                                HTML ="<div class='service_class tablecontenttitle "+classe+"' onclick='Click("+objReturn1+",\""+notification_title+"\")'><img class='icones' src="+icone+"> "+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div><table class='table' width=100%> <tr><td align='center'>"+horario+"</td><td align='center'>"+datainfoformat+"</td><td align='right'>"+classe1.companies.corporate_name+"</td></tr><tr><td></td><td></td><td align='right' class='tdnotification'>"+datanotificationformatada+"</td></tr></table> <div class='bottomLine3'></div> ";
                            }

                        }else{

                            if(classe1.notifications_company.horario != '00:00:00' && notification_title == 'SUGESTAO DE NOVO HORARIO'){
                                HTML ="<div class='service_class tablecontenttitle "+classe+"' id='"+classe1.notifications_company.id+"'><span class='glyphicon glyphicon-exclamation-sign'></span><img class='icones' src="+icone+">"+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div> <table class='table' width=100%> <tr><td align='center'>"+horario+"</td><td align='center'>"+datainfoformat+"</td><td align='right'>"+classe1.companies.corporate_name+"</td></tr><tr><td align='center'><i class='glyphicon glyphicon-ok' onclick='AceitarSugestedScheduling("+classe1.notifications_company.id+");'></i>SIM</td><td align='center'><i class='glyphicon glyphicon-remove' onclick='CancelarSugestedScheduling("+classe1.notifications_company.id+");'></i>NÃO</td><td align='right' class='tdnotification'>"+datanotificationformatada+"</td></tr></table> <div class='bottomLine3'></div> ";
                            }else if(classe1.notifications_company.offer_id == null && classe1.notifications_company.horario == '00:00:00'){
                                HTML ="<div class='service_class tablecontenttitle "+classe+"'><span class='glyphicon glyphicon-exclamation-sign'></span><img class='icones' src="+icone+"> "+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div> <div class='tablecontentbottom' >"+classe1.companies.corporate_name+"</div><div class='date "+classe+"'>"+datanotificationformatada+"</div></div> <div class='bottomLine2'></div> ";
                            }else{
                                HTML ="<div class='service_class tablecontenttitle "+classe+"' onclick='Click("+objReturn1+",\""+notification_title+"\")'><span class='glyphicon glyphicon-exclamation-sign'></span><img class='icones' src="+icone+"> "+notification_title+"<img class='icones2' src='img/icons/lixeirabranca.png' onclick='ApagarNotificacao("+classe1.notifications_company.id+");'></div><table class='table' width=100%> <tr><td align='center'>"+horario+"</td><td align='center'>"+datainfoformat+"</td><td align='right'>"+classe1.companies.corporate_name+"</td></tr><tr><td></td><td></td><td align='right' class='tdnotification'>"+datanotificationformatada+"</td></tr></table> <div class='bottomLine3'></div> ";
                            }

                        }

                        $("#conteudo").append(HTML);
                    }
                }
            }
            for(var l=0;l<notifications;l++) {
                if (convertedReturn[l].notifications_company.status == 1) {
                    var query_delete = "UPDATE notifications_company NotificationsCompany SET status = 4 WHERE id = " + convertedReturn[l].notifications_company.id;

                    var conditions = {
                        'General': {
                            'query': query_delete
                        }
                    };
                    var postData = JSON.stringify(conditions);

                    postData = {
                        'params': postData
                    };
                    var url = 'http://' + ip + '/api/General/get/query/' + createToken();

                    $.ajax({
                        method: "POST",
                        url: url,
                        data: postData

                    }).done(function (result) {
                        if (result == "ImE6MDp7fSI=") {
                            $.cookieStorage.remove("notifications");
                            $(".badge").html("");
                        }
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });
                }
            }

        }

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
    //fim da verificação de notificações
});
function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
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
function Click(offer, description){
    if(description == 'NOVA OFERTA ADICIONADA'){

    $.cookieStorage.set(offer);

    generateModalAlert($.cookieStorage.get('Offer').title);

    $('#mymodal').modal('show');

    if ($.cookieStorage.isSet('Offer')) {

        window.location.href = "offer_product_detail.html";

    } else {
        generateModalAlert("Erro ao salvar Cookie");
        $('#mymodal').modal('show');
    }
    }

}
