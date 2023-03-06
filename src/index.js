const {
  DATABASE_NAME,
  DATABASE_ARN,
  DATABASE_SECRET,
} = require('./utils/config');

const { JSONresponse } = require('./utils/Response');

const {
  executeStatement
} = require('./utils/RDSUtils');

async function handler(event, context) {
  try {
    const { customerId } = event.pathParameters;
    console.log(event);
    console.log(DATABASE_NAME);
    console.log(DATABASE_ARN);
    console.log(DATABASE_SECRET);

    const query = `SELECT * FROM Customers WHERE CustomerId='${customerId}'`
    console.log(query);

    let result = JSON.parse(await executeStatement({
      database: DATABASE_NAME,
      resourceArn: DATABASE_ARN,
      secretArn: DATABASE_SECRET,
      sql: query
    }));
    console.log(JSON.stringify(result, null, 4));

    const response = await JSONresponse(
      200,
      { 'Content-Type': 'application/json' },
      result,
    );
    console.log(`response: ${JSON.stringify(response, null, 4)}`);

    return response;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  handler,
}