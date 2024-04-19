@extends('layout')
@section('content')
<!doctype html>
<html lang="en">

<body>
   <!-- loader Start -->
   <div id="loading">
      <div id="loading-center">
      </div>
   </div>
   <!-- loader END -->
   <!-- Wrapper Start -->
   <div class="wrapper">

      <div id="content-page" class="content-page">
         <div class="container-fluid">
            <div class="row">
               <div class="col-lg-9">
                  <div class="iq-card">
                     <div class="iq-card-header d-flex justify-content-center">
                        <div class="iq-header-title">
                           <h4 class="card-title">Cadastro de Usuários</h4>
                        </div>
                     </div>
                     <div class="iq-card-body">
                        <div class="new-user-info">
                           <form method="POST" action="{{ route('users.store') }}" enctype="multipart/form-data">
                              @csrf
                              <div class="row">
                                 <div class="form-group">
                                    <div class="form-group col-sm-6">
                                       <label for="profile_image">Cadastrar Foto:</label>
                                       <input type="file" id="profile_image" name="profile_image">
                                    </div>
                                    <br>
                                    <br>
                                    <br>
                                    <br>
                                    <br>
                                 </div>

                                 <div class="form-group col-md-3">
                                    <label for="fname">Nome:</label>
                                    <input type="text" class="form-control" id="fname" name="name" placeholder="Nome">
                                 </div>
                                 <div class="form-group col-md-3">
                                    <label for="lname">Sobrenome:</label>
                                    <input type="text" class="form-control" id="lname" name="last_name" placeholder="Sobrenome">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label for="group_id">Grupo:</label>
                                    <select class="form-control" id="group_id" name="group_id">
                                       @foreach($groups as $groupOption)
                                       <option value="{{ $groupOption->id }}" {{ $groupOption->id == $groupOption->id ? 'selected' : '' }}>{{ $groupOption->name }}</option>
                                       @endforeach
                                    </select>
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label for="pno">CEP:</label>
                                    <input type="text" class="form-control" id="cep" name="zip_code" placeholder="CEP">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label for="add1">Endereço :</label>
                                    <input type="text" class="form-control" id="address" name="address" placeholder="Endereço">
                                 </div>

                                 <div class="form-group col-md-6">
                                    <label for="add2">Estado:</label>
                                    <input type="text" class="form-control" id="state" name="state" placeholder="Estado">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label for="add2">Bairro:</label>
                                    <input type="text" class="form-control" id="neighborhood" name="neighborhood" placeholder="Bairro">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label for="city">Cidade:</label>
                                    <input type="text" class="form-control" id="city" name="city" placeholder="Cidade">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label for="add2">Complemento:</label>
                                    <input type="text" class="form-control" id="add2" name="address_complement" placeholder="Complemento">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label for="mobno">Número de Celular:</label>
                                    <input type="text" class="form-control" id="mobno" name="cellphone" placeholder="Número de Celular">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label for="altconno">Contato Alternativo:</label>
                                    <input type="text" class="form-control" id="altconno" name="phone" placeholder="Contato Alternativo">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label for="email">E-mail:</label>
                                    <input type="email" class="form-control" id="email" name="email" placeholder="E-mail">
                                 </div>


                              </div>
                              <hr>
                              <h5 class="mb-3">Segurança</h5>
                              <div class="row">
                                 <div class="form-group col-md-12">
                                    <label for="uname">Nome de Usuário:</label>
                                    <input type="text" class="form-control" id="uname" name="username" placeholder="Nome de Usuário">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label for="pass">Senha:</label>
                                    <input type="password" class="form-control" id="pass" name="password" placeholder="Senha">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label for="rpass">Repetir Senha:</label>
                                    <input type="password" class="form-control" id="rpass" name="password_confirmation" placeholder="Repetir Senha">
                                 </div>
                              </div>
                              <button type="submit" class="btn btn-primary">Adicionar Novo Usuário</button>
                           </form>

                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</body>

</html>
@endsection

<!-- Adicione este bloco de script no final do seu arquivo Blade -->
<script>
   document.addEventListener('DOMContentLoaded', function() {
      // Captura o campo de CEP
      const cepInput = document.getElementById('cep');

      // Adiciona um ouvinte de evento para o evento 'blur' (quando o campo perde o foco)
      cepInput.addEventListener('blur', function() {
         // Obtém o valor do CEP
         const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

         // Verifica se o CEP possui o tamanho correto
         if (cep.length === 8) {
            // Faz a requisição à API ViaCEP
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
               .then(response => response.json())
               .then(data => {
                  // Verifica se a resposta da API não contém erro
                  if (!data.erro) {
                     // Preenche os campos relacionados com os dados da API
                     document.getElementById('city').value = data.localidade;
                     document.getElementById('state').value = data.uf;
                     document.getElementById('neighborhood').value = data.bairro;
                     document.getElementById('address').value = data.logradouro;
                  }
               })
               .catch(error => console.error('Erro ao consultar CEP:', error));
         }
      });
   });

   // Adiciona um ouvinte de evento para detectar a mudança no input de arquivo
   document.getElementById('fileInput').addEventListener('change', function() {
      exibirImagemSelecionada(this);
   });

   function exibirImagemSelecionada(input) {
      const previewImage = document.getElementById('previewImage');

      // Verifica se um arquivo foi selecionado
      if (input.files && input.files[0]) {
         const reader = new FileReader();

         reader.onload = function(e) {
            previewImage.src = e.target.result;
         };

         reader.readAsDataURL(input.files[0]);
      }
   }
</script>