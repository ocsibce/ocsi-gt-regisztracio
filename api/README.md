# Helyi php fejlesztőkörnyezet Docker-rel

## Használat:

1. Regisztrálj a [Docker Hub](https://hub.docker.com/signup)-on
2. Telepítsd fel a Docker-t
   - macOS és Windows 10 Pro, Enterprise vagy Education [innen](https://hub.docker.com/?overlay=onboarding)
   - egyébként [innen](https://docs.docker.com/toolbox/overview/)
3. Változtasd meg a .mysql mappában az init_mysql.sql fájlt:
   - {felhasznalo}: a MySQL felhasználói neved
   - {jelszo}: a MySQL jelszavad
   - {adatbazis}: MySQL adatbázis neve
4. Nyiss egy terminált és menj bele ebbe a mappába (php_local_start)
5. Az indításhoz írd be, hogy `docker-compose up --build`, ezután ha CTRL-C-vel tudod leállítani

## PHP

a php fájlokat a src mappába hozd létre

a programodat a localhost:80-on tudod megnézni

ez mentés után rögtön frissülni fog

## MySQL

az adatbázishoz így tudsz kapcsolódni:

```php
    $host = 'database'; # ez fontos
    $username = 'a MySQL felhasználói neved'; # amit az init_mysql.sql-ben megadtál
    $password = 'a MySQL jelszavad'; # amit az init_mysql.sql-ben megadtál
    $dbname = 'MySQL adatbázis neve'; # amit az init_mysql.sql-ben megadtál

    $conn = new mysqli($host, $username, $password, $dbname);
```

elképzelhető, hogy a MySQL **nem indul el** azonnal,

ezt a legegyszerűbben úgy tudod megnézni, hogy:

1. ha a terminál ablakban látsz olyat, hogy: `portaltech_docker_database_1 exited with code 1`
2. vagy:
   - nyitsz egy másik terminált
   - beírod, hogy `docker containers ls`
   - ha ilyesmit látsz, akkor jó:
     CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | ...
     |---|---|---|---|---|---|
     |5b601ec8ac43|phpmyadmin/phpmyadmin|"/docker-entrypoint.…"|42 seconds ago|Up 40 seconds|...
     |7ee0976dfadd|portaltech_docker_database|"docker-entrypoint.s…"|43 seconds ago|Up 41 seconds|...
     |947a6097e59d|portaltech_docker_php|"docker-php-entrypoi…"|47 seconds ago|Up 42 seconds|...
   - ha hiányzik a sor, ahol az image: `portaltech_docker_database`
     - állítsd le az első terminál ablakot (CTRL-C)
     - futtasd le újra a `docker-compose up --build`-et

## phpMyAdmin

a phpMyAdmint a localhost:8080-on éred el

az init_mysql.sql-ben megadott felhasználónév, jelszóval tudsz belépni
