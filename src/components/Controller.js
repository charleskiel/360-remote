import React from "react";
import { Progress, Tabs } from 'antd'

const { TabPane } = Tabs;
class Controller extends React.Component {
  //start here with your code for step one
  state = {
    selectedVideo: null
  }


  goback = () => {
    this.setState({ selectedVideo: null })
  }


  showdetails = (Video) => {
    this.setState({ showdetails: true, selectedVideo: Video })
  }




  render() {
    //console.log(this.state)
    return (



      <div className={"controller"}>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Tab 1" key="1">
            {/* <div style={{ float: "left", padding: "1em" }}>
              <Progress
                type="circle"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                status="active"
                width={75}
                strokeWidth={2}
                percent={this.props.controllerStatus.frame / this.props.controllerStatus.frames * 100}
                />
            </div> */}

            <h3>{this.props.controllerStatus.contentString}</h3>
            <Progress showinfo={"false"} size="small" percent={(this.props.controllerStatus.frame / this.props.controllerStatus.frames) * 100} />

            <p className={"text-main text-semibold"}>{this.props.toHHMMSS(this.props.controllerStatus.time)}</p>

            <p className={"text-main text-semibold"}>First Tab Content</p>
            <p><span className="label label-success">Success</span></p>
          </TabPane>



          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>

    );
  }

}

export default Controller;
