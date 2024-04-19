<template>
  <div>
    <v-autocomplete
      :items="options"
      :search-input.sync="searchTerm"
      :loading="loading"
      :hide-no-data="true"
      @input="handleInput"
      label="Digite para buscar"
      item-value="value" 
  :key="options.length" 
    ></v-autocomplete>
  </div>
</template>

<script>
export default {
  props: {
    searchFunction: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      searchTerm: '',
      options: [],
      loading: false,
    };
  },
  methods: {
    handleInput(event) {
      const inputValue = event.target.value;
      this.searchTerm = String(inputValue);
      this.search();
    },
    search() {
      this.loading = true;
      this.options = [];

      if (typeof this.searchTerm === 'string' && this.searchTerm.length >= 3) {
        this.searchFunction(this.searchTerm)
          .then(response => {
            this.options = response.data;
            this.loading = false;
            this.$emit('options-loaded', this.options); // Emitindo diretamente o evento aqui
          })
          .catch(error => {
            console.error('Erro na busca:', error);
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Adicione estilos conforme necessário */
</style>
