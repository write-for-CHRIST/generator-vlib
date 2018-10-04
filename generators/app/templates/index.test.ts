import helloWorld from '../';

describe('index', () => {
  it('return Hello World string', () => {
    expect(helloWorld()).toEqual('Hello World');
  })
})
