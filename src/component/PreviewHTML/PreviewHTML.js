import React from 'react';
import './PreviewHTML.styl';
import { Modal, Button } from 'antd';

class PreviewHTML extends React.Component {
  constructor(props) {
        super(props);
        //react state
        this.state={
        }
    }

    handleCancel(){
      this.setState({ visible: false });
    };

    render() {
      const { visible } = this.state;
        return (
            <div className="PreviewHTML"  >
               <Modal bodyStyle={{overflow:"auto",height:"500px"}} width="95%"
          visible={this.props.visible}
          title={this.props.title}
          onCancel={()=>{this.props.handleCancel()}}
          footer={[
            <Button key="back" onClick={()=>{this.props.handleCancel()}}>
              Cancel
            </Button>
          ]}
        >
          {<html  dangerouslySetInnerHTML={{__html: this.props.children}}></html>}
        </Modal>
            </div>
        );
    }
}

export default PreviewHTML;