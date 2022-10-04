psalm:
	docker compose -f ./docker-compose.yml exec -T app vendor/bin/psalm --no-cache -c ./psalm.rulesets.xml
phpcs:
	docker compose -f ./docker-compose.yml exec -T app vendor/bin/phpcs --standard=./phpcs.rulesets.xml ./src/PhpCSSample.php
phpmd:
	docker compose -f ./docker-compose.yml exec -T app vendor/bin/phpmd ./src/PhpmdSample.php text ./phpmd.rulesets.xml

