import React from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

const style = makeStyles(() => ({
  paperStyle: {
    padding: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  imgBox: {
    display: "flex",
    width: "250px",
    height: "170px",
  },
}));

const Cart = (props) => {
  const classes = style();
  const { cart, event, totalAmount, incQuantity, decQuantity } = props;
  
  return (
    <React.Fragment>
      <Grid item xs={12} style={{ padding: "20px" }}>
        {cart.length === 0 ? (
          <Typography variant="h4">
            <ShoppingCart style={{ fontSize: "40px" }} /> Your Cart is Empty !
          </Typography>
        ) : (
          <React.Fragment>
            <Typography variant="h4">
              <ShoppingCart style={{ fontSize: "40px" }} /> Your Cart
            </Typography>
            <Typography variant="h6" style={{ marginTop: "15px" }}>
              Total Items : {cart.length}
            </Typography>
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              Total Amount : &#8377; {totalAmount.toLocaleString()}
            </Typography>
          </React.Fragment>
        )}
      </Grid>
      {cart.map((el, i) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Paper elevation={5} className={classes.paperStyle}>
              <div>
                <img
                  className={classes.imgBox}
                  src={el.image}
                  alt="productImg"
                />
              </div>
              <Typography variant="h5" style={{ marginTop: "15px" }}>
                {el.name}
              </Typography>
              <Typography variant="subtitle1">{el.features}</Typography>
              <Typography variant="h5" style={{ marginTop: "15px" }}>
                &#8377;
                {el.totalPrice
                  ? el.totalPrice.toLocaleString()
                  : el.price.toLocaleString()}
              </Typography>
              <ButtonGroup
                style={{ margin: "10px" }}
                size="small"
                aria-label="small outlined button group"
              >
                <Button
                  variant="contained"
                  style={{
                    outline: "none",
                    backgroundColor: "#0984e3",
                    color: "#fff",
                  }}
                  onClick={() => incQuantity(i)}
                >
                  +
                </Button>
                <Button style={{ outline: "none" }}>{el.quantity}</Button>
                <Button
                  variant="contained"
                  style={{
                    outline: "none",
                    backgroundColor: "#0984e3",
                    color: "#fff",
                  }}
                  onClick={() => decQuantity(i)}
                >
                  -
                </Button>
              </ButtonGroup>
              <Button
                variant="contained"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#c0392b",
                  color: "#fff",
                  outline: "none",
                }}
                onClick={() => event(i)}
              >
                Remove
              </Button>
            </Paper>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};
export default Cart;
