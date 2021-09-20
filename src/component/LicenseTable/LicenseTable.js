import React from 'react';
import { Table, Button,Alert  } from 'antd';
import { observer,inject} from 'mobx-react';
import './LicenseTable.styl';


@inject("licenseInfoStore")
@observer
class LicenseTable extends React.Component {
  constructor(props) {
        super(props);
        //react state
        this.state={
          filteredInfo: null,
          sortedInfo: {field:"convert",order:"ascend"},
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
    const message="Do you want to deleted the record?";
    const self=this;
    const action={
      onOk:()=>{
        self.props.licenseInfoStore.removeLicenseInfo(self.state.selectedRowKeys);
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
            dataIndex: 'fileName',
            key:"fileName",
            sorter:(a, b) => this.order(a,b),
            sortOrder: this.getSortOrder.call(this,"fileName")
          },{
            title:"Machine Name",
            dataIndex:"computerName",
            sorter:(a, b) => this.order(a,b),
            sortOrder: this.getSortOrder.call(this,"computerName")
          },{
            title:"User",
            dataIndex:"windowLogon",
            sorter:(a, b) => this.order(a,b),
            sortOrder: this.getSortOrder.call(this,"windowLogon")
          },{
            title:"Status",
            dataIndex:"convert",
            sorter:(a, b) => this.order(a,b),
            render: convert => <div>{convert? <Alert type="success" message="Success" banner />:<Alert type="error" message="Error" banner />}</div>,
            sortOrder: this.getSortOrder.call(this,"convert")
          },{
            title:"Message",
            dataIndex:"message",
            render: message => <pre>{message}</pre>,
            sorter:(a, b) => this.order(a,b),
            sortOrder: this.getSortOrder.call(this,"message")
          }];
    }

    render() {
      const columns=this.getColumns();
        return (
            <div className="LicenseTable">
                  <div className="action-button-list" >
                    <Button disabled={this.props.licenseInfoStore.licenseInfoDataSource.length?false:true} type="primary" onClick={()=>{this.remove()}}> 
                      Remove
                    </Button>
                  </div>
                  <Table pagination={{ position: ["bottomLeft"],showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`}}
                   onChange={(pagination, filters, sorter)=>{this.handleChange(pagination, filters, sorter)}} rowSelection={this.rowSelection} size="small" bordered columns={columns} dataSource={[...this.props.licenseInfoStore.licenseInfoDataSource]} />
          </div>
        );
    }
}

export default LicenseTable;