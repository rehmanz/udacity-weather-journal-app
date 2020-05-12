.PHONY: clean build test deploy redeploy

# Vault secrets storage service variables
VAULT_DEV_ROOT_TOKEN_ID=testenv
VAULT_DEV_LISTEN_ADDRESS=0.0.0.0:8200
VAULT_ADDR=http://0.0.0.0:8200
VAULT_LINUX_BIN_VERSION=1.4.1
VAULT_LINUX_BIN=vault_${VAULT_LINUX_BIN_VERSION}_linux_amd64.zip

# Colorful text variables and function
YELLOW=$(shell tput -Txterm setaf 3)
RESET=$(shell tput -Txterm sgr0)
define build_step
	@echo "\n${YELLOW}${1}${RESET}"
endef

build:
	$(call build_step,"Installing node packages")
	npm install
	
ifeq ($(shell uname -s), Linux)
	wget https://releases.hashicorp.com/vault/${VAULT_LINUX_BIN_VERSION}/${VAULT_LINUX_BIN}
	unzip ${VAULT_LINUX_BIN}
	sudo mv vault /usr/local/bin && which vault
endif

test:
	$(call build_step,"Testing Vault setup")
	VAULT_ADDR=${VAULT_ADDR} vault login ${VAULT_DEV_ROOT_TOKEN_ID}
	VAULT_ADDR=${VAULT_ADDR} vault kv put secret/hello foo=test
	VAULT_ADDR=${VAULT_ADDR} vault kv get secret/hello
	VAULT_ADDR=${VAULT_ADDR} vault kv delete secret/hello

	$(call build_step,"Deploy secrets")
	VAULT_ADDR=${VAULT_ADDR} vault kv put secret/openweathermap api_key=${OPEN_WEATHER_MAP_API_KEY}

	$(call build_step,"Running npm tests")
	npm test

deploy:
	$(call build_step,"Deploying Vault container")
	docker run --cap-add=IPC_LOCK -d -p 8200:8200 -e 'VAULT_DEV_ROOT_TOKEN_ID=${VAULT_DEV_ROOT_TOKEN_ID}' -e 'VAULT_DEV_LISTEN_ADDRESS=${VAULT_DEV_LISTEN_ADDRESS}' vault
	
	$(call build_step,"Deploying node server")
	node server/server.js > app.log 2>&1 &

redeploy:
	killall -9 node || true
	node server/server.js > app.log 2>&1 &

clean:
	$(call build_step,"Cleaning up node")
	killall -9 node || true
	rm -rf package-lock.json node_modules *.png

	$(call build_step,"Removing containers")
	docker rm $$(docker ps -a -q) --force || true
	docker rmi $$(docker images -q) --force || true

all: clean build deploy test