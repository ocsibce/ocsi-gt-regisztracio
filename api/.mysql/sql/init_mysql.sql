ALTER USER root IDENTIFIED WITH mysql_native_password BY 'jelszo';

CREATE USER 'bceocsi'@'%' IDENTIFIED WITH mysql_native_password BY 'ocsi_jelszo';
CREATE DATABASE regisztracioDb;

GRANT ALL ON regisztracioDb.* TO 'bceocsi'@'%';
GRANT SELECT ON *.* TO 'bceocsi'@'%';