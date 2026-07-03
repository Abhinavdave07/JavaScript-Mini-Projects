let students = ['Abhinav','Aakash'];
let editingIndex = null;

renderStudents();

const input = document.querySelector('.js-input');
const addButton = document.querySelector('.js-add-btn');

addButton.addEventListener('click',() => {
    if(editingIndex === null){
        students.push(input.value);
        input.value = '';
    } else {
        students[editingIndex] = input.value;
        editingIndex = null;
        input.value = '';
        addButton.innerText = 'Add Student';
    }
     
    
    renderStudents();
});


function renderStudents(){
    let html = '';

    students.forEach((student,index) => {

        html += `
        <div class="student">
        <div class="student-name"> ${index+1}. ${student}</div>
        <div>
        <button class="edit-btn" data-index ="${index}">Edit</button>
        <button class="delete-btn" data-index ="${index}">Delete</button>
        </div>
        </div>`
    });

    document.querySelector('.js-student-list')
        .innerHTML = html;

    //DELETE BUTTON
        const deleteButtons = document.querySelectorAll('.delete-btn'); 
        deleteButtons.forEach((button) =>{

            button.addEventListener('click',() =>{
            let deletedIndex = button.dataset.index;
            students.splice(deletedIndex,1);
            renderStudents();
            });
        });
    //DELETE BUTTON END
        
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach((button) =>{

            button.addEventListener('click',()=>{
              editingIndex = button.dataset.index;
              input.value = students[editingIndex];
              addButton.innerText = 'Save';  
            })
        })
};


const clear = document.querySelector('.js-clear-btn');
clear.addEventListener('click',() => {
    students = [];
    renderStudents();
});








