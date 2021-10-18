class Validator{
    constructor(){
        this.validations = [
            'data-min-length',
        ]
    }

    validate(form){
        let inputs = form.getElementsByTagName('input');
        let inputsArray = [...inputs];

        inputsArray.forEach(function(input){
            for(let i = 0; this.validations.length > i; i++){
                if(input.getAttribute(this.validations[i]) != null){
                   let method = this.validations[i].replace('data-', '').replace('-','');
                   let value = input.getAttribute(this.validations[i]);

                   this[method](input, value);
                }
            }
        }, this);
    }
    minlength(input, minValue){
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }
    }
    printMessage(input, msg){
        let template = document.querySelector('.error-validation').cloneNode(true);
        
        template.textContent = msg;
        
        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);
    }
}

let form = document.getElementById("registerform");
let submit = document.getElementById("btnsubmit");
let validator = new Validator;

submit.addEventListener('click', function(e){
    e.preventDefault();

    validator.validate(form);

})