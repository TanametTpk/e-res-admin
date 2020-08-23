import React from 'react'
import ReactFileReader from 'react-file-reader'
import Api from '../api/business'

const Product = () => {

    const handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Use reader.result
            alert(reader.result)
            console.log(JSON.parse(reader.result))
        }
        reader.readAsText(files[0]);
    }

    const getCategory = (category) => {

        const { name, menu } = category
        menu.map( m => {

            getMenu(m)

        })

    }

    const getMenu = (menu) => {

        const {name, price, image} = menu
        Api.addProduct("business Id", name, "detail ", image, price)

    }

    return (
        <div>
            product
            <ReactFileReader handleFiles={handleFiles} fileTypes={'.json'}>
                <button className='btn'>Upload</button>
            </ReactFileReader>
        </div>
    )
}

export default Product
