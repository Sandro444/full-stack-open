import express from 'express';
import BMICalculator from "./bmicalc";
const app = express();

app.get('/hello', (_req , res) => {
  res.send('Hello full stack!');
});


app.get("/bmi", (req,res) => {
    let weight: number = Number(req.query.weight);
    let height: number = Number(req.query.height);
    if(!isNaN(weight) && !isNaN(height)){
        let status: string = BMICalculator(weight,height);
        res.json({
            weight,
            height,
            status
        })
    }else{
        console.log(req.params.weight)
        console.log(req)
        res.send("invalid arguments")
    }
})
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
