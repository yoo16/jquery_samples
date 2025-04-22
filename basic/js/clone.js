const wrap = document.querySelector('[id=card]').parentElement;
const tpl = document.getElementById('card').content;
for (let i = 1; i <= 12; i++) {
    const clone = tpl.cloneNode(true);
    clone.querySelector('h3').textContent = `カード ${i}`;
    wrap.appendChild(clone);
}