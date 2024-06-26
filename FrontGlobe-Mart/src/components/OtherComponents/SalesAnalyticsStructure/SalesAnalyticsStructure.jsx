import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Typography, Grid, Divider, Button, CardMedia, InputAdornment, TextField, IconButton } from '@mui/material'
import SellerOrderAccordionAnalytics from '../SellerOrderAccordionAnalytics/SellerOrderAccordionAnalytics'
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import DatePickerFilter from '../../MicroComponents/DatePickerFilter/DatePickerFilter';
import { ConstructionOutlined, ContentPasteOffSharp } from '@mui/icons-material';


function SalesAnalyticsStructure({ sellerCartItems, totalSales }) {

    const [filtersOn, setFiltersOn] = useState(false)

    const [customerSearchData, setCustomerSearchData] = useState("")
    const [customerCartItems, setCustomerCartItems] = useState("")

    const [productSearchData, setProductSearchData] = useState("")
    const [productCartItems, setProductCartItems] = useState("")

    const [bestCustomer, setBestCustomer] = useState({})
    const [bestSellerProduct, setBestSellerProduct] = useState({})



    const filterPurchasesLastMonth = (sellerCartItems) => {
        // Obtener la fecha actual
        const currentDate = new Date();

        // Obtener el primer día del mes actual
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        // console.log(firstDayOfMonth, "firstOfMonth")

        // Filtrar items creados en el último mes

        const filterStatus = sellerCartItems.filter((item) => item.cartItemStatus !== "Pending Payment")

        // console.log("filtered STATUS ", filterStatus)

        const filteredItems = filterStatus.filter(item => {
            const itemDate = new Date(item.order.createdAt);
            return itemDate >= firstDayOfMonth;
        });

        // console.log(filteredItems, "filtered Data");

        // Sumar las cifras de ventas del último mes
        const totalSalesLastMonth = filteredItems.reduce((total, item) => {
            return total + parseFloat(item.product_SellerCompany.priceAfterSale * item.quantity)
        }, 0).toFixed(2);


        // console.log(totalSalesLastMonth, "Total Sales Last Month");

        return totalSalesLastMonth
    };

    const handleCustomerItemSearch = (input) => {

        setProductSearchData("")
        setCustomerSearchData(input)

        let sellerList = sellerCartItems.filter((item) => {

            return item.order.user.username.includes(input)

        })

        console.log(sellerList)
        setCustomerCartItems(sellerList)
        return sellerList
    }

    const handleProductItemSearch = (input) => {

        setCustomerSearchData("")
        setProductSearchData(input)
        let sellerList = sellerCartItems.filter((item) => {

            return item.product_SellerCompany.product.name.includes(input)

        })

        console.log(sellerList)
        setProductCartItems(sellerList)
        return sellerList

    }

    const handleItemListProp = () => {

        if (!customerSearchData && !productSearchData) {

            return sellerCartItems

        }

        else if (customerSearchData && !productSearchData) {

            return customerCartItems

        }
        else if (productSearchData && !customerSearchData) {

            return productCartItems

        }
        else {

            return sellerCartItems

        }

    }

    const getBestCustomerData = (sellerCartItems) => {

        const counts = {};

        console.log("SELLER CART ITEMS >>>>", sellerCartItems)

        const sellerCartItemListFiltered = sellerCartItems.filter((item) => item.cartItemStatus != "Pending Payment")

        console.log("FILTERED LIST >>>> ", sellerCartItemListFiltered)

        for (const item of sellerCartItemListFiltered) {
            const username = item.order.user.username;
            counts[username] = (counts[username] || 0) + 1;
        }

        console.log("CONTEOS >>>>", counts)

        let maxCount = 0;
        let bestCustomerUsername;

        for (const username in counts) {
            if (counts[username] > maxCount) {
                maxCount = counts[username];
                bestCustomerUsername = username;
            }
        }

        const bestCustomerr = sellerCartItems.find(item => item.order.user.username === bestCustomerUsername)?.order.user;

        setBestCustomer(bestCustomerr)
        return bestCustomerr;

    }

    const getBestSellerProductData = (sellerCartItems) => {

        const bestProductObj = { productName: "", productQty: 0 }
        const counts = {}

        // console.log("SELLERCART ITEMS >>>>> ", sellerCartItems,)

        // Convertimos el array de objetos (de productos) a unicamente una lista de nombres y unicamente aquellos que estén pagados.
        const productList = sellerCartItems.filter((item) => item.cartItemStatus != "Pending Payment").map((item) => {

            return item.product_SellerCompany.product.name

        })

        // console.log("productList >>>>> ", productList,)

        for (const element of productList) {

            counts[element] = (counts[element] || 0) + 1

        }

        // console.log("CONTEOS >>> ", counts)

        let max = 0
        let maxName = "";
        for (let prop in counts) {

            // console.log("dentro de iteR >>> ", prop)

            if (counts[prop] > max) {

                max = counts[prop]
                maxName = prop

            }

        }

        // console.log("Max >>>>", max)

        bestProductObj["productName"] = maxName

        bestProductObj["productQty"] = sellerCartItems.filter((item) => item.cartItemStatus != "Pending Payment").filter((element) =>
            element.product_SellerCompany.product.name === bestProductObj["productName"]
        ).reduce((total, item) => total + item.quantity, 0)

        // console.log(bestProductObj["productQty"])

        console.log(bestProductObj)
        setBestSellerProduct(bestProductObj)
        return bestProductObj

    }

    // console.log("seller cartITemsList", sellerCartItems)

    useEffect(() => {

        if (sellerCartItems.length > 0) {
            getBestCustomerData(sellerCartItems)
            // getBestSellerProductData(sellerCartItems)

        }

    }, [sellerCartItems, bestSellerProduct])

    useEffect(() => {

        if (sellerCartItems.length > 0) {
            // getBestCustomerData(sellerCartItems)
            getBestSellerProductData(sellerCartItems)

        }

    }, [sellerCartItems])

    return (

        <Box sx={{ width: '100%', display: "flex", flexDirection: "column", gap: 2, p: 5 }}>

            <Typography m={1} variant='h5' color="primary">Sales Analytics </Typography>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={6} md={6} lg={3} sx={{ mb: 1 }}>
                    <Box sx={{ backgroundColor: 'white', minHeight: 150, p: 3, }}>
                        <Typography color={"secondary"}>Annual Sales: </Typography>
                        <Typography mt={1} variant="h6" color="text.secondary"> {totalSales} €</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3} sx={{ mb: 1 }}>
                    <Box sx={{ backgroundColor: 'white', width: "100%", minHeight: 150, p: 3 }}>
                        <Typography color={"secondary"}>Monthly Sales:</Typography>
                        <Typography mt={1} variant="h6" color="text.secondary">{filterPurchasesLastMonth(sellerCartItems)} €</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3} sx={{ mb: 1 }}>
                    <Box sx={{ backgroundColor: 'white', minHeight: 150, p: 3, }}>
                        <Typography color={"secondary"}>Top Customer</Typography>
                        <Box display={"flex"} flexDirection={"column"}>
                            <Typography mt={1} variant="" color="text.secondary" fontStyle={""}></Typography>
                            <Typography mt={0.5} variant="subtitle2" color="text.secondary"> <strong>{bestCustomer.username}</strong></Typography>
                            <Typography mt={0.5} variant="subtitle2" color="text.secondary"> email: <strong>{bestCustomer.email}</strong></Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3} sx={{ mb: 1 }}>
                    <Box sx={{ backgroundColor: 'white', minHeight: 150, p: 3, }}>
                        <Typography color={"secondary"}>Best Seller Product</Typography>
                        <Box display={"flex"} flexDirection={"column"}>
                            <Typography mt={1} variant="" color="text.secondary" fontStyle={""}></Typography>
                            <Typography mt={0.5} variant="subtitle2" color="text.secondary" fontStyle={""}><strong>{bestSellerProduct.productName}</strong></Typography>
                            <Typography mt={0.5} variant="subtitle2" color="text.secondary"> Amount sold: <strong>{bestSellerProduct.productQty}</strong></Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} mb={2}>
                    {/* <Typography ml={1} mb={3} variant='h6' color="primary">Listed Sales:  </Typography> */}
                    <Box display={"flex"} width={"100%"} gap={2}>
                        <Box ml={1} display={"flex"}>
                            <IconButton onClick={() => { setFiltersOn(!filtersOn) }}>{!filtersOn ? <FilterListIcon /> : <FilterListOffIcon />}</IconButton>
                            {!filtersOn && <Typography ml={2} mt={1} variant='subtitle2' color="secondary">Enable filtered search ... </Typography>}
                        </Box>

                        {filtersOn &&

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} width={"100%"}>

                                {/* <Grid item xs={12} sm={12}>
                                    <DatePickerFilter></DatePickerFilter>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <DatePickerFilter></DatePickerFilter>
                                </Grid> */}

                                <TextField
                                    size='small'
                                    onInput={(e) => { handleProductItemSearch(e.target.value) }}
                                    id="filter-by-product-name"
                                    label="Filter by product name"
                                    variant="outlined"
                                    sx={{ width: '49.5%' }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    size='small'
                                    onInput={(e) => { handleCustomerItemSearch(e.target.value) }}
                                    id="filter-by-customer-name"
                                    label="Filter by customer name"
                                    variant="outlined"
                                    sx={{ width: '49.5%' }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </Box>}

                    </Box>

                </Grid>

                <Grid item xs={12} >

                    <SellerOrderAccordionAnalytics

                        sellerCartItems={handleItemListProp()}

                    />

                </Grid>

            </Grid>

        </Box>
    )
}

export default SalesAnalyticsStructure