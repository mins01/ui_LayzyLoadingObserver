const OnOffObserver = (function(){
	'use strict';
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
			this.debug = false;
			this.options = {
				root: null,
				rootMargin: '0px',
				threshold: 0
			}
			// this.callback = function(entries, observer){return;};
		}
		createObserver(){
			if(this.debug){ console.log('OnOffObserver::createObserver()');}
			this.observer = new IntersectionObserver(callback.bind(this),this.options);
		}
		observeAll(targets){
			targets.forEach((target)=>{
				this.observe(target);
			})
		}

		observe(target){
			if(this.debug){ console.log('OnOffObserver::observe()');}
			if(!this.observer){ console.warn('this.observer is null'); return;}
			if(target.dataset.oooStatus){ if(this.debug){ console.log('observe skip : exists target.dataset.oooStatus');} return;}
			target.dataset.oooStatus = "on";
			return this.observer.observe(target);
		}
		unobserveAll(targets){
			if(this.debug){ console.log('OnOffObserver::unobserveAll()');}
			targets.forEach((target) => {
				this.unobserve(target);
			});
		}
		unobserve(target){
			if(this.debug){ console.log('OnOffObserver::unobserve()');}
			if(!this.observer){ console.warn('this.observer is null'); return null}
			delete target.dataset.oooStatus;
			return this.observer.unobserve(target);
		}
		callbackOn(entry,observer){
			if(this.debug){ console.log('callbackOn',entry.target,entry.intersectionRatio); }
		}
		callbackOff(entry,observer){
			if(this.debug){ console.log('callbackOff',entry.target,entry.intersectionRatio); }
		}
	}
	return OnOffObserver;
})()