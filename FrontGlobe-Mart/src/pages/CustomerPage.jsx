import React from 'react'
import { Box, Divider, Typography } from '@mui/material'
import CustomerOrderCard from '../components/OtherComponents/CustomerOrderCard/CustomerOrderCard'
import { useState, useEffect } from 'react';
import { getOwnOrders } from '../services/orderService';
import { getCartItemsFromOrder } from '../services/cartItemService';
import TabSelectorCustomer from '../components/MicroComponents/TabSelectorCutomerOrders/TabSelectorCustomer';
import SellerProductCaroussel from '../components/OtherComponents/SellerProductsCaroussel/SellerProductsCaroussel';

function CustomerPage() {

  const [orderList, setOrderList] = useState([]);
  const [cartItemList, setCartItemList] = useState([])
  const [infoFetched, setInfoFetched] = useState(false)

  useEffect(() => {

    const fetchData = async () => {

      try {

        const orderData = await getOwnOrders()

        if (!orderData || orderData.length === 0) {

          return console.log("No orders found")

        } else {

          setOrderList(orderData)
          setInfoFetched(true)

        }

      } catch (error) {
        console.log("No orders found", error)
      }

    }

    fetchData()

  }, [])

  useEffect(() => {

    const fetchData = async () => {

      if (orderList && orderList.length > 0) {
     
        const cartItemsPromises = orderList.map(order =>
          getCartItemsFromOrder(order.id)
        );

        try {
          const cartItemsArr = await Promise.all(cartItemsPromises);
          const updatedOrderList = orderList.map((order, index) => ({
            ...order,
            cartItems: cartItemsArr[index],
          }));

          setOrderList(updatedOrderList);

        } catch (error) {

          console.error("Error fetching cart items: ", error);

        }

      }

    };

    fetchData()

  }, [infoFetched])


  useEffect(() => {

    console.log(orderList)


  }, [orderList])

  return (

    <Box sx={{ width: '100%', display: "flex", flexDirection: "column", p: 2 }}>
      {/* <Box sx={{ backgroundColor: "background.brigth", width: '100%', display: "flex", flexDirection: "column", p: 2 }}> */}

      <Typography variant="h5" color="primary" mx={4} mt={4} mb={5} > Customers Page </Typography>

      <Box marginX={0}>
        <Typography variant="tab" color={"orange"} ml={6} > My Orders </Typography>
        <Divider sx={{ mb: '1%', mt: '1%', mx: 4 }} />
      </Box>

      <Box ml={0}>
      
        <TabSelectorCustomer

          orderList={(orderList)}

        />

      </Box>
      

      <Box mt={4}>
        <Typography variant="tab" color={"orange"} ml={4} > My Favorites </Typography>
        <Divider sx={{ mb: '2%', mt: '1%', mx: 3 }} />
        <Box m={3}>
          {/* <SellerProductCaroussel ></SellerProductCaroussel> */}
        </Box>

      </Box>

    </Box>

  )
}

export default CustomerPage