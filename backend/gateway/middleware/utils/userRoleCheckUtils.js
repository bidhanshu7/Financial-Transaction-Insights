const segregateValues = async (testing) => {
  let minAmount, maxAmount, minVolume, maxVolume, days;

  for (let i = 0; i < testing.length; i++) {
    const { filterName, filterValue } = testing[i];

    const { min, max, value } = processFilterValue(filterValue);

    switch (filterName) {
      case "volume":
        minVolume = min;
        maxVolume = max;
        break;
      case "amount":
        minAmount = min;
        maxAmount = max;
        break;
      case "days":
        days = value;
        break;
      default:
        break;
    }
  }

  return { minAmount, maxAmount, minVolume, maxVolume, days };
};

const processFilterValue = (filterValue) => {

  if (typeof filterValue === 'number') {
    return { value: filterValue };
  }


  else if (typeof filterValue === 'string') {
    if (filterValue.includes("-")) {
      const [min, max] = filterValue.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        return { min, max };
      } else {
        console.error("Invalid range in filterValue:", filterValue);
        return {};
      }
    }

    else {
      const value = Number(filterValue);
      if (!isNaN(value)) {
        return { value };
      } else {
        console.error("Invalid filterValue:", filterValue);
        return {};
      }
    }
  }

  console.error("Invalid type of filterValue:", filterValue);
  return {};
};

const checkValue= async()=>
{

};


module.exports = { segregateValues };
