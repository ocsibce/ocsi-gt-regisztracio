<?php
    class User {
        private $conn;
        private $table_name = "user";

        public $id;
        public $username;
        public $password;
        public $created;

        public function __construct($db) {
            $this->conn = $db;
        }

        public function read() {

        }

        public function create() {
            $query = "INSERT INTO " . $this->table_name .
            " SET username=:username, password=:password";

            $stmt = $this->conn->prepare($query);

            $this->username = htmlspecialchars(strip_tags($this->username));
            $this->password = password_hash($this->password);

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

            if (password_verify($this->password, $row["passowrd"])) {
                return true;
            }

            return false;
        }


    }
?>