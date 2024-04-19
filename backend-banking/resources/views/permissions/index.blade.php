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
    <div id="content-page" class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-center">
                            <div class="iq-header-title">
                                <h4 class="card-title">Lista de Permissões</h4>
                            </div>
                        </div>
                        <div class="iq-card-body">
                            <div class="table-responsive">
                                <div class="row justify-content-between">
                                    <div class="col-sm-12 col-md-6">
                                        <div id="user_list_datatable_info" class="dataTables_filter">
                                            <form action="{{ route('permissions.index') }}" method="GET" class="mr-3 position-relative">
                                                <div class="form-group mb-0 d-flex">
                                                    <input type="search" class="form-control" id="exampleInputSearch" name="search" placeholder="Nome" aria-controls="user-list-table" value="{{ request('search') }}">
                                                    <button type="submit" class="btn btn-primary ml-2"><i class="ri-search-line"></i></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6">

                                    </div>
                                </div>
                                <div class="container-fluid">
                                    <div class="row justify-content-end">
                                        <form action="{{ route('permissions.create') }}" class="mr-2">
                                            <button type="submit" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Adicionar">
                                                <i class="ri-user-add-line"></i> Adicionar
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <table id="user-list-table" class="table table-striped table-borderless mt-4" role="grid" aria-describedby="user-list-page-info">
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($permissions as $permission)
                                        <tr>
                                            <td>{{ $permission->name }}</td>
                                            <td>{{ $permission->description }}</td>
                                            <td>
                                                <div class="d-flex align-items-center list-user-action">

                                                    <form action="{{ route('permissions.edit', $permission->id) }}" method="GET" class="mr-2">
                                                        <button type="submit" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Editar">
                                                            <i class="ri-pencil-line"></i>
                                                        </button>
                                                    </form>

                                                    <form action="{{ route('permissions.destroy', $permission->id) }}" method="POST">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete">
                                                            <i class="ri-delete-bin-line"></i>
                                                        </button>
                                                    </form>
                                                </div>
                                            </td>

                                            </td>

                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>

                            </div>
                            <div class="row justify-content-between mt-3">
                                <div id="user-list-page-info" class="col-md-6">
                                    <span>Exibindo {{ $permissions->firstItem() }} a {{ $permissions->lastItem() }} de {{ $permissions->total() }} registros</span>
                                </div>
                                <div class="col-md-6">
                                    <nav aria-label="Navegação de páginas">
                                        <ul class="pagination justify-content-end mb-0">
                                            <li class="page-item {{ ($permissions->onFirstPage()) ? 'disabled' : '' }}">
                                                <a class="page-link" href="{{ $permissions->previousPageUrl() }}" tabindex="-1" aria-disabled="true">Anterior</a>
                                            </li>
                                            @for ($i = 1; $i <= $permissions->lastPage(); $i++)
                                                <li class="page-item {{ ($permissions->currentPage() == $i) ? 'active' : '' }}">
                                                    <a class="page-link" href="{{ $permissions->url($i) }}">{{ $i }}</a>
                                                </li>
                                                @endfor
                                                <li class="page-item {{ ($permissions->currentPage() == $permissions->lastPage()) ? 'disabled' : '' }}">
                                                    <a class="page-link" href="{{ $permissions->nextPageUrl() }}">Próxima</a>
                                                </li>
                                        </ul>
                                    </nav>
                                </div>
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