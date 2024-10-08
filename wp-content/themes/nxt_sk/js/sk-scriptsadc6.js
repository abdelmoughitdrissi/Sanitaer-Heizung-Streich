document.addEventListener('click', function (event) {
	// console.log(event.target);
	if (!event.target.matches('.feature_blurb_button')) return;
	// find the link target set in the anchor elements inside the blurb
	let toggleTargetParent = event.target.querySelector(".et_pb_module_header");
	// console.log(toggleTargetParent);
	let toggleTargetID = toggleTargetParent.children[0].getAttribute('href');
	let toggleTarget = document.querySelector(toggleTargetID);
	// console.log(toggleTarget);
	let clickedButton = event.target;
	activeContentHandler(clickedButton, toggleTarget);
}, false);

function activeContentHandler(clickedButton, toggleTarget) {
	// pull all buttons and button targets and remove the class "active"
	const buttonList = document.querySelectorAll('.feature_blurb_button');
	const targetList = document.querySelectorAll('.feature_info_row');	
	buttonList.forEach(element => {
		element.classList.remove('active');
	});
	if(targetList.length > 0) {
		targetList.forEach(element => {
			element.classList.remove('active');
		});
	}
	// now set the button to "active"
	clickedButton.classList.toggle('active');
	// set the button target to "active"
	toggleTarget.classList.toggle('active');
	// scroll to target
	nxtScrollTo(toggleTarget);
}

// scroll to target that was just set to "active"
function nxtScrollTo(toggleTarget) {
	var toggleTargetPos = toggleTarget.getBoundingClientRect().top;
	var headerOffset = 140;
	var offsetPosition = toggleTargetPos + window.pageYOffset - headerOffset;
	window.scrollTo({
		top: offsetPosition,
		behavior: "smooth"
	});
}

// if site is being called with URL parameter, set the respective feature to active and scroll to it
let jumpPoint = window.location.hash;
if(jumpPoint.length > 0) {
	let clickedButtonAnchor = document.querySelectorAll('a[href="' + jumpPoint + '"]');
	if(clickedButtonAnchor.length > 0) {
		clickedButton = clickedButtonAnchor[0].closest(".feature_blurb_button");
		if(clickedButton) {
			console.log(clickedButton);
			let toggleTarget = document.querySelector(jumpPoint);
			console.log(toggleTarget);
			if(toggleTarget) {
				activeContentHandler(clickedButton, toggleTarget);
			}
		}
	}
	// console.log(clickedButtonAnchor);
}