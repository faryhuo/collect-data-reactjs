import React from 'react';
import 'page/HomePage/HomePage.styl';
import MenuList from 'component/Menu/Menu.js';
import MainPage from 'page/MainPage/MainPage.js';
import { Spin,Modal} from 'antd';
import { observer,inject } from 'mobx-react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';

@inject("homePageStore")
@observer
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        //react state
        this.state={

        }
    }

    destroyAll() {
        Modal.destroyAll();
    }
      
    showMessage(msg,action) {
        const { confirm } = Modal;
        let self=this;
        var config={
            icon: <ExclamationCircleOutlined />,
            content: <div >{msg}</div>,
            onOk() {
                self.destroyAll()
            },
            onCancel() {
                self.destroyAll()
            },
        };
        if(action){
            if(action.onOk){
                config.onOk=()=>{
                    action.onOk();
                    self.destroyAll()
                }
            }
            if(action.onCancel){
                config.onCancel=()=>{
                    action.onCancel();
                    self.destroyAll()
                }
            }
        }
        confirm(config);       
      }
    

    render() {
        return (
            <div className="HomePage" >
                <div className="menu-wrapper">
                     <MenuList></MenuList>                    
                </div>
                <div className="contain-wrapper">
                    <MainPage showMessage={(a,b)=>{this.showMessage(a,b)}}></MainPage>
                </div>
                {this.props.homePageStore.loading && <div className="loading">                
                    <Spin size="large" tip="Loading..."></Spin>
                </div>}
            </div>
            
        );
    }
}

export default HomePage;