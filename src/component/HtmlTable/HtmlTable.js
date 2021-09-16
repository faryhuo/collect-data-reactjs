import React from 'react';
import { Table, Button } from 'antd';
import { observer,inject} from 'mobx-react';
import _ from 'lodash';
import './HtmlTable.styl';


@inject("licenseInfoStore")
@observer
class HtmlTable extends React.Component {
  constructor(props) {
        super(props);
        //react state
        this.state={
          filteredInfo: null,
          sortedInfo: null,
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
    this.props.licenseInfoStore.remove(this.state.selectedRowKeys);
    this.setState({ selectedRowKeys:[]});
  }

  handleChange(pagination, filters, sorter){
    console.log('Various parameters', pagination, filters, sorter);
    this.state.sortedInfo=sorter;
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
          }];
    }

    render() {
      const columns=this.getColumns();
        return (
            <div className="HtmlTable">
                  <div className="action-button-list" >
                    <Button type="primary" onClick={()=>{this.remove()}}> 
                      Remove
                    </Button>
                    <Button type="primary" onClick={this.props.licenseInfoStore.clear}> 
                      Remove All
                    </Button>
                  </div>
                  <Table onChange={(pagination, filters, sorter)=>{this.handleChange(pagination, filters, sorter)}} rowSelection={this.rowSelection} size="small" bordered columns={columns} dataSource={[...this.props.licenseInfoStore.htmlFileDataSource]} />
          </div>
        );
    }
}

export default HtmlTable;