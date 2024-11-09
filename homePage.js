// Hàm điều hướng đến trang sản phẩm
function navigateToProducts() {
  window.location.href = 'products.html'; // Chuyển hướng đến products.html
}
function navigateToHomePage() {
  window.location.href = './homePage.html'; // Chuyển hướng đến products.html
}

// Duy trì các chức năng khác
document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
  updateCart();
});

function viewCart() {
  var cart = document.getElementsByClassName('viewCart')[0];
  var mask = document.getElementsByClassName('mask')[0];

  if (cart.style.display == 'none') {
    cart.style.display = 'flex';
    mask.style.display = 'flex';
    cart.style.transition = 'all 2s ease';
  } else {
    cart.style.display = 'none';
    mask.style.display = 'none';
    cart.style.transition = 'all 2s ease';
  }
}

function displayMask() {
  var cart = document.getElementsByClassName('viewCart')[0];
  var mask = document.getElementsByClassName('mask')[0];
  if (mask.style.display == 'flex') {
    mask.style.display = 'none';
    cart.style.display = 'none';
  }
}

// Lưu trữ giỏ hàng trong bộ nhớ tạm thời (localStorage) để giữ dữ liệu khi tải lại trang
let cartt = JSON.parse(localStorage.getItem('cart')) || [];
console.log('cartt:', cartt);
// Hàm cập nhật giỏ hàng
function updateCart() {
  // Lấy phần tử giỏ hàng để hiển thị

  const cartContainer = document.querySelector('.viewCart');
  cartContainer.innerHTML = ''; // Xóa giỏ hàng cũ
  const totalQuantity = cartt.reduce((sum, item) => sum + item.quantity, 0);
  // Duyệt qua các sản phẩm trong giỏ hàng và tạo HTML
  cartt.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cartItem');
    cartItem.innerHTML = `
            <img class="imageCartItem" src="${item.img}" alt="">
            <div class="detailsBakery"> 
                <div id="idItem">${item.id}</div>
                <div class="nameBakery">${item.name}</div>
                <div class="priceItem">
                    <div class="numberPrice">${item.price}</div>
                    <div class="currency">$</div>
                </div>
            </div>
            <div class="quantity">
					      <div class="triangle-up" onclick="increaseQuantity(${item.id})"></div>
					      <div >${item.quantity}</div>
					      <div class="triangle-down" onclick="reduceQuantity(${item.id})"></div>
			    	</div>
			
            <button class="btnDelete" onclick="removeFromCart(${item.id})">
                <img class="imageDelete" src="./image/delteIcon.png" alt="">
            </button>
        `;
    // console.log("itID:" , item.id);
    cartContainer.appendChild(cartItem);
  });
  // const numberCart = document.querySelector('.numberCart');

  // // numberCart.innerText = cartt.length;
  // console.log('numberCart:', numberCart.innerText);

  const numberCart = document.querySelector('.numberCart');
  numberCart.innerText = totalQuantity; // Hiển thị tổng số lượng sản phẩm

  // Hiển thị giỏ hàng (nếu có sản phẩm trong giỏ hàng)
  if (cartt.length > 0) {
    document.getElementsByClassName('numberCart')[0].style.display = 'block';
  } else {
    cartContainer.style.display = 'none';
    document.getElementsByClassName('numberCart')[0].style.display = 'none';
    document.getElementsByClassName('mask')[0].style.display = 'none';
  }

  // Lưu giỏ hàng vào localStorage
  localStorage.setItem('cart', JSON.stringify(cartt));
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(product) {
  // Kiểm tra nếu sản phẩm đã có trong giỏ hàng chưa
  const existingProduct = cartt.find((item) => item.id === product.id);
  console.log('aa: ', existingProduct);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    product.quantity = 1;
    cartt.push(product);
  }
  updateCart();
}
// tang giam so luong san pham
function increaseQuantity(productId) {
  const product = cartt.find((item) => item.id == productId);
  if (product) {
    product.quantity += 1; // Tăng quantity lên 1
  }
  updateCart();
}
function reduceQuantity(productId) {
  const product = cartt.find((item) => item.id == productId);
  if (product) {
    if (product.quantity == 1) {
      removeFromCart(productId);
      return;
    }
    product.quantity -= 1; // Tăng quantity lên 1
  }
  updateCart();
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
  console.log('productID: ', productId);
  cartt = cartt.filter((item) => item.id != productId);
  console.log('cart: ', cartt);

  console.log('delete');
  updateCart();
}

const addCartButtons = document.querySelectorAll('.addCart');
addCartButtons.forEach((button) => {
  button.addEventListener('click', function () {
    // Lấy phần tử chứa thông tin sản phẩm
    const itemElement = this.closest('.item');

    // Tạo sản phẩm với ID tự động và thông tin từ HTML
    const product = {
      id: itemElement.querySelector('#idItem').innerText,
      name: itemElement.querySelector('.nameBakery').innerText,
      price: itemElement.querySelector('.numberPrice').innerText,
      img: itemElement.querySelector('.imageItem').getAttribute('src'),
      quantity: 1, // Mặc đ��nh sản phẩm đã có 1 cái trong gi�� hàng
    };

    // Hàm thêm vào giỏ hàng
    addToCart(product);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const boxes = document.querySelectorAll('.box1');

  function showBoxes() {
    const triggerBottom = window.innerHeight * 0.8;

    boxes.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        box.classList.add('show');
      } else {
        box.classList.remove('show');
      }
    });
  }

  window.addEventListener('scroll', showBoxes);

  // Gọi showBoxes khi tải trang để kiểm tra nếu box nào đó có thể đã nằm trong vùng hiển thị
  showBoxes();
});

// Cập nhật giỏ hàng khi trang tải lại
document.addEventListener('DOMContentLoaded', updateCart);

const container = document.querySelector('.featuredProductBox');
const items = document.querySelectorAll('.ft1');
const totalItems = items.length;

// Sao chép danh sách sản phẩm và nối vào cuối để tạo hiệu ứng cuộn vô tận
for (let i = 0; i < totalItems; i++) {
  container.appendChild(items[i].cloneNode(true));
}

let scrollPosition = 0;
const itemWidth = items[0].offsetWidth + 10; // Độ rộng của mỗi sản phẩm, bao gồm khoảng cách giữa chúng

function scrollProducts() {
  if (scrollPosition >= container.scrollWidth / 2) {
    // Nếu đã đến cuối danh sách, thêm khoảng thời gian ngừng rồi mượt mà quay lại đầu
    container.scrollTo({
      left: 0,
      behavior: 'smooth', // Mượt mà quay lại đầu
    });
    scrollPosition = 0; // Đặt lại vị trí
  } else {
    // Cuộn mượt đến vị trí tiếp theo
    scrollPosition += itemWidth;
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth', // Cuộn mượt mà
    });
  }
}

// Tự động cuộn từng sản phẩm một mỗi 2 giây
setInterval(scrollProducts, 2500);


