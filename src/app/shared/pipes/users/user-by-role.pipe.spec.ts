import { UserByRolePipe } from './user-by-role.pipe';

describe('UserByRolePipe', () => {
  it('create an instance', () => {
    const pipe = new UserByRolePipe();
    expect(pipe).toBeTruthy();
  });
});
