FROM php:8.2-fpm

# set your user name, ex: user=bernardo
ARG user=developer
ARG uid=1000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    libpq-dev \ 
    && docker-php-ext-install zip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd sockets \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo_pgsql

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Configure Xdebug
RUN echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.log=/var/www/xdebug.log" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini


# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Install redis
RUN pecl install -o -f redis \
    &&  rm -rf /tmp/pear \
    &&  docker-php-ext-enable redis

# Set working directory
WORKDIR /var/www

COPY .env.example .env

# Copy custom configurations PHP
COPY docker/php/custom.ini /usr/local/etc/php/conf.d/custom.ini

# Configurar variáveis de ambiente no arquivo .env
RUN echo "DB_CONNECTION=mysql" > .env \
    && echo "DB_HOST=db" >> .env \
    && echo "DB_PORT=3306" >> .env \
    && echo "DB_DATABASE=banking" >> .env \
    && echo "DB_USERNAME=root" >> .env \
    && echo "DB_PASSWORD=root" >> .env

COPY composer.json composer.lock /var/www/

COPY . /var/www/
# Create the SQLite database file
RUN touch /var/www/database/database.sqlite && \
    chown -R $user:$user /var/www/database/database.sqlite

USER root

ENV XDEBUG_MODE=coverage

RUN mkdir -p /var/www/coverage && \
    chown -R $user:$user /var/www/coverage && \
    chmod -R 755 /var/www/coverage

USER $user