
var btn = document.getElementById("btn");

function cSpace(x) {
	if (x !="")
	{
		return 1;
	} return 0;
}

function enterDATA(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
var cl= document.getElementById("class").value;
var id = document.getElementById("student").value;

	if((cSpace(cl)*cSpace(id)*cSpace(username)*cSpace(password))==0)
	{
		window.alert("Dữ liệu rỗng, mời nhập lại");
		location.reload();
	}
	else{
		let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
		user.push({
			id: id,
			name: username,
			pass: password,
			class: cl
		});
		let data = JSON.stringify(user);
		localStorage.setItem("user", data);
	}
};
btn.addEventListener("click", enterDATA);

function renderUSER()
{
	let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
	let list =`<tr>
				<th>ID</th>
				<th>Tài khoản</th>
				<th>Mật khẩu</th>
				<th>Lớp</th>
				<th>Thao tác</th> 
			</tr>`;

	for(let i = 0; i < user.length; i++)
	{
		list += `<tr>
			<td>${user[i].id}</td>
			<td>${user[i].name}</td>
			<td>${user[i].pass}</td>
			<td>${user[i].class}</td>
			<td>
			<button onclick="editUSER(${i})">Sửa</button>
			<button onclick="delUSER(${i})">Xóa</button>
			</td>
		</tr>`;			
	}
	document.getElementById('table-content').innerHTML = list;
};

function editUSER(index){
	let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
	document.getElementById("username").value = user[index].name;
	document.getElementById("password").value = user[index].pass;
	document.getElementById("class").value = user[index].cl;
	document.getElementById("student").value = user[index].id;
	document.getElementById('btn').style.display = 'none';
	document.getElementById('edit').style.display = 'inline-block';
	document.getElementById("index").value = index;
}	

let edit = document.getElementById("edit");
// edit.addEventListener('click', changeUSER);


function changeUSER() {
	let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
	let index = document.getElementById("index").value;
	user[index] = {
		name: document.getElementById('username').value,
		pass: document.getElementById("password").value,
		class: document.getElementById("class").value,
		id: document.getElementById("student").value
	}

	localStorage.setItem("user", JSON.stringify(user[index]));
	renderUSER();

}

function delUSER(index){
	let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
	user.splice(index, 1);
	localStorage.setItem("user", JSON.stringify(user));
	renderUSER();
}

let sc = document.getElementById('sc-btn');
sc.addEventListener('click', function() {
	let valueSearchInput = document.getElementById('searchInput').value;
	let user = JSON.parse(localStorage.getItem("user"));
	let userSearch = user.filter(function(element)
	{
		return element.name.toUpperCase().includes(valueSearchInput.toUpperCase());
	})
	console.log(userSearch)
	renderUSER(userSearch);
});


let st = document.getElementById('st-btn');
st.addEventListener("click",function()
{
	let user = JSON.parse(localStorage.getItem("user"));
	let valueSort =document.getElementById("sort").value;
	user.sort(function(a, b)
	{
		if(valueSort == "max"){
			return a.score - b.score;
		}
		else if (valueSort == "min") {
			return b.score - a.score;
		}
		else{ return a.id - b.id}
	})
	console.log(user);
	renderUSER();
});



