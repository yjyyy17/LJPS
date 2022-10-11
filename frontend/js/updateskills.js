backendUrl = "http://127.0.0.1:5000";
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const skill_id = urlParams.get('id')
updateSkill = "updateSkill/" + skill_id;
getSkills = "getskills";
skillinfo = "getSkillById";

const skill_Name = document.getElementById("skill_Name");
const skill_Description = document.getElementById("skill_Description");
const btn = document.getElementById("btn");

//  put skill info inside the fields first
async function getSkillInfo() {
	fetch(`${backendUrl}/${skillinfo}/${skill_id}`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.code == 200) {
				document.getElementById("s_name2").innerText = " " + data.message[0].skill_name;
				skill_Name.value = data.message[0]["skill_name"];
				skill_Description.value = data.message[0]["skill_desc"];
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

async function updateSkills() {

	var a=document.getElementById("skill_Name").value
    var b=document.getElementById("skill_Description").value

            if(a=='' || b==''){
                alert("Please fill in all details")
            }

else{
	fetch(`${backendUrl}/${updateSkill}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			skill_name: document.getElementById("skill_Name").value,
			skill_desc: document.getElementById("skill_Description").value,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Success:", data);
			if (data.code == 200) {
				alert('Update successful')
				location.reload();
			}
			else{
				alert("Skill name already exists!");
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
	}
}

getSkillInfo();

// const myData = function (getAllSkills) {
// 	getid = 1;
// 	for (const listskills of getAllSkills) {
// 		// if(skillID.value )
// 		console.log(listskills["skill_id"]);
// 	}
// 	console.log("id:", getid);
// 	return getid;
// };

// async function getAllSkills() {
// 	const response = await fetch(`${backendUrl}/${getSkills}`)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			// console.log(JSON.parse(JSON.stringify(data.data)));
// 			result = JSON.parse(JSON.stringify(data.data.skill));
// 			message_str = `
// 		<thead>
// 		<tr class="bg-light">
// 		<th scope="col">Skill ID</th>
// 		<th scope="col">Skill Name</th>
// 		<th scope="col">Skill Description</th>
// 		</tr>
// 		</thead>`;
// 			for (const skill of result) {
// 				if (skill["skill_status"] == 0) {
// 					message_str += `
// 				<tbody>
// 				<tr>
// 				<th scope="row">${skill["skill_id"]}</th>
// 				<td>${skill["skill_name"]}</td>
// 				<td class="text-wrap w-50">${skill["skill_desc"]}</td>
// 				</tr>
// 				</tbody>
// 				`;
// 				}
// 			}
// 			document.getElementById("table").innerHTML = message_str;
// 			// console.log(data.data.skill["skill_id"]);
// 			return data.data.skill;
// 		})
// 		.then(myData)
// 		.catch((error) => {
// 			// Errors when calling the service; such as network error,
// 			// service offline, etc
// 			console.log(error);
// 		});
// }

// getAllSkills();
