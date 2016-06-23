<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
     <title>Jezzy</title>
     <link rel="shortcut icon" href="img/icons/favicon.ico">
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
     <script src="../../lib/jasny-bootstrap/js/jasny-bootstrap.min.js"></script>
     <script src="../../lib/bootstrap/js/bootstrap.min.js"></script>
     <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
     <link rel="stylesheet" href="../../lib/bootstrap/css/bootstrap.min.css">
     <link rel="stylesheet" href="../../lib/jasny-bootstrap/css/jasny-bootstrap.min.css">
     <link rel="stylesheet" href="../../css/page/base.css">
     <script src="configuracao.js"></script>
     <link rel="stylesheet" href="../../css/page/payment.css">
     <script src="payment.php"></script>
     <script src="../../lib/jquery/jquery.base64.js"></script>
     <script src="../../lib/jquery-storage/jquery.cookie.js"></script>
     <script src="../../lib/jquery-storage/jquery.storageapi.min.js"></script>
     <script type="text/javascript" src="http://assets.moip.com.br/integration/moip.min.js"></script>
     <script type="text/javascript" src="//assets.moip.com.br/v2/moip.min.js"></script>
     <script src="../../lib/jquery-storage/json2.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js" type="text/javascript"></script>



</head>

<body>
<nav id="myNavmenu" class="navmenu navmenu-default navmenu-fixed-left offcanvas" role="navigation">
    <a class="navmenu-brand" id="userName" href="#">Jezzy</a>
    <ul class="nav navmenu-nav">
        <li><a href="home.html"><img src='../../img/icons/homeFooterIcon.PNG' class="icon-bar">HOME</a></li>
        <li><a href="my_profile.html"><img src='../../img/icons/Usuario.png' class="icon-bar">PERFIL</a></li>
        <li><a href="company_selection.html"  id="calendarServicesOptions2" ><img src='../../img/icons/calendarFooterIcon.PNG' class="icon-bar">AGENDAR</a></li>
        <li class="active"><a href="offer_display.html"><img src='../../img/icons/offerFooterIcon.PNG' class="icon-bar">OFERTAS</a></li>
        <li><a href="services_history.html"><img src='../../img/icons/Servicos.png' class="icon-bar">SERVIÇOS REALIZADOS</a></li>
        <li><a href="offer_history.html"><img src='../../img/icons/cardFooterIcon.PNG' class="icon-bar">COMPRAS REALIZADAS</a></li>
        <li><a href="notifications.html"><img src='../../img/icons/Sino.png' class="icon-bar">NOTIFICAÇÕES</a></li>
        <li><a href="news.html"><img src='../../img/icons/feedNoticias.png' class="icon-bar">FEED/NOTÍCIAS</a></li>
        <li><a href="vouchers_list.html"><img src='../../img/services/Voucher-02.png' class="icon-bar">MEUS VOUCHERS</a></li>
        <li><a onclick="Sair();"><img src='../../img/icons/Sair%20-%20branco-07.png' class="icon-bar" onclick="Sair();">SAIR</a></li>
    </ul>
</nav>
<div class="navbar-default navbar-fixed-top centerLogoJezzy">
            <span class="">
                <img src="../../img/icons/logo_login.PNG" class="sizeLogo" />
            </span>
    <button type="button" class="navbar-toggle" data-toggle="offcanvas" data-target="#myNavmenu" data-canvas="body">
        <img src="../../img/icons/Menu.png" class="menu" id="menu"/>
    </button>
            <span class="iconSearchJezzy" id="notify">
                <img src="../../img/icons/Sino.png" class="menu" id="UserLink" />
            </span>
    <div class="bottomLine"></div>
</div>
<?php
require '../../vendor/moip/vendor/autoload.php';

use Moip\Moip;
use Moip\MoipBasicAuth;
require '../../php/configuracao.php';

include_once "../../lib/moip-php-master/autoload.inc.php";

$token = 'HREOTOHJO4IYQRO24AEUUMQ89ZQ113RN';
$key = 'SPTQ2XRYS7WHJUKQKH25TC957H03LI4ZWKLCO0CL';
$cookie = json_decode($_COOKIE['User'], true);
$cookieoffer = json_decode($_COOKIE['Offer'], true);

