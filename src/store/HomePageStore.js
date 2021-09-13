import {observable, action,makeObservable} from 'mobx';

class HomePageStore {
  @observable 
  loading=false;

  constructor() {
    // 添加makeObservable
    makeObservable(this)
  }
  @action 
  showLoading(){
    this.loading=true;
  }

  @action 
  closeLoading(){
    this.loading=false;
  }
}
const homePageStore = new HomePageStore();

export default homePageStore;