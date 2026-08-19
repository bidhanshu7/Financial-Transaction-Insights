const transactionClient = require("../../grpcClients/transactionClient");

const getTransactionCountByStatus= async(req, resp, next)=>
{
     let {volume, amount, days, pageNo}= req.query;
     const segregatedValue= req.segregateValues;
   

    let minVolume= segregatedValue. minVolume;
    let maxVolume=segregatedValue.maxVolume;
    let  minAmount=segregatedValue.minAmount;
    let maxAmount=segregatedValue.maxAmount;
    let noOfDays= segregatedValue.days;
  
    if(volume)
    {
       const [userVolumeMin, userVolumeMax]= volume.split("-");
       if(segregatedValue.minVolume >= userVolumeMin && segregatedValue.maxVolume <= userVolumeMax )
       {
        const error = new Error(`You can only see the data volume between ${segregatedValue.minVolume} - ${segregatedValue.maxVolume}`);
        error.status = 400;
        error.extraDetails = "Invalid Volume Count"; 
        return next(error);  

       }
       
       minVolume= userVolumeMin;
        maxVolume=userVolumeMax;
    }

    if(amount)
    {
      const [userAmountMin, userAmountMax]= amount.split("-");

      console.log(userAmountMax);

      if(segregatedValue.minAmount >= userAmountMin && segregatedValue.maxAmount <= userAmountMax )
        {
          console.log(segregatedValue);
          const error= new Error(`You an only see the data Amount between ${segregatedValue.minAmount} - ${segregatedValue.maxAmount}`);
          error.code= 400;
          error.extraDetails = "Invalid Amount Count"; 
          return next(error);
        }

        minAmount=userAmountMin;
         maxAmount=userAmountMax;
    }

    if(days)
    {
      if(segregatedValue.days <= days)
      {
        const error= new Error(`You an only see the data of ${segregatedValue.days} days`);
        error.code= 400;
        error.extraDetails = "Days limit exceeded"; 
          return next(error);
      }
       noOfDays= days;
    }

    try{
        transactionClient.GetTransactionCountByStatus({minVolume,maxVolume,minAmount,maxAmount, noOfDays, pageNo}, (error, response)=>
        {
            if(error)
            {
                console.log(error);
                return next(error);
            }
            else
            {
                return resp.status(200).json(response);
            }
        });
    }
    catch(err)
    {
        console.log(err);
        return next(err);
    }
};

module.exports= {getTransactionCountByStatus};