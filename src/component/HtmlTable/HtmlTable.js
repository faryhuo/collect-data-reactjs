import React from 'react';
import { Table, Button } from 'antd';
import { observer,inject} from 'mobx-react';
import _ from 'lodash';
import './HtmlTable.styl';
import PreviewHTML from 'component/PreviewHTML/PreviewHTML';



@inject("licenseInfoStore")
@observer
class HtmlTable extends React.Component {
  constructor(props) {
        super(props);
        //react state
        this.state={
          filteredInfo: null,
          sortedInfo: null,
          preview:false,
          currentFileName:"",
          selectedRowKeys: [], // Check here to configure the default column
          loading: false          
        }
      this.rowSelection = {
          selectedRowKeys:this.selectedRowKeys,
          onChange:(selectedRowKeys)=>{
             this.onSelectChange(selectedRowKeys)
          }
      }
  }

  getSortOrder(field){
    let sortedInfo=this?.state?.sortedInfo;
    if(sortedInfo){
      return sortedInfo.field===field && sortedInfo.order; 
    }
  }

  order(record1,record2){
    if(!this.state.sortedInfo){
      return;
    }
    let field=this.state.sortedInfo.field;
    if(record1[field] ===record2[field] ){
      return 0;
    }else{
      return  record1[field] > record2[field]?1:-1;
    }
  }

  onSelectChange(selectedRowKeys){
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  remove(){
    if(this.state.selectedRowKeys.length===0){
      return false;
    }
    const message="Do you want to delete the record?";
    const self=this;
    const action={
      onOk:()=>{
        self.props.licenseInfoStore.remove(self.state.selectedRowKeys);
        self.setState({ selectedRowKeys:[]});
      }
    }
    this.props.showMessage(message,action)
  }

  removeAll(){
    if(this.state.selectedRowKeys.length===0){
      return false;
    }
    const message="Do you want to delete all record?";
    const self=this;
    const action={
      onOk:()=>{
        self.props.licenseInfoStore.clear();
        self.setState({ selectedRowKeys:[]});
      }
    }
    this.props.showMessage(message,action)
  }

  handleChange(pagination, filters, sorter){
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

    getColumns(){
      return [{
            title: 'File Name',
            dataIndex: 'name',
            key:"name",
            sorter:(a, b) => this.order(a,b),
            sortOrder: this.getSortOrder.call(this,"name")
          },{
            title:"Size",
            dataIndex:"size",
            render: size =>{
              let text=_.round(size/1024, 2) +" kb";
              return <span>{text}</span>;
            },
            sorter:(a, b) => this.order(a,b),
            sortOrder: this.getSortOrder.call(this,"size")
          },{
            title:"ModifiedDate",
            dataIndex:"modifiedDate",
            render: modifiedDate => <span>{modifiedDate.toDateString()}</span>,
            sorter:(a, b) => this.order(a,b),
            sortOrder: this.getSortOrder.call(this,"modifiedDate")
          },{
            title:"Action",
            dataIndex:"file",
            render: file => <span><a href="#" onClick={()=>{this.review(file)}}>review</a></span>,
          }];
    }

    review(file){
      let reader = new FileReader();
      reader.readAsText(file);
      let self=this;
      reader.onload = function(event) {        
        let result=event.target.result;
        console.log(result);
        self.setState({
          preview:true,
          fileContent:result,
          currentFileName:file.name
        })
      };
    }

    handleCancel(){
      this.setState({ preview: false });
    };
    render() {
      const columns=this.getColumns();
        return (
            <div className="HtmlTable">
                  {this.state.preview && <PreviewHTML title={this.state.currentFileName} handleCancel={()=>{this.handleCancel()}} visible={this.state.preview}>
                    {this.state.fileContent}
                    </PreviewHTML>}
                  <div className="action-button-list" >
                    <Button type="primary" onClick={()=>{this.remove()}}> 
                      Remove
                    </Button>
                    <Button type="primary" onClick={()=>{this.removeAll()}}> 
                      Remove All
                    </Button>
                  </div>
                  <Table pagination={{ position: ["bottomLeft"],showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`}}
                  onChange={(pagination, filters, sorter)=>{this.handleChange(pagination, filters, sorter)}} rowSelection={this.rowSelection} size="small" bordered columns={columns} dataSource={[...this.props.licenseInfoStore.htmlFileDataSource]} />
          </div>
        );
    }
}

export default HtmlTable;