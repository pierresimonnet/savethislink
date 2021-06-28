const target = document.querySelector('#js-new')
const btn = document.querySelector('#js-new-btn')

function callback (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            btn.classList.remove('button-movable')
        } else {
            btn.classList.add('button-movable')
        }
    });
}

if (target && btn) {
    let observer = new IntersectionObserver(callback)
    observer.observe(target)
}
