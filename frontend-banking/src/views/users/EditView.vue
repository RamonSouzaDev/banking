<template>
  <div>
    <div id="content-page" class="content-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="iq-card">
              <div class="iq-card-body p-0">
                <div class="iq-edit-list">
                  <ul class="iq-edit-profile d-flex nav nav-pills">
                    <li class="col-md-2 p-0">
                      <a class="nav-link btn" @click="setActiveTab('personal-information')">Informações Pessoais</a>
                    </li>
                    <li class="col-md-2 p-0">
                      <a class="nav-link btn" @click="setActiveTab('manage-contact')">Gerenciar Contato</a>
                    </li>
                    <li class="col-md-3 p-0">
                      <a class="nav-link btn" @click="setActiveTab('participant-permissions')">Gerenciar&nbsp;Embarcadores</a>
                    </li>
                    <li class="col-md-3 p-0">
                      <a class="nav-link btn" @click="setActiveTab('participant-transporters')">Gerenciar&nbsp;Transportadores</a>
                    </li>
                    <li class="col-md-2 p-0">
                      <a class="nav-link btn" @click="setActiveTab('chang-pwd')">Alterar Senha</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="iq-edit-list-data">
              <div class="tab-content">
                <div v-show="activeTab === 'personal-information'">
                  <div class="iq-card">
                    <div class="iq-card-header d-flex justify-content-between">
                      <div class="iq-header-title">
                        <h4 class="card-title">Informações Pessoais</h4>
                      </div>
                    </div>
                    <div class="iq-card-body">
                      <form @submit.prevent="updateUserProfile()" enctype="multipart/form-data">
                        
                        <div class="row align-items-center">
                          
                          <div class="form-group col-sm-3">
                            <img v-if="preview" class="img-fluid img-thumbnail col-12" :src="preview" />

                            <img v-else-if="user.profile_image" class="img-fluid img-thumbnail col-12" :src="actualProfile" />
                          </div>

                          <div class="form-group col-sm-3">
                            <label for="profile_image">Editar Foto:</label>
                            <div class="input-group mb-3">
                              
                              <div class="custom-file">
                                <input
                                  type="file"
                                  class="custom-file-input"
                                  aria-describedby="inputGroupFileAddon01"
                                  id="profile_image"
                                  name="profile_image"
                                  @change="handleFileUpload"
                                />
                                <label class="custom-file-label" for="profile_image"
                                  >Selecione Imagem</label
                                >
                                
                              </div>
                              
                            </div>
                          </div>
                          <div class="form-group col-sm-3" v-if="user">
                            <label for="fname">Nome:</label>
                            <input
                              type="text"
                              class="form-control"
                              id="fname"
                              v-model="user.name"
                            />
                          </div>

                          <div class="form-group col-sm-3" v-if="user && groups.length > 0">
                            <label for="group">Grupo:</label>
                            <select class="form-control" id="group" v-model="selectedGroupId">
                              <option
                                v-for="group in groups"
                                :key="group.id"
                                :value="group.id"
                                :selected="group.id === user.group_id"
                              >
                                {{ group.name }}
                              </option>
                            </select>
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-group col-sm-2" v-if="user">
                            <label for="cep">CEP:</label>
                            <input
                              type="text"
                              class="form-control"
                              id="cep"
                              name="zip_code"
                              v-model="user.zip_code"
                              @input="fetchAddressDetails"
                            />
                          </div>

                          <div class="form-group col-sm-5" v-if="user">
                            <label for="address">Endereço:</label>
                            <input
                              type="text"
                              class="form-control"
                              id="address"
                              name="address"
                              v-model="user.address"
                            />
                          </div>

                          <div class="form-group col-sm-2" v-if="user">
                            <label for="address_number">Número:</label>
                            <input
                              type="text"
                              class="form-control"
                              id="address_number"
                              name="address_number"
                              v-model="user.address_number"
                            />
                          </div>

                          <div class="form-group col-sm-3" v-if="user">
                            <label for="cname">Complemento:</label>
                            <input
                              type="text"
                              class="form-control"
                              id="cname"
                              name="address_complement"
                              v-model="user.address_complement"
                            />
                          </div>

                          <div class="form-group col-sm-3" v-if="user">
                            <label for="neighborhood">Bairro:</label>
                            <input
                              type="text"
                              class="form-control"
                              id="neighborhood"
                              name="neighborhood"
                              v-model="user.neighborhood"
                            />
                          </div>

                          <div class="form-group col-sm-2" v-if="user">
                            <label for="city">Cidade:</label>
                            <input
                              type="text"
                              class="form-control"
                              id="city"
                              name="city"
                              v-model="user.city"
                            />
                          </div>

                          <div class="form-group col-sm-2" v-if="user">
                            <label for="state">Estado:</label>
                            <input
                              type="text"
                              class="form-control"
                              id="state"
                              name="state"
                              v-model="user.state"
                            />
                          </div>
                        </div>
                        <router-link to="/users" class="btn iq-bg-danger mr-2"
                          >Cancelar</router-link
                        >
                        <button type="submit" class="btn btn-primary">Salvar</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div v-show="activeTab === 'manage-contact'">
                  <div class="iq-card">
                    <div class="iq-card-header d-flex justify-content-between">
                      <div class="iq-header-title">
                        <h4 class="card-title">Gerenciar Contato</h4>
                      </div>
                    </div>
                    <div class="iq-card-body">
                      <form @submit.prevent="updateContactInformation()">
                        <div class="form-group">
                          <label for="phone">Número de Contato:</label>
                          <input

                          v-maska
                            data-maska="(##) #####-####"
                            v-model="user.phone"
                            type="text"
                            class="form-control"
                            id="phone"
                            name="phone"
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">Email:</label>
                          <input
                            v-model="user.email"
                            type="text"
                            class="form-control"
                            id="email"
                            name="email"
                          />
                        </div>
                        <button type="submit" class="btn btn-primary mr-2">Salvar</button>
                        <router-link to="/users" class="btn iq-bg-danger">Cancelar</router-link>
                      </form>
                    </div>
                  </div>
                </div>

                <div v-show="activeTab === 'participant-permissions'">
                  <div class="iq-card">
                    <div class="iq-card-header d-flex justify-content-between">
                      <div class="iq-header-title d-contents">
                        <h4 class="card-title">Gerenciar Embarcadores</h4>
                        <ConfirmModal 
                          modalTitle="Adicionar Embarcador"
                          buttonConfirmText="Adcionar" 
                          buttonDismissText="cancelar" 
                          button="Adicionar Embarcador" 
                          btnClass="btn-primary"
                          size="lg">
                          <template v-slot:body>
                            <table
                              class="table table-striped table-borderless table-hover"
                              role="grid"
                              aria-describedby="group-list-page-info"
                            >
                              <thead>
                                <tr>
                                  <th class="col-checkbox">Selecionar</th>
                                  <th>Embarcador</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-if="shippersToAppend.length == 0" >
                                  <td colspan="2" class="text-center" > Todo Os Embarcadores Foram Adicionados! </td>
                                </tr>
                                <tr v-else v-for="shipper in shippersToAppend" :key="shipper.id" @click="appendShipper(shipper.id)">
                                  <td class="text-center">
                                    <input v-model="appendShippers" type="checkbox" :value="shipper.id">
                                  </td>
                                  <td>{{shipper.company_name}}</td>
                                </tr>
                              </tbody>
                            </table>
                          </template>
                          <template v-slot:footer>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="saveShipper" v-if="shippersToAppend.length > 0">Adicionar</button>
                          </template>
                        </ConfirmModal>
                      </div>
                    </div>
                    <div class="iq-card-body">
                      <div>
                        <table
                          :class="(shippers.length == 0)?'table table-borderless':'table table-striped table-borderless'"
                          role="grid"
                          aria-describedby="group-list-page-info"
                        >
                          <thead>
                            <tr>
                              <th>Embarcador</th>
                              <th>status</th>
                              <th class="list-actions-th">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-if="shippers.length == 0" >
                              <td colspan="3" class="text-center" > Nenhum Participante Associado </td>
                            </tr>
                            <tr v-else v-for="shipper in shippers" :key="shipper.id">
                              <td>{{ shipper.company_name }}</td>
                              <td>{{ shipper.status }}</td>
                              <td>
                                <div class="d-flex align-items-center list-actions">
                                  <ConfirmModal 
                                    btnClass="btn-danger"
                                    modalTitle="Deseja Remover o Embarcador?"
                                    buttonConfirmText="Sim" 
                                    buttonDismissText="Não" 
                                    :bodyOff="true" 
                                    >
                                    <template v-slot:buttonName>
                                      <i class="ri-delete-bin-line"></i>
                                    </template>

                                    <template v-slot:footer>
                                      <button type="button" class="btn btn-danger" data-dismiss="modal" @click="removeShipper(shipper)">Sim</button>
                                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
                                    </template>
                                    
                                  </ConfirmModal>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-show="activeTab === 'participant-transporters'">
                  <div class="iq-card">
                    <div class="iq-card-header d-flex justify-content-between">
                      <div class="iq-header-title d-contents">
                        <h4 class="card-title">Gerenciar Transportadores</h4>
                        <ConfirmModal 
                          modalTitle="Adicionar Transportador"
                          buttonConfirmText="Adcionar" 
                          buttonDismissText="cancelar" 
                          button="Adicionar Transportador" 
                          btnClass="btn-primary"
                          size="lg">
                          <template v-slot:body>
                            <table
                              class="table table-striped table-borderless table-hover"
                              role="grid"
                              aria-describedby="group-list-page-info"
                            >
                              <thead>
                                <tr>
                                  <th class="col-checkbox">Selecionar</th>
                                  <th>Transportador</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-if="transportersToAppend.length == 0" >
                                  <td colspan="2" class="text-center" > Todos Os Transportadores Foram Adicionados! </td>
                                </tr>
                                <tr v-else v-for="transporter in transportersToAppend" :key="transporter.id" @click="appendTransporter(transporter.id)">
                                  <td class="text-center">
                                    <input v-model="appendTransporters" type="checkbox" :value="transporter.id">
                                  </td>
                                  <td>{{transporter.company_name}}</td>
                                </tr>
                              </tbody>
                            </table>
                          </template>
                          <template v-slot:footer>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="saveTransporter()" v-if="transportersToAppend.length > 0">Adicionar</button>
                          </template>
                        </ConfirmModal>
                      </div>
                    </div>
                    <div class="iq-card-body">
                      <div>
                        <table
                          :class="(transporters.length == 0)?'table table-borderless':'table table-striped table-borderless'"
                          role="grid"
                          aria-describedby="group-list-page-info"
                        >
                          <thead>
                            <tr>
                              <th>Transportador</th>
                              <th>status</th>
                              <th class="list-actions-th">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-if="transporters.length == 0" >
                              <td colspan="3" class="text-center" > Nenhum Participante Associado</td>
                            </tr>
                            <tr v-else v-for="transporter in transporters" :key="transporter.id">
                              <td>{{ transporter.company_name }}</td>
                              <td>{{ transporter.status }}</td>
                              <td>
                                <div class="d-flex align-items-center list-actions">
                                  <ConfirmModal 
                                    btnClass="btn-danger"
                                    modalTitle="Deseja Remover o Transportador?"
                                    buttonConfirmText="Sim" 
                                    buttonDismissText="Não" 
                                    :bodyOff="true" 
                                    >
                                    <template v-slot:buttonName>
                                      <i class="ri-delete-bin-line"></i>
                                    </template>

                                    <template v-slot:footer>
                                      <button type="button" class="btn btn-danger" data-dismiss="modal" @click="removeTransporter(transporter)">Sim</button>
                                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
                                    </template>
                                    
                                  </ConfirmModal>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>


                <div v-show="activeTab === 'chang-pwd'">
                  <div class="iq-card">
                    <div class="iq-card-header d-flex justify-content-between">
                      <div class="iq-header-title">
                        <h4 class="card-title">Alterar Senha</h4>
                      </div>
                    </div>
                    <div class="iq-card-body">
                      <form @submit.prevent="updatePassword()">
                        <div class="form-group">
                          <label for="cpass">Senha Atual:</label>
                          <a href="" class="float-right">Esqueceu a Senha</a>
                          <input
                            v-model="currentPassword"
                            type="password"
                            class="form-control"
                            id="cpass"
                            name="current_password"
                          />
                        </div>
                        <div class="form-group">
                          <label for="npass">Nova Senha:</label>
                          <input
                            v-model="newPassword"
                            type="password"
                            class="form-control"
                            id="npass"
                            name="new_password"
                          />
                        </div>
                        <div class="form-group">
                          <label for="vpass">Verificar Senha:</label>
                          <input
                            v-model="confirmPassword"
                            type="password"
                            class="form-control"
                            id="vpass"
                            name="confirm_password"
                          />
                        </div>
                        <button type="submit" class="btn btn-primary mr-2">Enviar</button>
                        <router-link to="/users" class="btn iq-bg-danger">Cancelar</router-link>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { vMaska } from 'maska'
