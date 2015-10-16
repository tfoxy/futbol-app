// A RESTful factory for retrieving contacts from 'data.json'
class DataService {

  constructor($http) {
    'ngInject';
    this._path = 'assets/data.json';

    this._request = $http.get(this._path).then((resp) => {
      return resp.data;
    });
  }


}

export default DataService;
