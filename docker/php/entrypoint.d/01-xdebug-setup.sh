#!/usr/bin/env bash

# Exit the script if any statement returns a non-true return value
set -e

if [ "x${XDEBUG_CLIENT_PORT}" != "x" ]; then
  sed -i -e "s/xdebug.client_port[ \t]*=[ \t]*\(.*\)$/xdebug.client_port = ${XDEBUG_CLIENT_PORT}/g" \
    /opt/bitnami/php/etc/conf.d/99-xdebug.ini
fi

if [ "x${XDEBUG_MODE}" != "x" ]; then
  sed -i -e "s/xdebug.mode[ \t]*=[ \t]*\(.*\)$/xdebug.mode = ${XDEBUG_MODE}/g" \
    /opt/bitnami/php/etc/conf.d/99-xdebug.ini
fi

if [ "x${XDEBUG_START_WITH_REQUEST}" != "x" ]; then
  sed -i -e "s/xdebug.start_with_request[ \t]*=[ \t]*\(.*\)$/xdebug.start_with_request = ${XDEBUG_START_WITH_REQUEST}/g" \
    /opt/bitnami/php/etc/conf.d/99-xdebug.ini
fi

if [ "x${XDEBUG_LOAD_MODULE}" != "x" ]; then
  # Setting XDEBUG_LOAD_MODULE=1 will enable xdebug
  case $XDEBUG_LOAD_MODULE in
    "0"|"off"|"Off"|"OFF"|"false"|"False"|"FALSE"|"no"|"No")
      sed -i -e "s/^zend_extension=xdebug.so$/;zend_extension=xdebug.so/g" \
        /opt/bitnami/php/etc/conf.d/99-xdebug.ini
      ;;
    *)
      sed -i -e "s/^;zend_extension=xdebug.so$/zend_extension=xdebug.so/g" \
        /opt/bitnami/php/etc/conf.d/99-xdebug.ini
      ;;
  esac
else
  sed -i -e "s/^zend_extension=xdebug.so$/;zend_extension=xdebug.so/g" \
    /opt/bitnami/php/etc/conf.d/99-xdebug.ini
fi

# Enable xdebug if XDEBUG_CLIENT_HOST is defined
if [ "x${XDEBUG_CLIENT_HOST}" != "x" ]; then
  if [ ${XDEBUG_CLIENT_HOST} == "auto" ]; then
    export XDEBUG_CLIENT_HOST=$(/sbin/ip route|awk '/default/ { print $3 }')
  fi

  sed -i -e "s/xdebug.client_host[ \t]*=[ \t]*\(.*\)$/xdebug.client_host = ${XDEBUG_CLIENT_HOST}/g" \
      /opt/bitnami/php/etc/conf.d/99-xdebug.ini
fi

if [ "x${XDEBUG_IDEKEY}" != "x" ]; then
  sed -i -e "s/xdebug.idekey[ \t]*=[ \t]*\(.*\)$/xdebug.idekey = ${XDEBUG_IDEKEY}/g" \
    /opt/bitnami/php/etc/conf.d/99-xdebug.ini
fi

