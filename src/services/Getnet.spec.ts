import '../utils/setupTests';
import test from 'ava';
import GetNetService from './Getnet';

test('Auth on Getnet', async (t) => {
  const { api } = await GetNetService.getInstance();
  t.not(api.headers['Authorization'], null);
  t.is(api.headers['Authorization'].includes('Bearer '), true);
});
