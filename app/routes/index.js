import Ember from 'ember';

export default Ember.Route.extend({
	
	order: null,
	items: null,
	
	model() {
				
		// THIS IS THE FIND ALL CALL (GET)
		// this.get('store').findAll('item').then(function(items) {
		// 	items.forEach(function(item) {
		// 		console.log("item = " + item.get('name') + "   " + item.get('price'));
		// 	});
		// });
		this.set('items', this.get('store').findAll('item'));		
		return this;

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


	},
	
	actions: {		
		
		itemSelected: function(itemId) {
			var currentOrder = this.get('order');
						
			if (currentOrder !== null) {
				var self = this;
						
				var parsedItemId = parseInt(itemId, 10);
				
				var lineItems = currentOrder.lineItems;
				for (var i = 0; i < lineItems.length; i++) {
				    if (lineItems[i].item.id === parsedItemId) {
						Ember.set(lineItems[i], 'cssValue', 'active');
				    } else {
				    	Ember.set(lineItems[i], 'cssValue', '');
				    }
				}
			}			
			
		},
		
		newOrder: function() {
			var self = this;
			
			var result = [];
			var request = new Ember.RSVP.Promise(function (resolve, reject) {
			  Ember.$.ajax({
			    type: 'GET',
			    url: 'http://localhost:8080/order/create',
			    success: function (data) {
			      resolve(data.order);
			    },
			    error: function (request, textStatus, error) {
			      console.log(error);
			      reject(error);
			    }
			  });
			});		
			
			request.then(function(order) {
				self.set('order', order);
			}, function(error) {
			  // handle error (show error message, retry, etc.)
			});
		},
		
		addItem: function(itemId) {
			var currentOrder = this.get('order');
						
			if (currentOrder !== null) {
				var self = this;
						
				var parsedItemId = parseInt(itemId, 10);
				var url = 'http://localhost:8080/order/' + currentOrder.orderId + '/addItem/' + itemId;
				
				var lineItems = currentOrder.lineItems;
				for (var i = 0; i < lineItems.length; i++) {
				    if (lineItems[i].item.id === parsedItemId) {
						// /order/{orderId}/changeQty/{itemId}/{qty}
						var newQty = lineItems[i].qty + 1;
				    	url = 'http://localhost:8080/order/' + currentOrder.orderId + '/changeQty/' + itemId + '/' + newQty;
						break;
				    }
				}
			
				var result = [];
				var request = new Ember.RSVP.Promise(function (resolve, reject) {
				  Ember.$.ajax({
				    type: 'GET',
					url: url,
				    success: function (data) {
				      resolve(data.order);
				    },
				    error: function (request, textStatus, error) {
				      console.log(error);
				      reject(error);
				    }
				  });
				});		
			
				request.then(function(order) {
					self.set('order', order);
				}, function(error) {
				  // handle error (show error message, retry, etc.)
				});		
			}	
		},
		
		submitOrder: function() {
			var currentOrder = this.get('order');
			// /order/{orderId}/addItem/{itemId}
			if (currentOrder !== null) {
				var self = this;
			
				var result = [];
				var request = new Ember.RSVP.Promise(function (resolve, reject) {
				  Ember.$.ajax({
				    type: 'GET',
				    url: 'http://localhost:8080/order/' + currentOrder.orderId + '/submit',
				    success: function (data) {
				      resolve(data.order);
				    },
				    error: function (request, textStatus, error) {
				      console.log(error);
				      reject(error);
				    }
				  });
				});		
			
				request.then(function(order) {
					self.set('order', order);
				}, function(error) {
				  // handle error (show error message, retry, etc.)
				});				
			}		
		},
		
		voidLineItem: function() {			
			var currentOrder = this.get('order');
						
			if (currentOrder !== null) {
				var self = this;
										
				var url = null;
				var lineItems = currentOrder.lineItems;
				for (var i = 0; i < lineItems.length; i++) {
				    if (lineItems[i].cssValue === 'active') {
						// //order/{orderId}/removeItem/{itemId}
				    	url = 'http://localhost:8080/order/' + currentOrder.orderId + '/removeItem/' + lineItems[i].item.id;
						break;
				    }
				}
			
				if (url !== null) {
					var result = [];
					var request = new Ember.RSVP.Promise(function (resolve, reject) {
					  Ember.$.ajax({
					    type: 'GET',
						url: url,
					    success: function (data) {
					      resolve(data.order);
					    },
					    error: function (request, textStatus, error) {
					      console.log(error);
					      reject(error);
					    }
					  });
					});		
			
					request.then(function(order) {
						self.set('order', order);
					}, function(error) {
					  // handle error (show error message, retry, etc.)
					});		
				}
			}				
		}
	}
});
