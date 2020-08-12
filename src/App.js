import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  makeStyles,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
} from "@material-ui/core";
import { ShoppingCart, Apps} from "@material-ui/icons";
import Home from "./Home";
import Cart from "./Cart";
import productList from "./Product";

const style = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#0984e3",
    color: "#fff",
    padding: "20px",
  },
  bar: {
    display: "flex",
    padding: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function App() {
  const classes = style();

  const [value, setValue] = useState("Home");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(productList);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (cart.length) {
      const price = cart.map((el) => el.totalPrice);
      const newTotalAmount = price.reduce((total, num) => {
        return total + num;
      });

      setTotalAmount(newTotalAmount);
    }
  }, [cart]);

  const updateProduct = (id, type) => {

    const productId = products.map((el) => el.id);
    const index = productId.indexOf(id);

    const updatedProducts = [...products];
    const newProduct = { ...products[index] };

    type === "add"
      ? (newProduct.addToCart = true)
      : (newProduct.addToCart = false);
    updatedProducts[index] = { ...newProduct };
    setProducts(updatedProducts);
  };

  const addToCart = (product) => {
    const index = products.indexOf(product);
    const cartProduct = { ...products[index] };

    // adding quantity , totalPrice and added properties in cart product
    cartProduct.quantity = 1;
    cartProduct.totalPrice = cartProduct.price;
    const newCart = cart.concat(cartProduct);
    setCart(newCart);
    updateProduct(product.id, "add");
  };

  const removeFromCart = (id) => {
    const newCart = [...cart];
    const removedProduct = newCart.splice(id, 1);
    setCart(newCart);
    updateProduct(removedProduct[0].id, "remove");
  };

  const updateCart = (id,type) => {
    const cartProduct = { ...cart[id] };
    const newCart = [...cart];
    type === "increase"
      ? (cartProduct.quantity += 1)
      : cartProduct.quantity === 1
      ? (cartProduct.quantity = cartProduct.quantity)
        : (cartProduct.quantity -= 1);
    
    //updating totalprice of product
    cartProduct.totalPrice = cartProduct.price * cartProduct.quantity;
    newCart[id] = { ...cartProduct };
    setCart(newCart);
  };

  const incQuantity = (id) => {
    updateCart(id, "increase");
  };
  const decQuantity = (id) => {
    updateCart(id, "decrease");
  };

  return (
    <div className={classes.root}>
      <Container className={classes.header} maxWidth={false}>
        <Typography variant="h4">
          <ShoppingCart fontSize="large" /> Shopping Cart Model
        </Typography>
      </Container>
      <Container className={classes.bar} maxWidth={false}>
        <BottomNavigation
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          showLabels
        >
          <BottomNavigationAction
            label="Home"
            value="Home"
            style={{
              outline: "none",
            }}
            icon={<Apps />}
          />
          <BottomNavigationAction
            label="Cart"
            value="Cart"
            style={{
              outline: "none",
            }}
            icon={
              <Badge badgeContent={cart.length} color="primary">
                <ShoppingCart />
              </Badge>
            }
          />
        </BottomNavigation>
      </Container>
      <div style={{ padding: "8px" }}>
        <Grid container spacing={2} style={{ marginTop: "5px", flexGrow: 1 }}>
          {value === "Home" ? (
            <Home event={addToCart} products={products} />
          ) : (
            <Cart
              cart={cart}
              event={removeFromCart}
              totalAmount={totalAmount}
              incQuantity={incQuantity}
              decQuantity={decQuantity}
            />
          )}
        </Grid>
      </div>
    </div>
  );
}

export default App;
