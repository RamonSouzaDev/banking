@extends('layout')

@section('content')
<div id="content-page" class="content-page">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="iq-card">
                    <div class="iq-card-header d-flex justify-content-center">
                        <div class="iq-header-title">
                            <h4 class="card-title">Lista de Grupo de Permissões</h4>
                        </div>
                    </div>
                    <div class="iq-card-body">
                        <div class="table-responsive">
                            <div class="row justify-content-between">
                                <div class="col-sm-12 col-md-6">
                                    <div id="user_list_datatable_info" class="dataTables_filter">
                                        <form action="{{ route('groups.index') }}" method="GET" class="mr-3 position-relative">
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
                                    <form action="{{ route('group-permissions.create') }}" class="mr-2">
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
                                    @forelse ($groups as $group)
                                    <tr>
                                        <td>{{ $group->name }}</td>
                                        <td>{{ $group->description }}</td>
                                        <td>
                                            <div class="d-flex align-items-center list-user-action">

                                                <form action="{{ route('group-permissions.show', $group->id) }}" method="GET" class="mr-2">
                                                    <button type="submit" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Ver Permissões">
                                                        <i class="ri-eye-line"></i>
                                                    </button>
                                                </form>

                                                <form action="{{ route('group-permissions.edit', $group->id) }}" method="GET" class="mr-2">
                                                    <button type="submit" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Editar">
                                                        <i class="ri-pencil-line"></i>
                                                    </button>
                                                </form>

                                                <form action="{{ route('group-permissions.destroy', $group->id) }}" method="POST">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Excluir">
                                                        <i class="ri-delete-bin-line"></i>
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td colspan="3">Nenhum grupo encontrado.</td>
                                    </tr>
                                    @endforelse
                                </tbody>
                            </table>

                        </div>
                        <div class="row justify-content-between mt-3">
                            <div id="user-list-page-info" class="col-md-6">
                                <span>Exibindo {{ $groups->firstItem() }} a {{ $groups->lastItem() }} de {{ $groups->total() }} registros</span>
                            </div>
                            <div class="col-md-6">
                                {{ $groups->links() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
