function addRow() {
    var li = document.createElement('li');

    li.className = 'row';

    //pasar lo del input a la variable nombre

	var nombre = document.getElementById('intro').value;

    li.innerHTML = nombre ;
    
     document.getElementById('content').appendChild(li);
}