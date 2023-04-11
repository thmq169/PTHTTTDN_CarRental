import { useParams } from "react-router-dom";
import ListCustomers from "../components/customer/ListCustomers"
import CustomerDetail from "../components/customer/CustomerDetail";
import { useStore } from "../store";

const Customers = () => {
    const [state, dispatch] = useStore()

    const listCus = state.customers

    const { idCustomer } = useParams();

    const customer = listCus.find(customer => customer.id === Number.parseInt(idCustomer))
    // console.log(customer);

    let body

    if (window.location.pathname === "/customers") {
        body = (<ListCustomers />)
    }

    if (customer) {
        body = (<CustomerDetail customer={customer} />)
    }

    return (
        <>
            {body}
        </>
    )
}

export default Customers
