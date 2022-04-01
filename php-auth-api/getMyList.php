<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

$user_id = $_GET["userid"];

if ($_SERVER["REQUEST_METHOD"] != "GET"):

    return;

elseif (
    !isset($user_id)
):

    return;

// IF THERE ARE NO EMPTY FIELDS THEN-
else:

    if ($_GET["type"] == "shows") {
        try {
            $statement = $conn->prepare("SELECT * FROM `watched_shows` WHERE `userid` = $user_id");
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            $json = json_encode($results);
            echo $json;
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    }
    if ($_GET["type"] == "movies") {
        try {
            $statement = $conn->prepare("SELECT * FROM `watched_movies` WHERE `userid` = $user_id");
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            $json = json_encode($results);
            echo $json;
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    }

endif;
