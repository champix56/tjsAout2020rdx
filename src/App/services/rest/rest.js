import store from '../../store/store'
const ADR_REST_SRV = 'http://localhost:5629';
//const ADR_REST_SRV = 'http://86.195.10.30:5629';

export const getMessages = (id) => {
    let adr = `${ADR_REST_SRV}/public_messages?_sort=id&_expand=user`;
    if (undefined !== id) {
        adr += '&id_gte=' + (id + 1);
    }
    fetch(adr)
        .then((fluxReponse) => { return fluxReponse.json() })
        .then((fluxjson) => {
           // callback(fluxjson);
           store.dispatch({type:'ADD_MESSAGES',values:fluxjson});
            return fluxjson;
        })
}
export const postMessage = (objet, callback) => {
    fetch(ADR_REST_SRV + '/public_messages',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objet)
        }
    )
        .then((fluxReponse) => { return fluxReponse.json() })
        .then((fluxjson) => {
            callback(fluxjson);
            return fluxjson;
        })
}
export const getUser = (name, callback, createIfNotExist = true) => {
    fetch(`${ADR_REST_SRV}/users?name=${name}`).then(flux => flux.json()).then(obj => {
        if (obj.length === 0 && createIfNotExist) {
            postUser(name, callback);
        }
        else { callback(obj[0]); }
        return obj[0];
    })
}
export const getUsers = (callback) => {
    fetch(`${ADR_REST_SRV}/users?_sort=name`).then(flux => flux.json()).then(arr => {
        callback(arr);
        return arr;
    })
}
export const postUser = (name, callback) => {
    fetch(ADR_REST_SRV + '/users',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name:name})
        }
    )
        .then((fluxReponse) => { return fluxReponse.json() })
        .then((fluxjson) => {
            callback(fluxjson);
            return fluxjson;
        })
}