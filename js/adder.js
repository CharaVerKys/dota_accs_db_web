function submitForm() {
    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    formData.append('contrib', generateStringFromCheckboxes());
    formData.append('login_who_add', 'default(WIP)');
    fetch('http://charaverk.ru:3000/add_acc', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json()    
    )
    .then(data => {



        if (data.log && data.log === "notlogged") {
            // Выполнить редирект на /login/

            window.location.href = '/login';
            return;

        }


        const resultElement = document.getElementById('result');

       
            var button = document.getElementById("submitButton");
            
            // Блокируем кнопку
            button.disabled = true;
            button.style.transition = 'all 1s ease';
            button.style.opacity = '.5';
            // Ждем 20 секунд перед разблокировкой кнопки
            setTimeout(function() {
                button.disabled = false;
                button.style.transition = 'all 1s ease';
                button.style.opacity = '1';
            }, 20000); // 20 секунд в миллисекундах
        



        resultElement.innerText = data.data;
        resultElement.style.display = 'block';
        resultElement.style.opacity = '1';
        // Применяем стили через 3 секунды



        setTimeout(() => {
            resultElement.style.transition = 'all 1s ease';
            resultElement.style.opacity = '0';
        }, 3000);
        
        console.log(formData);
        // Скрываем элемент полностью через 4 секунды
        setTimeout(() => {
            resultElement.style.display = 'none';
        }, 4000);



    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function generateStringFromCheckboxes() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var resultString = '';
    checkboxes.forEach(function(checkbox) {
        resultString += (checkbox.checked ? checkbox.name : '-');
    });
    return resultString;
}

