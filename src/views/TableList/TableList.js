import React from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import CustomTabs from "components/CustomTabs/CustomTabs.js";

import ListAltIcon from '@material-ui/icons/ListAlt';
import LoopIcon from '@material-ui/icons/Loop';
import Tasks from "components/Tasks/TasksOrder.js";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import { bugs, website, server } from "variables/general.js";

export default function TableList() {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8}>
          <CustomTabs
            title="Order:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Placed",
                tabIcon: ListAltIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    okTooltip="doing"
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Doing",
                tabIcon: LoopIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    okTooltip="done"
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Done",
                tabIcon: AssignmentTurnedInIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                    disableNext
                  />
                )
              }
              ,
              {
                tabName: "Incart",
                tabIcon: ShoppingCartIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                    disableNext
                    disableRemove
                  />
                )
              }
            ]}
          />
        </GridItem>
    </GridContainer>
  );
}
