function getChapters(){
	const tblChapter = document.createElement('table');
		tblChapter.className="tblChapters"
	const tbodyChapter = document.createElement('tbody');	
	const trChapter = document.createElement('tr');
	
	for (let chapter in MARDEK) //"const" or "let" variable declaration makes it so the value doesn't change for the eventListener
	{
		const objChapter=MARDEK[chapter]
		console.info(chapter)

		let tdChapter = document.createElement('td');
		let aChapter = document.createElement('a');
			aChapter.id=chapter;
			aChapter.addEventListener('click', function () {
				getCharacters(objChapter); //Event listeners to change chapters
			});
			
		let imgChapter = document.createElement('img');
			imgChapter.src = "Images/Chapters/"+chapter+".png"
			imgChapter.alt = chapter;
		
		aChapter.appendChild(imgChapter)
		tdChapter.appendChild(aChapter)
		trChapter.appendChild(tdChapter)
	}
	tbodyChapter.appendChild(trChapter)
	tblChapter.appendChild(tbodyChapter)
	let loc = document.getElementById("divChapter")
	loc.appendChild(tblChapter)
}

function getCharacters(chapter){
	
	//console.info(chapter)
	let tblCharacter = document.createElement('table');
		tblCharacter.className="tblCharacters"
	let tbodyCharacter = document.createElement('tbody');	
	let trCharacter = document.createElement('tr');
	
	for(let character in chapter){
		//console.info(character)
		const objCharacter=chapter[character]
		if(typeof objCharacter === 'object'){
			//console.info(objCharacter)
			let tdCharacter = document.createElement('td');
			let aCharacter = document.createElement('a');
				aCharacter.id=character;
				aCharacter.addEventListener('click', function () {
					getSkills(objCharacter); //Event listeners to change characters
				});
				
			let imgCharacter = document.createElement('img');
				imgCharacter.src = "Images/Sprites/"+objCharacter.Image+".gif"
				imgCharacter.alt = objCharacter.Name;
			
			aCharacter.appendChild(imgCharacter)
			tdCharacter.appendChild(aCharacter)
			trCharacter.appendChild(tdCharacter)
		}
	}
	
	tbodyCharacter.appendChild(trCharacter)
	tblCharacter.appendChild(tbodyCharacter)
	
	let loc = document.getElementById("divCharacter")
	let oldCharList=document.getElementsByClassName("tblCharacters")[0]
	if(oldCharList){
		loc.removeChild(oldCharList);
	}
	loc.appendChild(tblCharacter)
}

function getSkills(character){
	console.info(character)
	
	//Change sprite of selected character here
	let curCharacter= document.getElementById("currentSelected")
	curCharacter.src="Images/Sprites/" + character.Image + ".gif"
	curCharacter.alt= character.Name
	
	//Make skill list here
	let tblSkill = document.createElement('table');
		tblSkill.className="tblSkills"
	let tbodySkill = document.createElement('tbody');	
	
	for(let characterSkill in character){
		const skill = character[characterSkill]
		console.info(skill)
		if(typeof skill === 'object'){
			
			skill.forEach(function(arraySkill){
				
				let checkMastered = false
				let identifier = character.Name+"_"+arraySkill.Name
				let getStatus = localStorage.getItem(identifier);
				if (getStatus === "true")
				{
					checkMastered = true;
					console.info(checkMastered);
				}
				else{
					checkMastered = arraySkill.Mastered
					console.info(getStatus);
				}
				
				let trSkill = document.createElement('tr');
				
				let tdSkillType = document.createElement('td');
				let tdSkillName = document.createElement('td');
				let tdSkillFound = document.createElement('td');
				let tdSkillMastered = document.createElement('td');
				
				
				let typeImg= document.createElement('img');
					typeImg.src = "Images/Skills/" + arraySkill.Type + ".png";
					typeImg.alt = arraySkill.Type;
				let name = document.createTextNode(arraySkill.Name);
				let found = document.createTextNode(arraySkill.Found);
				let masteredImg = document.createElement('img');
					masteredImg.src = "Images/Others/Mastered_" + checkMastered + ".png";
					masteredImg.alt = checkMastered;
					
					
				let aMastered = document.createElement('a'); //change this to input type checkbox and a label with the image in?
					// aMastered.id=chapter;
					aMastered.addEventListener('click', function () {
						console.info(checkMastered)
						saveMastered(character.Name, arraySkill.Name, checkMastered, masteredImg); //Event listeners to change chapters
						checkMastered=!checkMastered
						
						masteredImg.src = "Images/Others/Mastered_" + checkMastered + ".png";
						masteredImg.alt = checkMastered;
					});
				
				
				tdSkillType.appendChild(typeImg)
				tdSkillName.appendChild(name)
				tdSkillFound.appendChild(found)
				
				aMastered.appendChild(masteredImg)
				tdSkillMastered.appendChild(aMastered)
				
				trSkill.appendChild(tdSkillType)
				trSkill.appendChild(tdSkillName)
				trSkill.appendChild(tdSkillFound)
				trSkill.appendChild(tdSkillMastered)
				
				tbodySkill.appendChild(trSkill)
			});
		}
	}

	tblSkill.appendChild(tbodySkill)
	
	let loc = document.getElementById("divSkillList")
	let oldSkillList=document.getElementsByClassName("tblSkills")[0]
	if(oldSkillList){
		loc.removeChild(oldSkillList);
	}
	loc.appendChild(tblSkill)
}

function saveMastered(character, skill, mastered){
	console.info(character, skill, mastered) //KidMardek Strike false //ch2Mardek Warp true
	
	if(mastered===true){
		localStorage.setItem(character+"_"+skill, "false")
	}
	else{
		localStorage.setItem(character+"_"+skill, "true")
	}
}

function resetData(){
	let resetBtn = confirm("You are about to reset your data and start over with a blank slate \r\nThis action cannot be reverted \r\n\r\nDo you wish to continue?");
	if (resetBtn) {
		localStorage.clear();
		location.reload(); 
	} 
}