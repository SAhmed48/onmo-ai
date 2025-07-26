const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.query = (params) => {
  return docClient.query(params).promise();
};

exports.put = async (table, item) => {
  await docClient.put({ TableName: table, Item: item }).promise();
};

exports.getByEmail = async (table, email) => {
  const data = await docClient
    .scan({
      TableName: table,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: { ":email": email },
    })
    .promise();
  return data.Items[0];
};

exports.scan = async (table) => {
  const data = await docClient.scan({ TableName: table }).promise();
  return data.Items;
};
