CREATE TABLE `adatbazis`.`golyak` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
    `nev` VARCHAR(256) NOT NULL ,
    `email` VARCHAR(256) NOT NULL ,
    `szak` VARCHAR(256) NOT NULL ,
    `telefonszam` VARCHAR(25) NOT NULL ,
    `cim` VARCHAR(256) NOT NULL ,
    `nem` BOOLEAN NOT NULL ,
    `oktatasiAzonosito` VARCHAR(20) NULL ,
    `szuletesiDatum` DATE NOT NULL ,
    `szuletesiHely` VARCHAR(128) NOT NULL ,
    `poloMeret` VARCHAR(6) NOT NULL ,
    `hetfo` BOOLEAN NOT NULL ,
    `kedd` BOOLEAN NOT NULL ,
    `szerda` BOOLEAN NOT NULL ,
    `csutortok` BOOLEAN NOT NULL ,
    `pentek` BOOLEAN NOT NULL ,
    `anyjaNeve` VARCHAR(256) NOT NULL ,
    `allergia` VARCHAR(512) NULL ,
    `etelerzekenyseg` VARCHAR(512) NULL ,
    `egyeb` VARCHAR(512) NULL ,
    `regisztracioDatuma` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY (`id`),
    UNIQUE `unique_email` (`email`)) ENGINE = InnoDB;

CREATE TABLE `adatbazis`.`settings` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
    `ev` INT UNSIGNED NOT NULL ,
    `nev` VARCHAR(255) CHARACTER SET utf32 COLLATE utf32_hungarian_ci NULL DEFAULT NULL ,
    `start_date` TIMESTAMP NOT NULL ,
    `end_date` TIMESTAMP NOT NULL ,
    `reszletek` JSON NOT NULL ,
    `reszletek_en` JSON NULL ,
    `szakok` JSON NOT NULL ,
    `szakok_en` JSON NULL ,
    `adatkezeles` JSON NOT NULL ,
    `adatkezeles_en` JSON NULL ,
    `hazirend` JSON NOT NULL ,
    `hazirend_en` JSON NULL ,
    `banner_link` VARCHAR(255) NULL ,
    `eles` BOOLEAN NOT NULL DEFAULT FALSE ,
    `preview` BOOLEAN NOT NULL DEFAULT FALSE ,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)) ENGINE = InnoDB;

INSERT INTO `golyak` (`id`, `nev`, `email`, `szak`, `telefonszam`, `cim`, `nem`,
    `oktatasiAzonosito`, `szuletesiDatum`, `szuletesiHely`, `poloMeret`,
    `hetfo`, `kedd`, `szerda`, `csutortok`, `pentek`, `anyjaNeve`, `allergia`,
    `etelerzekenyseg`, `egyeb`, `regisztracioDatuma`) VALUES (
        NULL, 'Kiss Pista', 'kiss.pista@gmail.com', 'HR', '45235363',
        '1111 Nagyvaros, Fő utca 25', '1', '563646364', '2020-04-05',
        'Nagyváros', 'XL', '1', '1', '1', '1', '1',
        'Kiss Istvánné', 'nincs', 'nincs', 'nincs', CURRENT_TIMESTAMP),
    (
        NULL, 'Nagy Lujza', 'nagy.lujza@gmail.com', 'Ginf', '5345902332',
        '1112 Kisváros, Petőfi utca 13', '0', '543634634', '2020-04-20',
        'Kisfalu', 'S', '1', '1', '1', '1', '0',
        'Nagy Erzsébet', NULL, NULL, NULL, CURRENT_TIMESTAMP)

INSERT INTO `settings` (
    `id`, `ev`, `nev`, `start_date`, `end_date`, `reszletek`,
    `reszletek_en`, `szakok`, `szakok_en`, `adatkezeles`, `adatkezeles_en`,
    `hazirend`, `hazirend_en`, `banner_link`, `eles`, `preview`,
    `created_at`, `updated`
    ) VALUES
    (
        NULL, '2000', 'Teszt', '2019-08-01 08:00:00', '2019-12-04 12:00:00',
        '{\"regisztracioMenete\": [\"Regisztrálj a lenti űrlapon\", \"Egy pár nap múlva küldünk egy e-mailt\"]}',
        '{\"regisztracioMenete\": \"Same in english\"}', '[{\"id\": \"ginf\", \"name\": \"Gazdinfo\", \"full\": false}]',
        '[{\"id\": \"ginf\", \"name\": \"Businesssinfo\", \"full\": false}]',
        '{\"GDPR\": \"Igen\"}', '{\"GDPR\": \"Yes\"}', '{\"Viselkedj jol\": true}', '{\"Be good\": true}',
        'https://i.picsum.photos/id/400/200/300.jpg?hmac=FD74WIE42b0qUFf-QggfWsoHPJqcGgjSatRvUM9dAws',
        '0', '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    );