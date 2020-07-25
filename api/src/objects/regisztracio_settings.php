<?php
    class RegisztracioSettings {
        private $conn;
        private $table_name = 'settings';

        public $id;
        public $ev;
        public $nev;
        public $start_date;
        public $end_date;
        public $reszletek;
        public $reszletek_en;
        public $szakok;
        public $szakok_en;
        public $adatkezeles;
        public $adatkezeles_en;
        public $hazirend;
        public $hazirend_en;
        public $banner_link;
        public $eles;
        public $preview;
        public $created_at;
        public $updated;

        public function __construct($db) {
            $this->conn = $db;
        }

        public function read() {
            $query = "SELECT id, ev, nev, created_at, updated, eles, preview FROM " . $this->table_name . " ORDER BY created_at";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }

        function setValues($row) {
            $this->ev = $row['ev'];
            $this->nev = $row['nev'];
            $this->start_date = $row['start_date'];
            $this->end_date = $row['end_date'];
            $this->reszletek = $row['reszletek'];
            $this->reszletek_en = $row['reszletek_en'];
            $this->szakok = $row['szakok'];
            $this->szakok_en = $row['szakok_en'];
            $this->adatkezeles = $row['adatkezeles'];
            $this->adatkezeles_en = $row['adatkezeles_en'];
            $this->hazirend = $row['hazirend'];
            $this->hazirend_en = $row['hazirend_en'];
            $this->banner_link = $row['banner_link'];
            $this->eles = $row['eles'];
            $this->preview = $row['preview'];
            $this->created_at = $row['created_at'];
            $this->updated = $row['updated'];
        }

        public function readOne() {
            $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->id);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->setValues($row);
        }

        public function readEles() {
            $query = "SELECT * FROM " . $this->table_name . " WHERE eles = 1 LIMIT 0,1";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->setValues($row);
        }

        public function readPreview() {
            $query = "SELECT * FROM " . $this->table_name . " WHERE preview = 1 LIMIT 0,1";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->setValues($row);
        }

        public function create() {
            $query = "INSERT INTO " . $this->table_name . " SET ev=:ev, nev=:nev," .
                " start_date=:start_date, end_date=:end_date," .
                " reszletek=:reszletek," .
                " reszletek_en=:reszletek_en, szakok=:szakok, szakok_en=:szakok_en," .
                " adatkezeles=:adatkezeles, adatkezeles_en=:adatkezeles_en, hazirend=:hazirend," .
                " hazirend_en=:hazirend_en, banner_link=:banner_link, eles=:eles, preview=:preview";
            $stmt = $this->conn->prepare($query);
            $this->ev = htmlspecialchars(strip_tags($this->ev));
            $this->nev = htmlspecialchars(strip_tags($this->nev));
            $this->start_date = htmlspecialchars(strip_tags(date("Y-m-d H:i:s", $this->start_date)));
            $this->end_date = htmlspecialchars(strip_tags(date("Y-m-d H:i:s", $this->end_date)));
            $this->reszletek = $this->reszletek;
            $this->reszletek_en = $this->reszletek_en;
            $this->szakok = $this->szakok;
            $this->szakok_en = $this->szakok_en;
            $this->adatkezeles = $this->adatkezeles;
            $this->adatkezeles_en = $this->adatkezeles_en;
            $this->hazirend = $this->hazirend;
            $this->hazirend_en = $this->hazirend_en;
            $this->banner_link = htmlspecialchars(strip_tags($this->banner_link));
            $this->eles = htmlspecialchars(strip_tags($this->eles));
            $this->preview = htmlspecialchars(strip_tags($this->preview));

            $stmt->bindParam(':ev', $this->ev);
            $stmt->bindParam(':nev', $this->nev);
            $stmt->bindParam(':start_date', $this->start_date);
            $stmt->bindParam(':end_date', $this->end_date);
            $stmt->bindParam(':reszletek', json_encode($this->reszletek));
            $stmt->bindParam(':reszletek_en', json_encode($this->reszletek_en));
            $stmt->bindParam(':szakok', json_encode($this->szakok));
            $stmt->bindParam(':szakok_en', json_encode($this->szakok_en));
            $stmt->bindParam(':adatkezeles', json_encode($this->adatkezeles));
            $stmt->bindParam(':adatkezeles_en', json_encode($this->adatkezeles_en));
            $stmt->bindParam(':hazirend', json_encode($this->hazirend));
            $stmt->bindParam(':hazirend_en', json_encode($this->hazirend_en));
            $stmt->bindParam(':banner_link', $this->banner_link);
            $stmt->bindParam(':eles', $this->eles);
            $stmt->bindParam(':preview', $this->preview);

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

        public function update() {
            $query = "UPDATE " . $this->table_name . " SET " .
                " ev=:ev, nev=:nev," .
                " start_date=:start_date, end_date=:end_date, reszletek=:reszletek," .
                " reszletek_en=:reszletek_en, szakok=:szakok, szakok_en=:szakok_en," .
                " adatkezeles=:adatkezeles, adatkezeles_en=:adatkezeles_en, hazirend=:hazirend," .
                " hazirend_en=:hazirend_en, banner_link=:banner_link, eles=:eles, preview=:preview, updated=:updated" .
                " WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $this->ev = htmlspecialchars(strip_tags($this->ev));
            $this->nev = htmlspecialchars(strip_tags($this->nev));
            $this->start_date = htmlspecialchars(strip_tags(date("Y-m-d H:i:s", $this->start_date)));
            $this->end_date = htmlspecialchars(strip_tags(date("Y-m-d H:i:s", $this->end_date)));
            $this->reszletek = $this->reszletek;
            $this->reszletek_en = $this->reszletek_en;
            $this->szakok = $this->szakok;
            $this->szakok_en = $this->szakok_en;
            $this->adatkezeles = $this->adatkezeles;
            $this->adatkezeles_en = $this->adatkezeles_en;
            $this->hazirend = $this->hazirend;
            $this->hazirend_en = $this->hazirend_en;
            $this->banner_link = htmlspecialchars(strip_tags($this->banner_link));
            $this->eles = htmlspecialchars(strip_tags($this->eles));
            $this->preview = htmlspecialchars(strip_tags($this->preview));
            $this->id = htmlspecialchars(strip_tags($this->id));

            $stmt->bindParam(':ev', $this->ev);
            $stmt->bindParam(':nev', $this->nev);
            $stmt->bindParam(':start_date', $this->start_date);
            $stmt->bindParam(':end_date', $this->end_date);
            $stmt->bindParam(':reszletek', json_encode($this->reszletek));
            $stmt->bindParam(':reszletek_en', json_encode($this->reszletek_en));
            $stmt->bindParam(':szakok', json_encode($this->szakok));
            $stmt->bindParam(':szakok_en', json_encode($this->szakok_en));
            $stmt->bindParam(':adatkezeles', json_encode($this->adatkezeles));
            $stmt->bindParam(':adatkezeles_en', json_encode($this->adatkezeles_en));
            $stmt->bindParam(':hazirend', json_encode($this->hazirend));
            $stmt->bindParam(':hazirend_en', json_encode($this->hazirend_en));
            $stmt->bindParam(':banner_link', $this->banner_link);
            $stmt->bindParam(':eles', $this->eles);
            $stmt->bindParam(':preview', $this->preview);
            $stmt->bindParam(':updated', date("Y-m-d H:i:s", time()));
            $stmt->bindParam(':id', $this->id);

            if($stmt->execute()) {
                return true;
            }
            return false;
        }

        public function eles() {
            $query = 'UPDATE ' . $this->table_name . ' SET ' .
                " eles=:eles, updated='" . date("Y-m-d H:i:s", time()) . "' WHERE id=:id";
            $stmt = $this->conn->prepare($query);
            $this->eles = htmlspecialchars(strip_tags($this->eles));
            $this->id = htmlspecialchars(strip_tags($this->id));

            $stmt->bindParam(':eles', $this->eles);
            $stmt->bindParam(':id', $this->id);

            if($stmt->execute()) {
                $query = 'UPDATE ' . $this->table_name . ' SET ' .
                " eles=0 WHERE id<>:id";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':id', $this->id);
                $stmt->execute();
                print_r($stmt->errorInfo());
                print_r($stmt->debugDumpParams());
                return true;
            }
            return false;
        }

        public function preview() {
            $query = 'UPDATE ' . $this->table_name . ' SET ' .
                " preview=:preview, updated='" . date("Y-m-d H:i:s", time()) . "' WHERE id=:id";
            $stmt = $this->conn->prepare($query);
            $this->preview = htmlspecialchars(strip_tags($this->preview));
            $this->id = htmlspecialchars(strip_tags($this->id));

            $stmt->bindParam(':preview', $this->preview);
            $stmt->bindParam(':id', $this->id);

            if($stmt->execute()) {
                $query = 'UPDATE ' . $this->table_name . ' SET ' .
                    " preview=0 WHERE id<>:id";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':id', $this->id);
                $stmt->execute();
                return true;
            }
            return false;
        }
    }
?>