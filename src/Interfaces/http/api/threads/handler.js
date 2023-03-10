const AddNewThreadUseCase = require('../../../../Applications/use_case/AddNewThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const addNewThreadUseCase = this._container.getInstance(AddNewThreadUseCase.name);
    const { id } = request.auth.credentials;
    await addNewThreadUseCase.setOwnerId(id);
    const addedThread = await addNewThreadUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = ThreadsHandler;
