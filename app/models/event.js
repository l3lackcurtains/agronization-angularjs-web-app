var mongoose     = require('mongoose');

var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
    ev_name: {
    	type: String,
    	required: true,
    },
    ev_desc: {
        type: String,
        required: true,
    },
    ev_type: {
    	type: String,
    	required: true,
    },
    ev_location: {
        type: String,
        required: true,
    },
    ev_time: {
        type: String,
        required: true
    },
    ev_phone_number: String,
    ev_email: String,
    ev_website: String,
    ev_location_lat: String,
    ev_location_lan: String,
    ev_image: String,
    is_approved: {
        type: Boolean,
        default: false
    },
    user_id: String,
    posted_by: String
});
EventSchema.index({ ev_name: 'text', ev_desc: 'text', ev_type: 'text', ev_location: "text" });


module.exports = mongoose.model('Event', EventSchema);
