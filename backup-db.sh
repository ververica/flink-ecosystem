#!/bin/sh

set -x

DATE=`date +"%m_%d_%Y"`

DIR=`dirname "$(readlink -f "$0")"`

FILE="${FILE:-$DIR/backups/db_backup_$DATE.sql.gz}"

CONTAINER=`docker ps --format "{{.ID}}: {{.Image}}" | grep "mariadb" | cut -d: -f1`

echo "Backup database to file '$FILE' from container '$CONTAINER'"
docker exec $CONTAINER sh -c 'exec mysqldump flink_ecosystem -uroot -p"$MYSQL_ROOT_PASSWORD"' | gzip > $FILE
