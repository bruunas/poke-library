var bindEvents = function() {

	// Search interation //
	$('.search__box').on('change keyup paste click', '.search-pokemon', function(
		evt
	) {
		var $val = $(this).val();
		// var $target = evt.target;

		$('body').addClass('inputSearchActived');
	});

	$('.search__box').on('focusout', function() {
		$('body').removeClass('inputSearchActived');
	});


	// Selection //
	$('.list-group').on('click', '.item-pokemon a', function(evt) {
		evt.preventDefault();

		var $this = $(this),
			name = $this.attr('data-pokemon');

		requestAboutPokemon(name);
	});
};

var pokemonList = function(pokemons) {
	var items = pokemons.forEach(function(item) {
		var html = [
			"<li class='list-group__item item-pokemon'>",
			"<a href='#' title='" +
				item.name +
				"' data-pokemon='" +
				item.name +
				"'>" +
				item.name +
				"</a>",
			"</li>"
		].join("");

		$(".list-group").append(html);
	});
};

var datasAboutPokemon = function(data) {
	// console.log("about", data);

	var name = data.name,
		height = data.height,
		weight = data.weight,
		especie = data.species.name,
		types = data.types,
		habilidades = data.abilities,
		xp = data.base_experience;

	// console.log(habilidades);

	$(".name-pokemon").text(name);

	var arrTipos = types
		.map(function(arr) {
			return arr.type.name;
		})
		.join(", ");

	var arrHab = habilidades
		.map(function(arr) {
			return arr.ability.name;
		})
		.join(", ");

	// Informations constructor
	$(".item-altura .about-pokemon__item--value").text(height);
	$(".item-peso .about-pokemon__item--value").text(weight);
	$(".item-especia .about-pokemon__item--value").text(especie);
	$(".item-xp .about-pokemon__item--value").text(xp);
	$(".item-habilidade .about-pokemon__item--value").text(arrHab);
	$(".item-tipo .about-pokemon__item--value").text(arrTipos);
};

var requestAboutPokemon = function(name) {
	// pokémon about
	$.get("http://pokeapi.salestock.net/api/v2/pokemon/" + name).then(function(
		data
	) {
		var _this = data;
		console.log(_this);
		datasAboutPokemon(_this);
	});
	$("body").addClass("searchResultActived");
};

var searchAction = function(pokemons) {
	
};

$(function() {
	bindEvents();
	
	// Request API //
	$.ajax({
		url: "http://pokeapi.salestock.net/api/v2/pokemon/?limit=10"
	}).then(function(arr) {
		console.log(arr);

		var _this = arr,
			totalPokemons = _this.count,
			pokemons = _this.results;


		// var pokemonEach = pokemons.forEach(function(data){
		// 	var elemName = data.name,
		// 	 elemURL = data.url;

		// 	// console.log(elemName, elemURL);
			
		// 	// $('.search-pokemon').autocomplete({
		// 	// 	source: elemName.split(",")
		// 	// });
		// });



		// pokemonList(pokemons);
	});
});

$(document).ajaxStop(function() {
	$("#loader-wrapper").removeClass("loaded");
});

$(document).ajaxStart(function() {
	$("#loader-wrapper").addClass("loaded");
});
