// Product data - COM IMAGENS LOCAIS
const products = [
  {
    id: 1,
    name: "Whey Protein Isolado",
    category: "Proteína",
    price: 149.9,
    oldPrice: 179.9,
    image: "images/products/whey-protein.jpg",
    description: "Whey protein isolado de alta qualidade com 90% de proteína por dose.",
    benefits: [
      "90% de proteína pura",
      "Rápida absorção",
      "Rico em aminoácidos essenciais",
      "Livre de lactose",
      "Sabor delicioso",
    ],
    badge: "MAIS VENDIDO",
  },
  {
    id: 2,
    name: "Creatina Monohidratada",
    category: "Performance",
    price: 89.9,
    oldPrice: 109.9,
    image: "images/products/creatina.jpg",
    description: "Creatina pura para aumento de força e massa muscular.",
    benefits: ["Aumenta força e potência", "Melhora performance", "Acelera recuperação", "100% pura", "Sem sabor"],
    badge: "OFERTA",
  },
  {
    id: 3,
    name: "BCAA 2:1:1",
    category: "Aminoácidos",
    price: 79.9,
    oldPrice: 99.9,
    image: "images/products/bcaa.jpg",
    description: "Aminoácidos de cadeia ramificada para recuperação muscular.",
    benefits: [
      "Previne catabolismo",
      "Acelera recuperação",
      "Reduz fadiga",
      "Proporção ideal 2:1:1",
      "Sabores variados",
    ],
  },
  {
    id: 4,
    name: "Pré-Treino Extreme",
    category: "Pré-Treino",
    price: 119.9,
    oldPrice: 139.9,
    image: "images/products/pre-treino.jpg",
    description: "Fórmula avançada para energia e foco máximo nos treinos.",
    benefits: ["Energia explosiva", "Foco mental", "Pump muscular", "Beta-alanina e cafeína", "Sabor incrível"],
    badge: "NOVO",
  },
  {
    id: 5,
    name: "Multivitamínico",
    category: "Vitaminas",
    price: 59.9,
    oldPrice: 79.9,
    image: "images/products/multivitaminico.jpg",
    description: "Complexo vitamínico completo para atletas.",
    benefits: ["26 vitaminas e minerais", "Suporte imunológico", "Energia natural", "Antioxidantes", "Fácil absorção"],
  },
  {
    id: 6,
    name: "Glutamina",
    category: "Recuperação",
    price: 69.9,
    oldPrice: 89.9,
    image: "images/products/glutamina.jpg",
    description: "L-Glutamina para recuperação e sistema imunológico.",
    benefits: ["Acelera recuperação", "Fortalece imunidade", "Previne overtraining", "100% pura", "Sem sabor"],
  },
  {
    id: 7,
    name: "Caseína Micelar",
    category: "Proteína",
    price: 129.9,
    oldPrice: 149.9,
    image: "images/products/caseina.jpg",
    description: "Proteína de absorção lenta ideal para antes de dormir.",
    benefits: ["Absorção lenta", "Ideal para noite", "Rica em caseína", "Sabor cremoso", "Anti-catabólica"],
  },
  {
    id: 8,
    name: "Termogênico",
    category: "Queima Gordura",
    price: 99.9,
    oldPrice: 119.9,
    image: "images/products/termogenico.jpg",
    description: "Fórmula termogênica para acelerar o metabolismo.",
    benefits: ["Acelera metabolismo", "Queima gordura", "Aumenta energia", "Controla apetite", "Ingredientes naturais"],
    badge: "QUEIMA GORDURA",
  },
]

// Cart functionality
let cart = []
let currentProduct = null

// Função para tratar erro de imagem
function handleImageError(img) {
  img.src = "/placeholder.svg?height=250&width=300"
  img.alt = "Imagem não encontrada"
  console.log("Erro ao carregar imagem:", img.src)
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  loadProducts()
  updateCartCount()
})

// Load products into the grid
function loadProducts() {
  const productsGrid = document.getElementById("productsGrid")
  productsGrid.innerHTML = ""

  products.forEach((product) => {
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  })
}

// Create product card element
function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"
  card.onclick = () => openProductModal(product)

  const badgeHtml = product.badge ? `<div class="product-badge">${product.badge}</div>` : ""
  const oldPriceHtml = product.oldPrice
    ? `<span class="product-old-price">R$ ${product.oldPrice.toFixed(2).replace(".", ",")}</span>`
    : ""

  card.innerHTML = `
    ${badgeHtml}
    <img src="${product.image}" 
         alt="${product.name}" 
         class="product-image"
         loading="lazy"
         onerror="handleImageError(this)">
    <div class="product-info">
      <div class="product-category">${product.category}</div>
      <h3 class="product-title">${product.name}</h3>
      <p class="product-price">R$ ${product.price.toFixed(2).replace(".", ",")} ${oldPriceHtml}</p>
      <p class="product-description">${product.description}</p>
    </div>
  `

  return card
}

