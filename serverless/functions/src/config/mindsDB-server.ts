import MindsDB from "mindsdb-js-sdk";

export async function connectMindsDB() {
  try {
    const user: string = process.env.MINDSDB_USER as string;
    const password: string = process.env.MINDSDB_PASSWORD as string;

    const res = await MindsDB.connect({
      user,
      password
    });

    // const query = `SELECT * FROM abuse_detection WHERE comment='I want to cry, because of your stupdity';`;

    // const queryResult = await MindsDB.SQL.runQuery(query);
    // console.log(queryResult.rows[0]?.sentiment_explain, isToxic);
  } catch (error) {
    // Failed to authenticate.
    console.log(error);
  }
}
