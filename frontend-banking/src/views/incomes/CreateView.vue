<template>
  <div class="add-purchase-container">
    <div class="menu-toggle">
      <button class="menu-toggle-btn" @click="toggleMenu()">☰</button>
    </div>
    <header class="header-purchase">
      <h1>INCOMES</h1>
    </header>
    <div class="current-balance">
      <h2>CURRENT BALANCE</h2>
      <p>${{ currentBalance.toFixed(2) }}</p>
    </div>
    <form class="purchase-form" @submit.prevent="submitPurchase">
      <div class="form-group icon-input">
        <i class="ri-money-dollar-circle-line"></i>
        <input type="text" id="amount" placeholder="Amount" v-model="purchase.amount" required />
        <span>USD</span>
      </div>
      <div class="form-group icon-input">
        <i class="ri-star-line"></i>
        <input type="text" id="description" placeholder="Description" v-model="purchase.description" required />
      </div>
      <button type="submit" class="add-purchase-btn">ADD PURCHASE</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { useMenuStore } from '@/store/menuStore';

export default {
  data() {
    return {
      purchase: {
        amount: '',
        description: ''
      },
      currentBalance: 0
    };
  },
  methods: {
    toggleMenu() {
      const menuStore = useMenuStore();
      menuStore.toggleMenu();
    },
    fetchBalance() {
      axios.get('/api/balance', {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem('token')
        }
      })
        .then(response => {
          this.currentBalance = parseFloat(response.data.balance);
        })
        .catch(error => {
          console.error('Error fetching balance:', error);
          setTimeout(() => {
            toast.error('Could not fetch balance. Please refresh.');
              }, 1500)
          
        });
    },
    submitPurchase() {
      if (!this.purchase.amount || !this.purchase.description) {
        setTimeout(() => {
          toast.error('Please fill all fields.');
              }, 1500)
        
        return;
      }
      axios.post('/api/purchase', this.purchase, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem('token')
        }
      })
        .then((response) => {
          if (response.data.insufficient === 'yes') {
            setTimeout(() => {
              toast.error('Insufficient funds!');
              }, 1500)
            
          } else {
            setTimeout(() => {
              toast.success('Purchase created successfully!');
              }, 1500)
           
            this.currentBalance = parseFloat(response.data.new_balance);
          }
        })
        .catch((error) => {
          console.error('Error creating purchase:', error);
          setTimeout(() => {
            toast.error('Error creating purchase. Please try again.');
              }, 1500)
        });
    }
  },
  mounted() {
    this.fetchBalance();
  }
};
</script>



<style>
.icon-input {
  position: relative;
  margin-bottom: 20px;
}

.icon-input i {
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #54aeff;
  pointer-events: none;
}

.icon-input input {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #54aeff;
}

.icon-input span {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #54aeff;
}


.add-purchase-container {
  background-color: white;
  border-radius: 20px;
  margin: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-purchase {
  text-align: center;
  color: #54aeff;
  margin-bottom: 20px;
}

.current-balance {
  text-align: left;
  margin-bottom: 20px;
  font-size: 20px;
}

.current-balance h2 {
  color: #54aeff;
  font-size: 0.9em;
}

.header-purchase {
  text-align: center;
  color: #54aeff;
  margin-bottom: 20px;

}

.header-purchase {
  color: #54aeff;
  padding: 20px;
  align-items: center;
}

.header-purchase h1 {
  margin: 0;
  color: #54aeff;
  font-weight: bold;

}

.current-balance p {
  color: #54aeff;
  font-size: 1.5em;
  font-weight: bold;
}

.purchase-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  color: #aaa;
  display: block;
}

.form-group input {
  width: calc(100% - 40px);
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group input[type="date"] {
  color: #54aeff;
}

.form-group span {
  float: right;
  margin-top: -30px;
  margin-right: 10px;
  color: #54aeff;
}

.add-purchase-btn {
  background-color: #54aeff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 250px;
}


@media (max-width: 768px) {
  .add-purchase-container {
    margin: 10px;
    border-radius: 10px;
  }

  .header-purchase h1,
  .current-balance h2,
  .current-balance p {
    font-size: smaller;
  }

  .form-group input,
  .add-purchase-btn {
    padding: 8px;
    font-size: 0.9em;
  }

  .icon-input i,
  .icon-input span {
    font-size: 0.9em;
  }
}

@media (max-width: 480px) {
  @media (min-width: 768px) {
    .add-purchase-container {
      margin: 20px auto;
      padding: 20px;
      max-width: 400px;
    }

    .header-purchase h1,
    .current-balance h2,
    .current-balance p,
    .icon-input i,
    .icon-input span,
    .icon-input input,
    .add-purchase-btn {
      font-size: 1.1em;
    }

    .icon-input input {
      padding: 20px 15px 20px 50px;
    }

    .add-purchase-btn {
      padding: 20px;
      font-size: 1.2em;
    }
  }

}
</style>