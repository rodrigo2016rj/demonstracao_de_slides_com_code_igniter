## Sobre
<p>Este sistema é apenas uma demonstração dos slides que eu fiz de diversas formas.</p>

<p>Este sistema serve para divulgar o meu trabalho e também serve como material de estudo para outros programadores.</p>

<p>Este sistema inclui:<br/>
Slide feito com Javascript puro, ou seja sem uso de frameworks para Javascript.<br/>
Slide feito com jQuery (será implementado em breve).<br/>
Slide feito com React (será implementado em breve).</p>

<p>Este sistema utiliza a framework CodeIgniter e o template engine Smarty, mas pode ser adaptado para outras frameworks.</p>

<p>Este sistema foi feito por mim, mas qualquer pessoa é livre para reutilizar e/ou modificar.</p>

<br/>

## Instruções
<p>Para ver o resultado em um ambiente de desenvolvimento siga as instruções:</p>

<p>Inicie o MySQL Server.</p>

<p>Utilize o banco de dados contido no arquivo banco_de_dados_demonstracao_de_slides.sql.</p>

<p>Configure o MySQL Server para que o banco de dados deste sistema seja acessado por username root sem senha.</p>

<p>Se você preferir, você pode configurar neste sistema um outro username e uma outra senha.</p>

<p>Configure seu PHP 8 pelo arquivo php.ini e certifique-se de deixar ativado intl e mbstring.</p>

<p>Coloque o diretório demonstracao_de_slides_com_code_igniter dentro do endereço DocumentRoot do seu Servidor Apache. Exemplo: coloque dentro de htdocs do XAMPP. Geralmente o DocumentRoot é o diretório htdocs do XAMPP e você pode consultar ou mudar o endereço de DocumentRoot pelo arquivo de configuração do Servidor Apache (exemplo: arquivo httpd.conf).</p>

<p>Configure um VirtualHost no Servidor Apache para este sistema.<br/>
Dica: configure com a porta 80 e ServerName localhost ou, se tiver dúvida, faça conforme o manual do CodeIgniter 4.<br/>
Se utiliza XAMPP, o arquivo de configuração do Servidor Apache para VirtualHost será apache\conf\extra\httpd-vhosts.conf<br/>
Exemplo de VirtualHost configurado:<br/>
<code>&lt;VirtualHost *:80&gt;</code><br/>
<code>&nbsp;&nbsp;DocumentRoot "C:\Users\Rodrigo\Servidores\XAMPP001\htdocs\demonstracao_de_slides_com_code_igniter\public"</code><br/>
<code>&nbsp;&nbsp;ServerName localhost</code><br/>
<code>&lt;/VirtualHost&gt;</code></p>

<p>Inicie ou reinicie o Servidor Apache.</p>

<p>Acesse o endereço http://localhost em um navegador.</p>

<br/>
