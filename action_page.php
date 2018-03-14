<?php

if($_SERVER["REQUEST_METHOD"] === "POST") {

    if(!getenv("EMAIL_LABS_SECRET_KEY") || !getenv ( "EMAIL_LABS_SECRET_KEY" ) || !getenv ("EMAIL_LABS_SMTP")) {
        echo "Email Keys not defined"; die;
    }

    //Initialization of CURL library
    $curl = curl_init();
//Setting the address from which data will be collected
    $url = "https://api.emaillabs.net.pl/api/new_sendmail";

//Setting App Key
    $appkey = getenv ( "EMAIL_LABS_APP_KEY" );
//Setting Secret Key
    $secret = getenv ( "EMAIL_LABS_SECRET_KEY" );
    $smtp = getenv ( "EMAIL_LABS_SMTP" );

//Creating criteria of dispatch
    $data = array(
        "to" => array (
            "tesla369@gmail.com" => ""
        ),
        'smtp_account' => $smtp,
        'subject' => 'From Homepage:: '.$_POST["subject"], //Will swap if var exsits
        'html' => "First name: ".$_POST["firstname"]."<br>Email: ".$_POST["email"]."<br>Message: ".$_POST["textmessage"],
//        'txt' => 'you can also add TXT part',
        'from' => 'contact@simonlakauf.pl',
        'from_name' => 'Homepage'
    );

//Setting POST method
    curl_setopt($curl, CURLOPT_POST, 1);
//Transfer of data to POST
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
//Setting the authentication type
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_USERPWD , "$appkey:$secret");
//Transfer URL action
    curl_setopt($curl, CURLOPT_URL, $url);
//Settings of the return from the server
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

//Download results
    $result = curl_exec($curl);
    header('Content-Type: application/json');
    echo $result;


//    $res = mail('tesla369@gmail.com', 'Email from homepage '.$_POST["subject"], );

//    $r
//    es = mail('tesla369@gmail.com', 'Email from homepage '.$_POST["subject"], $_POST["firstname"]."\n".$_POST["email"]."\n".$_POST["textmessage"]);
//    var_dump($res, $to);
} else {
    http_response_code(405);
    echo "METHOD NOT ALLOWED";
}
