const cols = document.querySelectorAll('.col');
const texts = document.querySelectorAll('h2');
const buttons = document.querySelectorAll('button');
const pushes = document.querySelectorAll('.push__copy');

setRandomColor();

document.addEventListener('keydown', event => {

    if (event.code === 'NumpadSubtract') {
        document.body.removeChild(document.querySelector('.col'));
    } else if (event.code === 'NumpadAdd') {
        document.body.appendChild(col);
    }

})

document.addEventListener('keydown', event => {
    if(event.code === 'Space') setRandomColor();
})

function GenerateRandomColor() {
    const posibleNums = '0123456789ABCDEF';
    let color = '#';
    
    for(let i = 0; i < 6; i++) {
        color += posibleNums[Math.floor(Math.random() * 16)];
    }

    return color
}

function setRandomColor() {
    cols.forEach((col, index)=> {
        const btn = buttons[index];
        const text = texts[index];
        const color = GenerateRandomColor();

        console.log(btn.children[0].classList[1])
        if (btn.children[0].classList.contains('fa-lock')) {
            return
        }

        setTextColor(text, btn, color);
        col.style.background = color;
        text.textContent = color;
    })
}

function setTextColor(text, btn, color) {
    const light = chroma(color).luminance()
    text.style.color = light > 0.5 ? 'black' : 'white';
    btn.style.color = light > 0.5 ? 'black' : 'white'
}

buttons.forEach(btn => {
    
    btn.onclick = () => {
        btn.children[0].classList.toggle('fa-lock-open');
        btn.children[0].classList.toggle('fa-lock');
    } 

    btn.onfocus = () => {
        btn.blur();
    }   
        
})

texts.forEach((text, index) => {

    text.onclick = () => {

        navigator.clipboard.writeText(text.textContent);
        pushes[index].style.opacity = '50%';

        setInterval(() => {
            pushes[index].style.opacity = '0';
        }, 1000)

    }

})

