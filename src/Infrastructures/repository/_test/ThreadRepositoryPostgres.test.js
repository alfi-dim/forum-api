const ThreadrepositoryPostgres = require('../ThreadRepositoryPostgres');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const pool = require('../../database/postgres/pool');
const CreateNewThread = require('../../../Domains/threads/entities/CreateNewThread');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

describe('ThreadRepository postgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({ id: 'user-123' });
  });
  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addNewThread function', () => {
    it('should persist add new thread and return created thread correctly', async () => {
      const createNewThread = new CreateNewThread({
        title: 'sebuah title thread',
        body: 'sebuah body thread',
      });

      const fakeIdGenerator = () => '123';
      const ownerThread = 'user-123';
      const threadRepositoryPostgres = new ThreadrepositoryPostgres(pool, fakeIdGenerator);

      await threadRepositoryPostgres.addThread(createNewThread, ownerThread);

      const thread = await ThreadTableTestHelper.getThreadById('thread-123');
      expect(thread).toHaveLength(1);
    });
  });
});
