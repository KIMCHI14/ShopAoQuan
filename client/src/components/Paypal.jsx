import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { config } from "../utils/axiosconfig";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { emptycart } from "../features/users/userSlice";
const style = { "layout": "vertical" };


const ButtonWrapper = ({ currency, showSpinner, amount, payload }) => {
    const d = useDispatch()
    const navigate = useNavigate()
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options, currency: currency
            }
        })
    }, [currency, showSpinner])
    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units: [
                        { amount: { currency_code: currency, value: amount } }
                    ]
                })
                }
                onApprove={(data, actions) => {
                    actions.order.capture().then(async (res) => {
                        const orderUser = axios.post(`${base_url}auth/cart/create-order`, payload, config)
                        if (res.status === "COMPLETED") {
                            toast.success("Thanh toán thành công")
                            d(emptycart())
                            navigate("/checkout-success")
                        }
                    })
                }}
            />
        </>
    );
}

export default function Paypal({ amount, payload }) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}