<?php
    class Database {
        private $host = "localhost";
        private $db_name = "regisztracioDb";
        private $db_username = "bceocsi";
        private $db_password = "ocsi_jelszo";
        public $conn;

        public function getConnection() {
            $this->conn = null;

            try {
                $this->conn = new mysqli($this->$host,
                    $this->$db_username,
                    $this->$db_password,
                    $this->$db_name);
                $this->conn->exec("set names utf8");
            } catch (Exception $e) {
                echo "Connection error: " . $e->getMessage();
            }

            return $this->conn;
        }
    }
?>