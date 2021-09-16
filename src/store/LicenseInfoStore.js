import {observable, action,makeObservable,computed } from 'mobx';
import _ from 'lodash';

class LicenseInfoStore {
  constructor() {
    makeObservable (this,{
      fileList:observable,
      addFile:action.bound,
      clear:action.bound,
      remove:action.bound,
      htmlFileDataSource:computed
    });
  }
  @observable fileList=[];
  key=0;
  fileMap={};
  excelFile;
  fileName="Company Software License.xlsx";
  validExcelFile=false;

  @computed get htmlFileDataSource(){
    let dataSource=[];
    for(let i=0;i<this.fileList.length;i++){
        let file=this.fileList[i];
        let fileInfo={};
        fileInfo.modifiedDate=file.lastModifiedDate;
        fileInfo.size=file.size;
        fileInfo.name=file.name;
        fileInfo.file=file;
        fileInfo.key=file.key;
        dataSource.push(fileInfo);
    } 
    console.log(dataSource)
    return dataSource;
  };
  
  @action.bound addFile(file){
    this.key++;
    file.key=this.key;
    this.fileList.push(file);
  }
  @action.bound remove(selectedKeys){
    for(let i=this.fileList.length-1;i>=0;i--){
      let file=this.fileList[i];
      if(_.indexOf(selectedKeys,file.key)>=0){
        this.fileList.remove(file);
      }
    }
  }
  
  @action.bound clear(file){
    this.fileList.clear();
  }
  

}
const licenseInfoStore=new LicenseInfoStore();
export default licenseInfoStore;