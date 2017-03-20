import Ember from 'ember';

export default Ember.Route.extend({
	
	model() {
				
		// THIS IS THE FIND ALL CALL (GET)
		this.get('store').findAll('item').then(function(items) {
			items.forEach(function(item) {
				console.log("item = " + item.get('name') + "   " + item.get('price'));
			});
		});

		// THIS IS THE GET SINGLE CALL (GET)
		// this.get('store').findRecord('item', 1).then(function(item) {
		//   console.log("GET 1 = " + item.get('name'));
		// });
		
		
		
		// THIS IS THE UPDATE CALL (PUT)
		// this.get('store').findRecord('item', 1).then(function(item) {
		//   console.log("PUT 1 = " + item.get('name'));
		//
		//   item.set('name', 'Swedish meatballs');
		//
		//   item.save(); // => PATCH to '/items/1'
		// });
		
		// CHECK TO SEE IF PUT WORKED	
		// this.get('store').findRecord('item', 1).then(function(item) {
		//   console.log("GET 2 = " + item.get('name'));
		// });
		
		// THIS IS THE DELETE CALL (DELETE)
		// this.get('store').findRecord('item', 1, { backgroundReload: false }).then(function(item) {
		//   item.destroyRecord(); // => DELETE to /items/1
		// });
		
		// THIS IS THE CREATE CALL (POST)
// 		var newItem = this.get('store').createRecord('item', {
// //			id: 999,
// 		  name: 'Chicken Burrito',
// 		  price: 5.00
// 		});
//
// 		newItem.save(); // => POST to '/items'
	
/*
		var result = [];
		return new Ember.RSVP.Promise(function (resolve, reject) {
		  Ember.$.ajax({
		    type: 'GET',
		    url: 'http://localhost:8080/items',
		    success: function (data) {
				debugger;
		      data.forEach(function (item) {
		        //result.push(App.Test.create(item));
				console.log("item = " + item.name + "   " + item.price);
		      });
		      resolve(result);
		    },
		    error: function (request, textStatus, error) {
		      console.log(error);
		      reject(error);
		    }
		  });
		}); */


	}
});
