<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta name="description" content="" />
	<meta name="keywords" content="pagina��o jquery, pagina��o jquery quick pagination" />

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
	
<script type="text/javascript" src="http://www.jquery4u.com/demos/jquery-quick-pagination/js/jquery.quick.pagination.min.js"></script>

<link rel="stylesheet" type="text/css" href="css/styless.css">
<link rel="stylesheet" type="text/css" href="css/styles.css">

<script type="text/javascript">
$(document).ready(function() {
	$("ul.pagination1").quickPagination();
	$("ul.pagination2").quickPagination({pagerLocation:"both"});
	$("ul.pagination3").quickPagination({pagerLocation:"both",pageSize:"3"});
});
</script>

<style type="text/css">
#content { background-color:white; }
</style>


<title>Tutorial Pagina&ccedil;&atilde;o com jQuery quick pagination - kadunew.com/blog</title>
</head>
<body onLoad="init()"  >
<div id="page-wrap">

		

  <div id="content">
<h1>Pagina��o com jQuery quick pagination</h1>
<p>Kadunew.com/blog</p>
<h2>Primeiro exemplo</h2>
<p>Op��o padr�o, mostrando  10 itens da lista e navega��o na parte inferior.</p>
           <code>
        	<pre>
    $("ul.pagination1").quickPagination();
            </pre>
        </code>


<ul class="pagination1">
	<li>1 - Item 1 de 25</li>
    <li>2 - Item 2 de 25</li>
    <li>3 - Item 3 de 25</li>
    <li>4 - Item 4 de 25</li>
    <li>5 - Item 5 de 25</li>
    <li>6 - Item 6 de 25</li>

    <li>7 - Item 7 de 25</li>
    <li>8 - Item 8 de 25</li>
    <li>9 - Item 9 de 25</li>
	<li>10 - Item 10 de 25</li>
    <li>11 - Item 11 de 25</li>
    <li>12 - Item 12 de 25</li>

    <li>13 - Item 13 de 25</li>
    <li>14 - Item 14 de 25</li>
    <li>15 - Item 15 de 25</li>
    <li>16 - Item 16 de 25</li>
    <li>17 - Item 17 de 25</li>
    <li>18 - Item 18 de 25</li>

    <li>19 - Item 19 de 25</li>
    <li>20 - Item 20 de 25</li>
    <li>21 - Item 21 de 25</li>
    <li>22 - Item 22 de 25</li>
    <li>23 - Item 23 de 25</li>
    <li>24 - Item 24 de 25</li>
	<li>25 - Item 25 de 25</li>
</ul>

<div class="clearing"></div>

<h2>Segundo exemplo</h2>
<p>Op��es padr�o mostrando 10 itens da lista e navega��o na parte superior e inferior.</p>
            <code>
        	<pre>
   $("ul.pagination2").quickPagination({pagerLocation:"both"});
            </pre>
        </code>
	

 <ul class="pagination2">
	<li>1 - Item 1 de 25</li>
    <li>2 - Item 2 de 25</li>
    <li>3 - Item 3 de 25</li>
    <li>4 - Item 4 de 25</li>
    <li>5 - Item 5 de 25</li>
    <li>6 - Item 6 de 25</li>

    <li>7 - Item 7 de 25</li>
    <li>8 - Item 8 de 25</li>
    <li>9 - Item 9 de 25</li>
	<li>10 - Item 10 de 25</li>
    <li>11 - Item 11 de 25</li>
    <li>12 - Item 12 de 25</li>

    <li>13 - Item 13 de 25</li>
    <li>14 - Item 14 de 25</li>
    <li>15 - Item 15 de 25</li>
    <li>16 - Item 16 de 25</li>
    <li>17 - Item 17 de 25</li>
    <li>18 - Item 18 de 25</li>

    <li>19 - Item 19 de 25</li>
    <li>20 - Item 20 de 25</li>
    <li>21 - Item 21 de 25</li>
    <li>22 - Item 22 de 25</li>
    <li>23 - Item 23 de 25</li>
    <li>24 - Item 24 de 25</li>
	<li>25 - Item 25 de 25</li>
</ul>

<div class="clearing"></div>

<h2>Terceiro Exemplo</h2>
<p>Especificados tr�s itens na lista e navega��o na parte superior e inferior.</p>
            <code>
        	<pre>
   $("ul.pagination3").quickPagination({pagerLocation:"both",pageSize:"3"});
            </pre>
        </code>
		
		
 <ul class="pagination3">
	<li>1 - Item 1 de 25</li>
    <li>2 - Item 2 de 25</li>
    <li>3 - Item 3 de 25</li>
    <li>4 - Item 4 de 25</li>
    <li>5 - Item 5 de 25</li>
    <li>6 - Item 6 de 25</li>

    <li>7 - Item 7 de 25</li>
    <li>8 - Item 8 de 25</li>
    <li>9 - Item 9 de 25</li>
	<li>10 - Item 10 de 25</li>
    <li>11 - Item 11 de 25</li>
    <li>12 - Item 12 de 25</li>

    <li>13 - Item 13 de 25</li>
    <li>14 - Item 14 de 25</li>
    <li>15 - Item 15 de 25</li>
    <li>16 - Item 16 de 25</li>
    <li>17 - Item 17 de 25</li>
    <li>18 - Item 18 de 25</li>

    <li>19 - Item 19 de 25</li>
    <li>20 - Item 20 de 25</li>
    <li>21 - Item 21 de 25</li>
    <li>22 - Item 22 de 25</li>
    <li>23 - Item 23 de 25</li>
    <li>24 - Item 24 de 25</li>
	<li>25 - Item 25 de 25</li>
</ul>

<div class="clearing"></div>
<!-- end plugin html -->

	<p><strong>Refer�ncias:</strong></p>
<ul>
	<li><a href="http://www.jquery4u.com/tutorials/jquery-quick-pagination-list-items/">http://www.jquery4u.com/tutorials/jquery-quick-pagination-list-items/</a></li>

	<li><a href="http://archive.plugins.jquery.com/project/quick_paginate">http://archive.plugins.jquery.com/project/quick_paginate</a></li>
</ul>


</div>
			<div class="backtoblog"></div>
</div> <!-- end page wrap -->

</body>
</html>