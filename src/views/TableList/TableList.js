import React, { useState, useEffect } from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import CustomTabs from "components/CustomTabs/CustomTabs.js";

import ListAltIcon from '@material-ui/icons/ListAlt';
import LoopIcon from '@material-ui/icons/Loop';
import Tasks from "components/Tasks/TasksOrder.js";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Api from '../../api/business'

export default function TableList() {

  const [ businessId, setBusinessId ] = useState("")
  let [placed_order, setPlacedOrder] = useState([])
  let [processing_order, setProcessingOrder] = useState([])
  let [doneOrder, setDoneOrder] = useState([])

  useEffect(() => {
    
    const fetchOrder = async() => {
      let businessId = localStorage.getItem("businessId")
      let placed_orders_p = Api.getOrders(businessId)
      let confirm_orders_p = Api.getOrders(businessId, true)
      let [placed_order, confirm_orders] = await Promise.all([
        placed_orders_p,
        confirm_orders_p
      ])

      setBusinessId(businessId)
      setPlacedOrder(placed_order)
      setProcessingOrder(confirm_orders.filter((order) => order.type === "process"))
      setDoneOrder(confirm_orders.filter((order) => order.type === "done"))
    }

    fetchOrder()

  }, [])

  const movePlacedToDoing = async (item) => {
    let result = await Api.updateStatusOrder(businessId, item._id, "process")
    setPlacedOrder(placed_order.filter(o => o._id !== item._id))
    setProcessingOrder([...processing_order, result])
  }

  const moveDoingToDone = async (item) => {
    let result = await Api.updateStatusOrder(businessId, item._id, "done")
    setProcessingOrder(processing_order.filter(o => o._id !== item._id))
    setDoneOrder([...doneOrder, result])
  }

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
                    checkedIndexes={[]}
                    tasksIndexes={placed_order.map((o, i) => i)}
                    okTooltip="confirm order"
                    tasks={placed_order}
                    done={movePlacedToDoing}
                  />
                )
              },
              {
                tabName: "Doing",
                tabIcon: LoopIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={processing_order.map((o, i) => i)}
                    okTooltip="done"
                    tasks={processing_order}
                    done={moveDoingToDone}
                  />
                )
              },
              {
                tabName: "Done",
                tabIcon: AssignmentTurnedInIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={doneOrder.map((o, i) => i)}
                    tasks={doneOrder}
                    disableNext
                  />
                )
              }
              // ,{
              //   tabName: "Incart",
              //   tabIcon: ShoppingCartIcon,
              //   tabContent: (
              //     <Tasks
              //       checkedIndexes={[1]}
              //       tasksIndexes={[0, 1, 2]}
              //       tasks={server}
              //       disableNext
              //       disableRemove
              //     />
              //   )
              // }
            ]}
          />
        </GridItem>
    </GridContainer>
  );
}
