const accessControl = require('accesscontrol')
const ac = new accessControl()

exports.roles = ()=>{
    ac.grant('regular')
        .readAny('profile')
        .updateOwn('profile')
        .deleteOwn('profile')

    ac.grant('admin')
        .extend('regular')
        .updateAny('profile')
        .deleteAny('profile')   
    
    return ac;
}