import React from 'react'
import Box from '@mui/material/Box';
import ProductCard from '../components/OtherComponents/ProductCard/ProductCard';
import { useState, useEffect, useContext } from 'react';
import { getProductsFromSellers } from '../services/productSellerService';
import { mainContext } from '../contexts/mainContext';
import { Navigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';


function MainPage() {

    const isSmallScreen = useMediaQuery('(max-width: 600px)')

    const [productData, setProductData] = useState([])
    const { mainData, setMainData } = useContext(mainContext)

    const selectedCatsLength = mainData.selectedPCategories.length
    const selectedCats = mainData.selectedPCategories
    const searchInputData = mainData.searchData
    const searchInputDataLength = mainData.searchData.length

    console.log("Leyendo nuestro contexto principal: ", mainData)

    const compareData = (prodDat) => {

        return searchInputData.includes(productData.product.name)

    }

    // useEffect(() => {

    //     const fetchProductData = async () => {

    //         const pData = await getProductsFromSellers()
    //         console.log("product data", pData)
    //         setProductData(pData)

    //     }

    //     fetchProductData()

    // }, [])

    useEffect(() => {

        const fetchProductData = async () => {

            const pData = await getProductsFromSellers()
            console.log("product data", pData)
            const searchedProducts = pData.filter(products => products.product.name.includes(searchInputData))
            setProductData(searchedProducts)

        }

        fetchProductData()

    }, [searchInputData])


    const renderProducts = () => {

        return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginY: '50px', gap: '20px' }}>

                {productData.map(productData =>

                    <ProductCard
                        key={productData.id}
                        price={productData.price}
                        productName={productData.product.name}
                        productModel={productData.product.model}
                        productBrand={productData.product.brand}
                        productImg={productData.product.imageURL}
                    />

                )}
            </Box>

        )

    }

    const renderSelectedCatProducts = () => {

        return (

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '50px', gap: '40px' }}>

                {productData.filter((products) => selectedCats.includes(products.product.productCategoryId)).map(productData => (

                    <ProductCard
                        key={productData.id}
                        price={productData.price}
                        productName={productData.product.name}
                        productModel={productData.product.model}
                        productBrand={productData.product.brand}
                        productImg={productData.product.imageURL}
                    />
                ))}
            </Box>

        )

    }

    return (
        <Box>

            {(selectedCatsLength <= 0) && renderProducts() || renderSelectedCatProducts()}

        </Box>
    )
}

export default MainPage

