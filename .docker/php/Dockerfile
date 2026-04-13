FROM php:8.2-fpm

WORKDIR /var/www/api

RUN apt-get update && apt-get install -y libpq-dev libgd-dev libfreetype6-dev libjpeg62-turbo-dev \
        libpng-dev libxml2-dev libxslt-dev libbz2-dev libzip-dev libonig-dev
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install -j$(nproc) gd sockets xml bz2 mbstring pdo_mysql xsl zip

RUN curl -L -o /usr/local/bin/composer https://getcomposer.org/download/latest-2.x/composer.phar && chmod +x /usr/local/bin/composer

# Dev stuff
ARG development="true"
ARG memory_limit
RUN if [ "$development" = "true" ]; then \
    echo 'display_errors=On' > /usr/local/etc/php/conf.d/dev.ini; \
    echo 'error_reporting=E_ALL' >> /usr/local/etc/php/conf.d/dev.ini; \
    echo "catch_workers_output = yes" >> /usr/local/etc/php-fpm.d/zz-dev.conf; \
    echo "memory_limit = ${memory_limit}M" >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini; \
    fi

# xdebug
RUN pecl install xdebug\
    docker-php-ext-enable xdebug 

COPY opcache.ini /etc/php-custom.d/opcache.ini

# CMD ["composer", "install"]
