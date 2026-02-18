
class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['number'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'number') {
            this.render();
        }
    }

    render() {
        const number = this.getAttribute('number');
        this.shadowRoot.innerHTML = `
            <style>
                .ball {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 24px;
                    font-weight: bold;
                    margin: 5px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
            </style>
            <div class="ball">${number}</div>
        `;
    }
}

customElements.define('lotto-ball', LottoBall);

document.getElementById('generator-btn').addEventListener('click', () => {
    const numbers = new Set();
    while(numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    lottoNumbersContainer.innerHTML = '';
    for (const number of Array.from(numbers).sort((a, b) => a - b)) {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoBall);
    }
});

const themeSwitch = document.getElementById('checkbox');
themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
