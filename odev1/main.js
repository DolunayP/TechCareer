const formInput = document.querySelectorAll('.form-input')
const nav = document.querySelector('.navbar')

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

formInput.forEach(input => {
    const label = input.nextElementSibling;
    input.addEventListener('focus', () => {
        label.classList.add('label-clicked');
    })
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            label.classList.remove('label-clicked');
        }
    });
})