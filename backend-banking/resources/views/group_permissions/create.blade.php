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
                                    <h4 class="card-title">Cadastro de Grupo de Permissões</h4>
                                </div>
                            </div>
                            <div class="iq-card-body">
                                <div class="new-user-info">
                                    <form method="POST" action="{{ route('group-permissions.store') }}">
                                        @csrf
                                        <div class="row">
                                            <div class="form-group col-md-6">
                                                <label for="group_id">Grupos:</label>
                                                <select class="form-control" id="group_id" name="group_id">
                                                    @foreach($groups as $groupOption)
                                                    <option value="{{ $groupOption->id }}" {{ $groupOption->id == $groupOption->id ? 'selected' : '' }}>{{ $groupOption->name }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="permission_ids">Permissões:</label>
                                                <select class="form-control" id="permission_ids" name="permission_ids[]" multiple>
                                                    @foreach($permissions as $permission)
                                                    <option value="{{ $permission->id }}">{{ $permission->name }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="iq-card-header d-flex justify-content-left">
                                            <button type="submit" class="btn btn-primary btn-sm btn-scale-down">Cadastrar</button>
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