#!/usr/bin/env bash

# Exit the script if any statement returns a non-true return value
set -e
if [ -n "$(ls /entrypoint.d)" ]; then
  for file in /entrypoint.d/*.sh
  do
    source "$file"
  done
fi

# first arg is `-f` or `--some-option`
#if [ "${1#-}" != "$1" ]; then
#  set -- php-fpm "$@"
#fi

exec "$@"
