import {observable, action} from 'mobx';

class LicenseInfoStore {
  fileList=[];
  fileMap={};
  excelFile;
  fileName="Company Software License.xlsx";
  validExcelFile=false;
}
export default LicenseInfoStore;