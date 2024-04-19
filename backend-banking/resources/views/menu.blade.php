@section('menu')
<div class="wrapper">
   <div class="iq-top-navbar">
      <div class="iq-navbar-custom">
         <div class="iq-sidebar-logo">
            <div class="top-logo">
               <a href="index.html" class="logo">
                  <div class="iq-light-logo">
                     <img src="images/logo.gif" class="img-fluid" alt="">
                  </div>
                  <div class="iq-dark-logo">
                     <img src="images/logo-dark.gif" class="img-fluid" alt="">
                  </div>
                  <span>vito</span>
               </a>
            </div>
         </div>
         <nav class="navbar navbar-expand-lg navbar-light p-0">
            <div class="navbar-left">
               <ul id="topbar-data-icon" class="d-flex p-0 topbar-menu-icon">

               </ul>

            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
               <i class="ri-menu-3-line"></i>
            </button>
            <div class="iq-menu-bt align-self-center">
               <div class="wrapper-menu">
                  <div class="main-circle"><i class="ri-arrow-left-s-line"></i></div>
                  <div class="hover-circle"><i class="ri-arrow-right-s-line"></i></div>
               </div>
            </div>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
               <ul class="navbar-nav ml-auto navbar-list">
                  <li class="nav-item">

                  </li>

                  <li class="nav-item">
                     <a href="#" class="search-toggle iq-waves-effect">
                     </a>
                     <div class="iq-sub-dropdown">

                     </div>
                  </li>
                  <li class="nav-item dropdown">
                     <a href="#" class="search-toggle iq-waves-effect">
                     </a>
                     <div class="iq-sub-dropdown">

                     </div>
                  </li>
               </ul>
            </div>
            <ul class="navbar-list">
               <li>
                  <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center bg-primary rounded">
                     <img src="/images/user/banking_logo.png" class="img-fluid rounded mr-3" alt="usuário">
                     <div class="caption">
                        <h6 class="mb-0 line-height text-white">{{ auth()->user()->name ?? null }}</h6>
                        <span class="font-size-12 text-white">Disponível</span>
                     </div>
                  </a>
                  <div class="iq-sub-dropdown iq-user-dropdown">
                     <div class="iq-card shadow-none m-0">
                        <div class="iq-card-body p-0 ">
                           <div class="bg-primary p-3">
                              <h5 class="mb-0 text-white line-height">Olá, {{ auth()->user()->name ?? null }}</h5>
                              <span class="text-white font-size-12">Disponível</span>
                           </div>
                           @if(auth()->user())
                           <a href="{{ route('users.edit', auth()->user()->id) }}" class="iq-sub-card iq-bg-primary-hover">
                              <div class="media align-items-center">
                                 <div class="rounded iq-card-icon iq-bg-primary">
                                    <i class="ri-profile-line"></i>
                                 </div>
                                 <div class="media-body ml-3">
                                    <h6 class="mb-0">Editar Perfil</h6>
                                    <p class="mb-0 font-size-12">Modificar seus detalhes pessoais.</p>
                                 </div>
                              </div>
                           </a>
                           @endif
                           
                           <div class="d-inline-block w-100 text-center p-3">
                              <a class="btn btn-primary dark-btn-primary" href="{{ route('logout') }}" role="button">Sair <i class="ri-login-box-line ml-2"></i></a>
                           </div>
                        </div>
                     </div>
                  </div>
               </li>
            </ul>

         </nav>


      </div>
   </div>
   <div class="iq-sidebar">
      <div class="iq-sidebar-logo d-flex justify-content-between">
         <a href="index.html">
            <div class="iq-light-logo">
               <img src="/images/banking_logo.jpeg" class="img-fluid" alt="">
            </div>
            <div class="iq-dark-logo">
               <img src="/images/logo-dark.gif" class="img-fluid" alt="">
            </div>
            <span>banking</span>
         </a>
         <div class="iq-menu-bt-sidebar">
            <div class="iq-menu-bt align-self-center">
               <div class="wrapper-menu">
                  <div class="main-circle"><i class="ri-arrow-left-s-line"></i></div>
                  <div class="hover-circle"><i class="ri-arrow-right-s-line"></i></div>
               </div>
            </div>
         </div>
      </div>
      <div id="sidebar-scrollbar">
         <nav class="iq-sidebar-menu">
            <ul id="iq-sidebar-toggle" class="iq-menu">
               <li class="iq-menu-title"><i class="ri-subtract-line"></i><span>Menu</span></li>

               <li class="iq-menu-title"><i class="ri-subtract-line"></i><span>Controle</span></li>

               <li class="nav-item {{ str_contains(request()->url(), 'permissions') ? 'active' : '' }}">
                  <a href="{{ route('permissions.index') }}" class="iq-waves-effect"><span>Permissões</span></a>
               </li>

               <li>
                  <a href="#menu-design" class="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><span>Cadastros</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                  <ul id="menu-design" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                     <li class="nav-item {{ request()->is('users') ? 'active' : '' }}">
                        <a class="nav-link" href="{{ route('users.index') }}"><i class="ri-user-line"></i>Usuários</a>
                     </li>

                     <li class="nav-item {{ request()->is('groups') ? 'active' : '' }}">
                        <a class="nav-link" href="{{ route('groups.index') }}"><i class="ri-group-line"></i><span>Grupos</span></a>
                     </li>

                     <li class="nav-item {{ request()->is('group-permissions') ? 'active' : '' }}">
                        <a class="nav-link" href="{{ route('group-permissions.index') }}"><i class="ri-group-line"></i><span>Grupo de Permissões</span></a>
                     </li>

                     <li class="nav-item">
                        <a class="nav-link" href="#"><i class="ri-group-fill"></i><span>Participantes</span></a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="#"><i class="ri-inbox-archive-line"></i><span>Embalagens</span></a>
                     </li>

                     <li class="nav-item">
                        <a class="nav-link" href="#"><i class="ri-car-line"></i><span>Veículos</span></a>
                     </li>

                     <li class="nav-item">
                        <a class="nav-link" href="#"><i class="ri-timer-line"></i><span>Prazos</span></a>
                     </li>

                     <li class="nav-item">
                        <a class="nav-link" href="#"><i class="ri-calendar-2-line"></i><span>Feriados</span></a>
                     </li>

                     <li class="nav-item">
                        <a class="nav-link" href="#"><i class="ri-wallet-line"></i><span>CFOP</span></a>
                     </li>

                     <li class="nav-item">
                        <a class="nav-link" href="#"><i class="ri-bar-chart-fill"></i><span>NCM</span></a>
                     </li>

                     <li class="nav-item">
                        <a class="nav-link" href="#"><i class="ri-alert-line"></i><span>Ocorrências</span></a>
                     </li>
                  </ul>
               </li>

               <li class="iq-menu-title"><i class="ri-subtract-line"></i><span>Relatórios</span></li>

               <li class="iq-menu-title"><i class="ri-subtract-line"></i><span>Processo</span></li>

               <li class="iq-menu-title"><i class="ri-subtract-line"></i><span>Notas Fiscais</span></li>

               <li class="iq-menu-title"><i class="ri-subtract-line"></i><span>Cte</span></li>

               <li class="iq-menu-title"><i class="ri-subtract-line"></i><span>Vale Embalagens</span></li>

               <li class="iq-menu-title"><i class="ri-subtract-line"></i><span>Cidade e Estados</span></li>

               <li class="iq-menu-title"><i class="ri-subtract-line"></i><span>EDI</span></li>
            </ul>
         </nav>
         <div class="p-3"></div>
      </div>
   </div>
</div>
@show