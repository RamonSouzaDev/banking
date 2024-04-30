import { mount } from '@vue/test-utils';
import LoginView from '@/views/auth/LoginView.vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';

jest.mock('axios');
jest.mock('vue3-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('LoginView.vue', () => {
  let wrapper;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mount the component with necessary global mocks
    wrapper = mount(LoginView, {
      global: {
        mocks: {
          $router: { push: jest.fn() }
        }
      }
    });
  });

  it('should authenticate the user successfully', async () => {
    // Mock localStorage *before* triggering login action
    jest.spyOn(Storage.prototype, 'setItem');
  
    axios.post.mockResolvedValue({
      data: { token: 'fake_token', name: 'John Doe' }
    });
  
    await wrapper.setData({ userData: { email: 'admin@banking.com', password: 'senha' } });
    await wrapper.find('.sign-up-form').trigger('submit.prevent');
  
    await wrapper.vm.$nextTick();
  });
  

  it('should handle login errors', async () => {
    axios.post.mockRejectedValue(new Error('Invalid credentials'));

    await wrapper.setData({ userData: { email: 'user@example.com', password: 'wrongpassword' } });
    await wrapper.find('.sign-up-form').trigger('submit.prevent');
    await wrapper.vm.$nextTick();

    expect(toast.error).toHaveBeenCalledWith('Invalid username and/or password!');
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
