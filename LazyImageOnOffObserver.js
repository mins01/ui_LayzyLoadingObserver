const LazyImageOnOffObserver = (function(){
	'use strict';
	class LazyImageOnOffObserver extends OnOffObserver{
		constructor(){
			super();
			this.options.threshold=0;
			this.targetSelector='.lazy-image-ooo:not([data-liooo-status]):not([data-ooo-status])';
			this.targetDatasetName='src';
		}
		static auto(){
			let liooo = new this();
			liooo.observeAuto();
			return liooo;
		}
		observeAuto(){
			if(this.debug){ console.log('LazyImageOnOffObserver::observeAuto()');}
			if(!this.observer) this.createObserver();
			this.observeAll(document.querySelectorAll(this.targetSelector));
		}
		callbackOn(entry,observer){
			if(this.debug) { console.log('callbackOn',entry.target,entry.intersectionRatio); }

			if(entry.target.dataset[this.targetDatasetName]){
				entry.target.src = entry.target.dataset[this.targetDatasetName];
			}
			console.log('image-on',entry.target.src);
			entry.target.dataset.lioooStatus="loaded";
			this.unobserve(entry.target); //이후엔 관찰 안한다. 즉 1번만 동작한다.
		}
		callbackOff(entry,observer){ //동작할 일 없음
			if(this.debug) { console.log('callbackOff',entry.target,entry.intersectionRatio); }
		}
	}
	return LazyImageOnOffObserver;
})()