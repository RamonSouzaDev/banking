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
        <section class="sign-in-">
            <div class="container mt-5 p-0 bg-white">
                <div class="row no-gutters">
                <div class="col-sm-6 align-self-center">
                    <div class="sign-in-from">
                        <h1 class="mb-0">Cadastro</h1>
                        <p>Informe seu nome completo, endereço de e-mail e senha para acessar o painel de administração.</p>
                        <form method="POST" action="{{ url('api/register') }}" class="mt-4">
                            @csrf <!-- Adicione o token CSRF -->

                            <div class="form-group">
                                <label for="fullName">Seu Nome Completo</label>
                                <input type="text" name="name" class="form-control mb-0" id="fullName" placeholder="Seu Nome Completo" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Endereço de E-mail</label>
                                <input type="email" name="email" class="form-control mb-0" id="email" placeholder="Informe o endereço de e-mail" required>
                            </div>
                            <div class="form-group">
                                <label for="password">Senha</label>
                                <input type="password" name="password" class="form-control mb-0" id="password" placeholder="Senha" required>
                            </div>
                            <div class="d-inline-block w-100">
                                <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                    <input type="checkbox" class="custom-control-input" id="customCheck1" required>
                                    <label class="custom-control-label" for="customCheck1">Eu aceito os <a href="#">Termos e Condições</a></label>
                                </div>
                                <button type="submit" class="btn btn-primary float-right">Cadastrar</button>
                            </div>
                            <div class="sign-info">
                                <span class="dark-color d-inline-block line-height-2">Já tem uma conta? <a href="{{ url('/') }}">Faça Login</a></span>
                                <ul class="iq-social-media">
                                    <li><a href="#"><i class="ri-facebook-box-line"></i></a></li>
                                    <li><a href="#"><i class="ri-twitter-line"></i></a></li>
                                    <li><a href="#"><i class="ri-instagram-line"></i></a></li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="col-sm-6 text-center">
                        <div class="sign-in-detail text-white">
                            <a class="sign-in-logo mb-5" href="#"><img src="/images/banking_logo_att(1).png" class="img-fluid" alt="logo"></a>
                            <div class="slick-slider11" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="1" data-items-laptop="1" data-items-tab="1" data-items-mobile="1" data-items-mobile-sm="1" data-margin="0">
                                <div class="item">
                                    <img src="/images/login/banking_logoatt.png" class="img-fluid mb-4" alt="logo">
                                    <h4 class="mb-1 text-white">Gerencie seus pedidos.</h4>
                                    <p>Uma empresa fazendo do presente o melhor para o futuro da logística.</p>
                                </div>
                                <div class="item">
                                    <img src="/images/login/banking_logoatt.png" class="img-fluid mb-4" alt="logo">
                                    <h4 class="mb-1 text-white">Gerencie seus pedidos.</h4>
                                    <p>Transformando desafios em oportunidades, essa organização se destaca ao moldar o futuro da inovação tecnológica.</p>
                                </div>
                                <div class="item">
                                    <img src="/images/login/banking_logoatt.png" class="img-fluid mb-4" alt="logo">
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