export const formatJSONResponse = (response: Record<string, unknown>, statusCode: number = 200) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*'
    },
  }
}
