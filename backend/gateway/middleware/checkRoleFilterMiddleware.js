const adminActionClient = require("../grpcClients/adminActionClient");
const { details,segregateValues  } = require("./utils/userRoleCheckUtils");


const  checkRoleFilterMiddleware= async(req, res, next)=>
{
    try{
        const {roleId}= req.user;

        adminActionClient.GetRoleDetails({roleId}, async(err, resp)=>
        {
            if(err)
            {
                console.log(err);
                return next(err);

            }
            console.log(resp);
            const segregatedValue= await segregateValues(resp.filters);
            req.segregateValues= segregatedValue;
            return next();

        });

    }
    catch(err)
    {
        console.log(err);
    }
};


module.exports= checkRoleFilterMiddleware;