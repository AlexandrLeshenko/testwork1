import axios from 'axios';

const baseUrl = 'https://uxcandy.com/~shapoval/test-task-backend/v2';
const developerName = 'AlexandrLeshenko';


export const API = {
    getTasks(pagenumber = 1) {
        return axios.get(`${baseUrl}/?developer=${developerName}&page=${pagenumber}`);
    },

    getSortTasks(page,title,sort_direction) {
        return axios.get(`${baseUrl}/?developer=${developerName}
        &sort_field =${title}&sort_direction=${sort_direction}&page=${page}`);
    },


    addNewTask(Username,Email,Text) {
        let form = new FormData();
        form.append("username", Username);
        form.append("email", Email);
        form.append("text", Text);
        return axios({
            url: `${baseUrl}/create?developer=${developerName}`,
            crossDomain: true,
            method: 'POST',
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: form,
            dataType: "json"
        });

    },

    loginUsers (username, password){
        let user = new FormData();
        user.append("username", username);
        user.append("password", password);
        return axios({
            url: `${baseUrl}/login?developer=${developerName}`,
            crossDomain: true,
            method: 'POST',
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: user,
            dataType: "json"
        });
    },
    changeStatusToDo(id,status, text ,token){
        let toDoData = new FormData();
        toDoData.append("status" , status);
        toDoData.append("text" , text);
        toDoData.append("token" , token);
        return axios({
            url: `${baseUrl}/edit/${id}?developer=${developerName}`,
            crossDomain: true,
            method: 'POST',
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: toDoData,
            dataType: "json"
        });
    }

}


