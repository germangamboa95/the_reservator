#!/bin/bash -e
wait_for_db() {
  local db_host="${DB_HOST:-mysql}"
  local db_port="${DB_PORT:-3306}"
  local db_address=$(getent hosts "$db_host" | awk '{ print $1 }')
  counter=0
  echo "Connecting to mysql at $db_address"
  while ! curl --silent "$db_address:$db_port" >/dev/null; do
    counter=$((counter+1))
    if [ $counter == 30 ]; then
      echo "Error: Couldn't connect to mysql."
      exit 1
    fi
    echo "Trying to connect to mysql at $db_address. Attempt $counter."
    sleep 5
  done
}

if [ "${1}" == "npm" -a "$2" == "start" ]; then
  wait_for_db
fi

exec "$@"
