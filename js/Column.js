function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnWrapper = $('<div class="wrapper">');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="column-card-list"></ul>');
		var columnDelete = $('<i>').addClass('fas fa-window-close');
		var columnAddCard = $('<a>').addClass('add-card').attr('href', '#').text('+ Add a card');
		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});
		
		columnAddCard.click(function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
				name: cardName,
				bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					var card = new Card(response.id, cardName);
					self.createCard(card);
				}
			});
		});
			
		// KONSTRUOWANIE ELEMENTU KOLUMNY
		columnWrapper.append(columnTitle)
					  .append(columnDelete)
					  .append(columnAddCard);

		column.append(columnWrapper)
				.append(columnCardList);

		return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
	  	this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
		var self = this;
		$.ajax({
		url: baseUrl + '/column/' + self.id,
		method: 'DELETE',
		success: function(response){
			self.element.remove();
		}
		});
	}
};