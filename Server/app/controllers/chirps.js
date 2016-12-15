var express = require('express'),
	logger = require('../../config/logger'),
	mongoose = require('mongoose'),
	Chirp = mongoose.model('Chirp'),
	passportService = require('../../config/passport'),
	passport = require('passport'),
	router = express.Router();

var requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function (app) {
	app.use('/api', router);  

	router.route('/chirps')	

		.get(requireAuth, function (req, res, next) {
	//	.get( function (req, res, next) {
      		logger.log('Get chirps', 'debug');
     		var query = Chirp.find()
        		.sort(req.query.order)
        		.exec()
        		.then(function (result) {
         			res.status(200).json(result);
        		})
        		.catch(function(err){
         			return next(err);
        		});
    	})


		.post(requireAuth, function (req, res, next) {
	//	.post(function (req, res, next) {
      		logger.log('Create chirp', 'info');
			  logger.log(req.body);
      		var chirp = new Chirp(req.body);
     		chirp.save()
      			.then(function (result) {
					  
          			res.status(201).json(result);
     			})
      			.catch(function(err){
         			return next(err);
      			});
    	})

		.put(requireAuth, function (req, res, next) {
      		logger.log('Update Chirp ' + req.params.id, 'verbose');
      		var query = Chirp.findOneAndUpdate(
				{ _id: req.body._id }, 
				req.body, 
				{ new: true })
      			.exec()
      			.then(function (result) {
          			res.status(200).json(result);
     			})
      			.catch(function(err){
          			return next(err);
      			});
    	});

    
    router.route('/chirps/:id')
		.get(requireAuth, function (req, res, next) {
      		logger.log('Get chip ' + req.params.id, 'verbose');
      		var query = Chirp.findById(req.params.id)
        	.exec()
        	.then(function (result) {
         		 res.status(200).json(result);
        	})
       		.catch(function(err) {
          		return next(err);
        	});
    	})

		.delete(requireAuth, function (req, res, next) {
      		logger.log('Delete chirp ' + req.params.id, 'verbose');
      		var query = Chirp.remove({ _id: req.params.id })
        		.exec()
        		.then(function (result) {
          			res.status(204).json({ message: 'Record deleted' });
        		})
        		.catch(function (err) {
          			return next(err);
        		});
    		})
    ;
    router.route('/chirps/userChirps/:id')

	.get(requireAuth, function(req, res,next){
        //add some logic if there is id not found
		logger.log('Get User Chirps ' + req.params.id, 'verbose');
		//Chirp.find({chirpAuthor: req.params.id})
		Chirp.find({user: req.params.id})
			.populate('chirpAuthor')
			//.populate('user')
			.sort("-dateCreated")
			.exec()
			.then(function(chirps){
				res.status(200).json(chirps);
			})
			.catch(function(err){
				return next(err);
			});
	});

     router.route('/chirps/like/:id')
            .put(requireAuth, function(req, res, next){
                logger.log('Update Chirp ' + req.params.id,'debug');
      	        Chirp.findOne({_id: req.params.id}).exec()
		        .then(function(chirp){
          			chirp.likes++;
          			return chirp.save();
		        })
		        .then(function(chirp){
			        res.status(200).json(chirp);
		        })
	            .catch(function (err) {
		            return next(err);
	            });

        });
            

};
