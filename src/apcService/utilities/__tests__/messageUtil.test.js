const { natsMessageHandler } = require('../messageUtil');

describe('Module messageUtil', () => {
  const fakeFactor = 0.5;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Method natsMessageHandler for fail (no cache)', async () => {
    global.cache = false;

    natsMessageHandler(
      JSON.stringify({
        type: 'FACTOR_THICKNESS',
        factor: fakeFactor,
      })
    );

    expect(global.cache === false);
  });
  
  it('Method natsMessageHandler for success (THICKNESS)', async () => {
    global.cache = {
      set: jest.fn().mockReturnValueOnce(true),
    };

    natsMessageHandler(
      JSON.stringify({
        type: 'FACTOR_THICKNESS',
        factor: fakeFactor,
      })
    );

    expect(global.cache.set).toHaveBeenCalledWith('FACTOR_THICKNESS', fakeFactor);
  });

  it('Method natsMessageHandler for success(MOISTURE)', async () => {
    global.cache = {
      set: jest.fn().mockReturnValueOnce(true),
    };

    natsMessageHandler(
      JSON.stringify({
        type: 'FACTOR_MOISTURE',
        factor: fakeFactor,
      })
    );

    expect(global.cache.set).toHaveBeenCalledWith('FACTOR_MOISTURE', fakeFactor);
  });

  it('Method natsMessageHandler for failed', async () => {
    global.cache = {
      set: jest.fn().mockReturnValueOnce(true),
    };

    natsMessageHandler(
      JSON.stringify({
        type: 'FAKE_TYPE',
        factor: fakeFactor,
      })
    );

    expect(global.cache.set).toBeCalledTimes(0);
  });
});
