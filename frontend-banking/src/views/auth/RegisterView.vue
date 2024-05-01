<template>
  <section class="sign-up-page">
    <div class="container">
      <div class="sign-up-content">
        <div class="brand-logo">
          <h1>BNB Bank</h1>
        </div>
        <Form @submit="authenticate" :validation-schema="veeSchema" v-slot="{ errors }">
          <div class="form-group">
            <Field name="name" type="text" class="form-input" placeholder="Username" maxlength="20" />
            <ErrorMessage name="name" class="error-message" />
          </div>
          <div class="form-group">
            <Field name="email" type="email" class="form-input" placeholder="Email" maxlength="100" />
            <ErrorMessage name="email" class="error-message" />
          </div>
          <div class="form-group">
            <Field name="password" type="password" class="form-input" placeholder="Password" maxlength="50" />
            <ErrorMessage name="password" class="error-message" />
          </div>
          <button type="submit" class="sign-up-btn">SIGN UP</button>
          <div class="footer">
            <a class="already-account" @click="login">Already have an account?</a>
          </div>
        </Form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import router from '@/router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const schema = z.object({
      name: z.string().min(2, "Username must be at least 2 characters long"),
      email: z.string().email().max(100, "Email must be 100 characters or less"),
      password: z.string().min(6, "Password must be at least 6 characters long").max(50, "Password must be no more than 50 characters")
    });

    const veeSchema = toTypedSchema(schema);

    return {
      veeSchema
    };
  },
  methods: {
    login() {
      this.$router.push('/auth');
    },
    authenticate(values) {
      const url = `http://localhost:8000/api/register`;
      axios.post(url, values)
        .then((response) => {
          if (response.status === 201) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.name);
            setTimeout(() => {
              toast.success('Registered successfully!');
            }, 1500)
            router.push('/');
          } else {
            toast.error('Error registering, try again!');
          }
        })
        .catch(() => {
          toast.error('Error registering, try again!');
          localStorage.removeItem('token');
        });
    }
  }
}
</script>


<style>
.container {
  max-width: 100%;
  margin: auto;
  padding: 4% 5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

.sign-up-page {
  background-color: #ffffff;
}

.sign-up-content {
  background: linear-gradient(180deg, #54aeff 25%, #ffffff 1%);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 33px 16px rgba(0, 0, 0, 0.1);
  margin-top: -100px;
}

.brand-logo h1 {
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  background-color: #54aeff;
  border-radius: 20px 20px 0 0;
  padding: 20px 0;
}

.form-group {
  margin-bottom: 1em;
}

.form-input {
  width: 80%;
  padding: 1em;
  border: 1px solid #ced4da;
  background-color: #eef1f7;
  border-radius: 33px;
  font-size: 1rem;
  box-shadow: none;
  margin-left: 105px;
}

.sign-up-btn {
  width: 100%;
  padding: 1em;
  background-color: #54aeff;
  color: white !important;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1em;

}

.sign-up-btn:hover {
  background-color: #00397a;
}

.footer {
  text-align: center;
  margin-top: 2em;
}

.already-account {
  color: #707070;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
    padding: 10px;
    height: auto;
    margin-top: 25vh;
  }

  .brand-logo h1 {
    font-size: 1.5em;
  }

  .sign-up-content {
    padding: 50px;
  }

  .form-input {
    margin-left: 0;
  }
}

@media (max-width: 375px) {
  .container {
    height: auto;
  }

  .sign-up-content {
    margin-top: 20%;
  }

  .brand-logo h1 {
    font-size: 2em;
    padding: 20px 0;
  }

  .form-input {
    padding: 15px;
    font-size: 1.1em;
  }

  .sign-up-btn {
    padding: 15px;
    font-size: 1.1em;
  }

  .footer {
    margin-top: 1.5rem;
  }
}
</style>