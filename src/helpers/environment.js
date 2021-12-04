let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1' :
        APIURL = 'http://localhost:3000';
        break;
    case 'ksgf-instapet.herokuapp.com' :
        APIURL = 'https://gfks-instapet.herokuapp.com'
}

export default APIURL;