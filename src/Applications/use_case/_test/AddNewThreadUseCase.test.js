/* istanbul ignore file */

const CreatedThread = require('../../../Domains/threads/entities/CreatedThread');
const CreateNewThread = require('../../../Domains/threads/entities/CreateNewThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddNewThreadUseCase = require('../AddNewThreadUseCase');

describe('AddNewThreadUseCase', () => {
  it('should orchestrating add new thread action correctly', async () => {
    const useCasePayload = {
      title: 'sebuah title thread',
      body: 'sebuah body thread',
    };

    const mockCreatedThread = new CreatedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: 'user-123',
    });

    // create mock dependencies
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(mockCreatedThread));

    const getAddNewThreadUseCase = new AddNewThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    getAddNewThreadUseCase.setOwnerId('user-123');
    const createdThread = await getAddNewThreadUseCase.execute(useCasePayload);

    expect(createdThread).toStrictEqual(new CreatedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: 'user-123',
    }));

    expect(mockThreadRepository.addThread).toBeCalledWith(new CreateNewThread({
      body: useCasePayload.body,
      title: useCasePayload.title,
    }), 'user-123');
  });
});
