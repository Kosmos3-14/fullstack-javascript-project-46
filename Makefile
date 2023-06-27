install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm run test -- --coverage --coverageReporters=text-lcov && mv ./coverage/lcov.info ./lcov.info && npx codeclimate-test-reporter < ./lcov.info