let timeoutId;
const selectedTexts = [];

const drawerBtn = document.getElementById("drawer-btn");
const drawer = document.getElementById("drawer");
const closeBtn = document.getElementById("close-btn");
const notesContainer = document.getElementById("notes-container");

let isConfirmationDialogOpen = false;

drawerBtn.addEventListener("click", () => {
	drawer.classList.add("open");
	renderSelectedNotes();
});

closeBtn.addEventListener("click", () => {
	drawer.classList.remove("open");
});

document.addEventListener("selectionchange", () => {
	clearTimeout(timeoutId);

	timeoutId = setTimeout(() => {
		const selection = window.getSelection();
		const selectionContainer = selection.anchorNode.parentNode;

		// Check if selection is inside the drawer div
		if (!drawer.contains(selectionContainer)) {
			if (selection.type === "Range" && !isConfirmationDialogOpen) {
				const selectedText = selection.toString().trim();

				const words = selectedText.split(" ");
				let abbreviatedText = "";

				if (words.length >= 3) {
					abbreviatedText =
						words[0] + " " + words[1] + "..." + words[words.length - 1];
				} else {
					abbreviatedText = selectedText;
				}

				const confirmationDiv = document.createElement("div");
				confirmationDiv.innerHTML = `
              <div style="
                position: absolute;
                top: ${
									selection.getRangeAt(0).getBoundingClientRect().top - 40
								}px;
                left: ${selection.getRangeAt(0).getBoundingClientRect().left}px;
                padding: 10px;
                background-color: white;
                border: 1px solid black;
                border-radius: 4px;

              ">
                <p>Are you sure you want to select this text?</p>
                <p>${abbreviatedText}</p>
                <button id="confirm-selection" style="
                  background-color: rgb(193, 229, 148);
                  border-radius: 3px;
                  padding: 8px 30px;
                  color: white;
                  border: none;
                  margin: 10px;
                  transition: background-color 100ms ease-in-out;
                "><i class="fa fa-check" aria-hidden="true"></i></button>
                <button id="cancel-selection" style="
                  background-color: rgb(231, 173, 173);
                  border-radius: 3px;

                  padding: 8px 30px;
                  color: white;
                  border: none;
                  margin: 10px;
                  transition: background-color 100ms ease-in-out;
                "><i class="fa fa-times" aria-hidden="true"></i></button>
              </div>
            `;

				document.body.appendChild(confirmationDiv);

				isConfirmationDialogOpen = true;

				const confirmButton =
					confirmationDiv.querySelector("#confirm-selection");
				confirmButton.addEventListener("click", () => {
					selectedTexts.push(selectedText);
					console.log(`Selected text: ${selectedText}`);
					console.log(selectedTexts);
					confirmationDiv.remove();
					isConfirmationDialogOpen = false;
					renderSelectedNotes();
				});

				const cancelButton = confirmationDiv.querySelector("#cancel-selection");
				cancelButton.addEventListener("click", () => {
					confirmationDiv.remove();
					isConfirmationDialogOpen = false;
				});
			}
		}
	}, 500);
});

function renderSelectedNotes() {
	notesContainer.innerHTML = "";
	selectedTexts.forEach((selectedText) => {
		const noteDiv = document.createElement("div");
		noteDiv.classList.add("note");
		noteDiv.textContent = selectedText;
		notesContainer.appendChild(noteDiv);
	});
}
