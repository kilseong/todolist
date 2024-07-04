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

//진행중 탭에서 삭제시 UI에서 안보이게 하기
//토글 버튼

// 1.check와 delete가 아이콘이어야 함--완료!!
// 2.check버튼 클릭시 뒤에 배경이 회색으로 바뀌어야함 -- 완료!! 
//   (아래 조건문에 스타일이 겹치지 않게 class 명을 수정)
// 3.check버튼 클릭 후 되돌리기 버튼이 나오고 클릭하면 뒤에 배경이 다시 돌아오고 버튼도 다시 체크로 바꿈 -- 완료!!
// 4.삭제기능이 있어야함

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let underLine = document.getElementById("under-line");
let tabs = document.querySelectorAll(".task-tabs div");

let taskList =[];
let mode = 'all';
let filterList = [];
//console.log("add-button");
addButton.addEventListener("click",addTask);

// task-tabs div.forEach((menu) =>
//   menu.addEventListener("click", (e) => horiZon(e))
// );

// function horiZon(e) {
//   underLine.style.left = e.currentTarget.offsetLeft + "px";
//   underLine.style.width = e.currentTarget.offsetWidth + "px";
//   underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
// }


for(let i=1; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event);

    })
}
console.log(tabs);

function addTask(){
  //console.log("clicked");
  //let taskContent = taskInput.value; 아래 객체 사용 대체
  let taskValue = taskInput.value;
  if (taskValue === "") return alert("할일을 입력해주세요");
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  };
  
  taskList.push(task); //taskList.push(taskContent); task객체를 사용하여 변경
  taskInput.value = "";
  console.log(taskList);
  render();
}

function render(){
  // 1. 내가 선택한 탭에 따라서
  let resultHTML = "";
  let list = [];
  if(mode === "all"){
    list = taskList;
  // all taskList
  }else if(mode === "ongoing" || mode === "done"){
    list = filterList;
  // ongoing, done = filterList
  }
  // 2. 리스트를 달리 보여준다
 
  for(let i=0; i < list.length; i++){
    if(list[i].isComplete ==  true){
      //console.log("here");
      resultHTML += `<div class="task">
          <div class="task task-done">${list[i].taskContent}</div> 
            <div class = "button-box">
              <button onclick="toggleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
          </div>`
    }else{
      resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div class = "button-box">
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
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
  if(mode == "all"){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].id == id){
        taskList.splice(i,1);
        break;
      }
    }
    render();
  }else if(mode == "ongoing" || mode == "done"){
    for(let i=0; i < filterList.length; i++){
      if(filterList[i].id == id || taskList[i].id == id){
        filterList.splice(i,1);
        for(let i=0; i < taskList.length; i++){
          if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
      }
      break;
    }
  }
  render();
  // for(let i=0; i < taskList.length; i++){
  //   if(taskList[i].id == id){
  //     taskList.splice(i,1)
  //     break;
  //   }
  // }
  // render();
  //console.log(taskList); 결과값이 제대로 나오면 UI도 반드시 반영해준다.
  //console.log("삭제하자",id);
 }
}

function filter(event){
  //console.log("filter", event.target.id);
  mode = event.target.id;
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
    event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  } // 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event가 없음 그래서 조건추가

  filterList = [];
  if(mode === "all"){
    //전체 리스트를 보여준다
    render();
  }else if(mode === "ongoing"){
    //진행중인 아이템을 보여준다
    //task.isComplete=false
    for(let i=0; i < taskList.length; i++){
      if(taskList[i].isComplete === false){
        filterList.push(taskList[i]);
      }
    } 
    render();
    console.log("진행중", filterList)
  }else if(mode === "done"){
    //끝나는 케이스
    //task.isComplete=true
    for(let i=0; i < taskList.length; i++){
      if(taskList[i].isComplete === true){
        filterList.push(taskList[i]);
      }
    }
    
  }
  render();
}


function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);
}