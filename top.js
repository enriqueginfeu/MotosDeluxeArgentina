window.onscroll = function() {
    if(document.documentElement.scrollTop > 400) {
        document.querySelector('.arriba-contenedor').classList.add('show');
    }else{
        document.querySelector('.arriba-contenedor').classList.remove('show');
    }
}

document.querySelector('.arriba-contenedor')
.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})