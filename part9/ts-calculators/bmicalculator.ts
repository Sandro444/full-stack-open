function BMICalculator(mass: number, height: number): string {
    const index = mass / (height * height);
    if (index >= 18 && index < 25) {
        return "optimal weight";
    } else if (index < 18) {
        return "underweight";
    } else {
        return "overweight";
    }
}

console.log(BMICalculator(70,1.7));