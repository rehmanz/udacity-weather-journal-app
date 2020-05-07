.PHONY: clean build test deploy redeploy

build:
	npm install

test:
	npm test

deploy:
	node server/server.js > app.log 2>&1 &

redeploy:
	killall -9 node || true
	node server/server.js > app.log 2>&1 &

clean:
	killall -9 node || true
	rm -rf package-lock.json node_modules *.png

all: clean build deploy test