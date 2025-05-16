const carrosseis = {
      doces: {
        currentSlide: 0,
        totalSlides: 3,
        container: document.getElementById('carrossel-doces'),
        dots: document.querySelectorAll('#nav-doces .carrossel-dot')
      },
      salgados: {
        currentSlide: 0,
        totalSlides: 3,
        container: document.getElementById('carrossel-salgados'),
        dots: document.querySelectorAll('#nav-salgados .carrossel-dot')
      }
    };

    // Mover carrossel
    function moverCarrossel(tipo, direcao) {
      const carrossel = carrosseis[tipo];
      carrossel.currentSlide += direcao;
      
      // Verificar limites
      if (carrossel.currentSlide < 0) {
        carrossel.currentSlide = carrossel.totalSlides - 1;
      } else if (carrossel.currentSlide >= carrossel.totalSlides) {
        carrossel.currentSlide = 0;
      }
      
      // Atualizar posição
      const slideWidth = carrossel.container.querySelector('.produto').offsetWidth + 30;
      carrossel.container.style.transform = `translateX(-${carrossel.currentSlide * slideWidth}px)`;
      
      // Atualizar dots
      updateDots(tipo);
    }

    // Ir para slide específico
    function irParaSlide(tipo, slideIndex) {
      const carrossel = carrosseis[tipo];
      carrossel.currentSlide = slideIndex;
      
      // Atualizar posição
      const slideWidth = carrossel.container.querySelector('.produto').offsetWidth + 30;
      carrossel.container.style.transform = `translateX(-${carrossel.currentSlide * slideWidth}px)`;
      
      // Atualizar dots
      updateDots(tipo);
    }

    // Atualizar dots de navegação
    function updateDots(tipo) {
      const carrossel = carrosseis[tipo];
      
      // Remover classe active de todos os dots
      carrossel.dots.forEach(dot => dot.classList.remove('active'));
      
      // Adicionar classe active ao dot atual
      carrossel.dots[carrossel.currentSlide].classList.add('active');
    }

    // Auto-rotacionar carrosseis
    setInterval(() => {
      moverCarrossel('doces', 1);
      moverCarrossel('salgados', 1);
    }, 5000);

    // Inicializar dots
    updateDots('doces');
    updateDots('salgados');

    // Carrinho de Compras
    let cart = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartContainer = document.getElementById('cart-container');
    const closeCart = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const totalValue = document.getElementById('total-value');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const cartActions = document.getElementById('cart-actions');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const destaqueBtn = document.getElementById('destaque-btn');

    // Abrir/Fechar Carrinho
    cartIcon.addEventListener('click', () => {
      cartOverlay.classList.add('active');
      cartContainer.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
      cartOverlay.classList.remove('active');
      cartContainer.classList.remove('active');
    });

    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        cartOverlay.classList.remove('active');
        cartContainer.classList.remove('active');
      }
    });

    // Adicionar item ao carrinho
    function addToCart(id, name, price, img) {
      // Verificar se o item já está no carrinho
      const existingItem = cart.find(item => item.id === id);
      
      if (existingItem) {
        // Se já existe, aumenta a quantidade
        existingItem.quantity += 1;
      } else {
        // Se não existe, adiciona novo item
        cart.push({
          id,
          name,
          price: parseFloat(price),
          img,
          quantity: 1
        });
      }
      
      // Atualizar carrinho
      updateCart();
      
    }

    // Remover item do carrinho
    function removeFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      updateCart();
    }

    // Atualizar quantidade de um item
    function updateQuantity(id, newQuantity) {
      const item = cart.find(item => item.id === id);
      if (item) {
        item.quantity = newQuantity;
        if (item.quantity <= 0) {
          removeFromCart(id);
        } else {
          updateCart();
        }
      }
    }

    // Limpar carrinho
    function clearCart() {
      cart = [];
      updateCart();
    }

    // Calcular total do carrinho
    function calculateTotal() {
      return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Atualizar visualização do carrinho
    function updateCart() {
      // Atualizar contador do ícone
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      document.querySelector('.cart-count').textContent = totalItems;
      
      // Atualizar lista de itens
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
          <div class="empty-cart">
            <i class="fas fa-shopping-cart"></i>
            <p>Seu carrinho está vazio</p>
          </div>
        `;
        cartTotal.style.display = 'none';
        cartActions.style.display = 'none';
      } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
          const cartItemElement = document.createElement('div');
          cartItemElement.className = 'cart-item';
          cartItemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
              <div class="cart-item-quantity">
                <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
              </div>
              <button class="remove-item" onclick="removeFromCart('${item.id}')">Remover</button>
            </div>
          `;
          cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Atualizar total
        const total = calculateTotal();
        totalValue.textContent = total.toFixed(2);
        cartTotal.style.display = 'block';
        cartActions.style.display = 'flex';
      }
      
      // Salvar carrinho no localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Finalizar compra
    function checkout() {
      if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
      }
      
      alert(`Compra finalizada! Total: R$ ${calculateTotal().toFixed(2)}`);
      clearCart();
      cartOverlay.classList.remove('active');
      cartContainer.classList.remove('active');
    }

    // Event Listeners
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        const img = button.getAttribute('data-img');
        addToCart(id, name, price, img);
      });
    });

    // Adicionar o destaque da semana ao carrinho
    if (destaqueBtn) {
      destaqueBtn.addEventListener('click', () => {
        addToCart('11', 'Pão Francês Artesanal', '1.20', './paofrancesfolhado.jpg');
      });
    }

    checkoutBtn.addEventListener('click', checkout);
    clearCartBtn.addEventListener('click', clearCart);

    // Carregar carrinho do localStorage ao iniciar
    function loadCart() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
      }
    }

    // Carregar o carrinho quando a página é carregada
    window.addEventListener('DOMContentLoaded', loadCart);
 z