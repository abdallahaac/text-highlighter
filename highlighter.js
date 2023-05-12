let timeoutId;

document.addEventListener("selectionchange", () => {
	clearTimeout(timeoutId);

	timeoutId = setTimeout(() => {
		const selection = window.getSelection();
		if (selection.type === "Range") {
			const selectedText = selection.toString().trim();
			const words = selectedText.split(" ");
			let abbreviatedText = "";

			if (words.length >= 3) {
				abbreviatedText =
					words[0] + " " + words[1] + "..." + words[words.length - 1];
			} else {
				abbreviatedText = selectedText;
			}

			const confirmation = confirm(
				`Are you sure you want to select this text?\n\n${abbreviatedText}`
			);

			if (confirmation) {
				console.log(`Selected text: ${selectedText}`);
			}
		}
	}, 500);
});
