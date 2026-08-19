const grpc= require('@grpc/grpc-js');
const sequelize = require('../../../db/connection');

const GetAllRoles= async(call, callback)=>
{
    const query= `select id, roleName from roles`
    try{
        const [values, _]= await sequelize.query(query,{
            raw: true,
            replacements:{}
        })

        console.log(values)

        if(values.length== 0)
        {
            callback({
                code: grpc.status.NOT_FOUND,
                details:"Roles not found"
            })
        }

        callback(null, 
            {
                values
            }
        )

    }
    catch(err)
    {
        console.log(err);
        callback({
            details: err.detail || "Internal Server error",
            code: err.code || grpc.status.INTERNAL,
        })
    }
}

module.exports= {GetAllRoles}