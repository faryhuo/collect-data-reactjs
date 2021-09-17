import {observable, action,makeObservable,computed } from 'mobx';
import _ from 'lodash';

class LicenseInfoStore {
  constructor() {
    makeObservable (this,{
      fileList:observable,
      licenseInfoList:observable,
      addFile:action.bound,
      clear:action.bound,
      remove:action.bound,
      htmlFileDataSource:computed,
      licenseInfoDataSource:computed,
      removeLicenseInfo:action.bound
    });
  }
  @observable fileList=[];
  key=0;
  @observable licenseInfoList=[];
  fileMap={};
  excelFile;
  fileName="Company Software License.xlsx";
  validExcelFile=false;

  @computed get licenseInfoDataSource(){
    let dataSource=[];
    for(let i=0;i<this.licenseInfoList.length;i++){
        let obj=this.licenseInfoList[i];
        if(obj.key===null || obj.key===undefined){
          obj.key=i;
        }
        dataSource.push(obj);
    } 
    return dataSource;
  };

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

  @action.bound removeLicenseInfo(selectedKeys){
    for(let i=this.licenseInfoList.length-1;i>=0;i--){
      let licenseInfo=this.licenseInfoList[i];
      if(_.indexOf(selectedKeys,licenseInfo.key)>=0){
        this.licenseInfoList.remove(licenseInfo);
      }
    }
  }
  
  @action.bound clear(file){
    this.fileList.clear();
  }
  

}
const licenseInfoStore=new LicenseInfoStore();
export default licenseInfoStore;