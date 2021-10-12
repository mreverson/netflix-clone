import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import { loadStripe } from '@stripe/stripe-js'

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
    }, [user.uid])

    useEffect(() => {
        db.collection('products')
        .where('active', "==", true)
        .get().then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = { 
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products);
        });
    },[])

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers')
        .doc(user.uid).collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async(snap) => {
            const {error, sessionId} = snap.data();
            if(error){
                alert(`An Error Occured: ${error.message}`);
            }

            if(sessionId){
                //Init stripe
                const stripe = await loadStripe('pk_test_51JjZZNGBa7IK3jlfAzYx2ZgAMDDyQYx5RFoKMHcj3b8CwjnDxZof8CjljuPWoynHnR9ieYjDvp5TWWlclJnwfgg600hHcbv50T');
                stripe.redirectToCheckout({ sessionId });
            }
        })
    }

    return (
        <div className="">
            {subscription && <p className="text-xs">Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}


            {Object.entries(products).map(([productId, productData]) => {
                //Todo: add logic to check subscription is active
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)
                return (
                    <div key={productId} className={`flex justify-between p-5 opacity-80 hover:opacity-100`}>
                        <div className="">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                            
                        </div>
                        <button
                            onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}
                            className={` ${isCurrentPackage && "disabled"} px-5 py-1 bg-red-500 text-white text-sm rounded-sm`}
                        >
                            {isCurrentPackage ? 'Current Plan' : 'Subscribe'}
                        </button>
                    </div>
                );
            })}
        </div>
    )
}

export default PlansScreen
