let wrapper = document.getElementById('wrapper');
let header = document.getElementById('header');
isMouseDown = false;
let offsetX = 0;
let offsetY = 0;

function closeWindow() {
    wrapper.classList.add('hidden');
}

function openWindow() {
    wrapper.classList.remove('hidden');
    wrapper.style.left = '';
    wrapper.style.top = '';
    wrapper.classList.add('left-0', 'right-0', 'top-0', 'bottom-0', 'm-auto');
}

header.addEventListener('mousedown', function(e) {
    isMouseDown = true;
    offsetX = wrapper.offsetLeft - e.clientX;
    offsetY = wrapper.offsetTop - e.clientY;
});

document.addEventListener('mousemove', function(e) {
    if (!isMouseDown) return;
    e.preventDefault();
    wrapper.classList.remove('left-0');
    wrapper.classList.remove('top-0');
    wrapper.classList.remove('bottom-0');
    wrapper.classList.remove('right-0');
    wrapper.style.left = (e.clientX + offsetX + 'px');
    wrapper.style.top = (e.clientY + offsetY + 'px');
});

document.addEventListener('mouseup', function(e) {
    isMouseDown = false;
});