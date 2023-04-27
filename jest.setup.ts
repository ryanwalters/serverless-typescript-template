jest.mock('@middy/core', () => {
  return (handler) => {
    return {
      use: jest.fn().mockReturnValue(handler), // ...use(ssm()) will return handler function
    };
  };
});
