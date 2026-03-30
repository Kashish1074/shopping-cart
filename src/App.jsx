import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const products = [
    { id: 1, name: "Shoes", price: 2000 },
    { id: 2, name: "T-Shirt", price: 800 },
    { id: 3, name: "Jeans", price: 1500 },
  ];

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQty = (id, amount) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty + amount }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const itemCount = cart.reduce((count, item) => count + item.qty, 0);

  return (
    <div className="app">
      <header className="header">
        <h1> Shopping Cart</h1>
        <div className="badge">{itemCount}</div>
      </header>

      <div className="grid">
        {/* Products */}
        <div className="products">
          <h2>Products</h2>
          {products.map((p) => (
            <div key={p.id} className="card">
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <button onClick={() => addToCart(p)}>Add</button>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="cart">
          <h2>Cart</h2>

          {cart.length === 0 ? (
            <p className="empty">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>

                <div className="controls">
                  <button onClick={() => updateQty(item.id, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}>+</button>
                </div>

                <button
                  className="remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}

          <div className="total">
            <h3>Total: ₹{totalPrice}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}