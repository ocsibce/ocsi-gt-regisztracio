ALTER USER root IDENTIFIED WITH mysql_native_password BY 'jelszo';

CREATE USER '{felhasznalo}'@'%' IDENTIFIED WITH mysql_native_password BY '{jelszo}';
CREATE DATABASE {adatbazis};

GRANT ALL ON {adatbazis}.* TO '{felhasznalo}'@'%';
GRANT SELECT ON *.* TO '{felhasznalo}'@'%';