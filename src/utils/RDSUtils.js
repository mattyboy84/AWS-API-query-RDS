const { RDSData } = require("@aws-sdk/client-rds-data");


async function executeStatement(params) {
  const {
  resourceArn,
  secretArn,
  database,
  sql,
  region = 'eu-west-2'
  } = params;

  console.log(`received params: ${JSON.stringify(params, null, 4)}`);
  const rds = new RDSData({ region: region });

  console.log('executing query');
  let result = await rds.executeStatement({
    resourceArn,
    secretArn,
    database,
    sql,
    includeResultMetadata: true,
    formatRecordsAs: 'JSON'
  });
  console.log(JSON.stringify(result, null, 4));
  return result.formattedRecords;
}

module.exports = {
  executeStatement,
}