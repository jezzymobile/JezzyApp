function meuLog(msg) {
    span = document.body;
}

function verificarEmail(){
    var emailUsuario = document.getElementById('email').value;
    usuario = emailUsuario.substring(0, emailUsuario.indexOf("@"));
    dominio = emailUsuario.substring(emailUsuario.indexOf("@")+ 1, emailUsuario.length);
    if ((usuario.length >=1) && (dominio.length >=3) && (usuario.search("@")==-1) && (dominio.search("@")==-1) && (usuario.search(" ")==-1) && (dominio.search(" ")==-1) && (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1)&& (dominio.lastIndexOf(".") < dominio.length - 1)) {
        document.getElementById("form").submit();
    } else {
        return false;

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

function sendRequest() {

    var emailUsuario = document.getElementById('email').value;

    usuario = emailUsuario.substring(0, emailUsuario.indexOf("@"));
    dominio = emailUsuario.substring(emailUsuario.indexOf("@")+ 1, emailUsuario.length);
    if ((usuario.length >=1) && (dominio.length >=3) && (usuario.search("@")==-1) && (dominio.search("@")==-1) && (usuario.search(" ")==-1) && (dominio.search(" ")==-1) && (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1)&& (dominio.lastIndexOf(".") < dominio.length - 1)) {

        var conditions = {
        'User': {
            'conditions': {
                'User.email':emailUsuario
            }
        }
    };

    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'http://'+ip+'/api/users/get/first/' + createToken();

    $.ajax({
            method: "POST",
            url: url,
        data: postData,
        async: false
    }).done(function (result) {


        var objReturn = JSON.parse(JSON.stringify(result));

        var decodeObjReturn = Base64.decode(objReturn);

        var convertedReturn = JSON.parse(decodeObjReturn);

        var id = convertedReturn.User.id;
        var nome = convertedReturn.User.name;
        var email=convertedReturn.User.email;
        document.getElementById('name').value = nome;

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
    var emailUsuarioNewPassword = document.getElementById('email').value;
    var conditionsNewPassword = {
        'User': {
            'conditions': {
                'User.email':emailUsuarioNewPassword
            }
        }
    };

    var postDataNewPassword = JSON.stringify(conditionsNewPassword);

    postDataNewPassword = {
        'params': postDataNewPassword
    };
    var urlNewPassword = 'http://'+ip+'/api/users/get/first/' + createToken();

    $.ajax({
        method: "POST",
        url: urlNewPassword,
        data: postDataNewPassword,
        async: false
    }).done(function (result) {


        var objReturn = JSON.parse(JSON.stringify(result));
        var decodeObjReturn = Base64.decode(objReturn);
        var convertedReturn = JSON.parse(decodeObjReturn);
        var password = convertedReturn.User.password;

        var newpasschar1 =  Math.floor(Math.random() * 9 + 1);
        var newpasschar2 =  Math.floor(Math.random() * 9 + 1);
        var newpasschar3 =  Math.floor(Math.random() * 9 + 1);
        var newpasschar4 =  Math.floor(Math.random() * 9 + 1);
        var newpasschar5 =  Math.floor(Math.random() * 9 + 1);

        var newpass = (newpasschar1.toString() + newpasschar2.toString() + newpasschar3.toString() + newpasschar4.toString() + newpasschar5.toString());

        document.getElementById('password').value = newpass;


        var id = convertedReturn.User.id;
        console.log("id:" + id);
        var conditionsEditUser = {
            'User': {
                    'id': id,
                    'name':convertedReturn.User.name,
                    'email':convertedReturn.User.email,
                    'password': newpass/1
            }
        };

        var postDataCreateUser = JSON.stringify(conditionsEditUser);


        postDataCreateUser = {
            'params': postDataCreateUser
        };


        var urlCreateUser = 'http://'+ip+'/api/users/save/first/' + createToken();

        $.ajax({
            method: "POST",
            url: urlCreateUser,
            data: postDataCreateUser

        }).done(function (result) {
            var objReturn = JSON.parse(JSON.stringify(result));

            var decodeObjReturn = Base64.decode(objReturn);

            var convertedReturn = JSON.parse(decodeObjReturn);





        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });
        //


    var postDataSendEmail = {
        'password': newpass,
        'email':emailUsuarioNewPassword
    };

    var urlSendEmail = 'http://'+ip+'/jezzy-mobile/public_html/php/ForgetPasswordEmail.php';


    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
    } else {
        generateModalAlert("E-mail inválido!");
        $('#mymodal').modal('show');
        document.getElementById("email").value = "";
    }
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



