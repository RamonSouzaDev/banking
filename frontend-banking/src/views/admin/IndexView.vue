<template>
  <div class="checkcontrols-container">
    <div class="menu-toggle">
      <button class="menu-toggle-btn" @click="toggleMenu()">☰</button>
    </div>
    <header class="header-checkcontrols">
      <h1>CHECK CONTROLS</h1>
    </header>
    <select class="month-select" v-model="selectedMonth" @change="loadCheckControls">
      <option v-for="month in months" :value="month.value" :key="month.value">{{ month.text }}</option>
    </select>
    <p></p>
    <div v-if="checkcontrols.data && checkcontrols.data.length > 0">
      <div v-for="checkcontrol in checkcontrols.data" :key="checkcontrol.id" class="transaction-item"
        @click="goToCheckDetails(checkcontrol.user.id, checkcontrol.id)">
        <div class="transaction-details">
          <p class="transaction-title">{{ checkcontrol.user.name }}</p>
          <p class="transaction-date">{{ checkcontrol.formatted_created_at }}</p>
        </div>
        <div class="checkcontrol-amount">$ {{ checkcontrol.amount }}</div>
      </div>
    </div>
    <div v-else class="no-data">
      <p>No checkcontrols available for this period.</p>
    </div>
    <div class="pagination-buttons" v-if="checkcontrols.total > 0">
      <button class="pagination-button" @click="changePage(checkcontrols.current_page - 1)"
        :disabled="checkcontrols.current_page <= 1">
        &#9664; Previous
      </button>
      <button class="pagination-button" @click="changePage(checkcontrols.current_page + 1)"
        :disabled="checkcontrols.current_page >= checkcontrols.last_page">
        Next &#9654;
      </button>
      <select v-model="perPage" @change="loadCheckControls" class="per-page-select">
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
import router from '@/router';
import { core } from '@/config/pluginInit'

export default {
  data() {
    return {
      perPage: 10,
      selectedMonth: new Date().toISOString().slice(0, 7),
      months: this.generateMonthList(),
      checkcontrols: { data: [], current_page: 1, per_page: 10, total: 0, last_page: 1 }
    };
  },
  methods: {
    goToCheckDetails(userId, checkControlId) {
      router.push({ path: `/admin/user-details/${userId}/check/${checkControlId}` });
    },
    toggleMenu() {
      const menuStore = useMenuStore();
      menuStore.toggleMenu();
    },
    changePage(page) {
      this.checkcontrols.current_page = page;
      this.loadCheckControls();
    },
    loadCheckControls() {
      const token = localStorage.getItem('token');
      axios.get(`/api/admin/check-deposits/pending?month=${this.selectedMonth}&page=${this.checkcontrols.current_page}&perPage=${this.perPage}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        this.checkcontrols = response.data;
      }).catch(error => {
        console.error('Error loading checkcontrols:', error);
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
    this.loadCheckControls();
    core.index();
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

.checkcontrols-container {
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

.header-checkcontrols {
  color: #54aeff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-checkcontrols h1 {
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

.checkcontrol-amount {
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

.transactions-checkcontrols {
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