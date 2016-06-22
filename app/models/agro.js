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
    org_phone_number: String,
    org_email: String,
    org_website: String,
    org_location_lat: String,
    org_location_lan: String,
    org_image: String,
    is_approved: Boolean,
    user_id: String,
    posted_by: String
});
AgroSchema.index({ org_name: 'text', org_desc: 'text', org_type: 'text', org_location: "text" });

module.exports = mongoose.model('Agro', AgroSchema);