// Open product modal
function openProductModal(product) {
  currentProduct = product
  document.getElementById("modalImage").src = product.image
  document.getElementById("modalTitle").textContent = product.name
  document.getElementById("modalPrice").textContent = `R$ ${product.price.toFixed(2).replace(".", ",")}`
  document.getElementById("modalDescription").textContent = product.description

  // Load benefits
  const benefitsContainer = document.getElementById("modalBenefits")
  benefitsContainer.innerHTML = `
    <h4>Benefícios:</h4>
    <ul>
      ${product.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
    </ul>
  `

  document.getElementById("quantity").textContent = "1"
  document.getElementById("productModal").style.display = "block"
}

// Close modal
function closeModal() {
  document.getElementById("productModal").style.display = "none"
}

// Quantity controls
function increaseQuantity() {
  const quantityElement = document.getElementById("quantity")
  let quantity = Number.parseInt(quantityElement.textContent)
  quantity++
  quantityElement.textContent = quantity
}

function decreaseQuantity() {
  const quantityElement = document.getElementById("quantity")
  let quantity = Number.parseInt(quantityElement.textContent)
  if (quantity > 1) {
    quantity--
    quantityElement.textContent = quantity
  }
}

// Add to cart
function addToCart() {
  if (!currentProduct) return

  const quantity = Number.parseInt(document.getElementById("quantity").textContent)

  const cartItem = {
    id: Date.now(),
    productId: currentProduct.id,
    name: currentProduct.name,
    price: currentProduct.price,
    image: currentProduct.image,
    quantity: quantity,
  }

  cart.push(cartItem)
  updateCartCount()
  updateCartDisplay()
  closeModal()

  // Show success message
  alert("Produto adicionado ao carrinho!")
}

// Update cart count
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count")
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems
}

// Toggle cart sidebar
function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar")
  cartSidebar.classList.toggle("open")
  updateCartDisplay()
}

// Update cart display
function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem;">Seu carrinho está vazio</p>'
    cartTotal.textContent = "0,00"
    return
  }

  cartItems.innerHTML = ""
  let total = 0

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"

    const itemTotal = item.price * item.quantity
    total += itemTotal

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-details">Qtd: ${item.quantity}</div>
        <div class="cart-item-price">R$ ${itemTotal.toFixed(2).replace(".", ",")}</div>
      </div>
      <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 1.2rem;">
        <i class="fas fa-trash"></i>
      </button>
    `

    cartItems.appendChild(cartItem)
  })

  cartTotal.textContent = total.toFixed(2).replace(".", ",")
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1)
  updateCartCount()
  updateCartDisplay()
}

// Open checkout
function openCheckout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!")
    return
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  document.getElementById("checkoutTotal").textContent = total.toFixed(2).replace(".", ",")
  document.getElementById("checkoutModal").style.display = "block"
}

// Close checkout modal
function closeCheckoutModal() {
  document.getElementById("checkoutModal").style.display = "none"
}

// Handle checkout form submission
document.getElementById("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("customerName").value
  const phone = document.getElementById("customerPhone").value
  const address = document.getElementById("customerAddress").value
  const paymentMethod = document.getElementById("paymentMethod").value

  // Create WhatsApp message
  let message = `💪 *NOVO PEDIDO - PowerFit Suplementos*\n\n`
  message += `👤 *Cliente:* ${name}\n`
  message += `📱 *WhatsApp:* ${phone}\n`
  message += `📍 *Endereço:* ${address}\n`
  message += `💳 *Pagamento:* ${getPaymentMethodText(paymentMethod)}\n\n`
  message += `🛒 *PRODUTOS:*\n`

  let total = 0
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity
    total += itemTotal
    message += `${index + 1}. ${item.name}\n`
    message += `   Qtd: ${item.quantity} | Valor: R$ ${itemTotal.toFixed(2).replace(".", ",")}\n\n`
  })

  message += `💰 *TOTAL: R$ ${total.toFixed(2).replace(".", ",")}*\n\n`
  message += `Obrigado por escolher a PowerFit! 💪`

  // Encode message for WhatsApp URL
  const encodedMessage = encodeURIComponent(message)
  const whatsappURL = `https://wa.me/5511999998888?text=${encodedMessage}`

  // Open WhatsApp
  window.open(whatsappURL, "_blank")

  // Clear cart and close modal
  cart = []
  updateCartCount()
  updateCartDisplay()
  closeCheckoutModal()
  toggleCart()

  alert("Pedido enviado! Você será redirecionado para o WhatsApp.")
})

// Get payment method text
function getPaymentMethodText(method) {
  switch (method) {
    case "pix":
      return "PIX (5% desconto)"
    case "cartao":
      return "Cartão de Crédito"
    case "boleto":
      return "Boleto Bancário"
    default:
      return method
  }
}

// Scroll to products section
function scrollToProducts() {
  document.getElementById("produtos").scrollIntoView({ behavior: "smooth" })
}

// Close modals when clicking outside
window.onclick = (event) => {
  const productModal = document.getElementById("productModal")
  const checkoutModal = document.getElementById("checkoutModal")

  if (event.target === productModal) {
    closeModal()
  }
  if (event.target === checkoutModal) {
    closeCheckoutModal()
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})
