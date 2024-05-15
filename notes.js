document.getElementById('btn').addEventListener('click', addNote);
showNotes();
function addNote(e){
	e.preventDefault();
	let title=document.getElementById('title').value;
	let description=document.getElementById('des').value;

	let localNotes=localStorage.getItem('notes');
	let notesArr;
	if(localNotes==null){
		notesArr=[];
	}else{
		notesArr=JSON.parse(localNotes);
	}
	notesArr.push({title, description});
	localStorage.setItem('notes', JSON.stringify(notesArr));

	document.getElementById('title').value="";
	document.getElementById('des').value="";

	showNotes();
}

function showNotes(){
	let localNotes=localStorage.getItem('notes');

	if(localNotes == null){
		notesArr=[];
	}else{
		notesArr=JSON.parse(localNotes);
	}

	document.getElementsByClassName("notesShow")[0].innerHTML=" ";

	notesArr.map((ele, index)=>{
		let div=document.getElementsByClassName('notesShow')[0];
		div.innerHTML += `<div class="noteItem" id='note${index}'>
		<div>
			<h2>${ele.title}</h2>
			<p>${ele.description}</p>
		</div>
			<button id="removebtn" onclick="deleteNotes('${ele.title}')"><i class="fa-solid fa-trash"></i></button>
			<button id="editbtn" onclick="editNotes('${ele.title}')"><i class="fa-regular fa-pen-to-square"></i></button>
			<button id='note${index}' class="copybtn" onclick="copyNote(this.id)"><i class="fa-regular fa-copy"></i></button>
			</div>
		`
	})
}

function deleteNotes(title){
	let notes=localStorage.getItem('notes');
	if(notes==null){
		notesArr=[];
	}else{
		notesArr=JSON.parse(notes);
	}
	notesArr=notesArr.filter((ele)=>{
		console.log(ele.title);
		return ele.title !== title;
	})
	localStorage.setItem('notes', JSON.stringify(notesArr));
	showNotes();
}

function editNotes(title){
	let notes=localStorage.getItem('notes');
	if(notes==null){
		notesArr=[];
	}else{
		notesArr=JSON.parse(notes);
	}
	let edit=notesArr.filter((ele)=>{
		return ele.title.includes(title);
	})
	edit.map((ele)=>{
		document.getElementById('title').value=ele.title;
		document.getElementById('des').value=ele.description;
	})
	notesArr=notesArr.filter((ele)=>{
		return ele.title !== (title);
	})
	localStorage.setItem('notes', JSON.stringify(notesArr));
	showNotes();
}

function searchNotes(){
	let searchValue=document.getElementById('search').value;
	// console.log(searchValue);

	// let notes=localStorage.getItem('notes');
	// if(notes==null){
	// 	notesArr=[];
	// }else{
	// 	notesArr=JSON.parse(notes);
	// }

	let notesItems=document.querySelectorAll('.noteItem');
	console.log(notesItems)
	let filterNotes=Array.from(notesItems).filter((ele)=>{
		console.log(ele.innerText);
		if(ele.innerText.includes(searchValue)){
			ele.style.display='block';
		}else{
			ele.style.display='none';
			// ele.nextElementSibling.style.display='none';
			// ele.nextElementSibling.nextElementSibling.style.display='none';

		}
	})

	console.log(filterNotes);
}

function copyNote(id){
	console.log(id);

	let copyNotes=document.getElementById(id);
	let actualNotes=copyNotes.firstElementChild.innerText;

	navigator.clipboard.writeText(actualNotes);

}

function trackWord(id){
	let trackword=document.getElementById(id);
	console.log(trackword.value);

	let length=trackword.value.length;
	console.log(length);

	document.getElementById('countval').innerText=length;


}