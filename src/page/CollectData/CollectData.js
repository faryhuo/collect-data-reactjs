import React from 'react';
import { Upload, Button} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'page/CollectData/CollectData.styl';
import HtmlTable from 'component/HtmlTable/HtmlTable';
import { observer, inject } from 'mobx-react';

const { Dragger } = Upload;

@inject("licenseInfoStore")
@observer
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


    render() {
        return (
            <div className="CollectData" >
                <div style={{"textAlign":"center"}}>
                    <h2>Upload the license information file (html file)</h2>
                </div>
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
                <div className="data-list">
                    <HtmlTable ></HtmlTable>
                </div>
                <div  className="action-button">
                    <Button disabled={this.state.fileList.length>0?false:true} type="primary" onClick={()=>{this.props.nextStep()}}>Next</Button>
                </div>
            </div>
        );
    }
}

export default CollectData;