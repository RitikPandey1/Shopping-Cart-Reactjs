import React from "react";
import { Grid, Paper, makeStyles, Typography, Button } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

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

const Home = (props) => {
  const classes = style();
  return (
    <React.Fragment>
      {props.products.map((el, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Paper elevation={5} className={classes.paperStyle}>
            <div>
              <img className={classes.imgBox} src={el.image} alt="productImg" />
            </div>
            <Typography variant="h5" style={{ marginTop: "15px" }}>
              {el.name}
            </Typography>
            <Typography variant="subtitle1">{el.features}</Typography>
            <Typography variant="h5" style={{ marginTop: "15px" }}>
              &#8377;{el.price.toLocaleString()}
            </Typography>
            {el.addToCart ? (
              <Button variant="outlined" style={{ marginTop: "10px" }} disabled>
                ADDED TO CART
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#0984e3",
                  color: "#fff",
                  outline:'none'
                }}
                startIcon={<AddShoppingCart />}
                onClick={() => props.event(el)}
              >
                Add to cart
              </Button>
            )}
          </Paper>
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default Home;
