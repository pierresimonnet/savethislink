DOCKER_COMPOSE=docker-compose

.DEFAULT_GOAL := help
help: ## list of available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help

## -- Docker 🐳  --
docker:	## start container
	$(DOCKER_COMPOSE) up -d

down: ## stop and remove container
	${DOCKER_COMPOSE} down

ps: ## container ps
	${DOCKER_COMPOSE} ps

## -- Database --
connect: ## Connect to the database
	docker exec -it shareintel_database_1 psql -U root main

migration: ## Create migration
	symfony console make:migration

migrate: ## Migrate
	symfony console doctrine:migrations:migrate

## -- Composer --
install:
	composer install

update:
	composer update

## -- Symfony --
go: ## Start symfony server
	symfony serve -d

stop: ## Stop symfony server
	symfony server:stop

cc: ## Clear cache
	bin/console cache:clear

## -- Webpack Encore --
watch: ## Recompile assets
	yarn encore dev --watch

##
live: docker go ## Start everything
	
kill: down stop ## Stop everything