$moip = new Moip(new MoipBasicAuth($token, $key), Moip::ENDPOINT_SANDBOX);

if($cookieoffer['company_id']!=99999){
$params = array(
    'User' => array(
            'query' => 'SELECT * FROM companies Company WHERE Company.id = '.$cookieoffer['company_id'],
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "http://".$ip."/api/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);
$json = base64_decode($data);
$array = json_decode($json, true);
$split = ($array[0]['Company']['percentage_split']);
$moip_id = ($array[0]['Company']['moip_id']);
curl_close($curl);
if($split == NULL){

$params = array(
    'User' => array(
            'query' => 'SELECT * FROM offers_extra_infos WHERE offer_id = '.$cookieoffer['id'],
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "http://".$ip."/api/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);
$json = base64_decode($data);
$array = json_decode($json, true);
$offer_type = $array[0]['offers_extra_infos']['offer_type'];
$split = ($array[0]['offers_extra_infos']['percentage_split']);

curl_close($curl);
}
}else{
$params = array(
    'User' => array(
            'query' => 'SELECT * FROM favorites_companies WHERE user_id = '.$cookie['id'],
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "http://".$ip."/api/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);
$json = base64_decode($data);
$array = json_decode($json, true);

$company = $array[0]['favorites_companies']['company_id'];
curl_close($curl);
$params = array(
    'User' => array(
            'query' => 'SELECT * FROM companies Company WHERE Company.id = '.$company,
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "http://".$ip."/api/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);
$json = base64_decode($data);
$array = json_decode($json, true);
$split = ($array[0]['Company']['percentage_split']);
$moip_id = ($array[0]['Company']['moip_id']);
if($_POST['parcels'] == ''){
 $parcels = 1;
 }
curl_close($curl);

if($split == NULL){

$params = array(
    'User' => array(
            'query' => 'SELECT * FROM offers_extra_infos WHERE offer_id = '.$cookieoffer['id'],
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "http://".$ip."/api/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);
$json = base64_decode($data);
$array = json_decode($json, true);
$offer_type = $array[0]['offers_extra_infos']['offer_type'];
$split = ($array[0]['offers_extra_infos']['percentage_split']);
curl_close($curl);
}
}
if($split == NULL){
$split = 0;
}


$offerprice = $cookieoffer['value'];
$result = str_replace(".", "", $offerprice);
$desconto = ($result / 100) * (100 - $cookieoffer['percentage_discount']);
$offerfrete = $_COOKIE['shipping_value'];
$resultfrete = str_replace("R$", "", $offerfrete);
$resultfrete3 = str_replace(",", "", $resultfrete);
$resultoffertotal  = str_replace("R$", "", $_COOKIE['total_value']);
$total_value = str_replace(",", ".", $resultoffertotal);
$offerunit = $cookieoffer['value'];
$resultunit = str_replace(".", "", $offerunit);



 $json =  '{
  "ownId": "'.uniqid().'",
        "amount": {
            "currency": "BRL",
            "subtotals": {
            "shipping": '.$resultfrete3.'
            }
            },
  "items": [
  {
        "product": "'.$cookieoffer["title"].'",
        "quantity": '.$_COOKIE["quantidade"].',
        "detail": "'.$cookieoffer["resume"].'",
        "price": '.$desconto.'
  }
   ],
  "receivers":[
  {
  "moipAccount": {"id": "'.$moip_id.'"},
  "type": "SECONDARY",
  "amount": {"percentual": '.$split.'}
  }
 ],
  "customer": {
        "ownId": "'.uniqid().'",
        "fullname": "'.$cookie["name"].'",
        "email": "'.$cookie["email"].'",
        "birthDate": "'.$cookie["birthday"].'",
         "taxDocument": {
                        "type": "CPF",
                        "number": "66666666699"
    },
    "phone": {
      "countryCode": "55",
      "areaCode": "11",
      "number": "66778899"
    },
    "shippingAddress": {
      "street":  "'.$_COOKIE["address"].'",
      "streetNumber": '.$_COOKIE["number"].',
      "complement": "'.$_COOKIE["complement"].'",
      "district": "'.$_COOKIE["district"].'",
      "city":  "'.$_COOKIE["city"].'",
      "state":  "'.$_COOKIE["state"].'",
      "country": "BRA",
      "zipCode": "'.$_COOKIE["zip_code"].'"
    }
    }
   }';







                                        $header = array();
										$header[] = 'Content-type: application/json';
										$header [] = "Authorization: Basic SFJFT1RPSEpPNElZUVJPMjRBRVVVTVE4OVpRMTEzUk46U1BUUTJYUllTN1dISlVLUUtIMjVUQzk1N0gwM0xJNFpXS0xDTzBDTA==";
										$auth = 'SFJFT1RPSEpPNElZUVJPMjRBRVVVTVE4OVpRMTEzUk46U1BUUTJYUllTN1dISlVLUUtIMjVUQzk1N0gwM0xJNFpXS0xDTzBDTA==';
                                        // URL do SandBox - Nosso ambiente de testes
                                        // $url = "https://desenvolvedor.moip.com.br/sandbox/ws/alpha/PreCadastramento";
                                        $url = "https://sandbox.moip.com.br/v2/orders";

                                        $curl = curl_init();
                                        curl_setopt($curl, CURLOPT_URL, $url);

                                        // header que diz que queremos autenticar utilizando o HTTP Basic Auth
                                        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

                                        // informa nossas credenciais
                                        curl_setopt($curl, CURLOPT_USERPWD, $auth);
                                        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                                        curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/4.0");
                                        curl_setopt($curl, CURLOPT_POST, true);

                                        // Informa nosso XML de instru��o
                                        curl_setopt($curl, CURLOPT_POSTFIELDS, $json);

                                        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);


                                        // efetua a requisi��o e coloca a resposta do servidor do MoIP em $ret
                                        $ret = curl_exec($curl);
                                        $err = curl_error($curl);
                                        $err = curl_error($curl);
                                        curl_close($curl);



                        $jObj = json_decode($ret);
                        $data = new DateTime();
                        $dn = $data -> format("Y-m-d");
                        $expiration = $data -> add(new DateInterval('P2D')) -> format("Y-m-d");
            print_r("</br></br></br></br>");



            print_r($moip->queryParcel('integracao@labs.moip.com.br', '4', '1.99', '100.00'));
            exit;
?>
<html>

    <div class="row">
        <div class="col-md-2 pull-left">
            <img src="../../img/icons/Chevron%20dourado.png" class="logoIcon iconeforgotpassword" id="BackButton" onclick="voltar();"/>
        </div>

        <div class="col-md-10 pull-left logocentral">
            REALIZAR PAGAMENTO
        </div>
        </div>

    <label class="unit3">Cartão de Crédito</label>
        <div class="cc-selector">
            <input id="visa" type="radio" onclick="return mostrar();" name="instituicao" value="Visa"/>
            <label class="drinkcard-cc visa" for="visa"></label>
            <input id="mastercard" type="radio" onclick="return mostrar();" name="instituicao" value="Mastercard"/>
            <label class="drinkcard-cc mastercard" for="mastercard"></label>
            <input id="americanexpress" type="radio" onclick="return mostrar();" name="instituicao" value="Americanexpress" />
            <label class="drinkcard-cc americanexpress" for="americanexpress"></label>
            <input id="dinnersclub" type="radio" onclick="return mostrar();" name="instituicao" value="dinnersclub"/>
            <label class="drinkcard-cc dinnersclub" for="dinnersclub"></label>
            <input id="elo" type="radio" onclick="return mostrar();" name="instituicao" value="elo"/>
            <label class="drinkcard-cc elo" for="elo"></label>
            <input id="hiper" type="radio" onclick="return mostrar();" name="instituicao" value="hiper"/>
            <label class="drinkcard-cc hiper" for="hiper"></label>
        </div>
    <label class="unit4">Boleto Bancário</label>
    <div class="cc-selector">
        <input id="boleto" type="radio" onclick="return esconder();" name="instituicao" value="Boleto" />
        <label class="drinkcard-cc boleto" for="boleto"></label>
    </div>
        <form  class="cc-selectordados" id="formulario"  name="formulario" method='post' action="pagamentoteste.php">
            <label class="unit2" id="texttitular">Titular do Cartão</label>
            <input type="text"  id="name" name="holder" value="José" class="textbox"/></br>
           <div class="row">
                <div class="col-xs-5">
                    <div class="flipswitch" id="flipswitch">
                        <input  type="checkbox"  class="flipswitch-cb" onchange="mask();" id="fs" >
                        <label class="flipswitch-label hide" for="fs"> <!-- CLASS HIDE ESCONDENDO O FLIPSWITCH QUE MUDA O FORMATO CNPJ/CPF  -->
                            <div  class="flipswitch-inner" ></div>
                            <div class="flipswitch-switch" id="flip"></div>
                        </label>
                    </div>
                    <label class="unit2" id='cpflabelinfo' style="display: none;">Digite seu CPF</label>
                    <div class="flipswitch" id="flipswitchboleto" style="display: none;">

                        <input  type="checkbox"  class="flipswitch-cb" onchange="maskboleto();" id="fsboleto" >
                        <label class="flipswitch-label hide" for="fsboleto"> <!-- CLASS HIDE ESCONDENDO O FLIPSWITCH QUE MUDA O FORMATO CNPJ/CPF  -->
                            <div  class="flipswitch-inner" ></div>
                            <div class="flipswitch-switch" id="flipboleto"></div>
                        </label>
                    </div>

                    <script>

                        function mostrar(){
 var valortotal = (((($.cookieStorage.get('total_value')).replace("R$","")).replace(",",".")).replace("<br>", "")).trim();

                                          var valorcomdesconto = valortotal;
    if($.cookieStorage.get('Offer').parcels !='INACTIVE'){

        var quantidadedeparcelas = $.cookieStorage.get('Offer').parcels_quantity;

        quantidadedeparcelas = (quantidadedeparcelas/1)+1;
        if($.cookieStorage.get('Offer').parcels_off_impost!='ACTIVE'){
            for( var i=1;i<quantidadedeparcelas;i++){
                var parcelsvalue = valorcomdesconto/i;
                document.getElementById("parcels").innerHTML += "<option value="+i+">"+i+"x "+monetary(parcelsvalue)+"</option>";
            }
        }else{
            //CALCULAR JUROS CONTIDOS NA TABELA OFFER_EXTRA_INFOS
            for( var i=1;i<quantidadedeparcelas;i++){
                var parcelsvalue = valorcomdesconto/i;
                document.getElementById("parcels").innerHTML += "<option value="+i+">"+i+"x "+monetary(parcelsvalue)+"</option>";
            }
        }

    }

    if($.cookieStorage.get('paginaanterior') == "http://'+ip+'/jezzy-mobile/public_html/home.html"){
        id = $.cookieStorage.get('Offer').id;
        parcels = $.cookieStorage.get('Offer').parcels;
    }else{
        id = $.cookieStorage.get('Offer').id;
        parcels = $.cookieStorage.get('Offer').parcels;
    }
                            if(parcels != 'INACTIVE'){
                                document.getElementById('name').style.display = "block";
                                document.getElementById('flipswitch').style.display = "block";
                                document.getElementById('taxdocument1').style.display = "block";
                                document.getElementById('number').style.display = "block";
                                document.getElementById('cvc').style.display = "block";
                                document.getElementById('month').style.display = "block";
                                document.getElementById('year').style.display = "block";
                                document.getElementById('parcels').style.display = "block";
                                document.getElementById('numbercard').style.display = "block";
                                document.getElementById('info').style.display = "block";
                                document.getElementById('question').style.display = "block";
                                document.getElementById('monthexpiration').style.display = "block";
                                document.getElementById('securitycod').style.display = "block";
                                document.getElementById('expirationyeartext').style.display = "block";
                                document.getElementById('numberofparcelstext').style.display = "block";
                                document.getElementById('texttitular').style.display = "block";
                                document.getElementById('flipswitchboleto').style.display = "none";
                                document.getElementById('cpflabelinfo').style.display = "block";
                                document.getElementById('taxboleto').style.display = "none";
                                document.getElementById("encrypt").value = "FINALIZAR";
                            } else{
                                document.getElementById('name').style.display = "block";
                                document.getElementById('flipswitch').style.display = "block";
                                document.getElementById('taxdocument1').style.display = "block";
                                document.getElementById('number').style.display = "block";
                                document.getElementById('cvc').style.display = "block";
                                document.getElementById('month').style.display = "block";
                                document.getElementById('year').style.display = "block";
                                document.getElementById('parcels').style.display = "none";
                                document.getElementById('numbercard').style.display = "block";
                                document.getElementById('info').style.display = "block";
                                document.getElementById('question').style.display = "block";
                                document.getElementById('monthexpiration').style.display = "block";
                                document.getElementById('securitycod').style.display = "block";
                                document.getElementById('expirationyeartext').style.display = "block";
                                document.getElementById('numberofparcelstext').style.display = "none";
                                document.getElementById('texttitular').style.display = "block";
                                document.getElementById('flipswitchboleto').style.display = "none";
                                document.getElementById('cpflabelinfo').style.display = "block";
                                document.getElementById('taxboleto').style.display = "none";
                                document.getElementById("encrypt").value = "FINALIZAR";
                            }


                        }
                        function esconder(){

                            document.getElementById('name').style.display = "none";
                            document.getElementById('flipswitch').style.display = "none";
                            document.getElementById('taxdocument1').style.display = "none";
                            document.getElementById('number').style.display = "none";
                            document.getElementById('cvc').style.display = "none";
                            document.getElementById('month').style.display = "none";
                            document.getElementById('year').style.display = "none";
                            document.getElementById('parcels').style.display = "none";
                            document.getElementById('numbercard').style.display = "none";
                            document.getElementById('info').style.display = "none";
                            document.getElementById('question').style.display = "none";
                            document.getElementById('monthexpiration').style.display = "none";
                            document.getElementById('securitycod').style.display = "none";
                            document.getElementById('expirationyeartext').style.display = "none";
                            document.getElementById('numberofparcelstext').style.display = "none";
                            document.getElementById('texttitular').style.display = "none";
                            document.getElementById('taxboleto').style.display = "block";
                            document.getElementById('flipswitchboleto').style.display = "block";
                            document.getElementById('cpflabelinfo').style.display = "block";
                            document.getElementById("encrypt").value = "FINALIZAR";


                        }

                        function mask(){
                               if($("#flip").position().left == 2){
                                $("#taxdocument1").mask("999.999.999-99");
                                } else{
                                    $("#taxdocument1").mask("99.999.999/9999-99");
                                }
                        }
                        function maskboleto(){
                            if($("#flipboleto").position().left == 2){
                                $("#taxdocument1boleto").mask("999.999.999-99");
                            } else{
                                $("#taxdocument1boleto").mask("99.999.999/9999-99");
                            }
                        }
                        function receber(){

                            var string1 = $("#taxdocument1").val();

                            var string2 = string1.replace(/[/\_.-]/g, "");

                            document.getElementById("taxdocument").value = string2;

                            if(string2.length == 11){
                                if(TestaCPF(string2)){

                                }else{
                                    generateModalAlert("CPF inválido!");
                                    $('#mymodal').modal('show');
                                    $("#taxdocument1boleto").val("");
                                }
                            }


                        }
                        function receberboleto(){

                            var string1 = $("#taxdocument1boleto").val();

                            var string2 = string1.replace(/[/\_.-]/g, "");

                            document.getElementById("taxdocumentboleto").value = string2;

                            if(string2.length == 11){
                                if(TestaCPF(string2)){

                                }else{
                                    generateModalAlert("CPF inválido!");
                                    $('#mymodal').modal('show');
                                    $("#taxdocument1boleto").val("");
                                }
                            }
                        }

function monetary(value){
    return 'R$ ' +  parseFloat(value).toFixed(2).replace('.',',');
}

    function infoCPF(){
        $.alert({
            title:"",
            content: 'BLA BLA BLA!',
            animation: 'zoom',
            closeAnimation: 'scale',
            theme: 'supervan',
            closeIcon: false,
            confirmButton: "OK"

        })
    }
    function TestaCPF(strCPF) {

        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000")
            return false;
        for (i = 1; i <= 9; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)))
            return false;
        Soma = 0;
        for (i = 1; i <= 10; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11)))
            return false;
        return true;
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
    $(document).ready(function() {
        document.getElementById('name').style.display = "none";
        document.getElementById('flipswitch').style.display = "none";
        document.getElementById('taxdocument1').style.display = "none";
        document.getElementById('number').style.display = "none";
        document.getElementById('cvc').style.display = "none";
        document.getElementById('month').style.display = "none";
        document.getElementById('year').style.display = "none";
        document.getElementById('parcels').style.display = "none";
        document.getElementById('numbercard').style.display = "none";
        document.getElementById('info').style.display = "none";
        document.getElementById('question').style.display = "none";
        document.getElementById('monthexpiration').style.display = "none";
        document.getElementById('securitycod').style.display = "none";
        document.getElementById('expirationyeartext').style.display = "none";
        document.getElementById('numberofparcelstext').style.display = "none";
        document.getElementById('texttitular').style.display = "none";




    document.getElementById("userName").innerText = $.cookieStorage.get('User').name;
    $("#taxdocument1").mask("999.999.999-99");
    $("#taxdocument1boleto").mask("999.999.999-99");
    var date = new Date();
    var year = date.getFullYear();


    for( var i=0;i<10;i++){
        var yeark = year.toString().substr(2,2);
        document.getElementById("year").innerHTML += "<option value="+yeark+">"+year+"</option>";
        year++;
            }

        $("#encrypt").click(function() {
            if(document.getElementById("encrypt").value == "SELECIONE O MÉTODO DE PAGAMENTO") {
                generateModalAlert("SELECIONE O MÉTODO DE PAGAMENTO");
                $('#mymodal').modal('show');
                return false;
            }else{
                if(document.getElementById("boleto").checked==true){
                    if(document.getElementById("taxdocument1boleto").value == '___.___.___-__' || document.getElementById("taxdocument1boleto").value == ""){
                        generateModalAlert("Campo CPF vazio!");
                        $('#mymodal').modal('show');
                        return false;
                    }else{
                        document.getElementById("encrypt").value = "PROCESSANDO PEDIDO...";
                        document.formulario.action = "pagamentotesteboleto.php";
                    }

                } else{
                    if(document.getElementById("taxdocument").value == '___.___.___-__' || document.getElementById("taxdocument").value == ""){
                        generateModalAlert("Campo CPF vazio!");
                        $('#mymodal').modal('show');
                        return false;
                    } else{
                    var cc = new Moip.CreditCard({
                    number  : $("#number").val(),
                    cvc     : $("#cvc").val(),
                    expMonth: $("#month").val(),
                    expYear : $("#year").val(),
                    pubKey  : $("#public_key").val()
                });

                        if( cc.isValid()){
                            document.getElementById("encrypt").value = "PROCESSANDO PEDIDO...";
                            $("#encrypted_value").val(cc.hash());
                            $("#card_type").val(cc.cardType());
                            if(cc.cardType()=='MASTERCARD'){
                                document.getElementById("mastercard").checked = true;
                            } else if(cc.cardType()=='VISA'){
                                document.getElementById("visa").checked = true;
                            }else if(cc.cardType()=='AMEX'){
                                document.getElementById("americanexpress").checked = true;
                            }else if(cc.cardType()=='DINERS'){
                                document.getElementById("dinnersclub").checked = true;
                            }else if(cc.cardType()=='ELO'){
                                document.getElementById("elo").checked = true;
                            }else if(cc.cardType()=='HIPERCARD'){
                                document.getElementById("hiper").checked = true;
                            }
                            var card = new Object();
                            var cardarray = new Array();
                            card.instituicao = cc.cardType();
                            card.codigo = cc.hash();

                            cardarray[0] = card;
                            var CreditCard = cardarray[0];
                            var cardsave = JSON.stringify(CreditCard);
                            var variavelcard = JSON.parse(cardsave);

                            $.cookieStorage.set(variavelcard);


                            if ($.cookieStorage.isSet('instituicao')) {



                            } else {
                                generateModalAlert("Erro ao salvar Cookie");
                                $('#mymodal').modal('show');
                            }


                        }
                        else{
                            $("#encrypted_value").val('');
                            $("#card_type").val('');
                            generateModalAlert("Cartão de Crédito Inválido. Tente novamente!");
                            $('#mymodal').modal('show');
                            return false;

                    }
                    }
                }
            }
            });
    });
</script>
                </div>
                <div class="col-xs-7 taxsss">
                    </br>
                    <input type="text"  id="taxdocument1" onkeyup="receber();" class="textbox tax"/>
                    <input type="hidden" id="taxdocument" name="taxdocument"  class="textbox tax"/>
                    <div class="col-xs-2">
                        <label class="infolabel1" id="question" onclick="infoCPF();">?</label>
                    </div>
                   <div class="col-xs-9">
                       <a class="infolabel" id="info" onclick="infoCPF();">Por que preciso informar o CPF?</a>
                   </div>
                </div>
               <div class="col-xs-7 taxsssboleto" style="display: none" id="taxboleto">
                   </br>
                   <input type="text"  id="taxdocument1boleto" onkeyup="receberboleto();" class="textbox tax"/>
                   <input type="hidden" id="taxdocumentboleto" name="taxdocumentboleto"  class="textbox tax"/>
                   <div class="col-xs-2">
                       <label class="infolabel1" id="questionboleto" onclick="infoCPF();">?</label>
                   </div>
                   <div class="col-xs-9">
                       <a class="infolabel" id="infoboleto" onclick="infoCPF();">Por que preciso informar o CPF?</a>
                   </div>
               </div>
            </div>
            </br>



            <div class="row">
                <div class="col-xs-6">
                    <label class="unit2" id="numbercard">Numero do Cartão</label>
                    <input type="text"  id="number" name="cardnumber" value="5555666677778884" class="textbox number"/></br>
                </div>
                <div class="col-xs-6">
                    <label class="unit2" id="securitycod">Código de Segurança</label>
                    <input type="text" id="cvc" name="cvc" value="123" class="textbox cod"/></br>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
            <label class="unit2" id="monthexpiration">Mês de Expiração</label>
                    <div id='ExpirationMonth'>
                        <div class="select-estiloso ">
                            <select class="form-control "  id='month' name='month'>
                                <option value="01">Jan</option>
                                <option value="02">Fev</option>
                                <option value="03">Mar</option>
                                <option value="04">Abr</option>
                                <option value="05">Mai</option>
                                <option value="06">Jun</option>
                                <option value="07">Jul</option>
                                <option value="08">Ago</option>
                                <option value="09">Set</option>
                                <option value="10">Out</option>
                                <option value="11">Nov</option>
                                <option value="12">Dez</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
            <label class="unit2" id="expirationyeartext">Ano de Expiração</label>
                    <div id='ExpirationYear'>
                        <div class="select-estiloso">
                            <select class="form-control"  id='year' name='year'>
                            </select>
                            </div>
                        </div>
                </div>
            </div>
            <br>
            <label class="unit2" id="numberofparcelstext">Número de parcelas</label>
                <div id='numParcels'>
                    <div class="select-estiloso">
                        <select class="form-control"  id='parcels' name='parcels'>

                        </select>
                    </div>
                </div>
            <br>


            <input type="submit" value="SELECIONE O MÉTODO DE PAGAMENTO" id="encrypt"  class="btn btn-info btn-block"/>
             <br>
            <div class="titulo" style="font-size: 3vw; margin-left: 20%; text-align: right">PAGAMENTO SEGURO</div>
            <img class = 'moip' src = '../../img/icons/moip.png'/>
            <input id="public_key" class="form-control" value="-----BEGIN PUBLIC KEY-----
                MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoBttaXwRoI1Fbcond5mS
                7QOb7X2lykY5hvvDeLJelvFhpeLnS4YDwkrnziM3W00UNH1yiSDU+3JhfHu5G387
                O6uN9rIHXvL+TRzkVfa5iIjG+ap2N0/toPzy5ekpgxBicjtyPHEgoU6dRzdszEF4
                ItimGk5ACx/lMOvctncS5j3uWBaTPwyn0hshmtDwClf6dEZgQvm/dNaIkxHKV+9j
                Mn3ZfK/liT8A3xwaVvRzzuxf09xJTXrAd9v5VQbeWGxwFcW05oJulSFjmJA9Hcmb
                DYHJT+sG2mlZDEruCGAzCVubJwGY1aRlcs9AQc1jIm/l8JwH7le2kpk3QoX+gz0w
                WwIDAQAB
                -----END PUBLIC KEY-----" type="hidden">
        </form>
    </div>
    </html>

