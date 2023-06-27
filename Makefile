install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
  npm run test -- --coverage --coverageReporters=text-lcov | npx coveralls && cat ./coverage/lcov.info | npx codeclimate-test-reporter