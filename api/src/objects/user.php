<?php
    require __DIR__ . '/../vendor/autoload.php';
    use \Firebase\JWT\JWT;
    class User {
        private $conn;
        private $table_name = "users";

        public $id;
        public $username;
        public $password;
        public $created;

        public function __construct($db) {
            $this->conn = $db;
        }

        public function read() {
            $query = "SELECT id, username, created FROM " . $this->table_name . " ORDER BY created";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }

        public function create() {
            $query = "INSERT INTO " . $this->table_name .
            " SET username=:username, password=:password";

            $stmt = $this->conn->prepare($query);

            $this->username = htmlspecialchars(strip_tags($this->username));
            $this->password = password_hash($this->password, PASSWORD_DEFAULT);

            $stmt->bindParam(":username", $this->username);
            $stmt->bindParam(":password", $this->password);

            if($stmt->execute()){
                return 201;
            }

            if($stmt->errorInfo()[1] == 1062) {
                return 403;
            }

            return 500;
        }

        public function login() {
            $query = "SELECT * FROM " . $this->table_name . " WHERE username = ? LIMIT 0,1";

            $stmt = $this->conn->prepare($query);

            $this->username = htmlspecialchars(strip_tags($this->username));

            $stmt->bindParam(1, $this->username);

            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (password_verify($this->password, $row["password"])) {
                return true;
            }

            return false;
        }

        public function createToken() {
            require '../config/secrets.php';

            $payload = array(
                "username" => $this->username,
                "iat" => time(),
                "nbf" => time() + 6,
            );

            return JWT::encode($payload, $key);
        }

        public static function validateToken($tokenString, $uName) {
            require '../config/secrets.php';

            try {
                $decoded = JWT::decode($tokenString, $key, array('HS256'));
            } catch (Exception $e) {
                return false;
            }
            if ($decoded->username != $uName) {
                return false;
            }
            return true;
        }


    }
?>