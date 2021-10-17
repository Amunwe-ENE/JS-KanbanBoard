let order = 1;
let adding = false;

const error = document.querySelector('.error');
const message = 'Please add a description.';

const add_btn = document.querySelector('.add');
add_btn.addEventListener('click', () => {
  const target = document.querySelector('#requested');
  if (adding == false) {
    adding = true;
    target.appendChild(create_item());
  } else {
    error.innerHTML = message;
  }
});

const create_item = () => {
  const item = document.createElement("div")
  item.classList.add("item")
  item.setAttribute("id", `item-${order}`)
  item.setAttribute("draggable", true)

  item.addEventListener("dragstart", (e)=>{
    return e.dataTransfer.setData("text", e.target.id)
  })
  item.addEventListener("dragend", (e)=>{
    return e.dataTransfer.clearData()
  })
  const input = document.createElement("input")
  item.append(input)
  const save_btn = document.createElement("button")
  save_btn.innerHTML = "Save"
  save_btn.addEventListener("click", () => {
    error.innerHTML = ""
    if(input.value){
      order += 1
      item.innerHTML = input.value
      adding = false;
    }else {
      error.innerHTML = message
    }

  })
  item.append(save_btn)
  return item

};

document.querySelectorAll('.drop').forEach(element => {
  element.addEventListener("drop", e => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text")
    const el = document.getElementById(id)
    e.target.append(el)
  })
  element.addEventListener("dragover", e => {
    e.preventDefault()
  })
});