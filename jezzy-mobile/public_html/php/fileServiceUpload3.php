<?php

if (isset($_FILES['files'])) {
    $ftp_server = 'ec2-52-67-24-232.sa-east-1.compute.amazonaws.com';
    $ftp_user_name = 'jezzy-ftp';
    $ftp_user_pass = 'JEZftp1000';
    $file = ""; //tobe uploaded
    $cookie = json_decode($_COOKIE['Schedules'], true);

// set up basic connection
    $conn_id = ftp_connect($ftp_server);

// login with username and password
    $login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);


    $myFile = $_FILES['files'];
    $type = explode("/", $_FILES['files']['type']);
    $name = explode("@", $_POST['inputnumeroimagem3']);
    $_FILES['files']['name'] = $name[0] . "." . $type[1];
    $destination_path = "uploads/company-" . $cookie['companie_id'] . "/services/";
    $destination_file = $destination_path . $_FILES['files']['name'];
    //$exif = exif_read_data($destination_file);
    //if(isset($exif['Orientation'])&& $exif['Orientation'] == '6'){
    //}
    $file = $myFile['tmp_name'];
    $lista = ftp_nlist($conn_id, "/");
    $value = $_FILES['files']['name'];

    //$photoform = $this->request->params['form']['sendImageFirst'];
    //$photoform['name'];


    $variavel = $value;

    $var = explode("/", $variavel);

    $fileremote = $_FILES['files']['name'];

    if ($var[0] == $fileremote) {

        ftp_delete($conn_id, $destination_file);

        //$upload = ftp_put($conn_id, $exif, $file, FTP_BINARY);
        $upload = ftp_put($conn_id, $destination_file, $file, FTP_BINARY);

        // upload the file
        $url = "http://52.67.24.232/secure/uploads/company-" . $cookie['companie_id'] . "/services/" . $_FILES['files']['name'];
        $file = explode(".", $_FILES['files']['name']);
        $urlsearchdb = "http://52.67.24.232/secure/uploads/company-" . $cookie['companie_id'] . "/services/" .$file[0];
        //$url = "http://192.168.1.41:8080/".$_FILES['files']['name'];

        if (!$upload) {// check upload status
            echo "ERROR 427 - ERRO AO SUBIR IMAGEM";
            header('Location: ../service_galery_image.html');
        } else {
            $conecta = mysqli_connect("lm1qivwncj3xprd.c2g7fyxoel3s.sa-east-1.rds.amazonaws.com", "jezdbadmin", "JEZdB1000", "jezzyapp_main") or print (mysql_error());

            $var1 = $_FILES['files']['name'];
            $schedule = explode("-", $var1);
            $idschedule = $schedule[1];
            $pos = strpos($idschedule, ".png");
            if ($pos === false) {
                $var2 = explode(".jpeg", $idschedule);
            } else {
                $var2 = explode(".png", $idschedule);
            }
            $var3 = $schedule[0];
            $sql = ("SELECT * FROM services_photos WHERE schedule_id = ". $var2[0] ." and idphoto = ". $var3 ." and status = 'ACTIVE'");

            $result = mysqli_query($conecta, $sql);

            //$result2 = mysql_fetch_row($result);
            $result2 = mysqli_fetch_array($result);

            if ($result2!=NULL) {
                $conecta = mysqli_connect("lm1qivwncj3xprd.c2g7fyxoel3s.sa-east-1.rds.amazonaws.com", "jezdbadmin", "JEZdB1000", "jezzyapp_main") or print (mysql_error());

                $var1 = $_FILES['files']['name'];
                $schedule = explode("-", $var1);
                $idschedule = $schedule[1];
                $pos = strpos($idschedule, ".png");
                if ($pos === false) {
                    $var2 = explode(".jpeg", $idschedule);
                } else {
                    $var2 = explode(".png", $idschedule);
                }
                $var3 = $schedule[0];
                $sql = "UPDATE services_photos SET photo = '" . $url . "' WHERE schedule_id = " . $var2[0] . " and idphoto = " . $var3 . " and status='ACTIVE'";

                $result = mysqli_query($conecta, $sql);

                if ($result) {
                	clearstatcache();
                    header('Location: ../service_galery_image.html');
                } else {
                    $sqlError = "Error writing to database";
                    var_dump("ERRO");
                    header('Location: ../service_galery_image.html');
                    exit;
                }
            }else{
                $var1 = $_FILES['files']['name'];
                $schedule = explode("-", $var1);
                $idschedule = $schedule[1];
                $pos = strpos($idschedule, ".png");
                if ($pos === false) {
                    $var2 = explode(".jpeg", $idschedule);
                } else {
                    $var2 = explode(".png", $idschedule);
                }
                $var3 = $schedule[0];
                $sql = ("SELECT * FROM services_photos WHERE schedule_id = ". $var2[0] ." and idphoto = ". $var3 ." and status = 'INACTIVE'");

                $result = mysqli_query($conecta, $sql);

                //$result2 = mysql_fetch_row($result);
                $result3 = mysqli_fetch_array($result);

                if ($result3!= NULL) {
                    $conecta = mysqli_connect("lm1qivwncj3xprd.c2g7fyxoel3s.sa-east-1.rds.amazonaws.com", "jezdbadmin", "JEZdB1000", "jezzyapp_main") or print (mysql_error());

                    $var1 = $_FILES['files']['name'];
                    $schedule = explode("-", $var1);
                    $idschedule = $schedule[1];
                    $pos = strpos($idschedule, ".png");
                    if ($pos === false) {
                        $var2 = explode(".jpeg", $idschedule);
                    } else {
                        $var2 = explode(".png", $idschedule);
                    }
                    $var3 = $schedule[0];
                    $sql = "UPDATE services_photos SET photo = '" . $url . "', status = 'ACTIVE'  WHERE schedule_id = " . $var2[0] . " and idphoto = " . $var3 . ";";
               
                    $result = mysqli_query($conecta, $sql);

                    if ($result) {
                    	clearstatcache();
                        header('Location: ../service_galery_image.html');
                    } else {
                        $sqlError = "Error writing to database";
                        var_dump("ERRO");
                        header('Location: ../service_galery_image.html');
                        exit;
                    }
                } else {

                    $conecta = mysqli_connect("lm1qivwncj3xprd.c2g7fyxoel3s.sa-east-1.rds.amazonaws.com", "jezdbadmin", "JEZdB1000", "jezzyapp_main") or print (mysql_error());

                    $var1 = $_FILES['files']['name'];
                    $schedule = explode("-", $var1);
                    $idschedule = $schedule[1];
                    $pos = strpos($idschedule, ".png");
                    if ($pos === false) {
                        $var2 = explode(".jpeg", $idschedule);
                    } else {
                        $var2 = explode(".png", $idschedule);
                    }
                    $var3 = $schedule[0];
                    $sql = "INSERT INTO services_photos (photo, schedule_id, idphoto, status) VALUES ('" . $url . "', " . $var2[0] . ", " . $var3 . ", 'ACTIVE') ";

                    $result = mysqli_query($conecta, $sql);

                    if ($result) {
                       	clearstatcache();
                        header('Location: ../service_galery_image.html');
                    } else {
                        $sqlError = "Error writing to database";
                        //file_put_contents($sqlErrorLog, $sqlError, FILE_APPEND);
                    }
                }

                mysqli_close($conecta);
                header('Location: ../service_galery_image.html');
            }
        }
    } else {
        //$upload = ftp_put($conn_id, $exif, $file, FTP_BINARY);// upload the file
        $upload = ftp_put($conn_id, $exif, $destination_file, FTP_BINARY); // upload the file
        $url = "http://52.67.24.232/secure/uploads/company-" . $cookie['companie_id'] . "/services/" . $_FILES['files']['name'];
        //$url = "http://192.168.1.41:8080/".$_FILES['files']['name'];
        if (!$upload) {// check upload status
            echo "ERROR 427 - ERRO AO SUBIR IMAGEM";
            header('Location: ../service_galery_image.html');
        }
    }
}
?>