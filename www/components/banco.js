
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
      item+="<option value='"+dados.cod+"'>"+dados.titulo+"</option>";
      
      
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
      
      localStorage.setItem("codigo",data.livros.cod); 
   },
   error:function(data){
     navigator.notification.alert(data)
   } 
 });
});

$(document).on("click","#deletar",function(){
    var cod=localStorage.getItem("codigo");
  
    $.ajax({
   
   type:"get",
   url:"https://database-wtf-dsdan7.c9users.io/deletar.php",
   data:"id="+cod,
   
  
   success:function(data){
      navigator.notification.alert(data);
      location.reload();
      
   
   },
   error:function(data){
     navigator.notification.alert(data)
   } 
 });

});

function editar(){
 $( "#titulo" ).prop( "disabled", false );
  $( "#autor" ).prop( "disabled", false );
  $( "#ano" ).prop( "disabled", false );
  $( "#isbn" ).prop( "disabled", false );
}
function salvar(){
  $( "#titulo" ).prop( "disabled", true );
  $( "#autor" ).prop( "disabled", true );
  $( "#ano" ).prop( "disabled", true );
  $( "#isbn" ).prop( "disabled", true );
}

$(document).on("click","#editar",function(){
 editar();
});

///COMEÇO DA GAMBIARRA DO SALVAR
$(document).on('click','#atualizar',function(){
  
  //♦salvar();
  var codi=localStorage.getItem("codigo");
  var parametros = {
    
    "titulo": $("#titulo").val(),
    "autor": $("#autor").val(),
    "ano": $("#ano").val(),
    "isbn": $("#isbn").val(),
    "cod":codi,
    }

  $.ajax({
    type:"post",
    url:"https://database-wtf-dsdan7.c9users.io/atualizar.php",
    data:parametros,
    success:function(data){
      $("#titulo").val(" ");
      $("#autor").val(" ");
      $("#ano").val(" ");
      $("#isbn").val(" ");
      preencher();
      navigator.notification.alert(data);
    },
    error:function(data){
      navigator.notification.alert(data);
      //https://uigradients.com/#CoolSky
    }
  });
  
});


