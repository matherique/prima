all: clean run

run:
	docker-compose --env-file .env up -d 

clean: 
	docker-compose down

log: 
	docker-compose logs 

generate:
	echo "generating schema.prisma file...."
	find src/. -name *.prisma | grep -v schema.prisma | xargs cat > src/infra/prisma/schema.prisma

