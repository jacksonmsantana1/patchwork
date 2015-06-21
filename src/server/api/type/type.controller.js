'use strict';

var Type = require('./type.model');

module.exports = {
    getByName: function (req, res) {
        console.log('Finding type _name: ' + req.params.name);

            if (req.params.name) {
                Type.find({name: req.params.name}, function(err, data) {
                    if(err){
                        console.log(err);
						res.status(500).json({ok: false, message: err });
                    }else{
                        console.log(data);
						res.status(200).json({ok: true, types: data})
                    }
                });
            }else{
				res.status(400).json({ok: false, message: 'Missing :name from the url.' });
            }
        },
    getTypes: function (req, res) {
		console.log('Finding all the types' + req.url);

		Type.find({}, function (err, data) {
			if (err) {
				res.send(500, {ok: false, message: err});
			} else {
				res.status(200).json({ok: true, types: data});
			}
		});

	}
};
