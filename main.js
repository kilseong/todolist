//유저가 값을 입력한
// + 버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제 된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true false
// 2. true 이면 끈난걸로 간주하고 밑줄 보여주기
// 3. false 이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동한다
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList =[];
//console.log("add-button");
addButton.addEventListener("click",addTask);

function addTask(){
  //console.log("clicked");
  //let taskContent = taskInput.value; 아래 객체 사용 대체
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  };
  
  taskList.push(task); //taskList.push(taskContent); task객체를 사용하여 변경
  console.log(taskList);
  render();
}

function render(){
  let resultHTML = "";
  for(let i=0; i < taskList.length; i++){
    if(taskList[i].isComplete ==  true){
      //console.log("here");
      resultHTML += `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
              <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
          </div>`
    }else{
      resultHTML += `<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
              <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
          </div>`; 
    }


      // resultHTML += `<div class="task">
      //       <div>${taskList[i].taskContent}</div>
      //       <div>
      //         <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
      //         <button>Delete</button>
      //       </div>
      //     </div>`; 

  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
  //console.log("id:" , id); id 값을 읽어 오는지 확인
  for(let i=0; i < taskList.length; i++){
    if(taskList[i].id == id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
  //console.log("check됐음");


}

function deleteTask(id){
  for(let i=0; i < taskList.length; i++){
    if(taskList[i].id == id){
      taskList.splice(i,1)
      break;
    }
  }
  render();
  //console.log(taskList); 결과값이 제대로 나오면 UI도 반드시 반영해준다.
  //console.log("삭제하자",id);
}

function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);
}