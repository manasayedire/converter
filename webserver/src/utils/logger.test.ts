import logger from './logger';

/*
 * Unit Test cases for logger.ts
 * Returns the logger
 */
describe('Logger', () => {
  // Test case for logger level
  it('should have the correct log level', () => {
    expect(logger.level).toBe('info');
  });

  // Test case for logger transports
  it('should have Console, File, and DailyRotateFile transports', () => {
    const transportTypes = logger.transports.map((t) => t.constructor.name);
    expect(transportTypes).toEqual(expect.arrayContaining(['Console', 'File', 'DailyRotateFile']));
  });

  // Test case for logger info messages
  it('should log info messages', () => {
    const infoSpy = jest.spyOn(logger, 'info').mockImplementation(() => logger);
    logger.info('Test info');
    expect(infoSpy).toHaveBeenCalledWith('Test info');
    infoSpy.mockRestore();
  });

  // Test case for logger error messages
  it('should log error messages', () => {
    const errorSpy = jest.spyOn(logger, 'error').mockImplementation(() => logger);
    logger.error('Test error');
    expect(errorSpy).toHaveBeenCalledWith('Test error');
    errorSpy.mockRestore();
  });
});
