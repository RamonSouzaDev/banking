<template>
  <div class="wrapper">
    <div id="content-page" class="content-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="iq-card">
              <div class="iq-card-header d-flex justify-content-center">
                <div class="iq-header-title">
                  <h4 class="card-title">Cadastro de Usuários</h4>
                </div>
              </div>
              <div class="iq-card-body">
                <div class="new-user-info">
                  <form @submit.prevent="submitForm" enctype="multipart/form-data">
                    <div class="row">
                      <div class="form-group col-sm-3">
                        <label for="profile_image">Cadastrar Foto:</label>
                        <div class="input-group mb-3">
                          <div class="custom-file">
                            <input type="file" class="custom-file-input" aria-describedby="inputGroupFileAddon01"
                              id="profile_image" name="profile_image" @change="handleFileUpload" />
                            <label class="custom-file-label" for="profile_image">Selecione Imagem</label>
                          </div>

                        </div>
                        <img class="img-fluid img-thumbnail col-12" v-bind:src="preview" />

                      </div>

                      <div class="form-group col-md-3">
                        <label for="fname">Nome:</label>
                        <input type="text" class="form-control" v-model="userData.name" placeholder="Nome" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="lname">Sobrenome:</label>
                        <input type="text" class="form-control" v-model="userData.last_name" placeholder="Sobrenome" />
                      </div>

                      <div class="form-group col-md-3">
                        <label for="group_id">Grupo:</label>
                        <select class="form-control" v-model="userData.group_id">
                          <option value="">Selecione</option>
                          <option v-for="groupOption in groups" :key="groupOption.id" :value="groupOption.id">
                            {{ groupOption.name }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group col-md-2">
                        <label for="cep">CEP:</label>
                        <input type="text" class="form-control" v-model="userData.zip_code" @input="fetchAddressDetails"
                          placeholder="CEP" />
                      </div>
                      <div class="form-group col-md-4">
                        <label for="address">Endereço:</label>
                        <input type="text" class="form-control" v-model="userData.address" placeholder="Endereço" />
                      </div>

                      <div class="form-group col-md-2">
                        <label for="neighborhood">Numero:</label>
                        <input type="text" class="form-control" v-model="userData.address_number" placeholder="Numero" />
                      </div>

                      <div class="form-group col-md-4">
                        <label for="address_complement">Complemento:</label>
                        <input type="text" class="form-control" v-model="userData.address_complement"
                          placeholder="Complemento" />
                      </div>

                      <div class="form-group col-md-4">
                        <label for="neighborhood">Bairro:</label>
                        <input type="text" class="form-control" v-model="userData.neighborhood" placeholder="Bairro" />
                      </div>

                      <div class="form-group col-md-4">
                        <label for="city">Cidade:</label>
                        <input type="text" class="form-control" v-model="userData.city" placeholder="Cidade" />
                      </div>
                      <div class="form-group col-md-4">
                        <label for="state">Estado:</label>
                        <input type="text" class="form-control" v-model="userData.state" placeholder="Estado" />
                      </div>

                      <div class="form-group col-md-4">
                        <label for="cellphone">Número de Celular:</label>
                        <input type="text" class="form-control" v-model="userData.cellphone"
                          placeholder="Número de Celular" />
                      </div>

                      <div class="form-group col-md-4">
                        <label for="phone">Contato Alternativo:</label>
                        <input type="text" class="form-control" v-model="userData.phone"
                          placeholder="Contato Alternativo" />
                      </div>

                      <div class="form-group col-md-4">
                        <label for="email">E-mail:</label>
                        <input type="email" class="form-control" v-model="userData.email" placeholder="E-mail" />
                      </div>
                    </div>
                    <hr />
                    <h5 class="mb-3">Segurança</h5>
                    <div class="row">
                      <div class="form-group col-md-12">
                        <label for="uname">Nome de Usuário:</label>
                        <input type="text" class="form-control" v-model="userData.username"
                          placeholder="Nome de Usuário" />
                      </div>
                      <div class="form-group col-md-4">
                        <label for="pass">Senha:</label>
                        <input type="password" class="form-control" v-model="userData.password" placeholder="Senha" />
                      </div>
                      <div class="form-group col-md-4">
                        <label for="rpass">Repetir Senha:</label>
                        <input type="password" class="form-control" v-model="userData.password_confirmation"
                          placeholder="Repetir Senha" />
                      </div>
                    </div>

                    <hr />
                    <h5 class="mb-3">Ativar Usuario?</h5>

                    <div class="row">
                      <div class="form-group col-md-4">
                        <div class="form-check">
                          <input value="Ativo" class="form-check-input" type="radio" name="participantStatus"
                            v-model="userData.status" id="participantAtive" checked />
                          <label class="form-check-label" for="participantAtive"> Sim </label>
                        </div>
                        <div class="form-check">
                          <input value="Inativo" class="form-check-input" type="radio" name="participantStatus"
                            v-model="userData.status" id="participantInative" />
                          <label class="form-check-label" for="participantInative"> Não </label>
                        </div>
                      </div>
                    </div>
                    <router-link :to="{ name: 'users' }" class="btn btn-danger mr-1" data-toggle="tooltip"
                      data-placement="top" title="Cancelar">
                      Cancelar
                    </router-link>
                    <button type="submit" class="btn btn-primary">Salvar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { core } from '@/config/pluginInit'
import { toast } from 'vue3-toastify'

export default {
  data() {
    return {
      preview: null,
      userData: {
        profile_image: null,
        name: '',
        last_name: '',
        group_id: '',
        zip_code: '',
        address: '',
        state: '',
        neighborhood: '',
        city: '',
        address_complement: '',
        cellphone: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        address_number: '',
        status: 'Ativo'
      },
      groups: []
    }
  },
  methods: {
    handleFileUpload(event) {
      this.userData.profile_image = event.target.files[0]
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.preview = e.target.result;
      };
    },
    async submitForm() {
      try {

        const formData = new FormData()
        formData.append('profile_image', this.userData.profile_image)
        const response = await axios
          .post('/api/users', this.userData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((response) => {
            toast.success('Cadastrado com sucesso!')
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
            toast.error('O email, nome e senha são obrigatórios !')
          })
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)
        if (error.response && error.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
        }
      }
    },
    async fetchGroups() {
      try {
        const response = await axios.get('/api/groups', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        this.groups = response.data.data.data
      } catch (error) {
        console.error('Error fetching groups:', error)
        if (error.response && error.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
        }
      }
    },
    async fetchAddressDetails() {
      const cep = this.userData.zip_code.replace(/\D/g, '') // Remove non-numeric characters from CEP

      if (cep.length === 8) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
          const addressData = response.data

          // Update the form fields with the fetched address details
          this.userData.address = addressData.logradouro || ''
          this.userData.state = addressData.uf || ''
          this.userData.neighborhood = addressData.bairro || ''
          this.userData.city = addressData.localidade || ''
        } catch (error) {
          console.error('Error fetching address details:', error)
          if (error.response && error.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
          }
        }
      }
    }
  },
  mounted() {
    this.fetchGroups()
    core.index()
  }
}
</script>
