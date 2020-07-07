<?php
    class Golya {
        // database
        private $conn;
        private $table_name = "golyak";

        // object properties
        public $id;
        public $nev;
        public $email;
        public $szak;
        public $telefonszam;
        public $cim;
        public $nem;
        public $oktatasiAzonosito;
        public $szuletesiDatum;
        public $szuletesiHely;
        public $poloMeret;
        public $hetfo;
        public $kedd;
        public $szerda;
        public $csutortok;
        public $pentek;
        public $anyjaNeve;
        public $allergia;
        public $etelerzekenyseg;
        public $egyeb;
        public $regisztracioDatuma;

        // constructor
        public function __construct($db) {
            $this->conn = $db;
        }

        public function read() {

            // select all query
            $query = "SELECT * FROM " . $this->table_name . " ORDER BY regisztracioDatuma";

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // execute query
            $stmt->execute();

            return $stmt;
        }

    }
?>