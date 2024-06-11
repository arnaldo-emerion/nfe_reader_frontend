"use strict";

const aws = require("aws-sdk");

const sqs = new aws.SQS({ apiVersion: "2012-11-05" });
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  return await new Promise((resolve, reject) => {
    const fileName = event.Records[0].s3.object.key;

    const params = {
      DelaySeconds: 10,
      MessageAttributes: {},
      MessageBody: fileName,
      QueueUrl:
        "https://sqs.us-east-1.amazonaws.com/492510987777/nfeReaderQueue",
    };

    sqs.sendMessage(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
