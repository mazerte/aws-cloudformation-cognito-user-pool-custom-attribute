var CfnLambda = require('cfn-lambda');
var AWS = require('aws-sdk');

var UserPoolCustomAttribute = require('./lib/user-pool-custom-attribute');

function CognitoUserPoolCustomAttributeHandler(event, context) {
  var CognitoUserPoolCustomAttribute = CfnLambda({
    Create: UserPoolCustomAttribute.Create,
    Update: UserPoolCustomAttribute.Update,
    Delete: UserPoolCustomAttribute.Delete,
    SchemaPath: [__dirname, 'src', 'schema.json']
  });
  // Not sure if there's a better way to do this...
  AWS.config.region = currentRegion(context);

  return CognitoUserPoolCustomAttribute(event, context);
}

function currentRegion(context) {
  return context.invokedFunctionArn.match(/^arn:aws:lambda:(\w+-\w+-\d+):/)[1];
}

exports.handler = CognitoUserPoolCustomAttributeHandler;
