.PHONY: clean build test deploy redeploy

YELLOW=$(shell tput -Txterm setaf 3)
RESET=$(shell tput -Txterm sgr0)
VAULT_DEV_ROOT_TOKEN_ID=testenv
VAULT_DEV_LISTEN_ADDRESS=0.0.0.0:8200
VAULT_ADDR=http://0.0.0.0:8200
VAULT_LINUX_BIN=vault_1.4.1_linux_amd64.zip

define build_step
	@echo "${YELLOW}${1}${RESET}"
endef

build:
	$(call build_step, "Installing node packages")
	npm install
	
ifeq ($(shell uname -s), Linux)
	wget https://releases.hashicorp.com/vault/1.4.1/${VAULT_LINUX_BIN}
	unzip ${VAULT_LINUX_BIN}
	sudo mv vault /usr/local/bin && which vault
endif
	@echo "API Secret"
	@echo ${OPEN_WEATHER_MAP_API_KEY}

test:
	$(call build_step, "Running npm tests")
	npm test

	$(call build_step, "Testing Vault setup")
	VAULT_ADDR=${VAULT_ADDR} vault login ${VAULT_DEV_ROOT_TOKEN_ID}
	VAULT_ADDR=${VAULT_ADDR} vault kv put secret/hello foo=${OPEN_WEATHER_MAP_API_KEY}
	VAULT_ADDR=${VAULT_ADDR} vault kv get secret/hello

deploy:
	$(call build_step, "Deploying node server")
	node server/server.js > app.log 2>&1 &

	$(call build_step, "Deploying Vault container")
	docker run --cap-add=IPC_LOCK -d -p 8200:8200 -e 'VAULT_DEV_ROOT_TOKEN_ID=${VAULT_DEV_ROOT_TOKEN_ID}' -e 'VAULT_DEV_LISTEN_ADDRESS=${VAULT_DEV_LISTEN_ADDRESS}' vault

redeploy:
	killall -9 node || true
	node server/server.js > app.log 2>&1 &

clean:
	$(call build_step, "Cleaning up node")
	killall -9 node || true
	rm -rf package-lock.json node_modules *.png

	$(call build_step, "Removing containers")
	docker rm $$(docker ps -a -q) --force || true
	docker rmi $$(docker images -q) --force || true

all: clean build deploy test