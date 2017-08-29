include ./src/settings/settings.sh
default: build

build:
	docker run --rm -v $(PWD)/src:/src -w /src --name gobuild $(BUILDIMAGE) ash build.sh
	sudo chown -R -v $(USER) ./src/out

upload:
  	bash createDockerfile.sh
	docker build --no-cache -t alpap/$(NAME):$(VERSION) .
	docker push alpap/$(NAME):$(VERSION)

test:
	docker run --name $(NAME) -dit -p $(PORT) alpap/$(NAME):$(VERSION)
	bash $(TESTCOMMAND)
	docker kill $(NAME)
