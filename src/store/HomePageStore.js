import {observable, action} from 'mobx';


class HomePageStore {
  @observable loading=false;

  @action showLoading(){
    this.loading=true;
  }

  @action closeLoading(){
    this.loading=false;
  }
}
const homePageStore = new HomePageStore();

export default homePageStore;