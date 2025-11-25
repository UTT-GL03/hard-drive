# This is a Justfile. It's a file that contains tasks.
# You can run `just --list` to see all the tasks in this file.

build:
    docker-compose build
run:
    docker-compose up

stop:
    docker-compose down

restart:
    docker-compose down && docker-compose up

clean:
    docker-compose down --rmi all --volumes --remove-orphans