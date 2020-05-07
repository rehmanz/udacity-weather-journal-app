.PHONY: clean build test

build:
	npm install

test:
	npm test

clean:
	rm -rf package-lock.json node_modules *.png

all: clean build test