@extends('layout')
@section('content')
<!doctype html>
<html lang="en">

<head>
</head>

<body>
   <!-- loader Start -->
   <div id="loading">
      <div id="loading-center">
      </div>
   </div>
   <!-- loader END -->
   <!-- Wrapper Start -->
   <div class="wrapper">


      <!-- TOP Nav Bar END -->
      <!-- Page Content  -->
      <div id="content-page" class="content-page">
         <div class="container-fluid">
            <div class="row">
               <div class="col-lg-12">
                  <div class="iq-card">
                     <div class="iq-card-body p-0">
                        <div class="iq-edit-list">
                           <ul class="iq-edit-profile d-flex nav nav-pills">
                              <li class="col-md-3 p-0">
                                 <a class="nav-link active" data-toggle="pill" href="#personal-information">
                                    Informações Pessoais
                                 </a>
                              </li>
                              <li class="col-md-3 p-0">
                                 <a class="nav-link" data-toggle="pill" href="#chang-pwd">
                                    Alterar Senha
                                 </a>
                              </li>
                              <li class="col-md-3 p-0">
                                 <a class="nav-link" data-toggle="pill" href="#manage-contact">
                                    Gerenciar Contato
                                 </a>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-lg-12">
                  <div class="iq-edit-list-data">
                     <div class="tab-content">
                        <div class="tab-pane fade active show" id="personal-information" role="tabpanel">
                           <div class="iq-card">
                              <div class="iq-card-header d-flex justify-content-between">
                                 <div class="iq-header-title">
                                    <h4 class="card-title">Informações Pessoais</h4>
                                 </div>
                              </div>
                              <div class="iq-card-body">
                                 <form action="{{ route('users.update', ['user' => $user->id]) }}" method="POST" enctype="multipart/form-data">
                                    @csrf
                                    @method('PUT')
                                    <div class="row align-items-center">
                                       <!-- Dados do backend -->
                                       <div class="form-group col-sm-3">
                                          <label for="current_image"></label>
                                          @if($user->profile_image)
                                          <img src="{{ asset('storage/' . $user->profile_image) }}" alt="Current Image" class="img-thumbnail" width="100">
                                          @else
                                          <p>Nenhuma imagem disponível</p>
                                          @endif
                                       </div>

                                       <!-- Adicionar campo de upload de imagem -->
                                       <div class="form-group col-sm-6">
                                          <label for="profile_image">Atualizar imagem:</label>
                                          <input type="file" id="profile_image" name="profile_image">
                                       </div>
                                       <div class="form-group col-sm-3">
                                          <label for="fname">Nome:</label>
                                          <input type="text" class="form-control" id="fname" name="name" value="{{ $user->name }}">
                                       </div>
                                       <div class="form-group col-sm-3">
                                          <label for="group">Grupo:</label>
                                          <select class="form-control" id="group" name="group_id">
                                             @foreach($groups as $group)
                                             <option value="{{ $group->id }}" {{ $user->groups->first()->id == $group->id ? 'selected' : '' }}>
                                                {{ $group->name }}
                                             </option>
                                             @endforeach
                                          </select>
                                       </div>
                                       <div class="form-group col-sm-3">
                                          <label for="cep">CEP:</label>
                                          <input type="text" class="form-control" id="cep" name="zip_code" value="{{ $user->zip_code }}">
                                       </div>

                                       <div class="form-group col-sm-3">
                                          <label for="city">Cidade:</label>
                                          <input type="text" class="form-control" id="city" name="city" value="{{ $user->city }}">
                                       </div>

                                       <div class="form-group col-sm-3">
                                          <label for="state">Estado:</label>
                                          <input type="text" class="form-control" id="state" name="state" value="{{ $user->state }}">
                                       </div>
                                       <div class="form-group col-sm-3">
                                          <label for="neighborhood">Bairro:</label>
                                          <input type="text" class="form-control" id="neighborhood" name="neighborhood" value="{{ $user->neighborhood }}">
                                       </div>
                                       <div class="form-group col-sm-6">
                                          <label for="cname">Endereço:</label>
                                          <input type="text" class="form-control" id="address" name="address" value="{{ $user->address }}">
                                       </div>
                                       <div class="form-group col-sm-3">
                                          <label for="cname">Complemento:</label>
                                          <input type="text" class="form-control" id="cname" name="address_complement" value="{{ $user->address_complement }}">
                                       </div>
                                       <!--
                                       <div class="form-group col-sm-3">
                                          <label for="birth_date">Data de Nascimento:</label>
                                          <input type="date" class="form-control" id="birth_date" name="birth_date" value="{{ $user->birth_date }}">
                                       </div>
                                       <!-->
                                       <div class="form-group col-sm-3">
                                          <label for="cname">Número:</label>
                                          <input type="text" class="form-control" id="address_number" name="address_number" value="{{ $user->address_number }}">
                                       </div>
                                       <div class="form-group col-sm-3">
                                          <label for="cname">Telefone:</label>
                                          <input type="text" class="form-control" id="cname" name="phone" value="{{ $user->phone }}">
                                       </div>

                                       <div class="form-group col-sm-3">
                                          <label for="cellphone">Celular:</label>
                                          <input type="text" class="form-control" id="cname" name="phone" value="{{ $user->cellphone }}">
                                       </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary mr-2">Enviar</button>
                                    <a type="reset" href="{{ route('users.index') }}" class="btn iq-bg-danger">Cancelar</a>
                                 </form>
                              </div>
                           </div>
                        </div>
                        <div class="tab-pane fade" id="chang-pwd" role="tabpanel">
                           <div class="iq-card">
                              <div class="iq-card-header d-flex justify-content-between">
                                 <div class="iq-header-title">
                                    <h4 class="card-title">Alterar Senha</h4>
                                 </div>
                              </div>
                              <div class="iq-card-body">
                                 <form action="{{ route('password.update') }}" method="POST">
                                    @csrf
                                    <div class="form-group">
                                       <label for="cpass">Senha Atual:</label>
                                       <a href="" class="float-right">Esqueceu a Senha</a>
                                       <input type="password" class="form-control" id="cpass" name="current_password" value="{{ old('current_password') }}">
                                    </div>
                                    <div class="form-group">
                                       <label for="npass">Nova Senha:</label>
                                       <input type="password" class="form-control" id="npass" name="new_password" value="{{ old('new_password') }}">
                                    </div>
                                    <div class="form-group">
                                       <label for="vpass">Verificar Senha:</label>
                                       <input type="password" class="form-control" id="vpass" name="confirm_password" value="{{ old('confirm_password') }}">
                                    </div>
                                    <button type="submit" class="btn btn-primary mr-2">Enviar</button>
                                    <a type="reset" href="{{ route('users.index') }}" class="btn iq-bg-danger">Cancelar</a>
                                 </form>

                              </div>
                           </div>
                        </div>

                        <div class="tab-pane fade" id="emailandsms" role="tabpanel">
                           <div class="iq-card">
                              <div class="iq-card-header d-flex justify-content-between">
                                 <div class="iq-header-title">
                                    <h4 class="card-title">Email and SMS</h4>
                                 </div>
                              </div>
                              <div class="iq-card-body">
                                 <form>
                                    <div class="form-group row align-items-center">
                                       <label class="col-md-3" for="emailnotification">Email Notification:</label>
                                       <div class="col-md-9 custom-control custom-switch">
                                          <input type="checkbox" class="custom-control-input" id="emailnotification" checked="">
                                          <label class="custom-control-label" for="emailnotification"></label>
                                       </div>
                                    </div>
                                    <div class="form-group row align-items-center">
                                       <label class="col-md-3" for="smsnotification">SMS Notification:</label>
                                       <div class="col-md-9 custom-control custom-switch">
                                          <input type="checkbox" class="custom-control-input" id="smsnotification" checked="">
                                          <label class="custom-control-label" for="smsnotification"></label>
                                       </div>
                                    </div>
                                    <div class="form-group row align-items-center">
                                       <label class="col-md-3" for="npass">When To Email</label>
                                       <div class="col-md-9">
                                          <div class="custom-control custom-checkbox">
                                             <input type="checkbox" class="custom-control-input" id="email01">
                                             <label class="custom-control-label" for="email01">You have new notifications.</label>
                                          </div>
                                          <div class="custom-control custom-checkbox">
                                             <input type="checkbox" class="custom-control-input" id="email02">
                                             <label class="custom-control-label" for="email02">You're sent a direct message</label>
                                          </div>
                                          <div class="custom-control custom-checkbox">
                                             <input type="checkbox" class="custom-control-input" id="email03" checked="">
                                             <label class="custom-control-label" for="email03">Someone adds you as a connection</label>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="form-group row align-items-center">
                                       <label class="col-md-3" for="npass">When To Escalate Emails</label>
                                       <div class="col-md-9">
                                          <div class="custom-control custom-checkbox">
                                             <input type="checkbox" class="custom-control-input" id="email04">
                                             <label class="custom-control-label" for="email04"> Upon new order.</label>
                                          </div>
                                          <div class="custom-control custom-checkbox">
                                             <input type="checkbox" class="custom-control-input" id="email05">
                                             <label class="custom-control-label" for="email05"> New membership approval</label>
                                          </div>
                                          <div class="custom-control custom-checkbox">
                                             <input type="checkbox" class="custom-control-input" id="email06" checked="">
                                             <label class="custom-control-label" for="email06"> Member registration</label>
                                          </div>
                                       </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                    <button type="reset" class="btn iq-bg-danger">Cancle</button>
                                 </form>
                              </div>
                           </div>
                        </div>

                        <div class="tab-pane fade" id="manage-contact" role="tabpanel">
                           <div class="iq-card">
                              <div class="iq-card-header d-flex justify-content-between">
                                 <div class="iq-header-title">
                                    <h4 class="card-title">Gerenciar Contato</h4>
                                 </div>
                              </div>
                              <div class="iq-card-body">
                                 <form action="{{ route('users.update', ['user' => $user->id]) }}" method="POST">
                                    @csrf
                                    @method('PUT')
                                    <div class="form-group">
                                       <label for="phone">Número de Contato:</label>
                                       <input type="text" class="form-control" id="phone" name="phone" value="{{ $user->phone }}">
                                    </div>
                                    <div class="form-group">
                                       <label for="email">Email:</label>
                                       <input type="text" class="form-control" id="email" name="email" value="{{ $user->email }}">
                                    </div>
                                    <button type="submit" class="btn btn-primary mr-2">Enviar</button>
                                    <a type="reset" href="{{ route('users.index') }}" class="btn iq-bg-danger">Cancelar</a>
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
   <!-- Wrapper END -->
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
</script>