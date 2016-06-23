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
    document.getElementById("userName").innerText = $.cookieStorage.get('User').name;
    var gender='';

    if($.cookieStorage.get('User').gender == "female"){
        gender  = 'female';
    }else{
        gender = 'male';
    }
    var foto1 = '';
    var foto2 = '';
    var foto3 = '';
    var foto4 = '';
    if(gender == 'female'){
        foto1 = 'img/icons/Img-Jezzy%20-01-01.jpg';
        foto2 = 'img/icons/Img-Jezzy%20-01-02.jpg';
        foto3 = 'img/icons/Img-Jezzy%20-01-03.jpg';
        foto4 = 'img/icons/Img-Jezzy%20-01-04.jpg';
        document.getElementById('tema1').innerText = 'BELEZA';
        document.getElementById('tema2').innerText = 'MAQUIAGEM';
        document.getElementById('tema3').innerText = 'UNHAS';
        document.getElementById('tema4').innerText = 'SOBRANCELHAS';
    }else{
        foto1 = 'img/services/man-02.jpg';
        foto2 = 'img/services/man-04.jpg';
        foto3 = 'img/services/man-03.jpg';
        foto4 = 'img/services/man-01.jpg';
        document.getElementById('tema1').innerText = 'BELEZA';
        document.getElementById('tema2').innerText = 'CABELO';
        document.getElementById('tema3').innerText = 'BARBA';
        document.getElementById('tema4').innerText = 'MODA';
    }

    $("#imagem1").attr("src",  foto1);
    $("#imagem2").attr('src',  foto2);
    $("#imagem3").attr('src',  foto3);
    $("#imagem4").attr('src',  foto4);

});
function voltar(){
    window.history.go(-1);
}