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

        public function readOne() {
            $query = "SELECT * FROM golyak WHERE id = 2 LIMIT 0,1";

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(1, $this->id);

            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->nev = $row['nev'];
            $this->email = $row['email'];
            $this->szak = $row['szak'];
            $this->telefonszam = $row['telefonszam'];
            $this->cim = $row['cim'];
            $this->nem = $row['nem'];
            $this->oktatasiAzonosito = $row['oktatasiAzonosito'];
            $this->szuletesiDatum = $row['szuletesiDatum'];
            $this->szuletesiHely = $row['szuletesiHely'];
            $this->poloMeret = $row['poloMeret'];
            $this->hetfo = $row['hetfo'];
            $this->kedd = $row['kedd'];
            $this->szerda = $row['szerda'];
            $this->csutortok = $row['csutortok'];
            $this->pentek = $row['pentek'];
            $this->anyjaNeve = $row['anyjaNeve'];
            $this->allergia = $row['allergia'];
            $this->etelerzekenyseg = $row['etelerzekenyseg'];
            $this->egyeb = $row['egyeb'];
            $this->regisztracioDatuma = $row['regisztracioDatuma'];
        }

        public function create() {

            $query = "INSERT INTO " . $this->table_name .
                " SET nev=:nev, email=:email, szak=:szak, telefonszam=:telefonszam," .
                " cim=:cim, nem=:nem, oktatasiAzonosito=:oktatasiAzonosito," .
                " szuletesiDatum=:szuletesiDatum, szuletesiHely=:szuletesiHely, poloMeret=:poloMeret," .
                " hetfo=:hetfo, kedd=:kedd, szerda=:szerda, csutortok=:csutortok, pentek=:pentek," .
                " anyjaNeve=:anyjaNeve, allergia=:allergia, etelerzekenyseg=:etelerzekenyseg," .
                " egyeb=:egyeb, regisztracioDatuma=:regisztracioDatuma;";

            $stmt = $this->conn->prepare($query);

            $this->$nev = htmlspecialchars(strip_tags($this->$nev));
            $this->$email = htmlspecialchars(strip_tags($this->$email));
            $this->$szak = htmlspecialchars(strip_tags($this->$szak));
            $this->$telefonszam = htmlspecialchars(strip_tags($this->$telefonszam));
            $this->$cim = htmlspecialchars(strip_tags($this->$cim));
            $this->$nem = htmlspecialchars(strip_tags($this->$nem));
            $this->$oktatasiAzonosito = htmlspecialchars(strip_tags($this->$oktatasiAzonosito));
            $this->$szuletesiDatum = htmlspecialchars(strip_tags($this->$szuletesiDatum));
            $this->$szuletesiHely = htmlspecialchars(strip_tags($this->$szuletesiHely));
            $this->$poloMeret = htmlspecialchars(strip_tags($this->$poloMeret));
            $this->$hetfo = htmlspecialchars(strip_tags($this->$hetfo));
            $this->$kedd = htmlspecialchars(strip_tags($this->$kedd));
            $this->$szerda = htmlspecialchars(strip_tags($this->$szerda));
            $this->$csutortok = htmlspecialchars(strip_tags($this->$csutortok));
            $this->$pentek = htmlspecialchars(strip_tags($this->$pentek));
            $this->$anyjaNeve = htmlspecialchars(strip_tags($this->$anyjaNeve));
            $this->$allergia = htmlspecialchars(strip_tags($this->$allergia));
            $this->$etelerzekenyseg = htmlspecialchars(strip_tags($this->$etelerzekenyseg));
            $this->$egyeb = htmlspecialchars(strip_tags($this->$egyeb));
            $this->$regisztracioDatuma = htmlspecialchars(strip_tags($this->$regisztracioDatuma));

            $stmt->bindParam(":nev", $this->nev);
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":szak", $this->szak);
            $stmt->bindParam(":telefonszam", $this->telefonszam);
            $stmt->bindParam(":cim", $this->cim);
            $stmt->bindParam(":nem", $this->nem);
            $stmt->bindParam(":oktatasiAzonosito", $this->oktatasiAzonosito);
            $stmt->bindParam(":szuletesiDatum", $this->szuletesiDatum);
            $stmt->bindParam(":szuletesiHely", $this->szuletesiHely);
            $stmt->bindParam(":poloMeret", $this->poloMeret);
            $stmt->bindParam(":hetfo", $this->hetfo);
            $stmt->bindParam(":kedd", $this->kedd);
            $stmt->bindParam(":szerda", $this->szerda);
            $stmt->bindParam(":csutortok", $this->csutortok);
            $stmt->bindParam(":pentek", $this->pentek);
            $stmt->bindParam(":anyjaNeve", $this->anyjaNeve);
            $stmt->bindParam(":allergia", $this->allergia);
            $stmt->bindParam(":etelerzekenyseg", $this->etelerzekenyseg);
            $stmt->bindParam(":egyeb", $this->egyeb);
            $stmt->bindParam(":regisztracioDatuma", $this->regisztracioDatuma);

            if($stmt->execute()){
                return 201;
            }

            if($stmt->errorInfo()[1] == 1062) {
                return 403;
            }

            return 500;
        }

        public function delete() {
            $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

            $stmt = $this->conn->prepare($query);

            $this->id = htmlspecialchars(strip_tags($this->id));

            $stmt->bindParam(1, $this->id);

            if($stmt->execute()) {
                return true;
            }

            return false;
        }

    }
?>