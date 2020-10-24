interface Values {
    mass: number;
    height: number;
  }

  const parseArguments = (args: Array<string>): Values => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        mass: Number(args[2]),
        height: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

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

try {
    const { mass, height } = parseArguments(process.argv);
    console.log(BMICalculator(mass, height));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }

  export default BMICalculator