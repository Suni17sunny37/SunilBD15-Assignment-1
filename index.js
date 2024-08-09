let express = require('express');
let app = express();
let cors = require('cors');
app.use(cors());

let port=3000;

let taxRate=5;
let discountPercentage=10;
let loyalityRate=2;


app.get('/cart-total',(req,res)=>{
  let newItemPrice=parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartValue = parseFloat(newItemPrice + cartTotal);
  res.send(totalCartValue.toString());
});

app.get('/membership-discount',(req,res)=>{
  let cartTotal=parseFloat(req.query.cartTotal);
  let isMember=req.query.isMember==='true';
  let finalPrice = isMember ? cartTotal * (1 - discountPercentage / 100) : cartTotal;
  res.send(finalPrice.toString());
  
});

app.get('/calculate-tax',(req,res)=>{
  let cartTotal=parseFloat(req.query.cartTotal);
  let tax=cartTotal*taxRate/100;
  res.send(tax.toString());
});

app.get('/estimate-delivery',(req,res)=>{
  let shippingMethod=req.query.shippingMethod;
  let distance=parseFloat(req.query.distance);
  let days;
  if (shippingMethod==='standard'){
    days=distance/50;
  }
  else{
    days=distance/100;
  }
  res.send(days.toString());
});

app.get('/shipping-cost',(req,res)=>{
  let weight=parseFloat(req.query.weight);
  let distance=parseFloat(req.query.distance);
  let shippingCost=weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points',(req,res)=>{
  let purchaseAmount=parseFloat(req.query.purchaseAmount);
  let loyalityPoints=purchaseAmount*loyalityRate;
  res.send(loyalityPoints.toString());
})


app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});