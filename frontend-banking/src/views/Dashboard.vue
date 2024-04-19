<template>
  <div class="home-container">
    <div class="menu-toggle">
    <button class="menu-toggle-btn" @click="toggleMenu()">☰</button>
  </div>
      <header class="header">
        <h1>BNB Bank</h1>
        <div class="balance">
          <p>Current balance</p>
          <h2>${{ currentBalance.toFixed(2) }}</h2>
        </div>
      </header>
      <div class="transaction-summary">
        <div class="income">
          <h3>Incomes</h3>
          <p :style="'color: green'">${{ totalIncome.toFixed(2) }}</p>
        </div>
        <div>
          <p>DEPOSIT A CHECK</p>
          <button class="add-btn-deposite-check" @click="addCheck">+</button>
        </div>
      </div>
      <div class="transaction-summary">
        <div class="expenses">
          <h3>Expenses</h3>
          <p :style="'color: red'">${{ totalExpenses.toFixed(2) }}</p>
        </div>
        <div>
          <p>PURCHASE</p>
          <button class="add-btn" @click="addPurchase">+</button>
        </div>
      </div>
      <div class="transactions">
      <h3>TRANSACTIONS</h3>
      <div v-for="transaction in transactions.data" :key="transaction.id" class="transaction-item">
        <p>{{ transaction.description }} -  {{ transaction.formatted_created_at }}</p>
        <p :style="transaction.amount >= 0 ? 'color: green' : 'color: red'">
          ${{ transaction.amount }}
        </p>
      </div>
      <div class="pagination-buttons">
      <button 
        class="pagination-button" 
        @click="changePage(transactions.current_page - 1)" 
        :disabled="!transactions.prev_page_url">
        &#9664; Previous
      </button>
      <button 
        class="pagination-button" 
        @click="changePage(transactions.current_page + 1)" 
        :disabled="!transactions.next_page_url">
        Next &#9654;
      </button>
      <select v-model="perPage" @change="fetchTransactions(transactions.current_page)" class="per-page-select">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useMenuStore } from '@/store/menuStore';

export default {
  data() {
    return {
      currentBalance: 0,
      totalIncome: 0,
      totalExpenses: 0,
      perPage: 10,
      transactions: {
        data: [],
        current_page: null,
        prev_page_url: null,
        next_page_url: null
      }
    };
  },
  mounted() {
    this.fetchBalance();
    this.fetchTransactions();
  },
  methods: {
    toggleMenu() {
      const menuStore = useMenuStore();
      menuStore.toggleMenu();
    },
    addPurchase() {
      this.$router.push('/expenses/create')
    },
    addCheck() {
      this.$router.push('/checks/create')
    },
    fetchBalance() {
      axios.get('/api/balance', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).then(response => {
        this.currentBalance = parseFloat(response.data.balance);
        this.totalIncome = parseFloat(response.data.income);
        this.totalExpenses = parseFloat(response.data.expenses);
      }).catch(error => console.error('Error fetching balance:', error));
    },
    fetchTransactions(page = 1) {
      axios.get(`/api/transactions?page=${page}&perPage=${this.perPage}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => {
        this.transactions = response.data;
      }).catch(error => console.error('Error fetching transactions:', error));
    },
    changePage(page) {
      if (page > 0) {
        this.fetchTransactions(page);
      }
    }
  }
};
</script>

<style>
.per-page-select {
  background-color: #fff; 
  border: 2px solid #54aeff;
  border-radius: 5px;
  padding: 8px 16px; 
  font-size: 16px; 
  color: #54aeff;
  cursor: pointer; 
  outline: none; 
  appearance: none; 
  width: auto; 
  margin-top: 10px;
  margin-bottom: 10px;
}

.per-page-select:hover {
  background-color: #e6f7ff;
}

.per-page-select:focus {
  border-color: #007BFF;
}

  .home-container {
  background-color: white;
  border-radius: 20px;
  margin: 20px;
  color: #54aeff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.transaction-summary div p {
   color: #54aeff; 
   margin: 0;
   padding: 0;
}

.add-btn {
  border: none;
  color: #54aeff; 
  padding: 5px;
  cursor: pointer;
  margin-left: 20px;
}

.add-btn-deposite-check {
  border: none;
  color: #54aeff;
  padding: 5px;
  cursor: pointer;
  margin-left: 55px;
}

.p, .balance h2, .transaction-summary h3, .transaction-summary p, .transactions h3, .transaction-item p {
  color: #54aeff;
}

.income .add-btn {
  background-color: #ffffff;
  border: none;
  color: #54aeff; 
  padding: 5px;
  cursor: pointer;
  border-radius: 50%; 
  font-size: 16px;
  line-height: 16px;
  width: 24px; 
  height: 24px; 
  text-align: center;
  margin-left: 10px; 
}

.header h1 {
  text-align: center;
  color: white; 
}

.header h2 {
  text-align: left; 
  color: white;
  font-size: 20px;
}


.deposit-btn,
.purchase-btn {
  background-color: #54aeff;
  border: none;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.deposit-btn {
  z-index: 10;
}

.purchase-btn {
  z-index: 10;
}


.menu-toggle {
  position: absolute;
  top: 48px;
  left: 46px;
  z-index: 100;
  background-color: #54aeff;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
}
.pagination-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-button {
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:hover {
  background-color: #0056b3; 
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.header {
   background-color: #54aeff;
   color: white;
   padding: 20px;
   border-radius: 20px 20px 0 0;
   margin-top: -25px;
   margin: -5px;
}

.balance {
   text-align: left;
   margin-bottom: -18px;
}

.transaction-summary {
   display: flex;
   justify-content: space-between;
   background-color: white;
   padding: 10px;
   border-radius: 10px;
   margin-bottom: 20px;
}

.transaction-summary h3 {
   font-size: 16px;
}

.transaction-summary p {
   font-size: 14px;
   font-weight: bold;
}

.transactions {
   background-color: white;
   padding: 10px;
   border-radius: 10px;
}

.transaction-item {
   display: flex;
   justify-content: space-between;
   margin-bottom: 10px;
}

.transaction-item p {
   font-size: 14px;
   margin: 0;
}
</style>