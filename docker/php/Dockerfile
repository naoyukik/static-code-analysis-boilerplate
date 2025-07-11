FROM bitnami/php-fpm:8.4.10 as base_php
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

# timezone environment
ENV TZ=UTC \
  # locale
  LANG=en_US.UTF-8 \
  LANGUAGE=en_US:en \
  LC_ALL=en_US.UTF-8 \
  # composer environment
  COMPOSER_ALLOW_SUPERUSER=1 \
  COMPOSER_HOME=/composer

COPY --from=composer:2.8.9 /usr/bin/composer /usr/bin/composer
COPY docker/php/entrypoint.sh /entrypoint.sh

RUN apt-get update \
    && apt-get -y install git libicu-dev libonig-dev libzip-dev unzip locales libcurl4-openssl-dev \
    && apt-get clean
RUN rm -rf /var/lib/apt/lists/*
RUN locale-gen en_US.UTF-8
RUN localedef -f UTF-8 -i en_US en_US.UTF-8
RUN mkdir /var/run/php-fpm
RUN composer config -g process-timeout 3600
RUN mkdir /entrypoint.d
RUN chmod 755 /entrypoint.d
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["php-fpm", "-F", "--pid", "/opt/bitnami/php/tmp/php-fpm.pid", "-y", "/opt/bitnami/php/etc/php-fpm.conf"]

WORKDIR /app

FROM base_php as composer_install

ADD composer.json /app/composer.json
RUN composer install
RUN cp /app/composer.json /tmp/composer.json
RUN cp /app/composer.lock /tmp/composer.lock

FROM base_php as build_xdebug
RUN apt-get update \
    && apt-get -y install build-essential autoconf  \
    && apt-get clean
RUN pecl install xdebug pcov

FROM composer_install as with_xdebug
COPY --from=build_xdebug /opt/bitnami/php/lib/php/extensions/xdebug.so /opt/bitnami/php/lib/php/extensions/xdebug.so
COPY --from=build_xdebug /opt/bitnami/php/lib/php/extensions/pcov.so /opt/bitnami/php/lib/php/extensions/pcov.so
COPY docker/php/conf.d/xdebug.ini /opt/bitnami/php/etc/conf.d/99-xdebug.ini
COPY docker/php/entrypoint.d/01-xdebug-setup.sh /entrypoint.d/01-xdebug-setup.sh
RUN chmod +x /entrypoint.d/01-xdebug-setup.sh
