//商品リスト
const products = [
  { id: 1, name: 'Tシャツ', price: 4000, img: 'img/apparel.jpg', category: 'apparel' },
  { id: 2, name: 'blackshark v2 pro', price: 20000, img: 'img/blackshark_v2_pro.jpg', category: 'electronics' },
  { id: 3, name: 'キーボード', price: 12000, img: 'img/blackwidow.jpg', category: 'electronics' },
  { id: 4, name: 'イヤフォン', price: 25000, img: 'img/earphone.jpg', category: 'electronics' },
  { id: 5, name: 'キーボード', price: 18000, img: 'img/hantsman_mini.jpg', category: 'electronics' },
  { id: 6, name: 'スマホケース', price: 5000, img: 'img/iphone.jpg', category: 'electronics' },
  { id: 7, name: '椅子', price: 70000, img: 'img/iskur.jpg', category: 'furniture' },
  { id: 8, name: 'ヘッドホン', price: 11000, img: 'img/kraken_v3_pro.jpg', category: 'electronics' },
  { id: 9, name: 'ゲームパッド', price: 18000, img: 'img/wolverine.jpg', category: 'electronics' },
  { id: 10, name: 'マウス', price: 25000, img: 'img/naga_v2_pro.jpg', category: 'electronics' },
];


//商品リストを描画する関数
function displayProducts(products){
  const product_list = document.getElementById('product-list');
  product_list.innerHTML = ''; //product-listの中身を空っぽにする

  products.forEach(product => {
    const product_item = document.createElement('div');//クラスの追加
    product_item.classList.add('product-item')
    product_item.innerHTML = `
      <div class="product-item__img">
        <a href="#">
          <img src="${product.img}" alt="${product.name}">
        </a>
      </div>
      <h3 class = "product-item__name">
        <a href="#">${product.name}</a>
      </h3>
      <p>${product.price.toLocaleString()}円</p>
    `;//テンプレートリテラル(バッククォート``) 金額をカンマ区切りで表示（toLocaleString）
    product_list.appendChild(product_item);//親ノードの子要素の最後に追加
  });
}

//初期表示、または検索などをかけた際の商品の数の表示
function HowManyProducts(){
  const array = document.getElementById("total-items");
  array.textContent = "全" + products.length + "件";
}

displayProducts(products);
HowManyProducts();

//並び替えの処理
document.getElementById('sort').addEventListener('change',function(e){
  const sort_value = e.target.value;
  let sorted_products = [...products];//新しい配列にクローンを作成、追加、合成、マージできる

  if(sort_value === 'price-asc'){
    sorted_products.sort((a,b) => a.price - b.price );
  }else if(sort_value === 'price-desc'){
    sorted_products.sort((a,b) => b.price - a.price );
  }
  displayProducts(sorted_products);
});

//商品名でのフィルタリング処理
document.getElementById('search').addEventListener
('input', function(e){
  const search_value = e.target.value.toLowerCase();
  const filtered_products = products.filter(product => {
    return product.name.toLocaleLowerCase().includes(search_value)
  });
  displayProducts(filtered_products);
  HowManyProducts();
});

// 価格帯でのフィルタリング
document.getElementById('price-filter-btn').addEventListener('click', function () {
  const minPrice = document.getElementById('min-price').value;
  const maxPrice = document.getElementById('max-price').value;

  const filteredProducts = products.filter(product => {
    return (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice);
  });

  displayProducts(filteredProducts);
  document.getElementById('total-items').textContent = "全" + filteredProducts.length + "件";
});

// カテゴリでのフィルタリング
document.getElementById('category').addEventListener('change', function (e) {
  const selectedCategory = e.target.value;

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  displayProducts(filteredProducts);
  document.getElementById('total-items').textContent = "全" + filteredProducts.length + "件";
});