import React from 'react';
import { Card } from 'antd';
import { CaretUpOutlined,CaretDownOutlined} from '@ant-design/icons';
import _ from 'lodash';
import './Panel.styl';

class Panel extends React.Component {
  constructor(props) {
        super(props);
        //react state
        this.state={
          display:true
        }
    }

    showOrHideContent(){
      this.setState({
        display:!this.state.display
      });
    }


    render() {
      // const childrenWithProps = React.Children.map((children, child) => React.cloneElement(child));
      var supportedInputTypes=[];
      var newChildren = React.Children.map(this.props.children,function(child) {
        if (_.indexOf(child.type.displayName,supportedInputTypes)>=0) {
          var extraChildProps = {
          }
          return React.cloneElement(child,extraChildProps);
        } else {
          return child;
        }
      }.bind(this));
        return (
          <div className="Panel">
              <Card title={this.props.title}  extra={<span onClick={()=>{this.showOrHideContent()}}>{this.state.display?<CaretUpOutlined />:<CaretDownOutlined />}</span>} bordered={false} {...this.props}>
                 {this.state.display && newChildren}
              </Card>
          </div>
        );
    }
}

export default Panel;