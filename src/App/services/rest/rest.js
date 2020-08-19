import store from '../../store/redux/redux'
const ADR_REST_SRV = 'http://localhost:5629';
//const ADR_REST_SRV = 'http://86.195.10.30:5629';

export const getMessages = (id) => {
    let adr = `${ADR_REST_SRV}/public_messages?_sort=id&_expand=user`;
    if (undefined !== id) {
        adr += '&id_gte=' + (id + 1);
    }
    console.log('getMessages')
    fetch(adr)
        .then((fluxReponse) => { return fluxReponse.json() })
        .then((fluxjson) => {
            if(fluxjson.length>0)
            store.dispatch({ type: 'ADD_MESSAGES', values: fluxjson })
            //callback(fluxjson);
            return fluxjson;
        })
}
let autoPullingIntervalDescriptor = undefined;
export const stopAutoPulling = () => {
    if (undefined !== autoPullingIntervalDescriptor) {
        clearInterval(autoPullingIntervalDescriptor);
    }
}
export const startAutoPulling = () => {
    const _store=store;
    autoPullingIntervalDescriptor=setInterval(monComponent => {
        let lastID = 0;
        _store.getState().messages.forEach(arrElem => { if (lastID < arrElem.id) { lastID = arrElem.id } });
        getMessages(lastID)
    }, 1000);
}
export const postMessage = (objet) => {
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
            store.dispatch({type:'ADD_MESSAGES',values:[fluxjson]})
            return fluxjson;
        })
}
export const getUser = (name, createIfNotExist = true) => {
    fetch(`${ADR_REST_SRV}/users?name=${name}`).then(flux => flux.json()).then(obj => {
        if (obj.length === 0 && createIfNotExist) {
            postUser(name);
        }
        else { store.dispatch({type:'SET_CURRENT_USER',value:obj[0]}) }
        return obj[0];
    })
}
export const getUsers = () => {
    fetch(`${ADR_REST_SRV}/users?_sort=name`).then(flux => flux.json()).then(arr => {
        //callback(arr);
        store.dispatch({ type: 'ADD_USERS', values: arr })
        return arr;
    })
}
export const postUser = (name) => {
    fetch(ADR_REST_SRV + '/users',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name })
        }
    )
        .then((fluxReponse) => { return fluxReponse.json() })
        .then((fluxjson) => {
            // callback(fluxjson);
            store.dispatch({type:'SET_CURRENT_USER',value:fluxjson})
            return fluxjson;
        })
}