<template>
    <div class="deposit-container">
        <div class="menu-toggle">
            <button class="menu-toggle-btn" @click="toggleMenu()">☰</button>
        </div>
        <header class="header-deposit">
            <h1>CHECK DETAILS</h1>
        </header>
        <div class="deposit-amount">
            <div class="form-group icon-input">
                <i class="ri-user-line"></i>
                <input type="text" v-model="customerName" placeholder="Customer" readonly />
            </div>
            <div class="form-group icon-input">
                <i class="ri-mail-line"></i>
                <input type="text" v-model="customerEmail" placeholder="Customer Email" readonly />
            </div>
            <div class="form-group icon-input">
                <i class="ri-bank-line"></i>
                <input type="text" v-model="accountNumber" placeholder="Account" readonly />
            </div>
            <div class="form-group icon-input">
                <i class="ri-money-dollar-circle-line"></i>
                <input type="text" v-model="reportedAmount" placeholder="Reported Amount" readonly />
            </div>
        </div>
        <div class="description-section">
            <div class="upload-area" @click="clickFileUpload">
                <div class="upload-icon">⬆️</div>
                <p>UPLOAD CHECK PICTURE</p>
                <input type="file" ref="fileUpload" @change="handleFileUpload" style="display:none" />
                <div class="check-image-container">
                    <img :src="profileImage" alt="Check Image">
                </div>
            </div>
        </div>
        <div class="action-buttons">
            <button class="reject-btn" @click="rejectDeposit">REJECT</button>
            <button class="accept-btn" @click="approveDeposit">ACCEPT</button>
        </div>
    </div>
</template>

<script>
import router from '@/router'
import { core } from '@/config/pluginInit'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useMenuStore } from '@/store/menuStore';

const { toggleMenu } = useMenuStore();

export default {
    data() {
        return {
            userDetails: {},
            customerName: '',
            customerEmail: '',
            accountNumber: '',
            reportedAmount: '',
        };
    },
    mounted() {
        this.fetchUserDetails()
        core.index()
    },
    methods: {
        toggleMenu() {
            const menuStore = useMenuStore();
            menuStore.toggleMenu();
        },
        approveDeposit() {
            const token = localStorage.getItem('token');
            axios.post(`/api/check-deposit/approve/${this.userDetails.check_deposit_details.id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setTimeout(() => {
                        toast.success('Deposit approved successfully!');
                    }, 1500)

                    this.login()
                })
                .catch(error => {
                    setTimeout(() => {
                        toast.error('Failed to approve deposit');
                    }, 1500)
                    console.error('Error approving deposit:', error);
                });
        },
        login() {
            this.$router.push('/admin')
        },
        rejectDeposit() {
            const token = localStorage.getItem('token');
            axios.post(`/api/check-deposit/deny/${this.userDetails.check_deposit_details.id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setTimeout(() => {
                        toast.success('Deposit rejected successfully!');
                    }, 1500)
                })
                .catch(error => {
                    setTimeout(() => {
                        toast.error('Failed to reject deposit');
                    }, 1500)
                    console.error('Error rejecting deposit:', error);
                });
        },
        fetchUserDetails() {
            const userId = this.$route.params.userId;
            const checkId = this.$route.params.checkControlId;
            const token = localStorage.getItem('token');
            axios.get(`/api/user-details/${userId}/${checkId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    this.userDetails = response.data;
                    this.customerName = this.userDetails.name;
                    this.customerEmail = this.userDetails.email;
                    this.accountNumber = this.userDetails.account_number;
                    this.reportedAmount = this.userDetails.check_deposit_details.amount;
                    this.profileImage = this.userDetails.check_deposit_details.profile_image;
                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                });
        },
        clickFileUpload() {
            this.$refs.fileUpload.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            this.picture = file;
            if (file) {
                this.pictureUrl = URL.createObjectURL(file);
            }
        },
        submitDeposit() {
            const formData = new FormData();
            formData.append('picture', this.picture);
            formData.append('amount', this.amount);
            formData.append('description', this.description);

            axios.post('/api/deposit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ` + localStorage.getItem('token')
                }
            })
                .then((response) => {
                    toast.success('Check created with success!')
                    setTimeout(() => {
                        core.startLoader()
                    }, 1500)
                    setTimeout(() => {
                        router.push('/checks')
                    }, 2500)
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        toast.error('Log in !');
                        this.$router.push('/auth')
                    }
                    console.error('Error creating deposit check:', error)
                })
        }
    }
};

</script>

<style>
.check-image-container img {
    max-width: 100%;
    height: auto;
}

.action-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.reject-btn,
.accept-btn {
    flex-basis: 48%;
    padding: 15px;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 5px;
}

.reject-btn {
    background-color: #FF3B30;
}

.accept-btn {
    background-color: #4CD964;
}

.deposit-container {
    background-color: white;
    border-radius: 20px;
    margin: 20px;
    color: #54aeff;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.balance-info {
    color: #54aeff;
    font-size: 20px;
}

.header-deposit {
    text-align: center;
    color: #54aeff;
    margin-bottom: 20px;

}

.header-deposit {
    color: #54aeff;
    padding: 20px;
    align-items: center;
}

.header-deposit h1 {
    margin: 0;
    color: #54aeff;
    font-weight: bold;

}


.current-info {
    text-align: center;
    margin-bottom: 20px;
}

.current-info h2 {
    color: #aaa;
    font-size: 0.9em;
}

.current-balance p {
    color: #54aeff;
    font-size: 1.5em;
    font-weight: bold;
}

.balance-amount {
    text-align: center;
    font-size: 1.5em;
    margin-top: 5px;
}

.deposit-amount {
    text-align: center;
    margin: 20px 0;
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
    width: 30%;
    padding: 10px 10px 10px 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #54aeff;
}

.icon-input span {
    position: absolute;
    right: 587px;
    top: 50%;
    transform: translateY(-50%);
    color: #54aeff;
}

.amount-value {
    font-size: 2em;
    margin: 10px 0;
}

.currency-select {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
}

.deposit-message {
    text-align: center;
    padding: 10px;
    margin-top: 20px;
    background-color: #e5e5e5;
}

.description-section {
    border: dashed 2px #54aeff;
    margin: 20px;
    padding: 30px 20px;
    text-align: center;
}

.upload-area {
    cursor: pointer;
}

.deposit-btn {
    width: 100%;
    background-color: #54aeff;
    color: white;
    padding: 15px;
    border: none;
    font-size: 1em;
    margin-top: 30px;
}
</style>