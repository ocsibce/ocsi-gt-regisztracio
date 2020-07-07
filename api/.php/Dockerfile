FROM php:apache

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

RUN docker-php-ext-install pdo pdo_mysql

RUN docker-php-ext-enable pdo pdo_mysql
