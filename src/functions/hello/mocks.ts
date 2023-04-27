import { APIGatewayProxyEvent } from 'aws-lambda';

export const mockEvent: Pick<APIGatewayProxyEvent, 'body' | 'headers'> = {
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Frederic',
  }),
};
