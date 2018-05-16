// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDescription = $('<p class="card-description"></p>');
		var cardDeleteBtn = $('<i>').addClass('fas fa-window-close');
				
		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		
		card.append(cardDescription);
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
		url: baseUrl + '/card/' + self.id,
		method: 'DELETE',
		success: function(){
			self.$element.remove();
		}
		});
	}
};