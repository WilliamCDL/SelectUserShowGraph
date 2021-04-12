
/*
 * Função AJAX base do tipo assíncrona
 * 'params' é o id do usuário enviado apenas, quando necessário.
 * [Importante!] Você não pode alterar a função xhttpAssincrono.
 */
function xhttpAssincrono(callBackFunction, params) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
          // Chama a função em callback e passa a resposta da requisição
          callBackFunction(this.responseText);
      }
    };
    // Path completo para a requisição AJAX.
    var url = "http://jsonplaceholder.typicode.com/users/";
    if(!isNaN(params)){
        url = url + params +"/todos";
    }
    // Requisição do tipo POST
    xhttp.open("GET", url, true);
    // Definindo o tipo de cabeçalho da requisição.
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}


function buscar(){
    xhttpAssincrono(escreverBusca);
    
}

function escreverBusca(resposta){

    cliente = JSON.parse(resposta);
    var a = document.getElementById("listar");
    //criando select
    var x = document.createElement("SELECT");
    // colocando id = mySelect
    x.setAttribute("id", "mySelect");
    x.setAttribute("onchange","getTodo(this.value)");
    document.getElementById("listar").appendChild(x);

    for (let i = 0; i < cliente.length; i++) {
        //criando opção Volvo, de valor volvocar
        var z = document.createElement("option");
        z.setAttribute("value", cliente[i].id);
        z.setAttribute("id", i);
        //z.setAttribute("onclick","getTodo(this.value)");
        //criando parte textual Volvo a qual fica visivel pro usuario
        var t = document.createTextNode(cliente[i].name);
        //colocando o texto na opção
        z.appendChild(t);
        //colocando a opção no select
        document.getElementById("mySelect").appendChild(z);
      }

}












function getTodo(e){
    xhttpAssincrono(contarTodo,e);
}

function contarTodo(resultado){
    clienteTodo = JSON.parse(resultado);
    var contador=0;
    for (let i = 0; i < clienteTodo.length; i++) {
        if(clienteTodo[i].completed){
            contador=contador+1;
        }
    }

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Todo'],
        ['TODOS \nCompleted', contador],
        ['NOT \nCompleted', clienteTodo.length-contador]
      ]);
      
        // Optional; add a title and set the width and height of the chart
        var options = {'title':'Dayly Activities', 'width':550, 'height':400};
      
        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.PieChart(document.getElementById('pizza'));
        chart.draw(data, options);

}


function vazio(){}

