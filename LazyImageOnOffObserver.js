const LazyImageOnOffObserver = (function(){
	class LazyImageOnOffObserver extends OnOffObserver{
		constructor(){
			super();
			this.targetSelector='.lazy-image-ooo';
		}
		callbackOn(entry,observer){
			console.log('callbackOn',entry.target,entry.intersectionRatio);
		}
		callbackOff(entry,observer){
			console.log('callbackOff',entry.target,entry.intersectionRatio);
		}
		observeAuto(){
			this.createObserver();
			this.observeAll(document.querySelectorAll(this.targetSelector));
		}
		callbackOn(entry,observer){
			if(entry.target.dataset.src){
				entry.target.src = entry.target.dataset.src;
			}
			console.log('image-on',entry.target.src);
			entry.target.dataset.iloooStatus="loaded";
			this.unobserve(entry.target); //이후엔 관찰 안한다.
		}
		callbackOff(entry,observer){ //동작할 일 없음
			// console.log('callbackOff',entry.target,entry.intersectionRatio);
		}
	}
	return LazyImageOnOffObserver;
})()