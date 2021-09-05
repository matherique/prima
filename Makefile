all: clean run

run:
	docker-compose --env-file .env up -d 

clean: 
	docker-compose down

log: 
	docker-compose logs 

generate:
	echo "generating schema.prisma file...."
	find ./**/*.prisma | grep -v schema.prisma | xargs cat > prisma/schema.prisma

