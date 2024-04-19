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
                           <h4 class="card-title">Alterar Permissão</h4>
                        </div>
                     </div>
                     <div class="iq-card-body">
                        <div class="new-user-info">
                           <form action="{{ route('permissions.update', ['permission' => $permission->id]) }}" method="POST">
                              @csrf
                              @method('PUT')
                              <div class="row">


                                 <div class="form-group col-md-3">
                                    <label for="fname">Nome:</label>
                                    <input type="text" class="form-control" id="fname" readonly placeholder="Nome" value="{{ $permission->name }}">
                                 </div>
                                 <div class="form-group col-md-3">
                                    <label for="lname">Descrição:</label>
                                    <input type="text" class="form-control" id="lname" name="description" placeholder="Descrição" value="{{ $permission->description }}">
                                 </div>

                                 <div class="iq-card-header d-flex justify-content-left">
                                    <button type="submit" class="btn btn-primary btn-sm btn-scale-down">Alterar</button>
                                 </div>
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