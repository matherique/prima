all: clean run

run:
	docker-compose --env-file .env up -d 

clean: 
	docker-compose down

log: 
	docker-compose logs 
