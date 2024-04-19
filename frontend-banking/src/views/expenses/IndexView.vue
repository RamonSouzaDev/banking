<template>
  <div class="expenses-container">
    <div class="menu-toggle">
      <button class="menu-toggle-btn" @click="toggleMenu()">☰</button>
    </div>
    <header class="header-expenses">
      <div class="header-title"></div>
      <h1>EXPENSES</h1>
    </header>
    <select class="month-select" v-model="selectedMonth" @change="loadExpenses">
      <option v-for="month in months" :value="month.value" :key="month.value">{{ month.text }}</option>
    </select>
    <div class="transactions-expenses">
      <div v-if="expenses.data && expenses.data.length > 0">
        <div v-for="expense in expenses.data" :key="expense.id" class="transaction-item">
          <div class="transaction-details">
            <p class="transaction-title">{{ expense.description }}</p>
            <p class="transaction-date">{{ expense.created_at }}</p>
          </div>
          <div class="expense-amount">{{ formatAmount(expense.amount) }}</div>
        </div>
      </div>
      <div v-else class="no-data">
        <p>No expenses available for this period.</p>
      </div>
      <div class="right-position">
        <button class="add-expense-btn" @click="addExpense">+</button>
      </div>
    </div>
    <div class="pagination-buttons" v-if="expenses.total > expenses.per_page">
      <button class="pagination-button" @click="changePage(expenses.current_page - 1)"
        :disabled="expenses.current_page <= 1">
        &#9664; Previous
      </button>
      <button class="pagination-button" @click="changePage(expenses.current_page + 1)"
        :disabled="expenses.current_page >= expenses.last_page">
        Next &#9654;
      </button>
      <select v-model="perPage" @change="loadExpenses" class="per-page-select">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useMenuStore } from '@/store/menuStore';
export default {
  data() {
    return {
      selectedMonth: '2024-04',
      data: [],
      current_page: 1,
      last_page: 1,
      total: 0,
      perPage: 10,
      months: [
        { value: '2024-01', text: 'January, 2024' },
        { value: '2024-02', text: 'February, 2024' },
        { value: '2024-03', text: 'March, 2024' },
        { value: '2024-04', text: 'April, 2024' },
        { value: '2024-05', text: 'May, 2024' },
        { value: '2024-06', text: 'June, 2024' },
        { value: '2024-07', text: 'July, 2024' },
        { value: '2024-08', text: 'August, 2024' },
        { value: '2024-09', text: 'September, 2024' },
        { value: '2024-10', text: 'October, 2024' },
        { value: '2024-11', text: 'November, 2024' },
        { value: '2024-12', text: 'December, 2024' }
      ],

      expenses: [],
    };
  },
  methods: {
    toggleMenu() {
      const menuStore = useMenuStore();
      menuStore.toggleMenu();
    },
    changePage(page) {
      this.expenses.current_page = page;
      this.loadExpenses();
    },
    loadExpenses() {
      const token = localStorage.getItem('token');
      axios.get(`/api/expenses?month=${this.selectedMonth}&page=${this.expenses.current_page}&perPage=${this.perPage}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          this.expenses = response.data;
        })
        .catch(error => {
          console.error('Error loading the expenses:', error);
        });
    },
    formatAmount(amount) {
      return `- $${Math.abs(amount).toFixed(2)}`;
    },
    addExpense() {
      this.$router.push('/expenses/create')
    },
  },
  mounted() {
    this.loadExpenses();
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

.expenses-container {
  background-color: white;
  border-radius: 20px;
  margin: 20px;
  color: #54aeff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #e5e5e5;
  padding: 20px;
}

.right-position {
  padding: 20px;
  display: flex;
  justify-content: right;
  align-items: right;
}

.header-expenses {
  color: #54aeff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-expenses h1 {
  margin: 0;
  color: #54aeff;
  font-weight: bold;
}

.header-title {
  color: black;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.month-select {
  background-color: white;
  border: 1px solid #54aeff;
  padding: 5px 10px;
  border-radius: 5px;
  color: #54aeff;
}

.transactions-expenses {
  background-color: #e5e5e5;
  padding: 20px;
}

.transaction-item {
  background-color: white;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.transaction-item p {
  margin: 0;
}

.transaction-details {
  display: flex;
  flex-direction: column;
}

.transaction-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.transaction-date {
  color: #555;
}

.expense-amount {
  color: #FF0000;
  font-size: 1.2em;
  font-weight: bold;
}

.add-expense-btn {
  bottom: 20px;
  right: 20px;
  background-color: #54aeff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 10;
}
</style>
