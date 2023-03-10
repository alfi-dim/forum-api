const AddNewThread = require('../CreateNewThread');

describe('a addNewThread entities', () => {
  it('should throw error when payload not containt needed properties', () => {
    const payload = {
      title: 'test',
    };

    expect(() => new AddNewThread(payload)).toThrowError('CREATE_NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type speicification', () => {
    const payload = {
      title: [],
      body: {},
    };

    expect(() => new AddNewThread(payload)).toThrowError('CREATE_NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addNewThread object correctly', () => {
    const payload = {
      title: 'sebuah title thread',
      body: 'sebuah body thread',
    };

    const addNewThread = new AddNewThread(payload);
    const { title, body } = addNewThread;
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
  });
});