import ConfirmModal from '@/components/utils/modal/confirm-modal.vue'
</script>
<script>
import axios from 'axios'
import { core } from '@/config/pluginInit'

import { toast } from 'vue3-toastify'
export default {
  data() {
    return {
      preview: null,
      user: {},
      shippers: [],
      appendShippers: [],
      allShippers: [],
      shippersToAppend: [],
      transporters: [],
      appendTransporters: [],
      transportersToAppend: [],
      allTransporters: [],
      groups: [],
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      activeTab: 'participant-permissions',
      actualProfile: '',
      selectedGroupId: null,
      isProcessing: false
    }
  },

  mounted() {
    core.index()
    axios
      .get(`/api/shippers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        this.allShippers = response.data.data;
        this.getUserData()
        
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
        if (error.response && error.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
        }
      })

      axios
      .get(`/api/transporters`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        this.allTransporters = response.data.data;
        this.getUserData()
        
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
        }
      })

   
  },
  methods: {
    async fetchAddressDetails() {
      const cep = this.user.zip_code.replace(/\D/g, '') 

      if (cep.length === 8) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
          const addressData = response.data

          this.user.address = addressData.logradouro || ''
          this.user.state = addressData.uf || ''
          this.user.neighborhood = addressData.bairro || ''
          this.user.city = addressData.localidade || ''
        } catch (error) {
          console.error('Error fetching address details:', error)
          if (error.response && error.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
          }
        }
      }
    },
    handleFileUpload(event) {
      this.user.profile_image = event.target.files[0]
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.preview = e.target.result;
      };
    },

    getImage() {
      if(this.user.profile_image == null){
        return;
      }
      axios({
        method: 'get',
        url: '/api/retrieve-image?imageUrl=' + this.user.profile_image,

        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },

        responseType: 'blob'
      })
        .then((response) => {
          // Cria uma Blob a partir do array de bytes da resposta
          const blob = new Blob([response.data], { type: response.headers['content-type'] })

          // Cria uma URL temporária para a Blob
          const imgUrl = URL.createObjectURL(blob)

          // Atualiza a propriedade actualProfile com a URL temporária
          this.actualProfile = imgUrl
        })
        .catch((e) => {
          console.log(e)
          if (e.response && e.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
        }
        })
    },
    updateUserProfile() {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      const formData = new FormData()

      formData.append('id', this.user.id)
      formData.append('name', this.user.name)
      formData.append('email', this.user.email)
      formData.append('zip_code', this.user.zip_code)
      formData.append('state', this.user.state)
      formData.append('city', this.user.city)
      formData.append('address', this.user.address)
      formData.append('address_number', this.user.address_number)
      formData.append('neighborhood', this.user.neighborhood)
      formData.append('cellphone', this.user.cellphone)
      formData.append('status', this.user.status)
      formData.append('profile_image', this.user.profile_image)

      formData.append('currentPassword', this.user.currentPassword)
      formData.append('newPassword', this.user.newPassword)
      formData.append('confirmPassword', this.user.confirmPassword)

      formData.append('_method', 'PUT')

      try {
        const userId = this.$route.params.id

        axios
          .post('/api/users/' + userId, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((response) => {
            toast.success('Editado com sucesso!')
            setTimeout(() => {
              core.startLoader()
            }, 1500)
            setTimeout(() => {
              this.$router.push('/users')
            }, 2500)
          })
          .catch((e) => {
            if (e.response && e.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
            }
            toast.error('Existem erros no formulario!')
          })
      } catch (error) {
        if (error.response && error.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
        }
      }
    },
    
    updateContactInformation() {
    const data = {
      phone: this.user.phone,
      email: this.user.email,
    };

    axios.post(`/api/users/${this.user.id}/update-contact`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      toast.success('Informações de contato atualizadas com sucesso!');
      this.user = {...this.user, ...data};
    })
    .catch((error) => {
      console.error('Erro ao atualizar informações de contato:', error);
      toast.error('Erro ao atualizar informações de contato.');
    });
  },

  updatePassword() {
    const data = {
      current_password: this.currentPassword,
      new_password: this.newPassword,
      confirm_password: this.confirmPassword,
    };

    axios.post(`/api/users/${this.user.id}/update-password`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      toast.success('Senha atualizada com sucesso!');
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    })
    .catch((error) => {
      console.error('Erro ao atualizar senha:', error);
      toast.error('Erro ao atualizar senha.');
    });
  },

    
  saveTransporter() {
      let transporterToSync = [];
      this.transporters.forEach(element => {
        transporterToSync.push(element.id);
      });

      this.appendTransporters.forEach(element => {
        transporterToSync.push(element);
      });
      
      transporterToSync = transporterToSync.filter((valor, indice, self) => {
        return self.indexOf(valor) === indice;
      });
      axios
          .post('/api/transporters', {
            userId:this.user.id,
            transporterIds:transporterToSync
          },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((response) => {
            this.getUserData();
            toast.success('Transportadores Salvo com sucesso!')
          })
          .catch((e) => {
            if (e.response && e.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
            }
            this.getUserData();
            toast.error('Ocorreu um erro inesperado!')
          })


    },
    appendTransporter(transporterId) {
      const index = this.appendTransporters.indexOf(transporterId);
      
      if (index === -1) {
        this.appendTransporters.push(transporterId);
        return;
      }
      this.appendTransporters.splice(index, 1);
    },
    
    removeTransporter(transporterToRemove) {

      const index = this.transporters.indexOf(transporterToRemove);
      
      if (index === -1) {
        return;
      }
      this.transporters.splice(index, 1);
      this.saveTransporter();
    },

    saveShipper() {
      let shipperToSync = [];
      this.shippers.forEach(element => {
        shipperToSync.push(element.id);
      });

      this.appendShippers.forEach(element => {
        shipperToSync.push(element);
      });
      
      shipperToSync = shipperToSync.filter((valor, indice, self) => {
        return self.indexOf(valor) === indice;
      });

      axios
          .post('/api/shippers', {
            userId:this.user.id,
            shipperIds:shipperToSync
          },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((response) => {
            this.getUserData();
            toast.success('Embarcadores Salvo com sucesso!')
          })
          .catch((e) => {
            if (e.response && e.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
            }
            this.getUserData();
            toast.error('Ocorreu um erro inesperado!')
          })


    },
    appendShipper(shipperId) {
      
      const index = this.appendShippers.indexOf(shipperId);
      
      if (index === -1) {
        this.appendShippers.push(shipperId);
        return;
      }
      this.appendShippers.splice(index, 1);
    },
    
    removeShipper(shipperToRemove) {

      console.log(this.shippers);
      const index = this.shippers.indexOf(shipperToRemove);
      
      if (index === -1) {
        return;
      }
      this.shippers.splice(index, 1);
      this.saveShipper();
    },
    getUserData() {
      
      const userId = this.$route.params.id
      axios.get(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        this.user = response.data.data
        this.shippers = response.data.data.shippers
        this.transporters = response.data.data.transporters
        this.groups = response.data.data.groups
        this.selectedGroupId = response.data.data.groups[0].id
        this.shippersToAppend = this.allShippers.filter((embarcador) => {
          return !this.shippers.some((sh) => sh.id === embarcador.id);
        });
        this.transportersToAppend = this.allTransporters.filter((transportadora) => {
          return !this.transporters.some((sh) => sh.id === transportadora.id);
        });
        this.getImage()
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
        if (error.response && error.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
        }
      })
    },
    setActiveTab(tab) {
      this.activeTab = tab
    }
  }


}


</script>
