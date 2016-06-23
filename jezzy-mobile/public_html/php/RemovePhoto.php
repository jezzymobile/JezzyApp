<?php

$conecta = mysqli_connect("lm1qivwncj3xprd.c2g7fyxoel3s.sa-east-1.rds.amazonaws.com", "jezdbadmin", "JEZdB1000", "jezzyapp_main") or print (mysql_error());
$var1 =  $_POST['filename'];

$schedule = explode("-",  $var1);
$idschedule = $schedule[1];

$var5 = explode("/", $schedule[1]);
$pos = strpos($idschedule, ".png");
if($pos === false){
$var2 = explode(".jpeg",$idschedule);
}else{
$var2 = explode(".png",$idschedule);
}
$var3 = $schedule[0];
$pos = strpos($schedule[2], ".png");
if($pos === false){
$var4 = explode(".jpeg",$schedule[2]);
}else{
$var4 = explode(".png",$schedule[2]);
}
$sql = "UPDATE services_photos SET status = 'INACTIVE' WHERE  photo = '".$var1."' and schedule_id = ".$var4[0]." and idphoto = ".$var5[2]." and status='ACTIVE'";

$result = mysqli_query($conecta, $sql);
if($result) {
echo '{"success":"Success"}';
header ('Location: ../service_galery_image.html');
echo "<meta HTTP-EQUIV='refresh' CONTENT='5;URL=../service_galery_image.html'>";
} else {
$sqlError= "Error writing to database";
echo '{"Status":"Fail"}';
}
?>