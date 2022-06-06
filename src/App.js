import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { uiActions } from './store/ui-Slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const despatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  console.log(showCart);
  console.log(notification);
  console.log(isInitial);
  console.log(cart);
  useEffect(() => {
    const sendCartData = async () => {
      const response = await fetch(
        'https://udemy-react-f19a8-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );
      if (!response) {
        throw new Error('Sending cart data failed');
      }

      despatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sending cart Success!',
        })
      );
    };
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData().catch((error) => {
      despatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    });
  }, [cart]);
  console.log(cart);
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
