<template>
  <div class="incomes-container">
    <div class="menu-toggle">
      <button class="menu-toggle-btn" @click="toggleMenu()">☰</button>
    </div>
    <header class="header-incomes">
      <h1>INCOMES</h1>
    </header>
    <select class="month-select" v-model="selectedMonth" @change="loadIncomes">
      <option v-for="month in months" :value="month.value" :key="month.value">{{ month.text }}</option>
    </select>
    <p></p>
    <div v-if="incomes.data && incomes.data.length > 0">
      <div v-for="income in incomes.data" :key="income.id" class="transaction-item">
        <div class="transaction-details">
          <p class="transaction-title">{{ income.description }}</p>
          <p class="transaction-date">{{ income.created_at }}</p>
        </div>
        <div class="income-amount">$ {{ income.amount }}</div>
      </div>
    </div>
    <div v-else class="no-data">
      <p>No incomes available for this period.</p>
    </div>
    <div class="pagination-buttons" v-if="incomes.total > 0">
      <button class="pagination-button" @click="changePage(incomes.current_page - 1)"
        :disabled="incomes.current_page <= 1">
        &#9664; Previous
      </button>
      <button class="pagination-button" @click="changePage(incomes.current_page + 1)"
        :disabled="incomes.current_page >= incomes.last_page">
        Next &#9654;
      </button>
      <select v-model="perPage" @change="loadIncomes" class="per-page-select">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useMenuStore } from '@/store/menuStore';

export default {
  data() {
    return {
      perPage: 10,
      selectedMonth: new Date().toISOString().slice(0, 7),
      months: this.generateMonthList(),
      incomes: { data: [], current_page: 1, per_page: 10, total: 0, last_page: 1 }
    };
  },
  methods: {
    toggleMenu() {
      const menuStore = useMenuStore();
      menuStore.toggleMenu();
    },
    changePage(page) {
      this.incomes.current_page = page;
      this.loadIncomes();
    },
    loadIncomes() {
      const token = localStorage.getItem('token');
      axios.get(`/api/incomes?month=${this.selectedMonth}&page=${this.incomes.current_page}&perPage=${this.perPage}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        this.incomes = response.data;
      }).catch(error => {
        console.error('Error loading incomes:', error);
      });
    },
    generateMonthList() {
      let months = [];
      for (let i = 0; i < 12; i++) {
        let month = new Date(0, i).toLocaleString('default', { month: 'long' });
        months.push({
          value: `${new Date().getFullYear()}-${(i + 1).toString().padStart(2, '0')}`,
          text: `${month}, ${new Date().getFullYear()}`
        });
      }
      return months;
    }
  },
  mounted() {
    this.loadIncomes();
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

.incomes-container {
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

.header-incomes {
  color: #54aeff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-incomes h1 {
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

.income-amount {
  color: green;
  font-size: 1.2em;
  font-weight: bold;
}

.month-select {
  background-color: white;
  border: 1px solid #54aeff;
  padding: 5px 10px;
  border-radius: 5px;
  color: #54aeff;
}

.transactions-incomes {
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
