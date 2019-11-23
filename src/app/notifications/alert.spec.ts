import { Alert, AlertType } from './alert';

describe('Alert', () => {
  it('should create an instance', () => {
    expect(
      new Alert({ message: '', action: '', type: AlertType.Info })
    ).toBeTruthy();
  });
});
