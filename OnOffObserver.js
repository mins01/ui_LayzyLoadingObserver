const OnOffObserver = (function(){
	
	let defOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	}
	let callback = function(entries, observer){
		// console.log('observer',observer)
		entries.forEach(entry => {
			//   entry.boundingClientRect
			//   entry.intersectionRatio
			//   entry.intersectionRect
			//   entry.isIntersecting
			//   entry.rootBounds
			//   entry.target
			//   entry.time
			// console.log('entry',entry.isIntersecting);
			if(entry.isIntersecting){
				this.callbackOn(entry,observer);
			}else{
				this.callbackOff(entry,observer);
			}
		});
		return;
	};
	
	class OnOffObserver{
		constructor(){
			this.observer = null;
			this.options = {...defOptions};
			// this.callback = function(entries, observer){return;};
		}
		createObserver(){
			this.observer = new IntersectionObserver(callback.bind(this),this.options);
		}
		observeAll(targets){
			targets.forEach((target)=>{
				this.observe(target);
			})
		}

		observe(target){
			if(!this.observer){ console.warn('this.observer is null'); return;}
			if(target.dataset.observe){ return;}
			target.dataset.observe = "on";
			return this.observer.observe(target);
		}
		unobserveAll(targets){
			targets.forEach((target) => {
				this.unobserve(target);
			});
		}
		unobserve(target){
			if(!this.observer){ console.warn('this.observer is null'); return null}
			delete target.dataset.observe;
			return this.observer.unobserve(target);
		}
		callbackOn(entry,observer){
			console.log('callbackOn',entry.target,entry.intersectionRatio);
		}
		callbackOff(entry,observer){
			console.log('callbackOff',entry.target,entry.intersectionRatio);
		}
	}
	return OnOffObserver;
})()