var mongoose     = require('mongoose');

var Schema       = mongoose.Schema;

var AgroSchema   = new Schema({
    org_name: {
    	type: String,
    	required: true,
    },
    org_desc: {
        type: String,
        required: true,
    },
    org_type: {
    	type: String,
    	required: true,
    },
    org_location: {
        type: String,
        required: true,
    },
    org_phone_number: {
        type: String,
        default: ''
    },
    org_email: {
        type: String,
        default: ''
    },
    org_website: {
        type: String,
        default: ''
    },
    org_location_lat: {
        type: String,
        default: 1
    },
    org_location_lan: {
        type: String,
        default: 1
    },
    org_image: {
        type: String,
        default: ''
    },
    org_doc: {
        type: String,
        default: ''
    },
    is_approved: {
        type: Boolean,
        default: false
    },
    user_id: String,
    posted_by: String
});
AgroSchema.index({ org_name: 'text', org_desc: 'text', org_type: 'text', org_location: "text" });


module.exports = mongoose.model('Agro', AgroSchema);
