import React from 'react';
import { Upload, Button} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'page/CollectData/CollectData.styl';
import HtmlTable from 'component/HtmlTable/HtmlTable';
import Panel from 'component/Panel/Panel';


import { observer, inject } from 'mobx-react';
import axios from 'axios';

const { Dragger } = Upload;

@inject(stores => ({
    licenseInfoStore: stores.licenseInfoStore,
    homePageStore: stores.homePageStore,
    })
)@observer
class CollectData extends React.Component {
    constructor(props) {
        super(props);
        //react state
        let self=this;
        this.state={
            multiple:true,
            name:"files",
            showUploadList:false,
            fileList:this.props.licenseInfoStore.fileList,
            fileMap:this.props.licenseInfoStore.fileMap,
            action:"",
            uploading: false,
            beforeUpload: file => {
                let fileMap=self.state.fileMap;
                //file[]
                if(fileMap[file.name]){
                    if(fileMap[file.name].lastModifiedDate<file.lastModifiedDate){
                        fileMap[file.name]=file;
                        self.setState({
                            fileMap: fileMap
                        });
                    }
                }else{
                    fileMap[file.name]=file;
                    self.setState({
                        fileMap: fileMap
                    });
                }
                self.props.licenseInfoStore.addFile(file);
                self.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            }
        }
    }

    submit (){
        this.props.homePageStore.showLoading();
        const self=this;
        const formData = new FormData();
        const licenseInfoStore=this.props.licenseInfoStore;
        if(licenseInfoStore.fileList.length===0){
            this.props.homePageStore.closeLoading();
            this.props.showMessage("Please confrim if upload the excel file and html file.");
            return;
        }
        for(let item in licenseInfoStore.fileList){
          let file=licenseInfoStore.fileList[item];  
          formData.append('files', file);
        }
        axios({
          url: '/api/checkLicenseFile',
          method: 'post',
          processData: false,
          data: formData})
          .then((res) => { 
            console.log(res);
            self.props.homePageStore.closeLoading();
            if(res.data.status===0){
                licenseInfoStore.licenseInfoList=res.data.data;
                self.props.nextStep(1);
            }           
        }).catch(function(error){
            console.log(error);
            const errorMessage="Has internal server error, please check the log file.";
            self.props.showMessage(errorMessage)
            self.props.homePageStore.closeLoading();
        });
        
    }


    render() {
        return (
            <div className="CollectData" >
                {/* <div style={{"textAlign":"center"}}>
                    <h2>Upload the license information file (html file)</h2>
                </div> */}
                <Panel title="Upload the license information file (html file)">
                <div className="upload-control">
                    <Dragger {...this.state} accept=".htm,.html">
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                        </p>
                    </Dragger>
                </div>
                </Panel>
                <div className="split">
                    
                </div>
                <Panel title="Upload file information">
                    <div className="data-list">
                        <HtmlTable showMessage={this.props.showMessage}></HtmlTable>
                    </div>
                </Panel>
                <div  className="action-button">
                    <Button disabled={this.state.fileList.length>0?false:true} type="primary" onClick={()=>{this.submit()}}>Next</Button>
                </div>
            </div>
        );
    }
}

export default CollectData;