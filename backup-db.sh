#!/bin/sh

set -x

DATE=`date +"%m_%d_%Y"`

FILE="${FILE:-backups/db_backup_$DATE.sql.gz}"

CONTAINER=`docker ps --format "{{.ID}}: {{.Image}}" | grep "mariadb" | cut -d: -f1`

echo "Backup database to $FILE"
docker exec eee9a630f581 sh -c 'exec mysqldump flink_ecosystem -uroot -p"$MYSQL_ROOT_PASSWORD"' | gzip > $FILE
