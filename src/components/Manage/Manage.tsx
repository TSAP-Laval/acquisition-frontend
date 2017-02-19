import * as React from "react";

import { Tab, Tabs, TabList, TabPanel} from "react-tabs";

import Seasons from "./Seasons";
import Coachs from "./Coachs";
import Teams from "./Teams";
import Actions from "./Actions";
import Players from "./Players";
require('../../sass/Layout.scss');


require('../../sass/manage_style.scss');


export interface ILayoutProps {}
export interface ILayoutState {}


export default class Manage extends React.Component<ILayoutProps, ILayoutState> {
    handleSelect(index: any, last: any)
    {
        console.log("Selected tab :" + index + ', last tab: ' + last);
    }
    
    render() {
        return (
            <div className="container">
                <Tabs>

                    <TabList> 
                        <Tab>Saison</Tab>
                        <Tab>Équipe</Tab>
                        <Tab>Entraîneurs</Tab>
                        <Tab>Joueurs</Tab>
                        <Tab>Actions</Tab>
                    </TabList>


                    <TabPanel> 
                        <Seasons/>
                    </TabPanel>

                    <TabPanel> 
                        <Teams/>
                    </TabPanel>

                    <TabPanel> 
                        <Coachs/>
                    </TabPanel>

                    <TabPanel> 
                        <Players/>
                    </TabPanel>

                    <TabPanel> 
                        <Actions/>
                    </TabPanel>

                </Tabs>
            </div>

        );
    }
}