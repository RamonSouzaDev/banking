// jest.global-mocks.js
const mockLocalStorage = (function() {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => store[key] = value.toString()),
    removeItem: jest.fn((key) => delete store[key]),
    clear: jest.fn(() => store = {})
  };
})();

global.localStorage = mockLocalStorage;

jest.mock('axios', () => ({
  post: jest.fn()
}));

jest.mock('vue3-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));
