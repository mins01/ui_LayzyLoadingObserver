const FloatingOnOffObserver = (function(){
	'use strict';
	class FloatingOnOffObserver extends OnOffObserver{
		constructor(){
			super();
			this.options.threshold=1;
			this.targetSelector='.fooo-container:not([data-ooo-status])';
			// this.targetDatasetName='src';
		}
		static auto(){
			let fooo = new this();
			fooo.observeAuto();
			return fooo;
		}
		observeAuto(){
			if(this.debug){ console.log('FloatingOnOffObserver::observeAuto()');}
			if(!this.observer) this.createObserver();
			this.observeAll(document.querySelectorAll(this.targetSelector));
		}
		setfoooXY(entry,observer){
			let rect = entry.boundingClientRect;
			if(window.visualViewport.height-rect.bottom <=0){
				entry.target.dataset.foooY='under';
			}else if(rect.top<=0){
				entry.target.dataset.foooY='over';
			}else{
				entry.target.dataset.foooY='shown';
			}
		}
		callbackOn(entry,observer){
			if(this.debug) { console.log('callbackOn',entry.target,entry.intersectionRatio); }
			this.setfoooXY(entry,observer);
			entry.target.classList.remove('fooo-floating');
		}
		callbackOff(entry,observer){ 
			if(this.debug) { console.log('callbackOff',entry.target,entry.intersectionRatio); }
			this.setfoooXY(entry);
			entry.target.classList.add('fooo-floating');
		}
	}
	return FloatingOnOffObserver;
})()