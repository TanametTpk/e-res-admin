import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import BugReport from "@material-ui/icons/BugReport";
import Tasks from "components/Tasks/Tasks.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import QRCode from "react-qr-code";

import { bugs } from "variables/general.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles()
  const [qr, setQR] = useState("")
  const [open, setOpen] = useState(false)
  const [zones, setZones] = useState([])
  const [ zoneName, setZoneName ] = useState("")
  const [ zoneDetail, setZoneDetail ] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQR("");
  };

  const showQr = (item) => {
    setQR(item || "")
    handleClickOpen()
  }

  const addZone = () => {

    setZones([
      ...zones,
      {
        name: zoneName,
        detail: zoneDetail
      }
    ])

    setZoneName("")
    setZoneDetail("")
  }

  const removeZone = (item) => {

  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create Zone</h4>
              <p className={classes.cardCategoryWhite}>Complete zone infomation</p>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="ชื่อ zone"
                    id="zone-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value:zoneName,
                      onChange: ({target: {value}}) => setZoneName(value)
                    }}
                  />
                </GridItem>

              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="zone นี้เอาไว้ทำอะไร"
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      value:zoneDetail,
                      onChange: ({target: {value}}) => setZoneDetail(value)
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={addZone}>สร้าง Zone</Button>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={8}>
          <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Zones",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={zones.map((z, i) => i)}
                    tasks={zones}
                    delete={ (item) => console.log("delete", item)}
                    showQR={showQr}
                  />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">QR Code of {qr.name}</DialogTitle>
        <DialogContent>
          {
            qr? 
              <QRCode value={`businessid-${qr.name}`} />
            :
              <div> can't show qr code </div>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
