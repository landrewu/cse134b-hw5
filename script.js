document.addEventListener('DOMContentLoaded', function () {
	const stars = document.querySelectorAll(".ratings span");
	const response = document.querySelector(".response");
	const output = document.querySelector("#rating");
	const form = document.querySelector("form");

	document.querySelector(".nojs").style.display = 'none';
	document.querySelector('.ratings').style.display = 'flex';

	stars.forEach (star => {
		star.addEventListener("click", function () {
			let rating = parseInt(star.getAttribute("data-rating"));
			if (rating > 3) {
				response.textContent = "Thank you for your " + rating + " star rating!"
			} else if (rating > 1) {
				response.textContent = "Thank you for your " + rating + " star rating. We'll try to do better!"
			} else {
				response.textContent = "Thank you for your feedback of " + rating + " star. We'll try to do better!"
			}
			output.value = rating;
            form.dispatchEvent(new Event('submit'));
		});
	});

	form.addEventListener('submit', function (event) {
        event.preventDefault();

        const question = document.querySelector('input[name="question"]').value;
        const rating = document.querySelector('input[name="rating"]').value;
		var output = new FormData();
        output.append('question', question);
        output.append('rating', rating);

        fetch('https://httpbin.org/post', {
          method: 'POST',
          body: output,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        output = new FormData();
    });
});

