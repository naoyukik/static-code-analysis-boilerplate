psalm:
	docker compose -f ./docker-compose.yml exec -T app vendor/bin/psalm --no-cache -c ./psalm.xml
phpcs:
	docker compose -f ./docker-compose.yml exec -T app vendor/bin/phpcs --standard=./phpcs.rulesets.xml ./src/PhpSample.php
phpmd:
	docker compose -f ./docker-compose.yml exec -T app vendor/bin/phpmd ./src/PhpSample.php text ./phpmd.rulesets.xml
