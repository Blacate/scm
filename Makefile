help:
	@echo 'make patch: add 0.0.1'
	@echo 'make minor: add 0.1.0'
	@echo 'make major: add 1.0.0'

checkclean:
	@status=$$(git status --porcelain); \
	if test "x$${status}" = x; then \
		echo Working directory is clean; \
	else \
		echo Working directory is dirty >&2; \
		exit 1; \
	fi

patch: checkclean
	git pull
	yarn install
	yarn build
	npm version patch
	git push
	npm publish

minor: checkclean
	git pull
	yarn install
	yarn build
	npm version minor
	git push
	npm publish

major: checkclean
	git pull
	yarn install
	yarn build
	npm version major
	git push
	npm publish