export const addCustomer = (customer) => {
    return fetch("https://customerrest.herokuapp.com/api/customers", {
        method: "POST",
        headers: { "Content-type" : "application/json"},
        body: JSON.stringify(customer)
    })
}

export const addTraining = (training) => {
    training.date = training.date.toISOString();
     return fetch("https://customerrest.herokuapp.com/api/trainings", {
        method: "POST",
        headers: { "Content-type" : "application/json"},
        body: JSON.stringify(training)
    })
}

export const editItem = (url, updatedObject) => {
    return fetch(url, {
        method: "PUT",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(updatedObject)
    })
}