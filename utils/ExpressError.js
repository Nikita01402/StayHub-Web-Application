class ExpressError extends Error{
    constructor(statuCode,messgae){
        super();
        this.statuCode=statuCode;
        this.message=messgae;
    }
}
module.exports=ExpressError;