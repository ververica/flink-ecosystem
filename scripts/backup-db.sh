#!/bin/sh
# The script for making backups of a database
# of a website.
#
# Please create the folder /var/opt/backups
# for storing backups of the database.
set -x

DATE=`date +"%m_%d_%Y"`
#DIR=`dirname "$(readlink -f "$0")"`
DIR="/var/opt"
FILE="${FILE:-$DIR/backups/db_backup_$DATE.sql.gz}"
CONTAINER=`docker ps --format "{{.ID}}: {{.Image}}" | grep "mariadb" | cut -d: -f1`

echo "Backup database to file '$FILE' from container '$CONTAINER'"
docker exec $CONTAINER sh -c 'exec mysqldump flink_ecosystem -uroot -p"$MYSQL_ROOT_PASSWORD"' | gzip > $FILE
