interface Output {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
};
const trainingCalc = (days: Array<number>) : Output => {
    let periodLength = days.length;
    let trainingDays = 0;
    for(let i:number = 0; i < periodLength; i++){
        if(days[i] > 0){
            trainingDays++
        }
    }
    let target = Math.floor(periodLength / 2);

    let success = trainingDays >= target? true : false;

    let rating = trainingDays >= periodLength? 3 : trainingDays >= periodLength/2? 2 : 1;

    let ratingDescription = rating === 3? "Wow, you warked all the day": rating === 2? "You could have worked harder":"you worked not so hard"
    
    let sum = days.reduce((prev:number, cur:number) => prev += cur, 0);
    let average = sum / periodLength;
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

export default trainingCalc;