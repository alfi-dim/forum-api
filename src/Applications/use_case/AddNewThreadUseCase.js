const CreateNewThread = require('../../Domains/threads/entities/CreateNewThread');

class AddNewThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  execute(useCasePayload) {
    const createNewThread = new CreateNewThread(useCasePayload);
    return this._threadRepository.addThread(createNewThread, this.ownerId);
  }

  setOwnerId(id) {
    this.ownerId = id;
  }
}

module.exports = AddNewThreadUseCase;
