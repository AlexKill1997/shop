const deliveryKeys = {
  city: 'г. ',
  street: 'ул. ',
  house: 'д. ',
  building: 'стр. ',
  appt: 'кв. ',
  // comment: 'Комментарий: ',
}

export default {
  GET_ORDERS: ({ orders }) => {
    return orders.map(order => {
      const { manager } = order
      const newOrder = JSON.parse(JSON.stringify(order))
      let deliveryStr = ``

      newOrder.sum = newOrder.products.map(product => {
        return (product.discount_price || product.cost) * product.count
      })

      const { delivery } = newOrder
      for (let key in deliveryKeys) {
        if(delivery[key]) deliveryStr += `${deliveryKeys[key]} ${delivery[key]}, `
      }

      if (order.comment) deliveryStr += `Комментарий: ${order.comment}, `
      if (manager) deliveryStr += `Менеджер: ${manager.name} ${manager.surname}, `

      deliveryStr = deliveryStr.replace(/(\,\s)$/, "")
      const date = new Date(newOrder.created)
      newOrder.createdDate = date.toLocaleDateString()
      newOrder.address = deliveryStr

      return newOrder
    })
  },

  GET_SUMMARY: ({ orders }) => {
    let sum = 0;
    orders.forEach(order => {
      order.products.forEach(product => {
        sum += (product.club_cost || product.cost) * product.count
      })
    })
    return sum
  },
  GET_CURRENT_ORDER: ({ orders, currentOrderIndex }) => orders[currentOrderIndex],
  GET_CURRENT_ORDER_PRODUCTS: ( state, getters ) => getters['GET_CURRENT_ORDER'].products,

  GET_PAGE_NUMBER: ({ pageNumber }) => pageNumber,
  GET_LIMIT: ({ ordersLimit }) => ordersLimit,
  GET_ORDERS_COUNTER: ({ ordersCount }) => ordersCount,
  GET_AMOUNT: ({ amount }) => amount,
}