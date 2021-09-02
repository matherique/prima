all: clean run

run:
	docker-compose --env-file .env up -d 

clean: 
	docker-compose down

log: 
	docker-compose logs 

prisma generate:
	find ./**/*.prisma | grep -v schema.prisma | xargs cat > prisma/schema.prisma | npx prisma generate

prisma migrate:
	find ./**/*.prisma | grep -v schema.prisma | xargs cat > prisma/schema.prisma | npx prisma migrate dev --name $$name
