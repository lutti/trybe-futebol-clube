export default class CustomAppError extends Error {
  public statusCode: number;
  public name = 'AppError';

  constructor(message: string, status: number) {
    super(message);
    this.statusCode = status;
  }
}
