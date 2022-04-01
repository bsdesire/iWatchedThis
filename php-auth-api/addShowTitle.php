<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

// DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

$title_id = $_POST["titleid"];
$user_id = $_POST["userid"];

if ($_SERVER["REQUEST_METHOD"] != "POST") :

    $returnData = msg(0, 404, 'Page Not Found!');

elseif (
    !isset($title_id)
    || !isset($user_id)
) :

    $fields = ['fields' => ['titleid', 'userid']];
    $returnData = msg(0, 422, 'Something is missing!', $fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else :


        try {
                $insert_query = "INSERT INTO `watched_shows`(`titleid`,`userid`) VALUES($title_id,$user_id)";

                $insert_stmt = $conn->prepare($insert_query);

                // DATA BINDING
                $insert_stmt->bindValue($title_id, htmlspecialchars(strip_tags($name)), PDO::PARAM_STR);
                $insert_stmt->bindValue($user_id, $email, PDO::PARAM_STR);

                $insert_stmt->execute();

                $returnData = msg(1, 201, 'You have successfully added a title.');
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
endif;

echo json_encode($returnData);