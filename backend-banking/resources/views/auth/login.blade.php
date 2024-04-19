@extends('layout', ['hideMenu' => true])
<!doctype html>
<html lang="en">
   <body>
      <!-- loader Start -->
      <div id="loading">
         <div id="loading-center">
         </div>
      </div>
      <!-- loader END -->
        <!-- Sign in Start -->
        <section class="sign-in-page">
            <div class="container bg-white mt-5 p-0">
                <div class="row no-gutters custom-background">
                    <div class="col-sm-6 align-self-center">
                        <div class="sign-in-from">
                            <h1 class="mb-0 dark-signin">Entrar</h1>
                            <p>Informe seu endereço de e-mail e senha para acessar o painel de administração.</p>
                            <form class="mt-4" method="POST" action="{{ url('/login') }}">
                                @csrf <!-- Adicione o token CSRF -->
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Endereço de E-mail</label>
                                    <input type="email" name="email" class="form-control mb-0" id="exampleInputEmail1" placeholder="Informe o endereço de e-mail" required>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Senha</label>
                                    <a href="#" class="float-right">Esqueceu a senha?</a>
                                    <input type="password" name="password" class="form-control mb-0" id="exampleInputPassword1" placeholder="Senha" required>
                                </div>
                                <div class="d-inline-block w-100">
                                    <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1" name="remember">
                                        <label class="custom-control-label" for="customCheck1">Lembrar-me</label>
                                    </div>
                                    <button type="submit" class="btn btn-primary float-right">Entrar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div class="col-sm-6 text-center">
                        <div class="sign-in-detail text-white">
                            <a class="sign-in-logo mb-5" href="#"><img src="images/login/banking_logoatt.png" class="img-fluid" alt="logo"></a>
                            <div class="slick-slider11" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="1" data-items-laptop="1" data-items-tab="1" data-items-mobile="1" data-items-mobile-sm="1" data-margin="0">
                                <div class="item">
                                    <img src="images/banking_logo_att(1).png" class="img-fluid mb-4" alt="logo">
                                    <h4 class="mb-1 text-white">Gerencie seus pedidos.</h4>
                                    <p>Uma empresa fazendo do presente o melhor para o futuro da logística.</p>
                                </div>
                                <div class="item">
                                    <img src="images/banking_logo_att(1).png" class="img-fluid mb-4" alt="logo">
                                    <h4 class="mb-1 text-white">Gerencie seus pedidos.</h4>
                                    <p>Transformando desafios em oportunidades, essa organização se destaca ao moldar o futuro da inovação tecnológica.</p>
                                </div>
                                <div class="item">
                                    <img src="images/banking_logo_att(1).png" class="img-fluid mb-4" alt="logo">
                                    <h4 class="mb-1 text-white">Gerencie seus pedidos.</h4>
                                    <p>Com um compromisso firme com a sustentabilidade, essa empresa está construindo um legado ecoconsciente para o amanhã.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
   </body>
</html>