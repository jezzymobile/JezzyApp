<?php

// Inclui o arquivo class.phpmailer.php localizado na pasta phpmailer
require("../lib/phpmailer/PHPMailerAutoload.php");
  // Inicia a classe PHPMailer
$mail = new PHPMailer(true);
$email = $_POST['email'];
$linkboleto = $_POST['password'];

// Define os dados do servidor e tipo de conexão
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 $mail->IsSMTP(); // Define que a mensagem será SMTP
 $mail->Host = "pro.turbo-smtp.com"; // Endereço do servidor SMTP
 $mail->SMTPAuth = true; // Usa autenticação SMTP? (opcional)
 $mail->Username = 'contato@jezzy.com.br'; // Usuário do servidor SMTP
 $mail->Password = 'oo0MvB2Qw'; // Senha do servidor SMTP

 // Define o remetente
 // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 $mail->From = "contato@jezzy.com.br"; // Seu e-mail
 $mail->FromName = "Contato - Jezzy"; // Seu nome

 // Define os destinatário(s)
 // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

 $mail->AddAddress($email);
 //$mail->AddAddress('ciclano@site.net');
 //$mail->AddCC('ciclano@site.net', 'Ciclano'); // Copia
 //$mail->AddBCC('fulano@dominio.com.br', 'Fulano da Silva'); // Cópia Oculta

// Define os dados técnicos da Mensagem
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 $mail->IsHTML(true); // Define que o e-mail será enviado como HTML
 $mail->CharSet = 'utf-8'; // Charset da mensagem (opcional)

// Define a mensagem (Texto e Assunto)
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 $mail->Subject  = "Jezzy - Boleto Bancário"; // Assunto da mensagem
 $mail->Body = "O boleto referente ao seu pedido encontra-se no link: $linkboleto" . json_decode($linkboleto);
 $mail->AltBody = "Boleto Bancário". json_decode($linkboleto). "\r\n" ;

// Define os anexos (opcional)
 // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//$mail->AddAttachment("c:/temp/documento.pdf", "novo_nome.pdf");  // Insere um anexo
  // Envia o e-mail

 $enviado = $mail->Send();

// Limpa os destinatários e os anexos
 $mail->ClearAllRecipients();
$mail->ClearAttachments();
 // Exibe uma mensagem de resultado
 if ($enviado) {
   header("Location: ../boletoenviosuccess.html");
 } else {
   echo "Não foi possível enviar o e-mail.";
  echo "<b>Informações do erro:</b> " . $mail->ErrorInfo;
 }
