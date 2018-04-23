# Alexa Skill: My Bitcoin Balance <a href="https://travis-ci.org/lohanbodevan/alexa-my-bitcoin-balance"><img alt="Travis Status" src="https://travis-ci.org/lohanbodevan/alexa-my-bitcoin-balance.svg?branch=master"></a> [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/lohanbodevan/alexa-my-bitcoin-balance/blob/master/LICENSE)

Ask your Alexa Device for your bitcoin balance (Blink Trade).  
This is an AWS Lambda ready application triggered for an [Amazon Alexa Device](https://developer.amazon.com/alexa).

## Bitcoin trades available
* [Blink Trade](https://blinktrade.com/)

## Setup
### Create your Alexa skill
This repository do not cover the Alexa skill it self, just the code that is triggered from Alex skill.  
To know how to create an Alexa skill see [this](https://developer.amazon.com/docs/custom-skills/understanding-custom-skills.html).  
After create you skill save your `skill id`.

### Create Blink Trade API key and Secret.
There is some exchanges powered by Blink Trade. You should go to yours and generate your [API Key and secret](https://blinktrade.com/docs/#create-api-key).

### Configure your AWS credentials
You must configure your [credentials](http://docs.aws.amazon.com/cli/latest/topic/config-vars.html) to work with `serverless` framework.

## Deploy
```bash
sls deploy --blink_trade_key=<blink trade key> --blink_trade_secrete=<blink trade secrete> --currency_code=<currency code> --currency=<currency> --alexa_skill_id=<alexa skill id>
```

## TODO
* Implement other trades.
