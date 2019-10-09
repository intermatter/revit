# Envelope
NPM package to enable cross-platform workflows with environment variables.

## Installation
````
npm -i @intermatter/envelope
````

## Usage
````
envelope ENVIRONMENT \"SCRIPT\"
````

ENVIRONMENT: `dev` (for .env.development) `prod` (for .env.production)

SCRIPT: Any npm-compatible or os-compatible script

##Example:
````
envelope dev \"npm run test\"
````