

document.addEventListener("DOMContentLoaded", event => {
	if (!navigator.serviceWorker) return; 
		navigator.serviceWorker.register("/sw.js").then(function(){
			console.log("Registered Worked!");
		}).catch(function(){
			console.log("Registration failed");
		});
	
});


// ref : https://developers.google.com/web/fundamentals/primers/service-workers/