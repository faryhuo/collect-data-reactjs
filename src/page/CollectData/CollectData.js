import React from 'react';
import { Upload, Button} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'page/CollectData/CollectData.styl';
import { Observer } from 'mobx-react';

const { Dragger } = Upload;

@Observer
class CollectData extends React.Component {
    constructor(props) {
        super(props);
        //react state
        let self=this;
        this.state={
            multiple:true,
            name:"files",
            showUploadList:{
                showDownloadIcon: false,
                showRemoveIcon: false
            },
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
                self.setState(state => ({
                    fileList: [...state.fileList, file],
                }),()=>{
                    self.props.licenseInfoStore.fileList=this.state.fileList;
                    console.log(self.props.licenseInfoStore);
                });
                return false;
            }
        }
    }


    render() {
        return (
            <div className="CollectData" >
                <form  action="/download" method="post" encType="multipart/form-data" onSubmit={(e)=>{console.log(e);}}>
                    <div style={{"textAlign":"center"}}>
                        <h2>Upload the license information file</h2>
                    </div>
                    <div >
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
                </form>    
                <div  className="action-button">
                    <Button type="primary" onClick={()=>{this.props.nextStep()}}>Next</Button>
                </div>
            </div>
        );
    }
}

export default CollectData;