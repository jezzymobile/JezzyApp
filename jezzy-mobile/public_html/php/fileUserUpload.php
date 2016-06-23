<?php
if(isset($_FILES['files'])) {
$ftp_server="ec2-52-67-24-232.sa-east-1.compute.amazonaws.com";
$ftp_user_name="jezzy-ftp";
$ftp_user_pass="JEZftp1000";
$file = "";//tobe uploaded

// set up basic connection
$conn_id = ftp_connect($ftp_server);

// login with username and password
$login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);


	$myFile = $_FILES['files'];
	$type = explode("/",$_FILES['files']['type']);
	$name = explode("@", $_POST['userinfoid']);
	$_FILES['files']['name'] = $name[0].".".$type[1];
	$destination_path = "uploads/jezzyUsers/";
	$destination_file = $destination_path.$_FILES['files']['name'];

	$file = $myFile['tmp_name'];
	$lista = ftp_nlist($conn_id,"uploads/jezzyUsers/");
	$value = $_FILES['files']['name'];
	$value2 = "uploads/jezzyUsers/".$_FILES['files']['name'];
	while ($lista != $value2) {
	   $variavel = $value2;


		$var = explode(".", $variavel);


		$fileremote =  "uploads/jezzyUsers/".$_FILES['files']['name'];
		$fileremote2 = explode(".", $fileremote);

		if($var[0] == $fileremote2[0]){

		ftp_delete ($conn_id,$destination_file);

		$upload = ftp_put($conn_id, $destination_file, $file, FTP_BINARY);
		// upload the file
			$url = "http://52.67.24.232/secure/uploads/jezzyUsers/".$_FILES['files']['name'];
			//$url = "http://192.168.1.41:8080/".$_FILES['files']['name'];


			if (!$upload) {// check upload status
				echo "ERROR 427 - ERRO AO SUBIR IMAGEM";
				header ('Location: ../my_profile.html');
			} else {

				 $conecta = mysqli_connect("lm1qivwncj3xprd.c2g7fyxoel3s.sa-east-1.rds.amazonaws.com", "jezdbadmin", "JEZdB1000", "jezzyapp_main") or print (mysql_error());

				$sql = "UPDATE users SET photo = '".$url."' WHERE id = ".$_POST['userinfoid'];

				$result = mysqli_query($conecta, $sql);

				  if($result) {
				   echo '{"success":"Success"}';
				  } else {
				   $sqlError= "Error writing to database";
				   //file_put_contents($sqlErrorLog, $sqlError, FILE_APPEND);

				   echo '{"Status":"Fail"}';
				  }

				mysqli_close($conecta);
				header ('Location: ../my_profile.html');

			}
			  }else{


	$upload = ftp_put($conn_id, $destination_file, $file, FTP_BINARY);// upload the file
	$url = "http://52.67.24.232/secure/uploads/jezzyUsers/".$_FILES['files']['name'];
	//$url = "http://192.168.1.41:8080/".$_FILES['files']['name'];
	if (!$upload) {// check upload status
		echo "ERROR 427 - ERRO AO SUBIR IMAGEM";
			header ('Location: ../my_profile.html');
	} else {

		 $conecta = mysqli_connect("lm1qivwncj3xprd.c2g7fyxoel3s.sa-east-1.rds.amazonaws.com", "jezdbadmin", "JEZdB1000", "jezzyapp_main") or print (mysql_error());

		$sql = "UPDATE users SET photo = '".$url."' WHERE id = ".$_POST['userinfoid'];
		echo $sql;
		$result = mysqli_query($conecta, $sql);

		  if($result) {
		   echo '{"success":"Success"}';
		  } else {
		   $sqlError= "Error writing to database";
		   //file_put_contents($sqlErrorLog, $sqlError, FILE_APPEND);

		   echo '{"Status":"Fail"}';
		  }

		mysqli_close($conecta);
		header ('Location: ../my_profile.html');

	}
	  }
}
	  }

?>