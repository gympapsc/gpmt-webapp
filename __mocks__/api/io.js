

module.exports = {
    init: jest.fn((authToken, options) => {
        return new Promise((res, rej) => res())
    }),
    active: jest.fn(() => true),
    close: jest.fn(),
    addMessage: jest.fn(text => {
        return new Promise((res, rej) => res())
    }),
    getMessage: jest.fn(startDate => {
        return new Promise((res, rej) => res())
    }),
    onMessage: jest.fn(cb => {
        cb()
    }),
    getUserInfo: jest.fn(() => new Promise((res, rej) => res()))
}