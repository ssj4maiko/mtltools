FROM php:7.4-fpm

RUN apt-get update && apt-get install -y libpq-dev libgd-dev libfreetype6-dev libjpeg62-turbo-dev \
        libpng-dev libxml2-dev libxslt-dev libbz2-dev libzip-dev libonig-dev
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install -j$(nproc) gd sockets xml bz2 json mbstring pdo_mysql xmlrpc xsl zip

RUN curl -L -o /usr/local/bin/composer https://getcomposer.org/composer.phar && chmod +x /usr/local/bin/composer

# Dev stuff
ARG development
RUN if [ "$development" = "true" ]; then \
    echo 'display_errors=On' > /usr/local/etc/php/conf.d/dev.ini; \
    echo 'error_reporting=E_ALL' >> /usr/local/etc/php/conf.d/dev.ini; \
    pecl install xdebug && docker-php-ext-enable xdebug; \
    echo "catch_workers_output = yes" >> /usr/local/etc/php-fpm.d/zz-dev.conf; \
    fi

COPY opcache.ini /etc/php-custom.d/opcache.ini
