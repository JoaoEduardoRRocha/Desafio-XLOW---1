async function getProducts() {
  try {
    const response = await fetch('https://desafio.xlow.com.br/search');
    if (!response.ok) {
      throw new Error('Falhou ao pegar dados do produto');
    }
    const data = await response.json();
    showProducts(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

async function getProductDetails(productId) {
  try {
    const response = await fetch(`https://desafio.xlow.com.br/search/${productId}`);
    if (!response.ok) {
      throw new Error('Falhou ao buscar detalhes do produto');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function swapImages(mainImage, miniImage) {
  const changeImg = mainImage.src;
  mainImage.src = miniImage.src;
  miniImage.src = changeImg;
}

async function showProducts(products) {
  const container = document.getElementById('container'); // Obtém o contêiner pelo ID

  // Limpar o contêiner antes de adicionar novos produtos
  container.innerHTML = '';

  for (const product of products) {
    const productDetails = await getProductDetails(product.productId);

    if (productDetails) {
      const productCard = document.createElement('article');
      productCard.className = 'card-container';

      const contentCard = document.createElement('div');
      contentCard.className = 'card-content';

      const productImage = document.createElement('img');
      productImage.className = 'card-content_hero-img';
      productImage.src = productDetails[0].items[0].images[0].imageUrl;
      productImage.alt = `Foto do Produto ${product.productName}`;

      const productName = document.createElement('h2');
      productName.className = 'card-content_name-product';
      productName.textContent = product.productName;

      const productMiniImageContainer = document.createElement('div');
      productMiniImageContainer.className = 'card-content_container-mini-img';
      for (let i = 1; i < productDetails[0].items[0].images.length; i++) {
        const productMiniImage = document.createElement('img');
        productMiniImage.className = 'card-content_mini-img';
        productMiniImage.src = productDetails[0].items[0].images[i].imageUrl;
        productMiniImage.alt = `Foto Pequena do produto ${product.productName}`;

        productMiniImage.addEventListener('click', () => {
          swapImages(productImage, productMiniImage);
        });

        productMiniImageContainer.appendChild(productMiniImage);
      }

      const productPriceContainer = document.createElement('div');
      productPriceContainer.className = 'card-content_price-container';

      const productPriceNormal = document.createElement('p');
      productPriceNormal.className = 'card-content_price-normal';
      productPriceNormal.textContent = `R$ ${productDetails[0].items[0].sellers[0].commertialOffer.Price}`;

      const productPriceRisky = document.createElement('p');
      productPriceRisky.className = 'card-content_price-risky';
      productPriceRisky.textContent = `R$ ${productDetails[0].items[0].sellers[0].commertialOffer.PriceWithoutDiscount}`;

      const buyButton = document.createElement('button');
      buyButton.className = 'card-content_btn';
      buyButton.textContent = 'Comprar';

      productCard.appendChild(contentCard);
      contentCard.appendChild(productImage);
      contentCard.appendChild(productName);
      contentCard.appendChild(productMiniImageContainer);
      productPriceContainer.appendChild(productPriceRisky);
      productPriceContainer.appendChild(productPriceNormal);
      productPriceContainer.appendChild(buyButton);
      contentCard.appendChild(productPriceContainer);
      container.appendChild(productCard);
    }
  }

  function countProducts() {
    const products = document.querySelectorAll('.card-container');
    return products.length;
  }

  const productCountDiv = document.createElement('div');
  productCountDiv.className = 'product-count';

  const existingCountDiv = document.querySelector('.product-count');
  if (existingCountDiv) {
    existingCountDiv.remove();
  }

  document.body.appendChild(productCountDiv);

  const totalProducts = countProducts();
  productCountDiv.textContent = `${totalProducts} produtos`;
}

function toggleButton() {
  const container = document.getElementById('container');
  if (container.classList.contains('section-content-large')) {
    container.classList.remove('section-content-large');
    container.classList.add('section-content-small');
  } else {
    container.classList.remove('section-content-small');
    container.classList.add('section-content-large');
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  const button = document.getElementById('toggle');
  button.addEventListener('click', toggleButton);

  if (!document.getElementById('container')) {
    const container = document.createElement('section');
    container.id = 'container';
    container.classList.add('section-content-large');
    document.body.appendChild(container);
  }
});
