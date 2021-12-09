let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1' :
        APIURL = 'http://localhost:3005';
        break;
    case 'gfks-instapet-client.herokuapp.com' :
        APIURL = 'https://gfks-instapet-server.herokuapp.com'
}

export default APIURL;