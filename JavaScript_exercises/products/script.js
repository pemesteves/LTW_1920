/*
let form = document.getElementsByTagName('form');
console.log(form);

let secondInput = document.querySelector('form label:nth-child(2) input');
console.log(secondInput);

let allInputs = document.querySelectorAll('form input');
console.log(allInputs);
*/

function updateTotal(){
    let lines = document.querySelectorAll('#products tr');
    let total = 0;

    for(let i = 0; i < lines.length; i++){
        let input = lines[i].getElementsByTagName('input')[0];
        
        if(input != null)
            total += Number(input.value); 
    }

    let span_total = document.getElementById('total');

    span_total.innerHTML = total;
}

let form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', function(){
    let table = document.getElementById('products');

    let line = document.createElement('tr');

    let description = document.querySelector('form input[name="description"]').value;
    let quantity = document.querySelector('form input[name="quantity"]').value;

    line.innerHTML = `<td>${description}</td><td><input value="${quantity}"></td><input type="button" value="Remove"></td>`;

    let input = line.getElementsByTagName('input')[0];
    input.addEventListener('keyup', updateTotal);
    
    let remove = line.querySelector('input[type="button"]');
    remove.addEventListener('click', function() {
        this.parentNode.parentNode.remove();
        updateTotal();
    });
    table.append(line);
    updateTotal();
}).preventDefault();
