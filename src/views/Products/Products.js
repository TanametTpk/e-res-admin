import React, {useState, useEffect} from "react";
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
import IconButton from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';

import BugReport from "@material-ui/icons/BugReport";
import Tasks from "components/Tasks/Tasks.js";
import { useFormik } from 'formik';
import ReactFileReader from 'react-file-reader'
import Api from '../../api/business'
import LinearProgress from '@material-ui/core/LinearProgress';

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
  const [products, setProducts] = useState([])
  const [ businessId, setBusinessId ] = useState("")
  const [ isLoading, setLoading ] = useState(true)

  useEffect(() => {
    
    const fetch = async() => {
      let businessId = localStorage.getItem("businessId")
      let products = await Api.getProducts(businessId)

      setProducts(products)
      setBusinessId(businessId)
      setLoading(false)
    }

    fetch()

  }, [])

  const addProduct = async (product) => {
    let res_product = await Api.addProduct(
      businessId, 
      product.name, 
      product.detail, 
      product.photo, 
      product.price
    )

    setProducts([
      ...products,
      res_product
    ])

    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      detail: '',
      photo: '',
      price: 0,
    },
    onSubmit: addProduct
  });

  const removeProduct = async (item) => {
    await Api.removeProduct(businessId, item._id);
    setProducts(products.filter(z => z._id !== item._id))
  }

  const handleFiles = files => {
    var reader = new FileReader();
    reader.onload = function(e) {
      alert(reader.result)

      setLoading(true)
      let categories = JSON.parse(reader.result)

      Promise.all(categories.map(async category => {
        await uploadCategory(category)
      })).finally(() => {
        setLoading(false)
      })

    }
    reader.readAsText(files[0]);
}

const uploadCategory = async (category) => {

    const { menu } = category
    await Promise.all(menu.map( async m => {
      await uploadMenu(m)
    }))
}

const uploadMenu = async (menu) => {
  if (!menu.detail) menu.detail = ""
  menu.business = businessId
  menu.photo = menu.image
  await addProduct(menu)
}

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create Product</h4>
              <p className={classes.cardCategoryWhite}>Complete product infomation</p>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="ชื่อสินค้า หรือ บริการ"
                    id="product-name"
                    name="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value:formik.values.name,
                      name: "name",
                      onChange: formik.handleChange
                    }}
                  />
                </GridItem>

              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="ข้อมูลเกี่ยวกับสินค้า หรือ บริการนี้"
                    id="detail"
                    name="detail"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      value:formik.values.detail,
                      name: "detail",
                      onChange: formik.handleChange
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="url รูปประกอบ"
                    id="url"
                    name="photo"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value:formik.values.photo,
                      name: "photo",
                      onChange: formik.handleChange
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="ราคา (บาท)"
                    id="price"
                    name="price"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: formik.values.price,
                      type: "number",
                      name:"price",
                      onChange: formik.handleChange
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={formik.handleSubmit}>สร้าง Product</Button>
              <ReactFileReader handleFiles={handleFiles} fileTypes={'.json'}>
                  <IconButton
                    variant="contained"
                    startIcon={<PublishIcon />}
                  >
                    upload csv
                  </IconButton>
              </ReactFileReader>
            </CardFooter>
          </Card>
          {
            isLoading &&
            <GridItem xs={12} sm={12} md={12}>
              <LinearProgress color="secondary"/>
            </GridItem>
          }
        </GridItem>

        <GridItem xs={12} sm={12} md={8}>
          <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: `Products (${products.length})`,
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={products.map((z, i) => i)}
                    tasks={products.map(p => {
                      
                      let value = {
                        ...p,
                        name: `${p.name} ราคา ${p.price} บาท`,
                        detail: p.detail
                      }

                      return value

                    })}
                    disableQR
                    delete={removeProduct}
                  />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
