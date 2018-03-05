<?php

        $from;$to;$captcha;
        if(isset($_POST['from'])){
          $from=$_POST['from'];
        }

        if(isset($_POST['to'])){
          $to=$_POST['to'];
        }

        if(isset($_POST['g-recaptcha-response'])){
          $captcha=$_POST['g-recaptcha-response'];
        }

        if(!$captcha){
          echo '<h2>Please check the the captcha form.</h2>';
          exit;
        }
	$secretKey = "SECRET_KEY_HERE";
	$ip = $_SERVER['REMOTE_ADDR'];
    $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
	$responseKeys = json_decode($response,true);
        if(intval($responseKeys["success"]) !== 1) {
          echo '<h2>You are spammer!</h2>';
        } else {
          echo $response."<h2>Your Cheapest fares are.....<h2>";

        }
?>