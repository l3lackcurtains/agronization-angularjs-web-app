function errorHelper(err, cb) {
    //If it isn't a mongoose-validation error, just throw it.
    if (err.name !== 'ValidationError') return cb(err);
    var messages = {
        'required': "%s is required.",
        'min': "%s below minimum.",
        'max': "%s above maximum.",
        'enum': "%s not an allowed value."
    };

    //A validationerror can contain more than one error.
    var errors = [];

    //Loop over the errors object of the Validation Error
    Object.keys(err.errors).forEach(function (field) {
        var eObj = err.errors[field];

        //If we don't have a message for `type`, just push the error through
        if (!messages.hasOwnProperty(eObj.type)) errors.push(eObj.type);

        //Otherwise, use util.format to format the message, and passing the path
        else errors.push(require('util').format(messages[eObj.type], eObj.path));
    });

    return cb(errors);
}




function (req, res, next) {
    //generate `user` here
    user.save(function (err) {
        //If we have an error, call the helper, return, and pass it `next`
        //to pass the "user-friendly" errors to
        if (err) return errorHelper(err, next);
    }
}