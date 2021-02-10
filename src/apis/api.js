import axios from 'axios';

const getAxios = () => {

    
    let options = {
        baseURL: process.env.NODE_ENV === 'development' ? 'http://www.google.com' : 'http://localhost:8080'            
    };
    if(localStorage.getItem('token') !== null){
        
        options = {
            baseURL: process.env.NODE_ENV === 'development' ? 'http://www.google.com' : 'http://localhost:8080',
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };
   
    }
    const clientAxios= axios.create(options);
    return clientAxios;
}

export class Api {
    constructor(){
        this.client = getAxios();
    }

    get(url, conf = {}){
        return this.client.get(url, conf)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    }

    post(url, conf = {}){
        return this.client.post(url, conf)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    }

    delete(url, conf={}){
        return this.client.delete(url, conf)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    }
}


