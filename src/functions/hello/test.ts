import { main as hello } from './handler';
import { mockEvent } from './mocks';

describe('hello', () => {
  test('should return 200', async () => {
    // @ts-ignore
    const { statusCode } = await hello(mockEvent, {}, null);

    expect(statusCode).toEqual(200);
  });
});
