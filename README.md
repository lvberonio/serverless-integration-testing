# Serverless-Integration-Testing
Integration testing with Jest using supertest

**Included Resources:**

- Jest test

**NOTE:** This is an integration test file. This needs to be setup depending on your endpoints. This project does not run alone. 

## Quick Start

### Prerequisites 

Install Serverless Framework

```bash
`npm install -g serverless`
```

Create Serverless project

```bash
$ sls create --template-url https://github.com/mosufy/serverless-templates/tree/master/api-sqs --path my-service
$ cd my-service
```

Install dependencies

```bash
$ yarn install
```

Start local

```bash
$ yarn start
```

## Directory Structure

```
└── tests
    └── integration.spec.js
```

**tests/**  
All test files to be written here.