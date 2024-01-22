##
# Makefile to help manage Docker Compose services
#
APPLICATION_NAME ?= flink-packages
DOCKER_IMAGES_LIST := $(shell docker images --filter "label=PROJECT=flink-packages" --filter "dangling=false" --format "{{.Repository}}:{{.Tag}}")

mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir := $(notdir $(patsubst %/,%,$(dir $(mkfile_path))))

define get_ip_address
		docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${1}
endef

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help build up start down destroy stop restart logs logs-app ps login-db login-app db-shell run clean prepare

help: 				## This help.
		@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

build:				## Build Docker images
		docker compose -f docker-compose.yml build

up:						## Run Docker containers
		docker compose -f docker-compose.yml up -d $(c)
		@echo "Server IP address: $$($(call get_ip_address,flink-packages-server))"
		@echo "Database IP address: $$($(call get_ip_address,mariadb-server))"

start:				## Start Docker containers
		docker compose -f docker-compose.yml start $(c)
		@echo "Server IP address: $$($(call get_ip_address,flink-packages-server))"
		@echo "Database IP address: $$($(call get_ip_address,mariadb-server))"

down:					## Stop and destroy Docker containers
		docker compose -f docker-compose.yml down $(c)

destroy:			## Destroy Docker images and volumes
		docker compose -f docker-compose.yml down -v $(c)

stop:					## Stop Docker containers
		docker compose -f docker-compose.yml stop $(c)

restart:	stop up ## Restart Docker containers

logs-db:			## View logs of running Docker containers
		docker compose -f docker-compose.yml logs --tail=100 -f database

logs-server:	## View logs of Docker container with app
		docker compose -f docker-compose.yml logs --tail=100 -f server

ps:						## View the list of running Docker containers
		docker compose -f docker-compose.yml ps

login-db:			## Log in to running Docker container with database
		docker compose -f docker-compose.yml exec database /bin/bash

login-server:	## Log in to running Docker container with app
		docker compose -f docker-compose.yml exec server /bin/bash

db-shell: 		## Get access to database shell
		docker compose -f docker-compose.yml exec database mysql flink_ecosystem -uroot

run:			stop build up ## Run Local environment

clean: 				## Delete docker images
		@if [ -n "${DOCKER_IMAGES_LIST}" ]; then \
				docker rmi ${DOCKER_IMAGES_LIST}; \
				docker image prune --filter "label=PROJECT=flink-packages" --all --force; \
		fi

prepare:			## Prepare local environment for development
		@docker network create flink

prod-build:			## Build backend and frontend for PROD
		docker compose -f docker-compose-prod.yml build

prod-server-up:	## Deploy backend to the production
		docker compose -f docker-compose-prod.yml up -d $(c)
		@echo "Server IP address: $$($(call get_ip_address,flink-packages-server))"
		@echo "Database IP address: $$($(call get_ip_address,mariadb-server))"

prod-front-up:	## Deploy frontend to Nginx
		@TEMP_FOLDER=$(mktemp -d)
		@docker cp -a flink-packages-server:/app/build/ ${TEMP_FOLDER}/
		@sudo cp -a ${TEMP_FOLDER}/build/* /var/www/html/

prod-ps:				## View the list of running Docker containers in PROD
		docker compose -f docker-compose-prod.yml ps