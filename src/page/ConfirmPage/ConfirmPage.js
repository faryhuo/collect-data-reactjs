import React from 'react';
import { Button} from 'antd';
import LicenseTable from 'component/LicenseTable/LicenseTable';
import './ConfirmPage.styl';

class ConfirmPage extends React.Component {
  constructor(props) {
        super(props);
        //react state
        this.state={
          dataSource:[]
        }
    }


    render() {
        return (
            <div className="ConfirmPage">
                <div>
                  <h1>Confrim need upload file</h1>
                </div>
                <div className="data-list">
                    <LicenseTable showMessage={this.props.showMessage}></LicenseTable>
                </div>
                <div  className="action-button">
                    <Button type="primary" onClick={()=>{this.props.nextStep()}}>Next</Button>
                </div>
          </div>
        );
    }
}

export default ConfirmPage;