<template>
  <div class="content-page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="iq-card">
            <div class="iq-card-header d-flex justify-content-center">
              <div class="iq-header-title">
                <h4 class="card-title">Lista de Usuários</h4>
              </div>
            </div>
              <div class="iq-card-body">
                <div class="row justify-content-between">
                    <div class="col-12">
                      <div class="row">
                        <div class="col-sm-12 col-md-6">
                          <div id="user_list_datatable_info" class="dataTables_filter">
                            <form @submit.prevent="fetchData" class="mr-3 position-relative">
                              <div class="form-group mb-0 d-flex">
                                <input
                                  type="search"
                                  class="form-control"
                                  v-model="searchQuery"
                                  placeholder="Nome"
                                  aria-controls="user-list-table"
                                />
                                <button type="submit" class="btn btn-primary ml-2">
                                  <i class="ri-search-line"></i>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-6 clearfix">
                          <router-link
                            :to="{ name: $route.name.replace('index','create') }"
                            class="btn btn-primary alin h-100 pb-0 pt-2 float-right"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Adicionar"
                          >
                            <i class="ri-user-add-line"></i> Adicionar
                          </router-link>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="table-responsive">
                  

                  <v-data-table-server
                    v-model:items-per-page="pagination.itemsPerPage"
                    :headers="headers"
                    :items-length="pagination.totalItems"
                    :items="indexData"
                    :loading="pagination.loading"
                    :page-text="pagination.labelItensPerPage"
                    :items-per-page-options="pagination.paginateItensPerpageOptions"
                    items-per-page-text="Itens por página:"
                    item-value="name"
                    @update:options="loadItems"
                    class="table-striped col-12 mt-1"
                    loading-text="Carregando..."
                  >
                    <template  v-slot:item.actions="{ item }">
                      <div class="d-inline-flex">

                        <router-link
                            :to="{ name: $route.name.replace('index','edit'), params: { id: item.id } }"
                            class="btn btn-primary mr-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Editar"
                          >
                            <i class="ri-pencil-line"></i>
                          </router-link>
    
                        <ConfirmModal 
                          modalTitle="Deseja remover esse item?"
                          :bodyOff="true"
                          buttonConfirmText="Adcionar" 
                          buttonDismissText="cancelar" 
                          btnClass="btn btn-danger"
                          size="md">
                          <template v-slot:buttonName>
                            <i class="ri-delete-bin-line text-white"></i>
                          </template>
                              <template v-slot:footer>
                                <button type="button" class="btn btn-danger text-white" data-dismiss="modal" @click="destroy(item.id)">Excluir</button>
                                <button type="button" class="btn btn-secondary text-white" data-dismiss="modal">Cancelar</button>
                              </template>
                            </ConfirmModal>
                        
                      </div>

                    </template>
                    <template v-slot:no-data>
                      Nenhum Usuário Encontrado!
                    </template>
                  </v-data-table-server>
                </div>

              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ConfirmModal from '@/components/utils/modal/confirm-modal.vue'
</script>
<script>
import axios from 'axios'
import { core } from '@/config/pluginInit'
import { toast } from 'vue3-toastify'

export default {
  data() {
    return {
      headers: [
        {title:'Nome', value:'name'},
        {title:'Email', value:'email'},
        {title:'Estado', value:'state'},
        {title:'Celular', value:'cellphone'},
        {title:'Status', value:'status'},
        {title:'Ações', key: 'actions'},

      ],
      indexData: [],
      searchQuery: '',
      pagination: {
        labelItensPerPage: '',
        loading:false,
        itemsPerPage:10,
        totalItems: 10,
        page:1,
          paginateItensPerpageOptions: [
            {value: 10, title: '10'},
            {value: 25, title: '25'},
            {value: 50, title: '50'},
        ]
      }
    }
  },
  mounted() {
    core.index()
  },
  methods: {
    loadItems(p) {
      this.pagination.page = p.page;
      this.pagination.itemsPerPage = p.itemsPerPage;
      this.fetchData()
      
    },
    getLabelItensPerPage() {
      let pagination = this.pagination;
      let from = pagination.page * pagination.itemsPerPage - pagination.itemsPerPage + 1;
      let to = (pagination.page * pagination.itemsPerPage > pagination.totalItems )? pagination.totalItems: pagination.page * pagination.itemsPerPage;
      this.pagination.labelItensPerPage = from + ' - ' + to + ' de ' + pagination.totalItems;
    },
    fetchData() {

      let page = this.pagination.page;
      let itensPerPage = this.pagination.itemsPerPage;
      this.pagination.loading= true;
      axios
      .get( '/api/' + this.$route.name.replace('-index','') + `?itensPerPage=${itensPerPage}&page=${page}&search=${this.searchQuery}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
          this.pagination.loading= false;
          this.pagination.totalItems= response.data.data.total;
          this.pagination.page= page;
          this.getLabelItensPerPage();
          this.indexData = response.data.data.data
        })
        .catch((error) => {
          console.error('Error fetching users:', error)
          if (error.response && error.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
          }
        })
    },
    destroy(destroyId) {
      axios
        .delete( '/api/' + this.$route.name.replace('-index','') + '/'  + destroyId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          toast.success('Item deletado com sucesso!');
          this.fetchData();
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
              toast.error('Faça o login !');
              this.$router.push('/auth')
          }
          if (error.response.status == 409) {
            toast.error('Existe entidades associadas com esse item!');
            this.fetchData();
            return
          }
          toast.error('Ocorreu um erro inesperado!');
          this.fetchData();
        });
    },
  }
}
</script>
