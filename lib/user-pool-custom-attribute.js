var AWS = require('aws-sdk');
var CfnLambda = require('cfn-lambda');

var cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

var toBoolean = function(obj, prop) {
  if (obj[prop] != undefined) obj[prop] = obj[prop] == "true";
}
var toInteger = function(obj, prop) {
  if (obj[prop] != undefined) obj[prop] = parseInt(obj[prop]);
}

var resolveParamsType = function(params) {
  toBoolean(params, "DeveloperOnlyAttribute");
  toBoolean(params, "Mutable");
  toBoolean(params, "Required");
  return params;
}

var Create = function(params, reply) {
  params = resolveParamsType(params);
  userPoolId = params.UserPoolId;
  delete params.UserPoolId;

  var p = {
    UserPoolId: userPoolId,
    CustomAttributes: [params]
  }
  cognito.addCustomAttributes(p, function(err, data) {
    if (err) {
      console.error(err);
      reply(err);
    } else  {
      reply(null, userPoolId + "_" + params.Name, {});
    }
  });
};

var Update = function(physicalId, params, oldParams, reply) {
  reply("You can't update a CustomAttribute");
};

var Delete = function(physicalId, params, reply) {
  reply(null, physicalId);
};

exports.Create = Create;
exports.Update = Update;
exports.Delete = Delete;
