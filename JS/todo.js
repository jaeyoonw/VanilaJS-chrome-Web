const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

// 삭제 버튼을 누른 요소의 리스트를 toDo배열에서 지우고 다시 업데이트
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

//toDo array를 localStorage에 오브젝트->스트링으로 변환해서 저장
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//to do 리스트를 화면에 출력
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };

  toDos.push(toDoObj);
  saveToDos();
}

//Enter를 눌렀을 시 이벤트 발생
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

//toDo 배열로 부터 불러옴
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach(function(toDo) {
      //보충 설명 필요
      paintToDo(toDo.text);
    });
  }
}

//초기 화면
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
