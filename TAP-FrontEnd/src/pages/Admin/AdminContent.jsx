import { Route, Routes } from 'react-router-dom';
import styles from './AdminContent.module.css'
import { Dash } from './Dash/Dash';
import { UserMem } from './Members/UserMem/UserMem';
import { BizMem } from './Members/BizMem/BizMem';
import Chat from './Chat/Chat';
import { ProductsManage } from './Products/ProductsManage/ProductsManage';
import { Orders } from './Orders/Orders';
import { ProductsRegister } from './Products/ProductsApply/ProductsRegister/ProductsRegister';
import { SaleRegister } from './Products/ProductsApply/SaleRegister/Saleregister';

export const AdminContent =()=>{
    return(
        <div className={styles.container}>
            <Routes>
                <Route path="/*" element={<Dash/>}/>
                <Route path="/products/product/*" element={<ProductsManage/>}/>
                <Route path="/products/apply/products/*" element={<ProductsRegister/>}/>
                <Route path="/products/apply/sale/*" element={<SaleRegister/>}/>
                <Route path="/orders/user/*" element={<Orders/>}/>
                <Route path="/members/user/*" element={<UserMem/>}/>
                <Route path="/members/biz/*" element={<BizMem/>}/>
                <Route path='/chat/*' element={<Chat/>}/>
            </Routes>
        </div>
    );
}