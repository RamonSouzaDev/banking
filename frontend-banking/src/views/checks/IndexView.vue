<template>
  <div class="checks-container">
    <div class="menu-toggle">
      <button class="menu-toggle-btn" @click="toggleMenu()">☰</button>
    </div>
    <header class="header-checks">
      <div class="header-title"></div>
      <h1>CHECKS</h1>
      <select class="month-select" v-model="selectedMonth" @change="fetchChecks">
        <option v-for="month in months" :value="month.value" :key="month.value">{{ month.text }}</option>
      </select>
    </header>
    <div class="tabs">
      <button v-for="status in statuses" :key="status" :class="{ 'active-tab': currentTab === status }"
        @click="changeTab(status)">
        {{ status.toUpperCase() }}
      </button>
    </div>
    <div v-if="filteredChecks && filteredChecks.length > 0">
      <div v-for="check in filteredChecks" :key="check.id" class="transaction-item">
        <div class="transaction-details">
          <p class="transaction-title">{{ check.description }}</p>
          <p class="transaction-date">{{ check.formatted_created_at }}</p>
        </div>
        <p class="transaction-amount">$ {{ check.amount | currency }}</p>
      </div>
    </div>
    <div class="no-data" v-else>
      <p>No checks available for this period.</p>
    </div>
    <div class="right-position">
      <button class="add-check-btn" @click="showAddCheckModal">+</button>
    </div>
    <div class="pagination-buttons" v-if="checks && checks.total > 0">
      <button class="pagination-button" @click="changePage(checks.current_page - 1)"
        :disabled="checks.current_page <= 1">
        &#9664; Previous
      </button>
      <button class="pagination-button" @click="changePage(checks.current_page + 1)"
        :disabled="checks.current_page >= checks.last_page">
        Next &#9654;
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { core } from '@/config/pluginInit'
import { useMenuStore } from '@/store/menuStore';

export default {
  data() {
    return {
      selectedMonth: new Date().toISOString().slice(0, 7),
      months: this.generateMonthList(),
      statuses: ['pending', 'approved', 'rejected'],
      currentTab: 'pending',
      checks: [],
      currentPage: 1,
      isLoading: false,
    };
  },
  computed: {
    filteredChecks() {
      return this.checks.data && this.checks.data.length > 0
        ? this.checks.data.filter(check => check.created_at.startsWith(this.selectedMonth) && check.status === this.currentTab)
        : [];
    },
  },
  methods: {
    toggleMenu() {
      const menuStore = useMenuStore();
      menuStore.toggleMenu();
    },
    changePage(page) {
      this.currentPage = page;
      this.fetchChecks();
    },
    fetchChecks() {
      axios.get(`/api/checks?status=${this.currentTab}&month=${this.selectedMonth}&page=${this.currentPage}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => {
        this.checks = response.data;
      }).catch(error => {
        console.error('Failed to fetch checks:', error);
        this.isLoading = false;
      });
    },
    changeTab(status) {
      this.currentTab = status;
      this.fetchChecks();
    },
    generateMonthList() {
      let months = [];
      for (let i = 0; i < 12; i++) {
        const month = new Date(0, i).toLocaleString('default', { month: 'long' });
        const value = `2021-${i + 1}`.padStart(7, '0');
        months.push({ value, text: `${month}, 2021` });
      }
      return months;
    },
    showAddCheckModal() {
      this.$router.push('/checks/create')
    }
  },
  mounted() {
    this.fetchChecks();
    core.index()
  }
};
</script>


<style>
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

.header-checks {
  color: #54aeff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right-position {
  padding: 20px;
  display: flex;
  justify-content: right;
  align-items: right;
}

.header-checks h1 {
  margin: 0;
  color: #54aeff;
  font-weight: bold;
}

.tabs {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.tabs button {
  padding: 10px 20px;
  border: none;
  background-color: #e5e5e5;
  margin-right: 10px;
  cursor: pointer;
}

.tabs button.active-tab {
  background-color: #54aeff;
  color: white;
}

.no-data {
  text-align: center;
}

.checks-container {
  background-color: white;
  border-radius: 20px;
  margin: 20px;
  color: #54aeff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #e5e5e5;
  padding: 20px;
}

.transactions-checks {
  background-color: #fff;
  padding: 15px;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eaeaea;
  padding: 10px 0;
}

.transaction-title {
  font-weight: bold;
}

.transaction-date {
  color: #9e9e9e;
  font-size: 0.8em;
}

.transaction-amount {
  font-weight: bold;
  color: #4caf50;
}

.tabs button.active-tab {
  background-color: #54aeff;
  color: white;
}

.menu-logout {
  text-align: right;
}

.add-check-btn {
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
