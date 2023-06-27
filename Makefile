install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm run test -- --coverage --coverageReporters=text-lcov && cat ./coverage/lcov.info | npx codeclimate-test-reporter