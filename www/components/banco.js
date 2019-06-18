$(document).on('click','#cadastro',function(){
  var parametros = {
    "titulo": $("#titulo").val(),
    "autor": $("#autor").val(),
    "ano": $("#ano").val(),
    "isbn": $("#isbn").val()
    
  }

  $.ajax({
    type:"post",
    url:"https://database-wtf-dsdan7.c9users.io/cadastrar.php",
    data:parametros,
    success:function(data){
      $("#titulo").val(" ");
      $("#autor").val(" ");
      $("#ano").val(" ");
      $("#isbn").val(" ");
      
      navigator.notification.alert(data);
    },
    error:function(data){
      navigator.notification.alert(data);
      //https://uigradients.com/#CoolSky
    }
  });
});
$(document).on("click","#listar",function(){
     $(location).attr("href","listar.html");//jquery metodo attr atributo ação

})
$(document).on("click","#voltar",function(){
  $(location).attr("href","index.html");//Ação do botão voltar
})
function preencher(){
  
 $.ajax({
   type:"post",
   url:"https://database-wtf-dsdan7.c9users.io/listar.php",
   dataType:"json",
   success:function(data){
    var item="";
    $.each(data.livros,function(i,dados){
      item+="<option value='"+dados.ibsn+"'>"+dados.titulo+"</option>";
      
      
    });
    $("#lstLivros").html(item);
    
   },
   error:function(data){
     navigator.notification.alert(data)
   } 
 });
}

$(document).on("change","#lstLivros",function(){
 var codigo =$("option:selected",("#lstLivros")).val();
 $.ajax({
   type:"get",
   url:"https://database-wtf-dsdan7.c9users.io/listarOne.php",
   data:"id="+codigo,
   dataType:"json",
   
   success:function(data){
      $("#titulo").val(data.livros.titulo);
      $("#autor").val(data.livros.autor);
      $("#ano").val(data.livros.ano);
      $("#isbn").val(data.livros.isbn);
      
      
      localStorage.setItem("cod",data.livro.isbn); 
   },
   error:function(data){
     navigator.notification.alert(data)
   } 
 });
});

$(document).on("click","#deletar",function(){

  var cod= parseInt(localStorage.getItem("cod"));
  
$.ajax({
   type:"get",
   url:"https://database-wtf-dsdan7.c9users.io/deletar.php",
   data:"id="+$("#isbn").val(),
   
  
   success:function(data){
      navigator.notification.alert(data);
      location.reload();
   
   },
   error:function(data){
     navigator.notification.alert(data)
   } 
 });
$("#titulo").val(localStorage.getItem("cod"));
});


