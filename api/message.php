<?php
$output = array();

$db_path = "../messages/messages.json";
$db_dir = pathinfo($db_path, PATHINFO_DIRNAME);

if (!is_dir($db_dir)) mkdir($db_dir, 0777, true);
if (!is_file($db_path)) file_put_contents($db_path, json_encode([]));

$content = json_decode(file_get_contents($db_path), true);
if ($content === null) $content = [];


if (isset($_GET["delete"])) {
    $id = $_GET["delete"];
    $entry = $content[$id];
    if ($entry == null) {
        $output["error"] = "No such message!";
        $output["errorID"] = 5;
        $output["success"] = false;
    } else {
        $output["success"] = true;
        unset($content[$id]);
        $content = array_values($content);
    }
}

else {
    if (!isset($_POST["mail"])) {
        $output["error"] = "No mail!";
        $output["errorID"] = 1;
        $output["success"] = false;
        die(json_encode($output));
    }
    
    if (!isset($_POST["name"])) {
        $output["error"] = "No name!";
        $output["errorID"] = 2;
        $output["success"] = false;
        die(json_encode($output));
    }
    
    if (!isset($_POST["msg"])) {
        $output["error"] = "No message!";
        $output["errorID"] = 3;
        $output["success"] = false;
        die(json_encode($output));
    }
    
    $mail = filter_var($_POST["mail"], FILTER_SANITIZE_EMAIL);
    $name = htmlspecialchars($_POST["name"], ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($_POST["msg"], ENT_QUOTES, 'UTF-8');
    
    if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        $output["error"] = "Invalid email format!";
        $output["errorID"] = 4;
        $output["success"] = false;
        die(json_encode($output));
    }
    
    $output["success"] = true;
    date_default_timezone_set('Europe/Paris');
    
    $entry = array(
        "email"   => $mail,
        "name"    => $name,
        "message" => $message,
        "time"    => date("Y-m-d H:i:s")
    );
    
    array_push($content, $entry);
}

file_put_contents($db_path, json_encode($content, JSON_PRETTY_PRINT));

die(json_encode($output));