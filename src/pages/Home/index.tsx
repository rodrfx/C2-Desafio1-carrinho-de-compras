import React, { useState, useEffect } from "react";

import { api } from "../../services/api";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import { toast } from "react-toastify";

import { MdAddShoppingCart } from "react-icons/md";
import { ProductList } from "./styles";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  // const { addProduct, cart } = useCart();

  // const cartItemsAmount = cart.reduce((sumAmount, product) => {
  //   // TODO
  // }, {} as CartItemsAmount)

  useEffect(() => {
    function loadProducts() {
      api
        .get("/products")
        .then((response) => setProducts(response.data))
        .catch((error) =>
          toast.error("Erro na requisição, tente novamente!", error)
        );
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    // TODO
  }

  return (
    <ProductList>
      {products &&
        products.map((product) => {
          return (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{formatPrice(product.price)}</span>
              <button
                type="button"
                data-testid="add-product-button"
                // onClick={() => handleAddProduct(product.id)}
              >
                <div data-testid="cart-product-quantity">
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {/* {cartItemsAmount[product.id] || 0} */} 1
                </div>

                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
          );
        })}
    </ProductList>
  );
};

export default Home;
